"use client";

import { ArrowLeft } from "lucide-react";

import { Button, cn, Tooltip, TooltipPopup, TooltipTrigger } from "@repo/ui";

const BackNavigation = ({
  handleBack,
  className,
}: {
  handleBack: () => void;
  className?: string;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            size={"sm"}
            variant="outline"
            type="button"
            onClick={handleBack}
            className={cn(className)}
          />
        }
      >
        <ArrowLeft /> Back
      </TooltipTrigger>
      <TooltipPopup>Back</TooltipPopup>
    </Tooltip>
  );
};

export { BackNavigation };
