"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import {
  ArrowRightToLineIcon,
  BadgeQuestionMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  FingerprintIcon,
  HomeIcon,
  Layers2Icon,
  LogInIcon,
  PiggyBankIcon,
} from "lucide-react";

import {
  Button,
  cn,
  Menu,
  MenuGroup,
  MenuItem,
  MenuPopup,
  MenuTrigger,
} from "@repo/ui";

import { ThemeToggle } from "../core/theme-toggle";
import { Brand } from "./brand";

export const Header = () => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  return (
    <header className="font-inter bg-muted mt-4 h-12 w-full border">
      <nav className="mx-auto flex h-full w-full max-w-5xl items-center justify-between px-2 sm:px-4">
        <Brand />

        <div className="flex items-center gap-2">
          <Menu open={open} onOpenChange={setOpen}>
            <MenuTrigger
              className="group"
              openOnHover
              render={<Button size={"sm"} variant="secondary" />}
            >
              Explore
              <ChevronDownIcon
                className={cn(
                  "shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  open ? "rotate-x-180" : "rotate-x-0"
                )}
              />
            </MenuTrigger>
            <MenuPopup>
              <MenuGroup className={"grid gap-2 p-2 md:grid-cols-2"}>
                {productItems.map((item) => (
                  <MenuItem
                    key={item.href}
                    onClick={() => router.push(item.href)}
                    className={cn(
                      "group h-auto! w-full gap-2 py-2 pl-4 text-left text-white",
                      item.color
                    )}
                  >
                    <div className="flex items-center justify-center rounded-lg bg-white p-2 backdrop-blur-lg">
                      {item.icon}
                    </div>
                    <div className="flex flex-1 flex-col gap-0.5">
                      <h3 className="font-semibold text-white">{item.label}</h3>
                      <p className="whitespace-break-spaces text-white">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRightIcon
                      aria-hidden="true"
                      className="shrink-0 text-white opacity-0 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </MenuItem>
                ))}
              </MenuGroup>
            </MenuPopup>
          </Menu>

          <Button
            size="sm"
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

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

const productItems = [
  {
    label: "Home",
    href: "/",
    icon: <HomeIcon className="text-black" />,
    description: "Explore the system",
    color: "bg-linear-to-r from-rose-600 via-rose-500  to-rose-400",
  },
  {
    label: "Templates",
    href: "/templates",
    icon: <Layers2Icon className="text-black" />,
    description: "Production grade templates",
    color: "bg-linear-to-r from-emerald-700 via-emerald-600  to-emerald-500",
  },
  {
    label: "Pricing",
    href: "/pricing",
    icon: <PiggyBankIcon className="text-black" />,
    description: "Simple plans for developers",
    color: "bg-linear-to-r from-amber-600 via-amber-500  to-amber-400",
  },
  {
    label: "Help",
    href: "/help",
    icon: <BadgeQuestionMarkIcon className="text-black" />,
    description: "Frequently asked questions",
    color: "bg-linear-to-r from-purple-700 via-purple-600  to-purple-500",
  },
  {
    label: "Sign In",
    href: "/auth/login",
    icon: <LogInIcon className="text-black" />,
    description: "Access your dashboard",
    color: "bg-linear-to-r from-blue-600 via-blue-500 to-blue-400",
  },
  {
    label: "Sign Up",
    href: "/auth/register",
    icon: <FingerprintIcon className="text-black" />,
    description: "Claim your access",
    color: "bg-linear-to-r from-indigo-600 via-indigo-500 to-indigo-400",
  },
];
