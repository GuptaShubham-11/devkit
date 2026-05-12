"use client";

import { useState } from "react";

import { toastManager } from "@repo/ui";

import { http } from "@/lib/http";

export const useCredit = () => {
  const [loading, setLoading] = useState(false);

  const credit = async () => {
    try {
      setLoading(true);

      const response = await http.post("/payment/credit");
      return response;
    } catch (error: any) {
      const message = error.response.data.error || "Credit failed!";

      toastManager.add({
        title: "Uh oh! Get Credit failed!",
        description: message,
        type: "error",
      });

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    credit,
    loading,
  };
};
