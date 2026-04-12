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
  weight: ["400", "500", "600", "700"],
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
    const theme =
      storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : prefersDark
          ? "dark"
          : "light";

    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
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
        className={`${outfit.variable} font-sans bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen flex flex-col`}
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
