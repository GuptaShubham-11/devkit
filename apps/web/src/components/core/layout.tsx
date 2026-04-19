"use client";

import { useSession } from "next-auth/react";

import { Header } from "./header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  if (status === "loading") {
    return null;
  }

  return (
    <>
      {status === "authenticated" && <Header />}
      {children}
    </>
  );
};
