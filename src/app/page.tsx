import { ThemeToggle } from "@/components/layout/ThemeToggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-surface">
      <h1 className="text-primary" style={{ fontSize: "var(--text-display)" }}>
        iProtectCare
      </h1>
      <p className="text-secondary">Theme token check</p>
      <div className="rounded-2xl bg-surface-raised p-6 text-primary">raised</div>
      <div className="rounded-2xl bg-surface-contrast p-6 text-on-contrast">contrast</div>
      <a className="text-accent link-underline" href="#top">
        accent link
      </a>
      <ThemeToggle />
    </main>
  );
}
