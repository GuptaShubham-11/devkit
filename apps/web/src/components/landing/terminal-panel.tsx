import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowBigRightDashIcon,
  CheckCircle2Icon,
  CheckIcon,
  DollarSignIcon,
  EllipsisIcon,
  InfoIcon,
  LoaderCircleIcon,
  TriangleIcon,
} from "lucide-react";

import { ScrollArea, Separator } from "@repo/ui";

import { CopyButton } from "./terminal";

type TerminalPhase =
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

type TerminalPanelProps = {
  started: boolean;
  phase: TerminalPhase;
  downloadProgress: number;
  onStart: () => void;
};

const ACTIVE_PHASES: TerminalPhase[] = [
  "cli-installed",
  "show-template-command",
  "fetching-template",
  "template-ready",
  "show-auth",
  "authorizing",
  "authorized",
  "downloading",
  "completed",
];

const TEMPLATE_PHASES: TerminalPhase[] = [
  "show-template-command",
  "fetching-template",
  "template-ready",
  "show-auth",
  "authorizing",
  "authorized",
  "downloading",
  "completed",
];

const PROJECT_PHASES: TerminalPhase[] = [
  "fetching-template",
  "template-ready",
  "show-auth",
  "authorizing",
  "authorized",
  "downloading",
  "completed",
];

const CONTENT_PHASES: TerminalPhase[] = [
  "template-ready",
  "show-auth",
  "authorizing",
  "authorized",
  "downloading",
  "completed",
];

const AUTH_PHASES: TerminalPhase[] = [
  "show-auth",
  "authorizing",
  "authorized",
  "downloading",
  "completed",
];

const DOWNLOAD_PHASES: TerminalPhase[] = ["downloading", "completed"];

const TEMPLATE_DETAILS = [
  ["Template:", "React Basic"],
  [
    "Description:",
    "This is a simple react basic starter to setup quick production grade frontend repo for your product.",
  ],
  ["Stack:", "React, Vite, Tailwind, Typescript, Lucide React"],
  ["Version:", "1.0.2"],
  ["Downloads:", "3483"],
  ["Cost:", "4 Credits"],
] as const;

const CONTINUE_ITEMS = [
  "Ensure you have a stable internet connection",
  "Keep this terminal open during the setup process",
];

export const TerminalPanel = ({
  started,
  phase,
  downloadProgress,
  onStart,
}: TerminalPanelProps) => {
  const isInstalling = phase === "installing-cli";

  const isFetchingTemplate = phase === "fetching-template";

  const isCompleted = phase === "completed";

  const viewportRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    const timeout = setTimeout(() => {
      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior: "smooth",
      });
    }, 120);

    return () => clearTimeout(timeout);
  }, [phase]);

  return (
    <motion.div
      onHoverStart={() => {
        if (!started) {
          onStart();
        }
      }}
      className="border-surface-secondary bg-bg-secondary relative overflow-hidden border-r border-b font-mono text-xs sm:text-sm lg:border-b-0"
    >
      <ScrollArea className="h-[560px] sm:h-[620px]" viewportRef={viewportRef}>
        <div className="relative">
          <CommandHeader />

          {!started && <InitialHint />}

          <AnimatePresence mode="wait">
            {isInstalling && <InstallingState />}
          </AnimatePresence>

          <AnimatePresence>
            {ACTIVE_PHASES.includes(phase) && <InstalledState />}
          </AnimatePresence>

          <AnimatePresence>
            {TEMPLATE_PHASES.includes(phase) && <TemplateCommand />}
          </AnimatePresence>

          <AnimatePresence>
            {PROJECT_PHASES.includes(phase) && <ProjectInfo />}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {isFetchingTemplate && <FetchingTemplateState />}
          </AnimatePresence>

          <AnimatePresence>
            {CONTENT_PHASES.includes(phase) && (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="flex flex-col items-start px-4"
              >
                <TemplateCard />

                {AUTH_PHASES.includes(phase) && <AuthSection phase={phase} />}

                {DOWNLOAD_PHASES.includes(phase) && (
                  <DownloadSection downloadProgress={downloadProgress} />
                )}

                {isCompleted && <CompletionState />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </motion.div>
  );
};

const CommandHeader = () => {
  return (
    <div className="flex flex-col gap-3 px-4 py-1 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 break-all">
        <DollarSignIcon className="text-accent-success size-4 shrink-0" />

        <span className="text-text-secondary">npm i -g devkit-tool-cli</span>
      </div>

      <CopyButton textToCopy="npm i -g devkit-tool-cli" />
    </div>
  );
};

const InitialHint = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-1">
      <DollarSignIcon className="text-accent-success size-4 shrink-0" />

      <span className="text-text-muted">
        hover terminal to start installation...
      </span>
    </div>
  );
};

