"use client";

import React from "react";

import { motion } from "framer-motion";
import {
  CheckIcon,
  CopyIcon,
  DollarSignIcon,
  TerminalIcon,
} from "lucide-react";

import { Button, useCopyToClipboard } from "@repo/ui";

import { TerminalPanel } from "./terminal-panel";
import { WorkspacePanel } from "./workspace-panel";

const PHASE_TIMELINE: Array<{
  phase:
    | "installing-cli"
    | "cli-installed"
    | "show-template-command"
    | "fetching-template"
    | "template-ready"
    | "show-auth"
    | "authorizing"
    | "authorized"
    | "downloading"
    | "completed";
  delay: number;
}> = [
  { phase: "installing-cli", delay: 0 },
  { phase: "cli-installed", delay: 1800 },
  { phase: "show-template-command", delay: 2600 },
  { phase: "fetching-template", delay: 3400 },
  { phase: "template-ready", delay: 5200 },
  { phase: "show-auth", delay: 6200 },
  { phase: "authorizing", delay: 7200 },
  { phase: "authorized", delay: 7600 },
  { phase: "downloading", delay: 8600 },
  { phase: "completed", delay: 12200 },
];

type Phase =
  | "idle"
  | "installing-cli"
  | "cli-installed"
  | "show-template-command"
  | "fetching-template"
  | "template-ready"
  | "show-auth"
  | "authorizing"
  | "authorized"
  | "downloading"
  | "completed";

export const Terminal = () => {
  const [started, setStarted] = React.useState(false);

  const [phase, setPhase] = React.useState<Phase>("idle");

  const [downloadProgress, setDownloadProgress] = React.useState(0);

  const hasStartedRef = React.useRef(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (!started || hasStartedRef.current) return;

    hasStartedRef.current = true;

    const timers = PHASE_TIMELINE.map(({ phase, delay }) =>
      setTimeout(() => {
        setPhase(phase);
      }, delay)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [started]);

  React.useEffect(() => {
    if (phase !== "downloading") return;

    let current = 0;

    const interval = setInterval(() => {
      current += Math.max(1, Math.floor((100 - current) / 5));

      if (current >= 100) {
        current = 100;

        clearInterval(interval);
      }

      setDownloadProgress(current);
    }, 100);

    return () => clearInterval(interval);
  }, [phase]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
        rotateX: 10,
        scale: 0.97,
        filter: "blur(6px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group border-surface-secondary bg-surface-primary relative overflow-hidden border shadow-[0_20px_100px_-40px_rgba(0,0,0,0.9)]"
    >
      {/* top bar */}
      <div className="border-surface-secondary bg-bg-primary relative flex flex-col gap-4 border-b px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-3">
        <div className="text-text-muted flex items-center gap-2 text-sm font-medium tracking-wide">
          <TerminalIcon className="text-accent-warning size-4" />
          Terminal
        </div>

        <div className="border-surface-secondary bg-surface-primary flex w-full items-center justify-between gap-3 overflow-hidden border px-3 py-2 font-mono sm:w-auto sm:px-4 sm:py-1.5">
          <div className="flex min-w-0 items-center gap-2">
            <DollarSignIcon className="text-accent-success size-4 shrink-0" />

            <span className="text-text-primary truncate text-xs">
              npm i -g devkit-tool-cli
            </span>
          </div>

          <CopyButton textToCopy="npm i -g devkit-tool-cli" />
        </div>
      </div>

      {/* content */}
      <div className="grid lg:grid-cols-[1.7fr_0.6fr]">
        <TerminalPanel
          key="terminal-panel"
          phase={phase}
          started={started}
          downloadProgress={downloadProgress}
          onStart={() => setStarted(true)}
        />

        <WorkspacePanel key="workspace-panel" phase={phase} />
      </div>
    </motion.div>
  );
};

type CopyButtonProps = {
  textToCopy: string;
};

export const CopyButton = ({ textToCopy }: CopyButtonProps) => {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <Button
      size="icon-xs"
      variant="outline"
      onClick={() => copyToClipboard(textToCopy)}
      className="border-surface-secondary bg-bg-primary hover:bg-surface-secondary shrink-0 transition-colors duration-200"
    >
      {isCopied ? <CheckIcon className="text-accent-success" /> : <CopyIcon />}
    </Button>
  );
};
