"use client";

import { useSession } from "next-auth/react";

import { useUser } from "@/store/user";

export const PremiumUserAccess = ({
  children,
  fallback = null,
  loadingFallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loadingFallback?: React.ReactNode;
}) => {
  const user = useUser();
  const { status } = useSession();

  if (status === "loading") return <>{loadingFallback}</>;

  const isPremiumUser = user?.currentPlan === "pro";
  if (!isPremiumUser) return <>{fallback}</>;

  return <>{children}</>;
};
