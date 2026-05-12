import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  BookIcon,
  Layers2Icon,
  ReceiptTextIcon,
  RouteIcon,
} from "lucide-react";

import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui";

import { Upgrade } from "./upgrade";

export function EmptyBilling() {
  const [openUpgrade, setOpenUpgrade] = useState(false);
  const router = useRouter();

  return (
    <>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ReceiptTextIcon />
          </EmptyMedia>
          <EmptyTitle>No billing history</EmptyTitle>
          <EmptyDescription>
            Upgrade your plan to access production templates
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button onClick={() => setOpenUpgrade(true)} size="sm">
              Upgrade
            </Button>
            <Button
              onClick={() => router.push("/templates")}
              size="sm"
              variant="outline"
            >
              <Layers2Icon />
              Templates
            </Button>
          </div>
        </EmptyContent>
      </Empty>
      <Upgrade open={openUpgrade} setOpen={setOpenUpgrade} />
    </>
  );
}
