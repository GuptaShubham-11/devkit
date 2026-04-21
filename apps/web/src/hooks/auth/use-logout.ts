"use client";

import { useState } from "react";

import { signOut } from "next-auth/react";

import { toastManager } from "@repo/ui";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);

  const logoutUser = async () => {
    try {
      setLoading(true);

      const response = await signOut();

      if (!response) {
        toastManager.add({
          title: "Uh oh! logout failed",
          description: "Logout proccess failed!",
          type: "error",
        });

        return null;
      }

      toastManager.add({
        title: "logout successful!",
        description: "Redirecting to home...",
        type: "success",
      });

      return response;
    } catch (error: any) {
      const message = error?.response?.data?.error || "logout failed";

      toastManager.add({
        title: "Uh oh! logout failed",
        description: message,
        type: "error",
      });

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    logoutUser,
    loading,
  };
};
