"use client";

import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { Button } from "@repo/ui";

import { Point } from "@/components/core/point";

const sections = [
  {
    title: "1. Subscription Plans",
    content:
      "Devkit offers paid features through subscription plans. Pricing, features, and billing cycles are clearly displayed before purchase.",
  },
  {
    title: "2. Billing Cycle",
    content:
      "Subscriptions are billed on a recurring basis (monthly or yearly). You will be charged at the start of each billing period.",
  },
  {
    title: "3. Payment Methods",
    content:
      "Payments are processed securely through third-party providers. We do not store your card details on our servers.",
  },
  {
    title: "4. Auto-Renewal",
    content:
      "Your subscription will automatically renew unless canceled before the next billing cycle.",
  },
  {
    title: "5. Cancellation",
    content:
      "You may cancel your subscription at any time from your account settings. Cancellation will take effect at the end of the current billing cycle.",
  },
  {
    title: "6. Refund Policy",
    content:
      "Payments are generally non-refundable. However, refunds may be provided in exceptional cases at our discretion.",
  },
  {
    title: "7. Failed Payments",
    content:
      "If a payment fails, we may retry billing. Continued failure may result in suspension of paid features.",
  },
  {
    title: "8. Changes to Pricing",
    content:
      "We reserve the right to update pricing. Any changes will be communicated in advance and will apply to future billing cycles.",
  },
];

export default function PaymentPolicyPage() {
  const router = useRouter();

  return (
    <main className="text-text-secondary font-inter mx-auto mt-12 mb-12 max-w-3xl px-4 text-sm leading-6">
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
        Payment & Billing Policy
      </h1>
      <p className="text-text-muted mb-6 text-sm">
        Last updated: March 21, 2026
      </p>

      <section className="space-y-6">
        <p className="text-lg">
          <span className="bg-accent-primary text-bg-primary">
            This Payment Policy outlines how billing
          </span>
          , subscriptions, and payments are handled on Devkit.
        </p>

        {sections.map((item) => (
          <Point key={item.title} title={item.title}>
            {item.content}
          </Point>
        ))}

        <Point title="9. Contact">
          For billing-related inquiries, contact us at{" "}
          <span className="text-text-primary">billing@devkit.com</span>.
        </Point>
      </section>
    </main>
  );
}
