"use client";

import { useState } from "react";

import { RegisterData } from "@repo/shared";
import { toastManager } from "@repo/ui";

import { http } from "@/lib/http";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);

      const response = await http.post("/auth/register", data);

      toastManager.add({
        title: "Success! Verify your email",
        description:
          response.data.message ||
          "Please check your email to verify your account.",
        type: "success",
      });

      return response;
    } catch (error: any) {
      const message = error.response.data.error || "Registration failed!";

      toastManager.add({
        title: "Uh oh! Registration failed!",
        description: message,
        type: "error",
      });

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
  };
};
