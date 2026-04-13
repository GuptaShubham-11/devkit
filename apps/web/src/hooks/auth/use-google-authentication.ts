"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";

export const useGoogleAuthentication = () => {
  const [loading, setLoading] = useState(false);

  const googleAuthentication = async () => {
    try {
      setLoading(true);

      await signIn("google", {
        callbackUrl: "/dashboard",
      });
    } catch {
      // console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    googleAuthentication,
    loading,
  };
};
