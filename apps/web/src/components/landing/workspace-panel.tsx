import { motion } from "framer-motion";
import { FileTextIcon, FolderIcon } from "lucide-react";

import { cn, ScrollArea, Skeleton } from "@repo/ui";

type WorkspaceItem = {
  name: string;
  depth: number;
  type: "folder" | "file";
};

const WORKSPACE_ITEMS: WorkspaceItem[] = [
  {
    name: "src",
    depth: 0,
    type: "folder",
  },
  {
    name: "components",
    depth: 1,
    type: "folder",
  },
  {
    name: "ui",
    depth: 2,
    type: "folder",
  },
  {
    name: "button.tsx",
    depth: 3,
    type: "file",
  },
  {
    name: "card.tsx",
    depth: 3,
    type: "file",
  },
  {
    name: "features",
    depth: 1,
    type: "folder",
  },
  {
    name: "auth",
    depth: 2,
    type: "folder",
  },
  {
    name: "hooks",
    depth: 1,
    type: "folder",
  },
  {
    name: "lib",
    depth: 1,
    type: "folder",
  },
  {
    name: "utils.ts",
    depth: 2,
    type: "file",
  },
  {
    name: "app",
    depth: 1,
    type: "folder",
  },
  {
    name: "page.tsx",
    depth: 2,
    type: "file",
  },
  {
    name: "layout.tsx",
    depth: 2,
    type: "file",
  },
  {
    name: "public",
    depth: 0,
    type: "folder",
  },
  {
    name: "package.json",
    depth: 0,
    type: "file",
  },
  {
    name: "tailwind.config.ts",
    depth: 0,
    type: "file",
  },
  {
    name: ".env.example",
    depth: 0,
    type: "file",
  },
];

type WorkspacePanelProps = {
  phase: string;
};

export const WorkspacePanel = ({ phase }: WorkspacePanelProps) => {
  const isCompleted = phase === "completed";

  return (
    <div className="bg-surface-primary flex h-full min-h-[420px] w-full flex-col overflow-hidden">
      <WorkspaceHeader />

      <ScrollArea
        className={cn(isCompleted ? "h-[420px] sm:h-[520px]" : "h-full")}
      >
        {!isCompleted ? (
          <div className="flex flex-col gap-2 px-4 py-4">
            {Array.from({
              length: 14,
            }).map((_, index) => (
              <Skeleton
                key={index}
                className={`bg-bg-secondary h-6 rounded-lg ${
                  index % 4 === 0
                    ? "w-2/3"
                    : index % 3 === 0
                      ? "w-4/5"
                      : "w-full"
                } `}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col px-2 py-3 font-mono text-xs sm:text-sm">
            {WORKSPACE_ITEMS.map((item, index) => (
              <WorkspaceItemRow
                key={`${item.name}-${index}`}
                item={item}
                index={index}
              />
            ))}
          </div>
        )}
      </ScrollArea>

      {isCompleted && <WorkspaceFooter />}
    </div>
  );
};

const WorkspaceHeader = () => {
  return (
    <div className="border-surface-secondary flex items-center justify-between border-b px-4 py-4 sm:px-5">
      <div className="flex flex-col">
        <p className="text-text-muted text-xs font-medium tracking-wide">
          Workspace
        </p>

        <h3 className="text-text-primary mt-1 text-sm font-medium tracking-tight sm:text-base">
          app-sample
        </h3>
      </div>
    </div>
  );
};

type WorkspaceItemRowProps = {
  item: WorkspaceItem;
  index: number;
};

const WorkspaceItemRow = ({ item, index }: WorkspaceItemRowProps) => {
  const isFolder = item.type === "folder";

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 8,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay: 2.5 + index * 0.03,
      }}
      whileHover={{
        x: 2,
      }}
      className="group hover:bg-bg-secondary/70 relative flex items-center gap-2 rounded-lg px-3 py-1.5 transition-all duration-200"
      style={{
        paddingLeft: `${item.depth * 16 + 12}px`,
      }}
    >
      {isFolder ? (
        <FolderIcon className="fill-text-muted text-text-muted size-3 shrink-0 transition-colors duration-200" />
      ) : (
        <FileTextIcon className="text-text-muted size-3.5 shrink-0 transition-colors duration-200" />
      )}

      <span className="text-text-secondary truncate transition-colors duration-200">
        {item.name}
      </span>
    </motion.div>
  );
};

const WorkspaceFooter = () => {
  return (
    <div className="border-surface-secondary bg-surface-primary border-t px-4 py-4 sm:px-5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-text-muted text-xs font-medium tracking-wide">
            Setup Time
          </p>

          <p className="text-text-primary mt-1 text-sm font-medium">
            ~ 34 seconds
          </p>
        </div>
      </div>
    </div>
  );
};
