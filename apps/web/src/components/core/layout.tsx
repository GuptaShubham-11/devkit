"use client";

import { useSession } from "next-auth/react";

import { Header as LandingHeader } from "@/components/landing/header";

import { Footer } from "../landing/footer";
import { Header } from "./header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  if (status === "loading") {
    return null;
  }

  return (
    <>
      {status === "authenticated" ? <Header /> : <LandingHeader />}
      {children}
      {status === "unauthenticated" && <Footer />}
    </>
  );
};
