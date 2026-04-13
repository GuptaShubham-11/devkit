"use client";

import { useState } from "react";

import { ResetPasswordData } from "@repo/shared";
import { toastManager } from "@repo/ui";

import { http } from "@/lib/http";

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const reset = async (data: ResetPasswordData) => {
    try {
      setLoading(true);

      const response = await http.put("/auth/reset-password", data);

      toastManager.add({
        title: "Successfully! Reset Password",
        description: "Redirecting to login...",
        type: "success",
      });

      return response;
    } catch (error: any) {
      const message = error.response.data.error || "Forgot password failed.";

      toastManager.add({
        title: "Uh oh! Reset password failed",
        description: message,
        type: "error",
      });

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    reset,
    loading,
  };
};
