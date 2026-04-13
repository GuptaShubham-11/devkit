"use client";

import { useState } from "react";

import { RequestOtpData } from "@repo/shared";
import { toastManager } from "@repo/ui";

import { http } from "@/lib/http";

export const useRequestOtpEmail = () => {
  const [loading, setLoading] = useState(false);

  const requestOtp = async (data: RequestOtpData) => {
    try {
      setLoading(true);

      const response = await http.patch("/auth/request-otp-email", data);

      toastManager.add({
        title: "Success! Resended verification code",
        description:
          response.data.message ||
          "Please check your email to verify your account.",
        type: "success",
      });

      return response;
    } catch (error: any) {
      const errorMessage =
        error.response.data.error || "Please retry after some time!";
      toastManager.add({
        title: "Uh oh! Resending failed",
        description: errorMessage,
        type: "error",
      });

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    requestOtp,
    loading,
  };
};
