"use client";

import React from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { ArrowRightToLineIcon } from "lucide-react";

import { Button, cn } from "@repo/ui";

import { Terminal } from "./terminal";

export const Hero = () => {
  const router = useRouter();
  const { status } = useSession();

  return (
    <section
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden px-4 pt-14 pb-14 sm:pt-20 sm:pb-20",
        status === "authenticated" && "sm:pt-30"
      )}
    >
      {/* content */}
      <motion.div
        initial={{
          opacity: 0,
          y: 18,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.1,
          duration: 0.6,
        }}
        className="mt-8 max-w-5xl text-center sm:mt-12"
      >
        <h2 className="text-text-primary text-4xl leading-[0.95] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
          Build your
          <span
            className={cn(
              `border-accent-primary relative mx-2 inline-block -rotate-2 border-b-4 px-2 sm:mx-3`
            )}
          >
            SaaS
            <span className="bg-brand-primary/30 absolute inset-x-0 bottom-1 -z-10 h-3 rounded-full blur-xl" />
          </span>
          faster with production ready blocks
        </h2>

        <motion.p
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.6,
          }}
          className="text-text-secondary mx-auto mt-5 max-w-3xl text-sm leading-7 text-balance sm:text-base"
        >
          Launch products faster using battle-tested modules, complete repo
          templates, reusable architecture, and scalable production code.
        </motion.p>
      </motion.div>

      {/* actions */}
      <motion.div
        initial={{
          opacity: 0,
          y: 18,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
          duration: 0.6,
        }}
        className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
      >
        <Button
          variant="outline"
          size="lg"
          onClick={() => router.push("/auth/register")}
          className="text-text-secondary hover:text-text-primary w-full rounded-xl text-base backdrop-blur-xl transition-all duration-300 sm:w-auto"
        >
          Create Account
        </Button>

        <Button
          size="lg"
          onClick={() => router.push("/templates")}
          className="group border-brand-primary/40 bg-brand-primary text-text-primary hover:border-brand-primary hover:bg-brand-primary-600 relative w-full overflow-hidden rounded-xl border py-1 transition-all duration-700 hover:pr-8 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.65)] active:scale-[0.98] sm:w-auto"
        >
          <span className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          <motion.span
            initial={false}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="relative text-lg font-medium tracking-tight transition-all duration-500 group-hover:pr-2 group-hover:font-semibold"
          >
            <motion.span
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 18,
              }}
              className="absolute inset-0 flex -translate-x-full items-center justify-center bg-linear-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-[55%] group-hover:opacity-100"
            >
              <ArrowRightToLineIcon className="size-4" />
            </motion.span>

            <span className="relative">Explore Templates</span>
          </motion.span>
        </Button>
      </motion.div>

      {/* terminal */}
      <div className="mt-14 w-full">
        <Terminal />
      </div>
    </section>
  );
};
