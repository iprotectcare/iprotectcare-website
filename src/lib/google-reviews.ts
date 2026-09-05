export type GoogleReview = {
  author: string;
  rating: number;
  text: string;
  when: string;
};

export type GoogleReviewData = {
  rating: number;
  count: number;
  mapsUri: string;
  reviews: GoogleReview[];
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: Array<{
    rating?: number;
    relativePublishTimeDescription?: string;
    text?: { text?: string };
    authorAttribution?: { displayName?: string };
  }>;
};

/**
 * Live Google rating + reviews via the Places API (New).
 * Requires GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID; without them — or on
 * any API failure, or with zero reviews — returns null so the section
 * renders nothing (spec §1: never an empty or placeholder review block).
 * Google returns at most 5 reviews; the section links to the full list.
 * Cached for a day via ISR so the static page stays fast and API usage
 * stays inside the free tier.
 */
export async function getGoogleReviews(): Promise<GoogleReviewData | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount,googleMapsUri,reviews`,
      {
        headers: { "X-Goog-Api-Key": key },
        next: { revalidate: 86_400 },
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as PlacesResponse;

    const reviews: GoogleReview[] = (data.reviews ?? [])
      .filter((r) => r.text?.text && (r.rating ?? 0) > 0)
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? "Google user",
        rating: r.rating ?? 0,
        text: r.text!.text!,
        when: r.relativePublishTimeDescription ?? "",
      }));

    if (!data.rating || reviews.length === 0) return null;

    return {
      rating: data.rating,
      count: data.userRatingCount ?? reviews.length,
      mapsUri: data.googleMapsUri ?? "",
      reviews,
    };
  } catch {
    return null;
  }
}
