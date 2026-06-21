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
  metadataBase: new URL("https://www.developerkit.pro"),
  title: {
    default: "Devkit | Production Grade Templates",
    template: "%s | Devkit",
  },
  description:
    "Accelerate your product launch with Devkit. Production-grade Next.js templates, SaaS starters, authentication, payments, emails, databases, and reusable building blocks for modern web applications.",
  applicationName: "Devkit",
  category: "Developer Tools",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Devkit",
    "Developer Kit",
    "Next.js Starter",
    "Next.js SaaS Starter",
    "SaaS Boilerplate",
    "Next.js Templates",
    "Production Grade Templates",
    "Developer Tools",
    "Authentication Template",
    "TypeScript Boilerplate",
    "React Templates",
    "Launch SaaS Fast",
    "Startup Boilerplate",
    "Full Stack Template",
    "Modern Web Development",
  ],

  authors: [
    {
      name: "Devkit Team",
      url: "https://www.developerkit.pro",
    },
  ],

  creator: "Devkit Team",
  publisher: "Devkit",
  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,

    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Devkit",
    title: "Devkit | Production Grade Templates",
    description:
      "Launch your next product faster with production-grade templates, authentication, payments, emails, and scalable architecture built for modern SaaS applications.",
    images: [
      { url: "/devkit-official.png", width: 1200, height: 630, alt: "Devkit" },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Devkit | Production Grade Templates",
    description:
      "Launch your SaaS faster with production-ready templates, authentication, payments, and scalable architecture.",
    creator: "@developerkitpro",
    images: ["/devkit-official.png"],
  },

  icons: {
    icon: [{ url: "/favicon.ico" }],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png" }],
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
