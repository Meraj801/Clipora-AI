import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clipora AI",
  description: "AI-powered video editor and generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
