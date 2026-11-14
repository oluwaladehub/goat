import { profile } from "./content";

export const siteTitle = `${profile.name} | Software Engineer`;
export const siteDescription =
  "Nifemi is a software engineer building Python APIs, Flutter apps, and responsive React websites. Explore selected projects, experience, and CV.";

function getSiteOrigin(): string | undefined {
  const value = process.env.SITE_URL?.trim();
  if (!value) return;

  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password ||
      url.pathname !== "/" || url.search || url.hash) {
    throw new Error("SITE_URL must be an HTTP(S) origin, such as https://your-domain.com.");
  }
  return url.origin;
}

export const siteOrigin = getSiteOrigin();

export const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Software Engineer",
  description: siteDescription,
  ...(siteOrigin && { url: `${siteOrigin}/` }),
  sameAs: [profile.github],
};
