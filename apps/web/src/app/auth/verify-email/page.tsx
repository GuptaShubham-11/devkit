"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { emailPattern } from "@repo/shared";

import { EmailInvalid } from "@/components/auth/email-invalid";
import { EmailVerification } from "@/components/auth/email-verification";
import { BackNavigation } from "@/components/core/back-navigation";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");
  if (!email)
    return (
      <main className="flex min-h-screen items-center justify-center">
        <EmailInvalid />
      </main>
    );

  const validEmail = emailPattern.test(email);
  if (!validEmail)
    return (
      <main className="flex min-h-screen items-center justify-center">
        <EmailInvalid />
      </main>
    );

  return (
    <main className="relative flex min-h-screen items-center justify-center">
      <BackNavigation
        handleBack={() => router.back()}
        className="absolute top-4 left-4"
      />

      <EmailVerification email={email} />
    </main>
  );
}
