"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";

import { LoginData } from "@repo/shared";
import { toastManager } from "@repo/ui";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const loginUser = async (data: LoginData) => {
    try {
      setLoading(true);

      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!response?.ok) {
        toastManager.add({
          title: "Uh oh! Login failed",
          description: "Invalid email or password.",
          type: "error",
        });

        return null;
      }

      toastManager.add({
        title: "Login successful!",
        description: "Redirecting to dashboard...",
        type: "success",
      });

      return response;
    } catch (error: any) {
      const message = error?.response?.data?.error || "Login failed";

      toastManager.add({
        title: "Uh oh! Login failed",
        description: message,
        type: "error",
      });

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loginUser,
    loading,
  };
};
