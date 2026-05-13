"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  DiamondPlusIcon,
  HatGlassesIcon,
  Layers2Icon,
  LayoutDashboardIcon,
  MenuIcon,
} from "lucide-react";

import { Button, cn, Menu, MenuItem, MenuPopup, MenuTrigger } from "@repo/ui";

import { useActivePath } from "@/hooks/core/use-active-path";

import { CreateTemplateForm } from "../template/create-template-form";
import { AdminAccess } from "./admin-access";

export const DiscoverMenu = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const { isActive } = useActivePath();

  return (
    <>
      <Menu>
        <MenuTrigger render={<Button variant="outline" size={"icon"} />}>
          <MenuIcon />
        </MenuTrigger>
        <MenuPopup className={"max-w-fit rounded-2xl"}>
          <MenuItem
            onClick={() => router.push("/dashboard")}
            data-active={isActive("/dashboard")}
            className={cn(
              "text-text-muted rounded-2xl pl-4",
              isActive("/dashboard") && "bg-surface-secondary text-text-primary"
            )}
          >
            <LayoutDashboardIcon className="text-text-secondary size-4" />
            Dashboard
          </MenuItem>
          <MenuItem
            onClick={() => router.push("/templates")}
            data-active={isActive("/templates")}
            className={cn(
              "text-text-muted rounded-2xl pl-4",
              isActive("/templates") && "bg-surface-secondary text-text-primary"
            )}
          >
            <Layers2Icon className="text-text-secondary size-4" />
            Templates
          </MenuItem>
          <AdminAccess>
            <MenuItem
              onClick={() => router.push("/admin/a-d")}
              data-active={isActive("/admin/a-d")}
              className={cn(
                "text-text-muted rounded-2xl pl-4",
                isActive("/admin/a-d") &&
                  "bg-surface-secondary text-text-primary"
              )}
            >
              <HatGlassesIcon className="text-text-secondary size-4" />
              Admin
            </MenuItem>
            <MenuItem
              onClick={() => setDialogOpen(true)}
              className={cn("text-text-muted rounded-2xl pl-4")}
            >
              <DiamondPlusIcon className="text-text-secondary size-4" />
              Create
            </MenuItem>
          </AdminAccess>
        </MenuPopup>
      </Menu>

      <CreateTemplateForm open={dialogOpen} setOpen={setDialogOpen} />
    </>
  );
};
