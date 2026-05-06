"use client";

import { useSession } from "next-auth/react";

import { clientEnv } from "@/lib/client-env";

export const AdminAccess = ({
  children,
  fallback = null,
  loadingFallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loadingFallback?: React.ReactNode;
}) => {
  const { data, status } = useSession();

  if (status === "loading") {
    return <>{loadingFallback}</>;
  }

  const userRole = data?.user?.isRole;
  const adminRole = clientEnv.ROLE!;

  if (!userRole || userRole !== adminRole) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
