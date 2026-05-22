"use client";

import { useSession } from "next-auth/react";

import { clientEnv } from "@/lib/client-env";
import { useUser } from "@/store/user";

export const AdminAccess = ({
  children,
  fallback = null,
  loadingFallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loadingFallback?: React.ReactNode;
}) => {
  const { status } = useSession();
  const user = useUser();

  if (status === "loading") {
    return <>{loadingFallback}</>;
  }

  const userRole = user?.isRole;
  const adminRole = clientEnv.ROLE! || "sUpErAdMiN";

  if (!userRole || userRole !== adminRole) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
