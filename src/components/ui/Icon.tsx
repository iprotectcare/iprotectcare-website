import type { ComponentPropsWithoutRef } from "react";

const paths: Record<string, React.ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  shield: <path d="M12 3 5 6v5c0 4.5 3 8.2 7 10 4-1.8 7-5.5 7-10V6l-7-3Z" />,
  tag: (
    <>
      <path d="M3 3h8l10 10-8 8L3 11V3Z" />
      <circle cx="8" cy="8" r="1.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </>
  ),
  component: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  screen: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="2.5" />
      <path d="m9 8 6 6" />
    </>
  ),
  battery: (
    <>
      <rect x="3" y="8" width="16" height="8" rx="2" />
      <path d="M22 11v2M6 11v2h4v-2H6Z" />
    </>
  ),
  droplet: <path d="M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11Z" />,
  plug: (
    <>
      <path d="M9 3v5M15 3v5" />
      <path d="M6 8h12v3a6 6 0 0 1-5 5.9V21h-2v-4.1A6 6 0 0 1 6 11V8Z" />
    </>
  ),
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="10" y="10" width="4" height="4" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </>
  ),
  keyboard: (
    <>
      <rect x="2" y="7" width="20" height="10" rx="2" />
      <path d="M6 11h.01M10 11h.01M14 11h.01M18 11h.01M7 14h10" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3l2-3h6l2 3h3v11H4V8Z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="8" ry="2.5" />
      <path d="M4 5.5V12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V5.5" />
      <path d="M4 12v6.5C4 19.9 7.6 21 12 21s8-1.1 8-2.5V12" />
    </>
  ),
  phone: (
    <path d="M5 4c0-.6.4-1 1-1h3l2 5-2.2 1.6a13 13 0 0 0 5.6 5.6L16 13l5 2v3c0 .6-.4 1-1 1A16 16 0 0 1 5 4Z" />
  ),
  check: <path d="m4 12.5 5 5L20 6.5" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.1" cy="6.9" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
};

/** Brand glyphs drawn as solid fills rather than strokes. */
const fillPaths: Record<string, React.ReactNode> = {
  star: (
    <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95L12 2.5z" />
  ),
  whatsapp: (
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  ),
};

export function Icon({
  name,
  className = "size-6",
  ...rest
}: { name: keyof typeof paths | string } & ComponentPropsWithoutRef<"svg">) {
  const fill = fillPaths[name];
  if (fill) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className} {...rest}>
        {fill}
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
      {...rest}
    >
      {paths[name] ?? <circle cx="12" cy="12" r="9" />}
    </svg>
  );
}
