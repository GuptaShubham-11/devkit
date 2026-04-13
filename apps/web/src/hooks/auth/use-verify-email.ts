"use client";

import { useState } from "react";

import { VerifyOtpData } from "@repo/shared";
import { toastManager } from "@repo/ui";

import { http } from "@/lib/http";

export const useVerifyEmail = () => {
  const [loading, setLoading] = useState(false);

  const emailVerification = async (data: VerifyOtpData) => {
    try {
      setLoading(true);

      const response = await http.patch("/auth/verify-email", data);

      toastManager.add({
        title: "Success! Your email has been verified",
        description: response.data.message || "Redirecting to login...",
        type: "success",
      });

      return response;
    } catch (error: any) {
      const message = error.response.data.error || "Email verification failed.";

      toastManager.add({
        title: "Uh oh! Verification failed",
        description: message,
        type: "error",
      });

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    emailVerification,
    loading,
  };
};
