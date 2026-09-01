import type { Metadata } from "next";
import "./globals.css";
import siteData from "@/../data/site.json";

export const metadata: Metadata = {
  title: siteData.metaTitle,
  description: siteData.metaDescription,
  keywords: "India travel, Himachal Pradesh holidays, private journeys, local guides",
  authors: [{ name: "India Escapes" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.indiaescapes.in",
    title: siteData.metaTitle,
    description: siteData.metaDescription,
    siteName: siteData.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteData.metaTitle,
    description: siteData.metaDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
