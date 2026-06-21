import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";

import { cn } from "@repo/ui";

import { Layout } from "@/components/core/layout";
import { Provider } from "@/components/core/provider";

import "./globals.css";

const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

const interHeading = Inter({ subsets: ["latin"], variable: "--font-heading" });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Devkit | Production Grade Templates",
    template: "%s | Devkit", // Allows sub-pages to clean append (e.g., "Pricing | Devkit")
  },
  description:
    "Accelerate your product launch with Devkit. Highly optimized, production-grade templates and boilerplates designed for modern, scalable web development.",
  keywords: [
    "Devkit",
    "Next.js templates",
    "developer kit pro",
    "production-grade boilerplates",
    "SaaS boilerplates",
    "website templates",
  ],
  authors: [{ name: "Devkit Team", url: "https://www.developerkit.pro" }],
  creator: "Devkit Team",
  publisher: "Devkit",

  // 2. Search Engine Indexing Controls
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // 3. Canonical URLs (Eliminates duplicate content penalties)
  alternates: {
    canonical: "https://www.developerkit.pro",
  },

  // 4. Open Graph Meta Tags (For WhatsApp, Discord, LinkedIn, Facebook sharing)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.developerkit.pro",
    title: "Devkit | Production Grade Templates",
    description:
      "Accelerate your product launch with Devkit. Highly optimized, production-grade templates and boilerplates.",
    siteName: "Devkit",
    images: [
      {
        url: "https://www.developerkit.pro/devkit-official.png",
        width: 800,
        height: 600,
        alt: "Devkit",
      },
    ],
  },

  // 5. Twitter Card Meta Tags (For X / Twitter visual optimization)
  twitter: {
    card: "summary_large_image",
    title: "Devkit | Production Grade Templates",
    description:
      "Accelerate your product launch with Devkit. Highly optimized, production-grade templates and boilerplates.",
    images: ["https://www.developerkit.pro/devkit-official.png"],
  },

  // 6. Device App and Browser Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "font-inter h-full scroll-smooth",
        "antialiased",
        inter.variable,
        interHeading.variable,
        geistMono.variable
      )}
    >
      <body>
        <Provider>
          <Layout>{children}</Layout>
        </Provider>
      </body>
    </html>
  );
}
