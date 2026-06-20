"use client";

import { useSession } from "next-auth/react";

import { Home } from "@/components/landing/home";

export default function HomePage() {
  const { status } = useSession();
  return (
    <main className="font-inter flex min-h-screen flex-col items-center justify-center">
      <Home />
    </main>
  );
}
