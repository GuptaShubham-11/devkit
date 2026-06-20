import { Badge } from "@repo/ui";

import { Logo } from "../core/logo";

export const Brand = () => {
  return (
    <div className="flex min-w-0 items-center overflow-hidden">
      <Logo size={40} />

      <span className="font-heading shrink-0 text-lg tracking-wide select-none">
        devkit
      </span>
    </div>
  );
};
