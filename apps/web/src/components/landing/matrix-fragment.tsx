import { motion } from "framer-motion";

import { Brand } from "./brand";

export function MatrixFragment() {
  const blocks = Array.from({ length: 63 });

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="bg-muted grid w-fit cursor-crosshair grid-cols-9 gap-1 rounded-xl border p-3"
    >
      {blocks.map((_, i) => (
        <motion.div
          key={i}
          variants={{
            initial: {
              opacity: 0.7,
              scale: 0.9,
              backgroundColor: "var(--color-muted, #27272a)",
            },
            animate: { opacity: [0.2, 1, 0.4], scale: [0.9, 1.1, 1] },
          }}
          transition={{
            // Creates an elegant diagonal wave cascade effect
            delay: (i % 6) * 0.04 + Math.floor(i / 6) * 0.04,
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
          className="bg-muted size-2 rounded-xs"
        />
      ))}
    </motion.div>
  );
}
