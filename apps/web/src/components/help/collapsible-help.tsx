"ise client";

import { ChevronDownIcon } from "lucide-react";

import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@repo/ui";

export function CollapsibleHelp({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Collapsible className={"transition-all duration-300 ease-in-out"}>
      <CollapsibleTrigger className="bg-surface-primary inline-flex w-full items-center justify-between gap-2 border px-4 py-3 text-sm font-medium data-panel-open:[&_svg]:rotate-180">
        <span className="truncate">{label}</span>
        <ChevronDownIcon className="size-4" />
      </CollapsibleTrigger>
      <CollapsiblePanel className={"border p-4"}>{children}</CollapsiblePanel>
    </Collapsible>
  );
}
