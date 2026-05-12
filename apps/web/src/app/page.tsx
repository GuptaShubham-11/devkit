"use client";

import Image from "next/image";

import { Home } from "@/components/landing/home";

export default function HomePage() {
  return (
    <main className="font-inter flex min-h-screen items-center justify-center">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={"/hero-bg-2.png"}
          fill
          priority
          alt=""
          className="h-full w-full object-cover opacity-90 mix-blend-screen"
        />

        <div className="absolute inset-0 bg-black/20" />
      </div>
      <Home />
    </main>
  );
}
