"use client";

import { usePathname } from "next/navigation";

export const useActivePath = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return {
    isActive,
  };
};
