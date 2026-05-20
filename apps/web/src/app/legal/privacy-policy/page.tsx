"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { Button, cn } from "@repo/ui";

import { Point } from "@/components/core/point";

const sections = [
  {
    title: "1. Information We Collect",
    content:
      "We collect basic account information such as your email, username, and authentication data. We may also collect usage data to improve our services.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "Your information is used to provide, maintain, and improve our services, communicate with you, and ensure platform security.",
  },
  {
    title: "3. Data Security",
    content:
      "We implement industry-standard measures to protect your data. However, no method of transmission over the internet is 100% secure.",
  },
  {
    title: "4. Sharing of Information",
    content:
      "We do not sell your personal data. We may share information with trusted services necessary to operate our platform (e.g., authentication providers).",
  },
  {
    title: "5. Cookies",
    content:
      "We use cookies and similar technologies to enhance user experience and analyze usage patterns.",
  },
  {
    title: "6. Your Rights",
    content:
      "You may request access, correction, or deletion of your personal data at any time by contacting us.",
  },
  {
    title: "7. Changes to This Policy",
    content:
      "We may update this policy periodically. Continued use of the service indicates acceptance of the updated policy.",
  },
];

export default function PrivacyPage() {
  const router = useRouter();
  const { status } = useSession();
  return (
    <main
      className={cn(
        "text-text-secondary font-inter mx-auto mt-8 mb-12 max-w-3xl px-4 text-sm leading-6",
        status === "authenticated" && "mt-24"
      )}
    >
      <Button
        variant="secondary"
        onClick={() => router.push("/")}
        className="mb-6"
        size={"lg"}
      >
        <ArrowLeft />
        Back
      </Button>

      <h1 className="text-text-primary mb-2 text-2xl font-semibold">
        Privacy Policy
      </h1>
      <p className="text-text-muted mb-6 text-sm">
        Last updated: March 21, 2026
      </p>

      <section className="space-y-6">
        <p className="text-lg">
          <span className="bg-accent-success text-bg-primary">
            Your privacy is important to us.
          </span>{" "}
          This Privacy Policy explains how Devkit collects, uses, and protects
          your information.
        </p>

        {sections.map((item) => (
          <Point key={item.title} title={item.title}>
            {item.content}
          </Point>
        ))}

        <Point title="8. Contact Us">
          For privacy-related inquiries, contact us at{" "}
          <span className="text-text-primary">privacy@developerkit.pro</span>.
        </Point>
      </section>
    </main>
  );
}
