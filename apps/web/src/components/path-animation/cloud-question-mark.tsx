"use client";

import { motion } from "framer-motion";

export function CloudQuestionMark() {
  return (
    <motion.svg
      viewBox="-15 -8 60 70"
      className="text-accent-primary h-100 w-100 opacity-50"
    >
      <motion.path
        d="M-5 8
                C-7 -3, 7 -4, 10 3
                C10 -4, 22 -6, 21 5
                C24 -4, 35 -1, 32 9
                C38 3, 45 17, 35 20
                C45 22, 39 35, 31 32
                C39 35, 32 48, 15 39
                C13 48, 18 59, 18 54
                C23 66, 11 57, 18 54"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </motion.svg>
  );
}