const InstallingState = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-2 px-4 py-1"
    >
      <LoaderCircleIcon className="text-accent-warning size-4 shrink-0 animate-spin" />

      <motion.span
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
        }}
        className="text-text-muted"
      >
        installing package dependencies...
      </motion.span>
    </motion.div>
  );
};

const InstalledState = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 4,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="flex items-center gap-2 px-4 py-1"
    >
      <DollarSignIcon className="text-accent-success size-4 shrink-0" />

      <span className="text-text-muted">
        package <b className="text-accent-success">installed in 4s</b>{" "}
        successfully!
      </span>
    </motion.div>
  );
};

const TemplateCommand = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 4,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="flex items-center gap-2 px-4 py-1"
    >
      <DollarSignIcon className="text-accent-success size-4 shrink-0" />

      <span className="text-text-secondary break-all">
        devkit add react-basic .
      </span>
    </motion.div>
  );
};

const ProjectInfo = () => {
  return (
    <div className="px-4">
      <div className="flex flex-col items-start gap-1 px-2 py-3 sm:px-4 sm:pl-10">
        <div className="flex items-center gap-2">
          <TriangleIcon className="fill-brand-primary text-brand-primary size-3" />

          <span className="text-text-secondary">Devkit</span>
        </div>

        <span className="text-text-muted break-all">
          https://devkit-khaki.vercel.app
        </span>
      </div>

      <Separator />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-start gap-1 px-2 py-3 sm:px-4 sm:pl-10"
      >
        <InfoRow label="Project:" value=". (Current Directory)" />

        <InfoRow label="Template:" value="react-basic" />
      </motion.div>

      <Separator />
    </div>
  );
};

const FetchingTemplateState = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-2 px-4 py-1.5"
    >
      <LoaderCircleIcon className="text-accent-warning size-4 shrink-0 animate-spin" />

      <motion.span
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
        }}
        className="text-text-muted"
      >
        fetching template metadata...
      </motion.span>
    </motion.div>
  );
};

const TemplateCard = () => {
  return (
    <div className="flex w-full items-center justify-center py-4">
      <div className="border-surface-secondary bg-surface-primary relative w-full max-w-2xl border p-5 sm:ml-10">
        <span className="bg-surface-secondary text-text-secondary absolute -top-2 left-4 px-2 py-1 text-xs">
          Template Details
        </span>

        <div className="space-y-2 pt-3">
          {TEMPLATE_DETAILS.map(([label, value]) => (
            <div
              key={label}
              className="flex flex-col gap-1 sm:flex-row sm:items-start"
            >
              <span className="text-text-secondary min-w-[120px]">{label}</span>

              <span className="text-text-muted">{value}</span>
            </div>
          ))}

          <div className="pt-2">
            <EllipsisIcon className="text-text-muted size-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

const AuthorizingState = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="flex items-center gap-2 px-4 py-1"
    >
      <LoaderCircleIcon className="text-accent-warning size-4 animate-spin" />

      <motion.span
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
        }}
        className="text-text-muted"
      >
        authorizing...
      </motion.span>
    </motion.div>
  );
};

type AuthSectionProps = {
  phase: TerminalPhase;
};

