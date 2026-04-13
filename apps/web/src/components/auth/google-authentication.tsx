"use client";

import {
  Button,
  Spinner,
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@repo/ui";

import { GoogleSvg } from "./google-svg";

export const GoogleAuthentication = ({
  googleAuthentication,
  googleLoading,
}: {
  googleAuthentication: () => void;
  googleLoading: boolean;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            disabled={googleLoading}
            size={"icon-lg"}
            variant="outline"
            type="button"
            onClick={googleAuthentication}
          />
        }
      >
        {googleLoading ? <Spinner /> : <GoogleSvg />}
      </TooltipTrigger>
      <TooltipPopup>Continue with Google</TooltipPopup>
    </Tooltip>
  );
};
