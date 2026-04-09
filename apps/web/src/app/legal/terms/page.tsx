"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { Button } from "@repo/ui";

import { Point } from "@/components/core/point";

const Points = [
  {
    title: "1. Use of Service",
    content:
      "You agree to use Devkit only for lawful purposes. You must not misuse the service, attempt to gain unauthorized access, or interfere with its normal operation.",
  },
  {
    title: "2. Account Responsibility",
    content:
      "You are responsible for maintaining the confidentiality of your account credentials. Any activity under your account is your responsibility.",
  },
  {
    title: "3. Intellectual Property",
    content:
      "All content, branding, and code provided by Devkit remain our intellectual property. You may not copy, distribute, or reuse without permission.",
  },
  {
    title: "4. Termination",
    content:
      "We reserve the right to suspend or terminate your account if you violate these terms or misuse the platform.",
  },
  {
    title: "5. Disclaimer",
    content:
      "Devkit is provided “as is” without warranties of any kind. We do not guarantee uninterrupted or error-free service.",
  },
  {
    title: "6. Limitation of Liability",
    content:
      "We are not liable for any indirect or consequential damages arising from the use of our service.",
  },
  {
    title: "7. Changes to Terms",
    content:
      "We may update these terms from time to time. Continued use of the service means you accept the updated terms.",
  },
];

export default function TermsPage() {
  const router = useRouter();
  return (
    <main className="text-text-secondary font-inter mx-auto mt-8 mb-12 max-w-3xl px-4 text-sm leading-6">
      <Button
        variant="secondary"
        onClick={() => router.push("/")}
        className="mb-6"
        size={"lg"}
      >
        <ArrowLeft />
        Home
      </Button>

      <h1 className="text-text-primary mb-2 text-2xl font-semibold">
        Terms of Service
      </h1>
      <p className="text-text-muted mb-6 text-sm">
        Last updated: March 21, 2026
      </p>

      <section className="space-y-6">
        <p className="text-lg">
          Welcome to Devkit! By accessing or using our services, you agree to be
          bound by these Terms of Service.{" "}
          <span className="bg-accent-warning text-bg-primary">
            If you do not agree, please do not use our platform.
          </span>
        </p>

        {Points.map((item) => (
          <Point key={item.title} title={item.title}>
            {item.content}
          </Point>
        ))}

        <Point title="8. Payments and Billing">
          Certain features of Devkit may require payment. By subscribing to a
          paid plan, you agree to our{" "}
          <Link
            href="/legal/payment-policy"
            className="text-accent-primary hover:underline"
          >
            Payment & Billing Policy
          </Link>
          , which outlines pricing, billing cycles, refunds, and cancellations.
        </Point>

        <Point title="9. Contact">
          For questions regarding these Terms, contact us at{" "}
          <span className="text-text-primary">support@devkit.com</span>.
        </Point>
      </section>
    </main>
  );
}
