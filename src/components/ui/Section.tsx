import type { ReactNode } from "react";

type Tone = "default" | "raised" | "contrast";
type Width = "content" | "wide";

const tones: Record<Tone, string> = {
  default: "bg-surface text-primary",
  raised: "bg-surface-raised text-primary",
  contrast: "bg-surface-contrast text-on-contrast",
};

/**
 * Section shell: fluid vertical rhythm (spec §5), 1200px content container
 * or 1440px for full-bleed showcases.
 */
export function Section({
  id,
  tone = "default",
  width = "content",
  className = "",
  children,
}: {
  id?: string;
  tone?: Tone;
  width?: Width;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`${tones[tone]} ${className}`} style={{ paddingBlock: "var(--section-y)" }}>
      <div
        className={`mx-auto px-5 sm:px-8 ${width === "wide" ? "max-w-[1440px]" : "max-w-[1200px]"}`}
      >
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  onContrast = false,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  onContrast?: boolean;
}) {
  return (
    <header className="mb-10 max-w-2xl sm:mb-14">
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold tracking-wide text-accent uppercase">{eyebrow}</p>
      )}
      <h2
        className="font-semibold tracking-tight text-balance"
        style={{ fontSize: "var(--text-title)", lineHeight: 1.1 }}
      >
        {title}
      </h2>
      {sub && (
        <p className={`mt-4 text-lg ${onContrast ? "text-on-contrast-secondary" : "text-secondary"}`}>
          {sub}
        </p>
      )}
    </header>
  );
}
