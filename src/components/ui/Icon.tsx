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
};

export function Icon({
  name,
  className = "size-6",
  ...rest
}: { name: keyof typeof paths | string } & ComponentPropsWithoutRef<"svg">) {
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
