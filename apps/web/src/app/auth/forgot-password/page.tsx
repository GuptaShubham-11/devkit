"use client";

import { useRouter } from "next/navigation";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { BackNavigation } from "@/components/core/back-navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  return (
    <main className="relative flex min-h-screen items-center justify-center">
      <BackNavigation
        handleBack={() => router.back()}
        className="absolute top-4 left-4"
      />
      <ForgotPasswordForm />
    </main>
  );
}
