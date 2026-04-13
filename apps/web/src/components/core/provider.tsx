"use client";

import { SessionProvider } from "next-auth/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AnchoredToastProvider, ToastProvider } from "@repo/ui";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <SessionProvider refetchOnWindowFocus={true}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <AnchoredToastProvider>{children}</AnchoredToastProvider>
        </ToastProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};
