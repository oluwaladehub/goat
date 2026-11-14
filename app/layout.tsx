import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/archivo";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "lenis/dist/lenis.css";
import "./globals.css";
import { profile } from "./content";
import { siteDescription, siteOrigin, siteTitle } from "./seo";

const socialImage = {
  url: "/social-preview.jpg",
  width: 1200,
  height: 630,
  alt: "Nifemi, software engineer. Portfolio preview with the black mountain goat from the homepage.",
};

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  ...(siteOrigin && {
    metadataBase: new URL(siteOrigin),
    alternates: { canonical: "/" },
  }),
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: profile.name,
    title: siteTitle,
    description: siteDescription,
    ...(siteOrigin && { url: "/", images: [socialImage] }),
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    ...(siteOrigin && { images: [{ url: socialImage.url, alt: socialImage.alt }] }),
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
