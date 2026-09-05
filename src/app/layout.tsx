import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { business } from "@/content/business";
import "./globals.css";

const themeInit = `try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL(business.domain),
  title: {
    default: `${business.name} — Apple Device Repair in Koramangala, Bengaluru`,
    template: `%s | ${business.name}`,
  },
  description:
    "Independent iPhone, iPad, MacBook and Apple Watch repair in Koramangala, Bengaluru. Free diagnosis, transparent pricing, warranty on every repair.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-on-accent"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
