import { MouseEvent } from "react";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTransform } from "framer-motion";

export function WaveBackground() {
  // Ultra-smooth physics spring configurations for premium mouse tracking
  const mouseX = useSpring(useMotionValue(0), { stiffness: 40, damping: 20 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 40, damping: 20 });

  // Tracks cursor offsets to add subtle micro-parallax movement to the waves canvas
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX / width - 0.5) * 45); // Max 45px horizontal shift
    mouseY.set((clientY / height - 0.5) * 25); // Max 25px vertical shift
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="pointer-events-none absolute inset-0 -z-20 overflow-hidden mask-[radial-gradient(ellipse_75%_60%_at_50%_35%,#000_40%,transparent_100%)] opacity-90 transition-opacity duration-700 select-none dark:opacity-90"
    >
      <motion.svg
        style={{ x: mouseX, y: mouseY }}
        className="absolute -top-12 left-1/2 h-[600px] w-[1300px] -translate-x-1/2"
        viewBox="0 0 1400 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Compressed opacity profiles to give a cleaner dark-mode look */}
          <linearGradient
            id="premium-emerald"
            x1="0"
            y1="0"
            x2="1400"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="5%" stopColor="#10b981" stopOpacity="0.0" />
            <stop offset="45%" stopColor="#34d399" stopOpacity="0.35" />
            <stop offset="85%" stopColor="#059669" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient
            id="premium-indigo"
            x1="0"
            y1="0"
            x2="1400"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient
            id="premium-purple"
            x1="0"
            y1="0"
            x2="1400"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="15%" stopColor="#a855f7" stopOpacity="0.0" />
            <stop offset="55%" stopColor="#e879f9" stopOpacity="0.3" />
            <stop offset="95%" stopColor="#6366f1" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient
            id="premium-blue"
            x1="0"
            y1="0"
            x2="1400"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.0" />
            <stop offset="40%" stopColor="#22d3ee" stopOpacity="0.35" />
            <stop offset="90%" stopColor="#9333ea" stopOpacity="0.07" />
          </linearGradient>
        </defs>

        {/* Wave Line 1: Fluid Emerald Base */}
        <motion.path
          d="M-50,150 Q300,50 700,200 T1450,100"
          stroke="url(#premium-emerald)"
          strokeWidth="1.75"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 1,
            d: [
              "M-50,150 Q300,50 700,200 T1450,100",
              "M-50,175 Q320,35 680,215 T1450,115",
              "M-50,150 Q300,50 700,200 T1450,100",
            ],
          }}
          transition={{
            pathLength: { duration: 2.5, ease: "easeOut" },
            opacity: { duration: 1.5 },
            d: { duration: 18, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Wave Line 2: Fine Technical Tracer (Perfect Parallel Control Offset) */}
        <motion.path
          d="M-50,220 Q320,110 720,270 T1450,170"
          stroke="url(#premium-purple)"
          strokeWidth="1"
          strokeDasharray="4 8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 0.8,
            d: [
              "M-50,220 Q320,110 720,270 T1450,170",
              "M-50,200 Q340,95 700,250 T1450,155",
              "M-50,220 Q320,110 720,270 T1450,170",
            ],
          }}
          transition={{
            pathLength: { duration: 2.8, delay: 0.2, ease: "easeOut" },
            opacity: { duration: 1.5, delay: 0.2 },
            d: { duration: 22, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Wave Line 3: Deep Anchor Center Path */}
        <motion.path
          d="M-50,300 Q350,170 760,350 T1450,250"
          stroke="url(#premium-indigo)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 1,
            d: [
              "M-50,300 Q350,170 760,350 T1450,250",
              "M-50,315 Q330,185 780,330 T1450,265",
              "M-50,300 Q350,170 760,350 T1450,250",
            ],
          }}
          transition={{
            pathLength: { duration: 2.2, delay: 0.1, ease: "easeOut" },
            opacity: { duration: 1.5, delay: 0.1 },
            d: { duration: 20, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Wave Line 4: Premium Dash-Dot Micro Tracer */}
        <motion.path
          d="M-50,380 Q380,240 800,430 T1450,330"
          stroke="url(#premium-blue)"
          strokeWidth="1"
          strokeDasharray="12 6 2 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 0.9,
            d: [
              "M-50,380 Q380,240 800,430 T1450,330",
              "M-50,360 Q400,220 780,410 T1450,315",
              "M-50,380 Q380,240 800,430 T1450,330",
            ],
          }}
          transition={{
            pathLength: { duration: 3.2, delay: 0.4, ease: "easeOut" },
            opacity: { duration: 1.5, delay: 0.4 },
            d: { duration: 26, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Wave Line 5: Horizon Baseline */}
        <motion.path
          d="M-50,460 Q420,310 850,510 T1450,410"
          stroke="url(#premium-purple)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 1,
            d: [
              "M-50,460 Q420,310 850,510 T1450,410",
              "M-50,480 Q400,325 870,490 T1450,425",
              "M-50,460 Q420,310 850,510 T1450,410",
            ],
          }}
          transition={{
            pathLength: { duration: 2.6, delay: 0.3, ease: "easeOut" },
            opacity: { duration: 1.5, delay: 0.3 },
            d: { duration: 24, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </motion.svg>
    </div>
  );
}

export function KineticDial() {
  const x = useMotionValue(100);
  const y = useMotionValue(50);

  const rotateX = useTransform(y, [0, 100], [15, -15]);
  const rotateY = useTransform(x, [0, 200], [-15, 15]);

  return (
    <div
      className="flex items-center justify-center p-4 perspective-[800px]"
      onMouseMove={(e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - bounds.left);
        y.set(e.clientY - bounds.top);
      }}
      onMouseLeave={() => {
        x.set(100);
        y.set(50);
      }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="from-muted/50 to-muted/10 group relative flex h-24 w-48 cursor-crosshair flex-col justify-between overflow-hidden rounded-xl border bg-gradient-to-br p-4"
      >
        <div className="text-muted-foreground/60 font-mono text-[10px] tracking-widest uppercase">
          system_node_01
        </div>
        <div className="bg-muted h-1 w-full overflow-hidden rounded-full">
          <motion.div
            className="bg-primary h-full"
            animate={{ width: ["20%", "85%", "60%", "75%", "20%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>
        {/* Specular Ambient Glow Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-radial from-white/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </motion.div>
    </div>
  );
}
