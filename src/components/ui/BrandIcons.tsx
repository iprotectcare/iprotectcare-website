import { useId } from "react";

/**
 * Brand marks that need their official colours (gradients / multi-colour),
 * which the currentColor-based Icon set can't express.
 */

const instagramGradientStops = (
  <>
    <stop offset="0%" stopColor="#FDF497" />
    <stop offset="5%" stopColor="#FDF497" />
    <stop offset="45%" stopColor="#FD5949" />
    <stop offset="60%" stopColor="#D6249F" />
    <stop offset="90%" stopColor="#285AEB" />
  </>
);

/**
 * Instagram mark in the official gradient.
 * - "glyph": gradient-stroked camera outline for inline use next to text.
 * - "badge": app-icon style — gradient rounded square, white outline —
 *   for buttons like the floating action.
 */
export function InstagramMark({
  variant = "glyph",
  className = "size-6",
}: {
  variant?: "glyph" | "badge";
  className?: string;
}) {
  const id = useId();
  const gradId = `ig-${id}`;

  if (variant === "badge") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className}>
        <defs>
          <radialGradient id={gradId} cx="0.3" cy="1.07" r="1.3">
            {instagramGradientStops}
          </radialGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill={`url(#${gradId})`} />
        <g
          fill="none"
          stroke="#fff"
          strokeWidth="1.7"
          strokeLinecap="round"
        >
          <rect x="5.2" y="5.2" width="13.6" height="13.6" rx="3.6" />
          <circle cx="12" cy="12" r="3.1" />
          <circle cx="16.2" cy="7.8" r="0.75" fill="#fff" stroke="none" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <defs>
        <radialGradient id={gradId} cx="0.3" cy="1.07" r="1.3">
          {instagramGradientStops}
        </radialGradient>
      </defs>
      <g
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.1" cy="6.9" r="0.9" fill={`url(#${gradId})`} stroke="none" />
      </g>
    </svg>
  );
}

/** Google "G" in the official four colours. */
export function GoogleG({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}
