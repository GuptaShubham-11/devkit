"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  LayersIcon,
  LayoutDashboardIcon,
  MenuIcon,
  PlusIcon,
  ShieldCheck,
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
        <MenuPopup className={"font-inter rounded-2xl p-1"}>
          <MenuItem
            onClick={() => router.push("/dashboard")}
            data-active={isActive("/dashboard")}
            className={cn(
              isActive("/dashboard") &&
                !dialogOpen &&
                "bg-accent-primary/70 dark:hover:bg-accent-primary/80 font-medium"
            )}
          >
            <LayoutDashboardIcon />
            Dashboard
          </MenuItem>
          <MenuItem
            onClick={() => router.push("/templates")}
            data-active={isActive("/templates")}
            className={cn(
              isActive("/templates") &&
                !dialogOpen &&
                "bg-accent-primary/70 dark:hover:bg-accent-primary/80 font-medium"
            )}
          >
            <LayersIcon />
            Templates
          </MenuItem>
          <AdminAccess>
            <MenuItem
              onClick={() => router.push("/admin/a-d")}
              data-active={isActive("/admin/a-d")}
              className={cn(
                isActive("/admin/a-d") &&
                  !dialogOpen &&
                  "bg-accent-primary/70 dark:hover:bg-accent-primary/80 font-medium"
              )}
            >
              <ShieldCheck />
              Admin
            </MenuItem>
            <MenuItem
              onClick={() => setDialogOpen(true)}
              className={cn(
                dialogOpen &&
                  "bg-accent-primary/70 dark:hover:bg-accent-primary/80 font-medium"
              )}
            >
              <PlusIcon />
              Create
            </MenuItem>
          </AdminAccess>
        </MenuPopup>
      </Menu>

      <CreateTemplateForm open={dialogOpen} setOpen={setDialogOpen} />
    </>
  );
};
