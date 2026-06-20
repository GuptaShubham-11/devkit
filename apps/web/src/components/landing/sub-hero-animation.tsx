"use client";

import { useEffect, useMemo, useState } from "react";

import { useTheme } from "next-themes";
import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";

import { Button, cn } from "@repo/ui";

import { Container } from "../core/container";

type Project = {
  id: string;
  title: string;
  image: string;
  href: string;
  mode: "light" | "dark";
};

const projects: Project[] = [
  {
    id: "saas",
    title: "Next.js SaaS Starter",
    image: "/nextjs-saas-starter.png",
    href: "https://nextjs-saas-starter-delta.vercel.app",
    mode: "dark",
  },
  {
    id: "saas-dark",
    title: "Next.js SaaS Starter",
    image: "/nextjs-saas-starter-dark.png",
    href: "https://nextjs-saas-starter-delta.vercel.app",
    mode: "light",
  },
  {
    id: "portfolio",
    title: "Minimal Portfolio",
    image: "/minimal-portfolio.png",
    href: "https://minimal-portfolio-orpin.vercel.app",
    mode: "dark",
  },
  {
    id: "portfolio-dark",
    title: "Minimal Portfolio",
    image: "/minimal-portfolio-dark.png",
    href: "https://minimal-portfolio-orpin.vercel.app",
    mode: "light",
  },
];

export function SubHeroAnimation() {
  const { resolvedTheme } = useTheme();

  const visibleProjects = useMemo(() => {
    return projects.filter((project) =>
      resolvedTheme === "light"
        ? project.mode === "light"
        : project.mode === "dark"
    );
  }, [resolvedTheme]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [resolvedTheme]);

  useEffect(() => {
    if (visibleProjects.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % visibleProjects.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [visibleProjects]);

  const active = visibleProjects[activeIndex];

  if (!active) return null;

  return (
    <Container className="mt-12 max-w-4xl">
      <div className="relative mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{
              x: 120,
              opacity: 0,
              rotate: 1.5,
              scale: 1.03,
            }}
            animate={{
              x: 0,
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            exit={{
              x: -120,
              opacity: 0,
              rotate: -1.5,
              scale: 0.97,
            }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="bg-background relative overflow-hidden border shadow-lg"
          >
            <motion.div
              animate={{
                scale: 1,
              }}
              transition={{
                duration: 1.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative aspect-video"
            >
              <Button
                variant={"link"}
                onClick={() => window.open(active.href, "_blank")}
                className="absolute right-4 bottom-4 z-10 text-white dark:text-black"
              >
                Live Preview
              </Button>

              <Image
                fill
                priority
                src={active.image}
                alt={active.title}
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          key={`${active.id}-meta`}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <div className="flex gap-2">
            {visibleProjects.map((_, index) => (
              <Button
                key={index}
                size={"lg"}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "rounded-xs",
                  activeIndex === index
                    ? "bg-foreground hover:bg-foreground/80 border-foreground text-background"
                    : "border-border bg-background text-foreground hover:bg-background"
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </Button>
            ))}
          </div>

          <h3 className="text-center text-2xl font-medium">{active.title}</h3>
        </motion.div>

        <div className="bg-border mx-auto mt-4 h-px max-w-sm">
          <motion.div
            animate={{
              width: `${(
                ((activeIndex + 1) / visibleProjects.length) *
                100
              ).toFixed(2)}%`,
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="bg-foreground h-full"
          />
        </div>
      </div>
    </Container>
  );
}
