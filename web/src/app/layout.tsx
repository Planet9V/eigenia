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
  title: "Eigenia B.V. — Applied Complexity Science Think Tank & Labs",
  description:
    "Eigenia B.V. and Eigenia Labs conduct open research into nonlinear dynamics, digital twin models, and physical plant safety to protect energy grids, water systems, and agricultural networks.",
  keywords: [
    "Eigenia B.V.",
    "Eigenia Labs",
    "Dutch Think Tank",
    "Complexity Science",
    "Digital Twin",
    "Plant Safety",
    "Clean Water",
    "Sustainable Energy",
  ],
  authors: [{ name: "Eigenia B.V. Board" }],
  openGraph: {
    title: "Eigenia B.V. — Applied Complexity Science & Labs",
    description:
      "Securing clean water, healthy food, and sustainable energy through open scientific research.",
    url: "https://eigenia.com",
    siteName: "Eigenia B.V.",
    locale: "en_EU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark scroll-smooth ${playfair.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <link rel="icon" href="/assets/logo_square_dark.svg" type="image/svg+xml" />
      </head>
      <body className="font-sans antialiased selection:bg-dutchOrange selection:text-white transition-colors duration-300">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
