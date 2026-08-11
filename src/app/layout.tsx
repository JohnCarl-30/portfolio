import { Caveat, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "remixicon/fonts/remixicon.css";
import { Toaster } from "react-hot-toast";

import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import TopRail from "@/components/TopRail";
import SearchPalette from "@/components/SearchPalette";
import Chatbot from "@/components/Chatbot";
import { AppUIProvider } from "@/components/providers/AppUIProvider";
import { RouteTransitionProvider } from "@/components/providers/RouteTransition";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

// Geist and Geist Mono are siblings, so the meta/mono labels sit on the same
// skeleton as the body text instead of reading as a second voice.
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Handwritten script, used only for the splash-screen monogram.
const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "John Carl Santos — AI Full Stack Engineer",
    template: "%s | John Carl Santos",
  },
  description:
    "Portfolio of John Carl Santos — aspiring AI engineer building RAG systems, full-stack web apps, and automation tools with Next.js, Python, and cloud infrastructure.",
  keywords: [
    "John Carl Santos",
    "John Carl",
    "dyeyc",
    "dyeyyyccc",
    "AI engineer",
    "full-stack developer",
    "Next.js",
    "Python",
    "RAG",
    "portfolio",
    "web developer",
    "machine learning",
    "cloud infrastructure",
  ],
  authors: [{ name: "John Carl Santos", url: "https://x.com/dyeyyyccc" }],
  creator: "John Carl Santos",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "John Carl Santos",
    title: "John Carl Santos — AI Full Stack Engineer",
    description:
      "Portfolio of John Carl Santos — aspiring AI engineer building RAG systems, full-stack web apps, and automation tools.",
    images: [
      {
        url: "/personal.jpg",
        width: 1200,
        height: 630,
        alt: "John Carl Santos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dyeyyyccc",
    title: "John Carl Santos — AI Full Stack Engineer",
    description:
      "Portfolio of John Carl Santos — aspiring AI engineer building RAG systems, full-stack web apps, and automation tools.",
    images: ["/personal.jpg"],
    creator: "@dyeyyyccc",
  },
};

const themeScript = `
(() => {
  document.documentElement.classList.add("js");
  try {
    const storageKey = "portfolio-theme";
    const storedTheme = window.localStorage.getItem(storageKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const preference =
      storedTheme === "light" ||
      storedTheme === "dark" ||
      storedTheme === "system" ||
      storedTheme === "midnight"
        ? storedTheme
        : "system";
    const resolvedTheme =
      preference === "system"
        ? prefersDark
          ? "dark"
          : "light"
        : preference === "midnight"
          ? "dark"
          : preference;

    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.dataset.themeSelection = preference;
    document.documentElement.dataset.themeVariant =
      preference === "midnight" ? "midnight" : "default";
    document.documentElement.style.colorScheme = resolvedTheme;
  } catch (error) {
    console.error("Theme bootstrap failed", error);
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} ${caveat.variable} flex min-h-screen flex-col bg-background text-foreground`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <AppUIProvider>
          <RouteTransitionProvider>
            <SplashScreen />
            <TopRail />
            <div className="flex flex-grow flex-col">
              {children}
            </div>
            <Footer />
            <Chatbot />
            <SearchPalette />
            <Toaster />
          </RouteTransitionProvider>
        </AppUIProvider>
      </body>
    </html>
  );
}
