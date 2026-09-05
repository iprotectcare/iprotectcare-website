import { getGoogleReviews } from "@/lib/google-reviews";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { GoogleG } from "@/components/ui/BrandIcons";

function Stars({ rating, className = "size-4" }: { rating: number; className?: string }) {
  return (
    <span
      className="inline-flex gap-0.5"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon
          key={i}
          name="star"
          className={`${className} ${i <= Math.round(rating) ? "text-amber-400" : "text-hairline"}`}
        />
      ))}
    </span>
  );
}

/**
 * Live Google reviews in the spec's testimonials slot. Fetches at most the
 * 5 reviews Google's API exposes, revalidated daily; renders nothing until
 * a Google Business Profile with reviews and the two env vars exist —
 * the page never shows an empty review block (spec §1).
 */
export async function GoogleReviews() {
  const data = await getGoogleReviews();
  if (!data) return null;

  return (
    <Section id="reviews" tone="raised">
      <Reveal>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
          <SectionHeading
            eyebrow="Reviews"
            title="What customers say on Google"
          />
          <div className="mb-2 flex flex-col items-start gap-2">
            <div className="flex items-center gap-3">
              <GoogleG className="size-8" />
              <span className="text-4xl font-semibold tracking-tight">
                {data.rating.toFixed(1)}
              </span>
              <div className="flex flex-col">
                <Stars rating={data.rating} />
                <span className="text-sm text-secondary">
                  {data.count} Google review{data.count === 1 ? "" : "s"}
                </span>
              </div>
            </div>
            {data.mapsUri && (
              <Button href={data.mapsUri} variant="ghost" target="_blank" rel="noopener">
                See all reviews on Google →
              </Button>
            )}
          </div>
        </div>
      </Reveal>
      <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.reviews.map((r) => (
          <Card key={`${r.author}-${r.when}`} interactive={false} className="h-full bg-surface">
            <figure className="flex h-full flex-col gap-3 p-6">
              <Stars rating={r.rating} />
              <blockquote className="text-sm leading-relaxed">
                “{r.text.length > 320 ? `${r.text.slice(0, 320).trimEnd()}…` : r.text}”
              </blockquote>
              <figcaption className="mt-auto pt-2 text-sm text-secondary">
                {r.author}
                {r.when && <span> · {r.when}</span>}
              </figcaption>
            </figure>
          </Card>
        ))}
      </RevealGroup>
    </Section>
  );
}
