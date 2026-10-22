import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Providers } from "@/components/providers";
import { profile } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

const title = `${profile.name} | AI Engineer, GenAI & Full Stack`;
const description =
  "SWE-I at Gemini Solutions building multi-agent GenAI platforms (LangGraph, AWS Bedrock, FastAPI) and full-stack products. Previously Syncloop.ai, PGIMER and the Indian Air Force. B.Tech CSE, Punjab Engineering College.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: profile.site }],
  creator: profile.name,
  keywords: [
    "Manav Rai",
    "AI Engineer",
    "Software Engineer",
    "SDE",
    "GenAI Engineer",
    "LangGraph",
    "AWS Bedrock",
    "FastAPI",
    "Spring Boot",
    "Next.js",
    "Flutter",
    "Multi-agent systems",
    "Full Stack Developer",
    "Chandigarh",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: `${profile.name} Portfolio`,
    title,
    description,
    locale: "en_IN",
    firstName: "Manav",
    lastName: "Rai",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07080a" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.site,
  image: `${profile.site}/images/manav.png`,
  email: `mailto:${profile.email}`,
  jobTitle: "Software Engineer (SWE-I)",
  worksFor: { "@type": "Organization", name: profile.company, url: "https://www.geminisolutions.com/" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Punjab Engineering College, Chandigarh" },
  address: { "@type": "PostalAddress", addressLocality: "Chandigarh", addressCountry: "IN" },
  knowsAbout: ["Generative AI", "Multi-agent systems", "LangGraph", "AWS Bedrock", "FastAPI", "Spring Boot", "Next.js", "Flutter"],
  sameAs: [profile.socials.linkedin, profile.socials.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="min-h-dvh overflow-x-clip">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
