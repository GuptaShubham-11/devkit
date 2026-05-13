"use client";

import { useState } from "react";

// import { toastManager } from "@repo/ui";

import { http } from "@/lib/http";

export const useStatus = () => {
  const [loading, setLoading] = useState(false);

  const status = async (paymentId: string) => {
    try {
      setLoading(true);

      const response = await http.get(`/payment/status/${paymentId}`);
      return response;
    } catch (error: any) {
      // const message = error.response.data.error || "status failed!";

      // toastManager.add({
      //     title: "Uh oh! Get status failed!",
      //     description: message,
      //     type: "error",
      // });

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    status,
    loading,
  };
};
