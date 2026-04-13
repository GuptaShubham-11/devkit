"use client";

import { useRouter } from "next/navigation";

import { RegisterForm } from "@/components/auth/register-form";
import { BackNavigation } from "@/components/core/back-navigation";

export default function RegisterPage() {
  const router = useRouter();
  return (
    <main className="relative flex min-h-screen items-center justify-center">
      <BackNavigation
        handleBack={() => router.back()}
        className="absolute top-4 left-4"
      />

      <RegisterForm />
    </main>
  );
}
