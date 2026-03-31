import { Outfit } from "next/font/google";
import "./globals.css";
import 'remixicon/fonts/remixicon.css'
import { Toaster } from "react-hot-toast";



const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export const metadata = {
  title: "John Carl Santos",
  description: "A personal portfolio website built with Next.js and Tailwind CSS.",
};

import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} font-sans bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen flex flex-col`}
      >
        <div className="flex-grow flex flex-col">
          {children}
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
