import { Outfit } from "next/font/google";
import "./globals.css";
import "remixicon/fonts/remixicon.css";
import { Toaster } from "react-hot-toast";

import Footer from "@/components/Footer";
import SearchPalette from "@/components/SearchPalette";
import Chatbot from "@/components/Chatbot";
import { AppUIProvider } from "@/components/providers/AppUIProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


export const metadata = {
  title: "John Carl Santos",
  description: "A personal portfolio website built with Next.js and Tailwind CSS.",
};

const themeScript = `
(() => {
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
        className={`${outfit.variable} min-h-screen flex flex-col bg-background text-foreground`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <AppUIProvider>
          <div className="flex-grow flex flex-col">
            {children}
          </div>
          <Footer />
          <Chatbot />
          <SearchPalette />
          <Toaster />
        </AppUIProvider>
      </body>
    </html>
  );
}
