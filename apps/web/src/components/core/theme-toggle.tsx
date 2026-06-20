"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

import { SunSnow } from "lucide-react";

import { Toggle, Tooltip, TooltipPopup, TooltipTrigger } from "@repo/ui";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Toggle
            pressed={!isDark}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            onPressedChange={(pressed) => setTheme(pressed ? "light" : "dark")}
            size={"sm"}
          >
            <SunSnow />
          </Toggle>
        }
      />

      <TooltipPopup>{isDark ? "Dark mode" : "Light mode"}</TooltipPopup>
    </Tooltip>
  );
}
