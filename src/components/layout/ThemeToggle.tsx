"use client";

import { useEffect, useState } from "react";

/** Reads the theme the blocking <head> script applied, toggles and persists it. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="flex size-11 items-center justify-center rounded-full text-secondary transition-colors hover:text-primary"
    >
      {/* sun shown in dark mode, moon in light; hidden until hydrated to avoid mismatch */}
      <span aria-hidden className="text-lg" suppressHydrationWarning>
        {theme === null ? "" : theme === "dark" ? "☀︎" : "☾"}
      </span>
    </button>
  );
}
