"use client";

import { useEffect, useMemo, useState } from "react";

import { useTheme } from "next-themes";
import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";

import { Button, cn } from "@repo/ui";

import { Container } from "../core/container";
import { MatrixFragment } from "./matrix-fragment";

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

function MatrixField() {
  const blocks = Array.from({ length: 120 });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(circle_at_center,black,transparent)] opacity-25">
      <div className="grid h-full grid-cols-12 gap-1">
        {blocks.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.05, 1, 0.05],
              scaleY: [0.6, 1.4, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 12) * 0.03 + Math.floor(i / 12) * 0.05,
            }}
            className="bg-primary/50 h-2"
          />
        ))}
      </div>
    </div>
  );
}

export function SubHeroAnimation() {
  const { resolvedTheme } = useTheme();

  const visibleProjects = useMemo(() => {
    return projects.filter((project) =>
      resolvedTheme === "dark"
        ? project.mode === "light"
        : project.mode === "dark"
    );
  }, [resolvedTheme]);

  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    if (visibleProjects.length > 0) {
      setActive(visibleProjects[0]);
    }
  }, [visibleProjects]);

  if (!active) return null;

  return (
    <Container className="mt-20">
      <div className="relative mx-auto max-w-6xl">
        {/* <MatrixField /> */}
        <MatrixFragment />

        {/* Preview */}
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="bg-background relative aspect-video overflow-hidden border shadow-[0_40px_120px_-20px_rgba(0,0,0,0.15)]"
        >
          {/* Browser Bar */}
          <div className="flex items-center gap-2 border-b px-4 py-3">
            <div className="size-3 rounded-full bg-red-500" />
            <div className="size-3 rounded-full bg-yellow-500" />
            <div className="size-3 rounded-full bg-green-500" />

            <div className="bg-muted ml-4 flex h-8 flex-1 items-center border px-3 font-mono text-xs">
              {active.href}
            </div>
          </div>

          <div className="relative h-[calc(100%-57px)] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{
                  clipPath: "inset(0 100% 0 0)",
                }}
                animate={{
                  clipPath: "inset(0 0% 0 0)",
                }}
                exit={{
                  clipPath: "inset(0 0 0 100%)",
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0"
              >
                <Image
                  fill
                  priority
                  src={active.image}
                  alt={active.title}
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-4 left-4">
              <h3 className="text-lg font-semibold">{active.title}</h3>
            </div>

            <Button
              variant="outline"
              className="absolute right-4 bottom-4"
              onClick={() =>
                window.open(active.href, "_blank", "noopener,noreferrer")
              }
            >
              Live Preview
            </Button>
          </div>
        </motion.div>

        {/* Pipeline */}
        <div className="pointer-events-none absolute inset-0 -z-99">
          <svg
            viewBox="0 0 900 900"
            className="h-full w-full"
            preserveAspectRatio="none"
          >
            {visibleProjects.map((project, index) => {
              const startX = 220 + index * 250;
              const startY = 760;

              const endX = 600;
              const endY = 360;

              const activePath = active.id === project.id;

              const path = `
                M ${startX} ${startY}
                C ${startX} ${startY - 150},
                ${endX} ${endY + 150},
                ${endX} ${endY}
              `;

              return (
                <g key={project.id}>
                  <motion.path
                    d={path}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={activePath ? 2.5 : 1}
                    opacity={activePath ? 0.8 : 0.08}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                  />

                  {activePath &&
                    [0, 0.4, 0.8].map((delay) => (
                      <circle key={delay} r="4" fill="currentColor">
                        <animateMotion
                          begin={`${delay}s`}
                          dur="1.8s"
                          repeatCount="indefinite"
                          path={path}
                        />
                      </circle>
                    ))}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-2 gap-4">
          {visibleProjects.map((project) => {
            const isActive = active.id === project.id;

            return (
              <motion.button
                key={project.id}
                onClick={() => setActive(project)}
                animate={{
                  y: isActive ? -8 : 0,
                  scale: isActive ? 1.03 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 20,
                }}
                className={cn(
                  "group bg-background relative overflow-hidden border transition-all",
                  isActive ? "border-primary bg-primary/5" : "border-border/50"
                )}
              >
                <div className="relative h-32 overflow-hidden border-b">
                  <Image
                    fill
                    src={project.image}
                    alt={project.title}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-3">
                  <h4
                    className={cn(
                      "text-sm transition-all",
                      isActive && "font-semibold"
                    )}
                  >
                    {project.title}
                  </h4>
                </div>

                {isActive && (
                  <motion.div
                    animate={{
                      opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="border-primary absolute inset-0 border"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
