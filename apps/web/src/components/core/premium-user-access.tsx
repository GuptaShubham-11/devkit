"use client";

import { useSession } from "next-auth/react";

export const PremiumUserAccess = ({
  children,
  fallback = null,
  loadingFallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loadingFallback?: React.ReactNode;
}) => {
  const { data, status } = useSession();

  if (status === "loading") return <>{loadingFallback}</>;

  const isPremiumUser = data?.user?.currentPlan === "pro";
  if (!isPremiumUser) return <>{fallback}</>;

  return <>{children}</>;
};