const AuthSection = ({ phase }: AuthSectionProps) => {
  return (
    <>
      <Separator />

      <div className="flex items-center gap-2 py-2 pl-10">
        <InfoIcon className="text-accent-primary size-3" />

        <span className="text-text-secondary font-medium">
          Befor you continue:
        </span>
      </div>

      <Separator />

      <div className="flex flex-col items-start gap-0 px-4 py-3 pl-10">
        {CONTINUE_ITEMS.map((item) => (
          <div key={item} className="flex items-center gap-2">
            <ArrowBigRightDashIcon className="size-3 fill-rose-500 text-rose-500" />

            <span className="text-text-muted">{item}</span>
          </div>
        ))}

        <div className="flex items-center gap-2">
          <ArrowBigRightDashIcon className="size-3 fill-rose-500 text-rose-500" />

          <span className="text-text-muted">
            This action will consume{" "}
            <b className="text-accent-warning">2 credits</b>
          </span>
        </div>
      </div>

      <Separator />

      <div className="flex items-center gap-2 py-2 pl-10">
        <CheckIcon className="text-accent-success size-3" />

        <span className="text-text-secondary font-medium">
          Do you want to proceed? ... yes
        </span>
      </div>

      <Separator />

      <div className="flex items-center gap-2 py-2 pl-10">
        <InfoIcon className="text-accent-primary size-3" />

        <span className="text-text-primary">Sign in to continue:</span>
      </div>

      <Separator />

      <CredentialRow label="Email:" value="demo@example.com" />

      <CredentialRow label="Secret:" value="●●●●●●●●●●●" />

      <AnimatePresence mode="wait">
        {phase === "authorizing" && <AuthorizingState />}
      </AnimatePresence>

      <AnimatePresence mode="sync">
        {["authorized", "downloading", "completed"].includes(phase) && (
          <motion.div
            initial={{
              opacity: 0,
              y: 4,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="flex items-center gap-2 py-1 pt-3 pl-10"
          >
            <CheckIcon className="text-accent-success size-3" />

            <span className="text-text-muted">Access granted</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

type DownloadSectionProps = {
  downloadProgress: number;
};

const DownloadSection = ({ downloadProgress }: DownloadSectionProps) => {
  const totalBlocks = 34;

  const filledBlocks = Math.floor((downloadProgress / 100) * totalBlocks);

  const extractedFiles = Math.floor((69 * downloadProgress) / 100);

  return (
    <>
      <Separator />

      <div className="flex items-center gap-2 py-1 pl-10">
        <CheckIcon className="text-accent-success size-3" />

        <span className="text-text-muted">Files fetched successfully</span>
      </div>

      <Separator />

      <div className="flex flex-col items-start pl-10">
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="flex flex-col items-start gap-0 py-3"
        >
          <InfoRow label="Total Size:" value="69 KB" />

          <InfoRow label="Total Files:" value="16" />
        </motion.div>

        <div className="flex items-center gap-2 pt-2">
          <ArrowBigRightDashIcon className="size-3 fill-rose-500 text-rose-500" />
          Downloading:
        </div>

        <motion.span
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
          }}
          className="text-brand-primary pb-3 pl-4"
        >
          {" "}
          {"█".repeat(filledBlocks)}
          {"░".repeat(totalBlocks - filledBlocks)}{" "}
          <span className="text-text-primary">
            {downloadProgress}% | {extractedFiles}/69
          </span>
        </motion.span>
      </div>
    </>
  );
};

const CompletionState = () => {
  return (
    <div className="flex items-center gap-2 py-2 pl-10 lg:pb-4">
      <CheckCircle2Icon className="text-accent-success size-3" />

      <span className="text-text-secondary">
        Completed in <b className="text-accent-success">2.85 seconds</b>
      </span>
    </div>
  );
};

type InfoRowProps = {
  label: string;
  value: string;
};

const InfoRow = ({ label, value }: InfoRowProps) => {
  return (
    <div className="flex items-center gap-2">
      <ArrowBigRightDashIcon className="size-3 fill-rose-500 text-rose-500" />

      <span className="text-text-muted">
        {label} <span className="text-text-secondary">{value}</span>
      </span>
    </div>
  );
};

type CredentialRowProps = {
  label: string;
  value: string;
};

const CredentialRow = ({ label, value }: CredentialRowProps) => {
  return (
    <div className="flex items-center gap-2 py-0.5 pl-10 first:pt-3 last:pb-2">
      <CheckIcon className="text-accent-success size-3" />

      {label}

      <span className="text-text-muted">{value}</span>
    </div>
  );
};
