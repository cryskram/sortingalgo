import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const silkscreen = localFont({ src: "/fonts/silkscreen.ttf" });

export const metadata: Metadata = {
  title: "ASV - Algorithm Sorting Visualizer",
  description: "Visual display of sorting algorithms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${silkscreen.className} bg-background text-textColor`}>
        {children}
      </body>
    </html>
  );
}
