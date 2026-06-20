"use client";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { ArrowRightToLineIcon } from "lucide-react";

import { Badge, Button } from "@repo/ui";

import { Container } from "../core/container";
import { SubHeroAnimation } from "./sub-hero-animation";
import { WaveBackground } from "./wave-background";

export const Hero = () => {
  const router = useRouter();

  return (
    <Container className="relative flex flex-col items-center justify-center py-12 md:py-32 xl:py-36">
      <WaveBackground />

      <div className="flex w-full flex-col items-center justify-center">
        <Badge variant={"success"} size={"lg"} className="mb-4">
          Launching Soon!
        </Badge>
        <h1 className="text-center text-6xl font-bold tracking-tight text-balance text-shadow-sm md:text-7xl xl:text-8xl">
          Ship Your SaaS in Days,Not Months
        </h1>

        <p className="text-muted-foreground mt-8 w-full max-w-2xl text-center text-sm leading-relaxed font-normal text-balance sm:text-base">
          Stop spending your first 40 hours, We provides the ultimate product
          solution so you can focus on building your features and launching
          fast.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={() => router.push("/auth/register")}
          className="group relative overflow-hidden px-2 text-white transition-all duration-900 hover:pr-6 hover:shadow-[0_0_20px_-10px_rgba(99,102,241,0.65)]"
        >
          <span className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-900 group-hover:opacity-100" />

          <motion.span
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 50,
            }}
            className="absolute inset-0 my-0.5 flex -translate-x-full items-center justify-center bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-900 group-hover:translate-x-[38%] group-hover:opacity-100"
          >
            <ArrowRightToLineIcon className="text-shadow-xs" />
          </motion.span>

          <span className="text-shadow-xs">Get Started</span>
        </Button>

        <Button
          variant="secondary"
          className="font-semibold text-shadow-2xs"
          onClick={() => router.push("/templates")}
        >
          Explore Templates
        </Button>
      </div>

      <SubHeroAnimation />
      {/* <SubHeroAnimation2 /> */}
    </Container>
  );
};
