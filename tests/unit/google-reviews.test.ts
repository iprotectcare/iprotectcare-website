import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getGoogleReviews } from "@/lib/google-reviews";

const apiResponse = {
  rating: 4.8,
  userRatingCount: 12,
  googleMapsUri: "https://maps.google.com/?cid=123",
  reviews: [
    {
      rating: 5,
      relativePublishTimeDescription: "2 weeks ago",
      text: { text: "Screen fixed the same day. Honest pricing." },
      authorAttribution: { displayName: "Jane Doe" },
    },
    {
      rating: 4,
      relativePublishTimeDescription: "a month ago",
      text: { text: "Quick battery swap." },
      authorAttribution: { displayName: "John Roe" },
    },
    // review without text must be dropped, not rendered blank
    { rating: 5, authorAttribution: { displayName: "Silent Star" } },
  ],
};

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.stubEnv("GOOGLE_PLACES_API_KEY", "test-key");
  vi.stubEnv("GOOGLE_PLACE_ID", "ChIJtest");
  fetchMock = vi.fn().mockResolvedValue(
    new Response(JSON.stringify(apiResponse), { status: 200 }),
  );
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("getGoogleReviews", () => {
  it("maps the Places response and drops textless reviews", async () => {
    const data = await getGoogleReviews();
    expect(data).not.toBeNull();
    expect(data!.rating).toBe(4.8);
    expect(data!.count).toBe(12);
    expect(data!.reviews).toHaveLength(2);
    expect(data!.reviews[0]).toEqual({
      author: "Jane Doe",
      rating: 5,
      text: "Screen fixed the same day. Honest pricing.",
      when: "2 weeks ago",
    });
    // sends the key as a header, not in the URL
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toContain("places.googleapis.com/v1/places/ChIJtest");
    expect(init.headers["X-Goog-Api-Key"]).toBe("test-key");
  });

  it("returns null without env configuration", async () => {
    vi.stubEnv("GOOGLE_PLACES_API_KEY", "");
    expect(await getGoogleReviews()).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns null on API failure", async () => {
    fetchMock.mockResolvedValue(new Response("denied", { status: 403 }));
    expect(await getGoogleReviews()).toBeNull();
  });

  it("returns null when the network throws", async () => {
    fetchMock.mockRejectedValue(new Error("offline"));
    expect(await getGoogleReviews()).toBeNull();
  });

  it("returns null when there are no usable reviews yet", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ rating: 5, userRatingCount: 1, reviews: [] }), {
        status: 200,
      }),
    );
    expect(await getGoogleReviews()).toBeNull();
  });
});
