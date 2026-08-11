import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eigenia.com"),
  title: {
    default: "Eigenia B.V. — Applied Complexity Science Think Tank & Labs",
    template: "%s | Eigenia B.V.",
  },
  description:
    "Eigenia B.V. and Eigenia Labs conduct open research into non-linear dynamics, cyber-physical digital twins, catastrophe copula modeling, and plant safety for energy grids, water infrastructure, and agricultural networks.",
  keywords: [
    "Eigenia B.V.",
    "Eigenia Labs",
    "Dutch Think Tank",
    "Complexity Science",
    "Cyber Digital Twin",
    "DEXPI 2.0",
    "CycloneDX 4-BOM",
    "Clayton Copula",
    "OT Cybersecurity",
    "Plant Safety",
    "Clean Water",
    "Sustainable Energy",
  ],
  authors: [{ name: "J. McKenney", url: "https://eigenia.com" }],
  creator: "Eigenia B.V.",
  publisher: "Eigenia Labs",
  openGraph: {
    title: "Eigenia B.V. — Applied Complexity Science & Labs",
    description:
      "Securing clean water, healthy food, and sustainable energy through open scientific research and physical digital twins.",
    url: "https://eigenia.com",
    siteName: "Eigenia B.V.",
    locale: "en_EU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eigenia B.V. — Applied Complexity Science & Labs",
    description:
      "Securing clean water, healthy food, and sustainable energy through open scientific research.",
    creator: "@eigenia_bv",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Eigenia B.V.",
    alternateName: "Eigenia Labs",
    url: "https://eigenia.com",
    logo: "https://eigenia.com/assets/logo_square_dark.svg",
    contactPoint: {
      "@type": "ContactPoint",
      email: "jim@eigenia.nl",
      contactType: "Research & Executive Intake",
      areaServed: "EU & Worldwide",
      availableLanguage: ["English", "Dutch"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amsterdam",
      addressCountry: "NL",
    },
    sameAs: [
      "https://github.com/Planet9V/eigenia",
      "https://www.linkedin.com/company/eigenia-b-v",
      "https://x.com/eigenia_bv",
    ],
  };

  return (
    <html lang="en" className={`dark scroll-smooth ${playfair.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <link rel="icon" href="/assets/logo_square_dark.svg" type="image/svg+xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var saved = localStorage.getItem('eigenia_theme');
                var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
                if (saved === 'light' || (!saved && prefersLight)) {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.remove('light');
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            })();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased selection:bg-dutchOrange selection:text-white transition-colors duration-300">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
