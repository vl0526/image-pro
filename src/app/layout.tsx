import type { Metadata } from "next";
import { Inter, Literata } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const literata = Literata({ subsets: ["latin"], variable: "--font-literata" });

export const metadata: Metadata = {
  title: "Manga Text Eraser",
  description:
    "AI-powered tool to remove text from images and enhance with an anime style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          inter.variable,
          literata.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
