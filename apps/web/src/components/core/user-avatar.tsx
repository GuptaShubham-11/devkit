"use client";

import React from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { CircleFadingArrowUpIcon, TrashIcon, User } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  cn,
  Menu,
  MenuGroup,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
  Spinner,
} from "@repo/ui";

import { useLogout } from "@/hooks";

import { Upgrade } from "../account/upgrade";
import { PremiumUserAccess } from "./premium-user-access";

export const UserAvatar = () => {
  const { data } = useSession();
  const { logoutUser, loading: logoutLoading } = useLogout();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  return (
    <>
      <Menu>
        <MenuTrigger className={"cursor-pointer"}>
          <UserIcon data={data} />
        </MenuTrigger>
        <MenuPopup className={"font-inter rounded-2xl"}>
          <MenuGroup>
            <MenuItem disabled className={"data-disabled:opacity-90"}>
              <div className="flex items-center gap-2">
                <UserIcon data={data} />
                <div className="min-w-0 flex-1 leading-tight">
                  <h4 className="max-w-28 truncate text-sm font-medium">
                    {" "}
                    {data?.user.email || "Product Designer"}{" "}
                  </h4>
                  <motion.div
                    className={`${data?.user.currentPlan === "pro" ? "text-accent-success" : "text-text-muted"} flex items-center text-xs`}
                  >
                    {" "}
                    {data?.user.currentPlan === "pro"
                      ? "Premium Plan"
                      : "Free Plan"}{" "}
                  </motion.div>
                </div>
              </div>
            </MenuItem>
          </MenuGroup>
          <MenuSeparator />
          <MenuGroup>
            <MenuItem
              className={"text-text-muted rounded-xl px-4"}
              onClick={() => router.push("/account")}
            >
              <User className="text-text-secondary" />
              Account
            </MenuItem>
          </MenuGroup>
          <MenuItem
            className={"text-text-muted rounded-xl px-4"}
            onClick={() => setOpen(true)}
          >
            <CircleFadingArrowUpIcon className="text-text-secondary" />
            Upgrade
          </MenuItem>
          <MenuSeparator />
          <MenuItem
            disabled={logoutLoading}
            onClick={logoutUser}
            variant="destructive"
            className={"rounded-xl px-4"}
          >
            {logoutLoading ? <Spinner /> : <TrashIcon aria-hidden="true" />}
            Logout
          </MenuItem>
        </MenuPopup>
      </Menu>
      <Upgrade open={open} setOpen={setOpen} key={"upgrade-dialog"} />
    </>
  );
};

export const UserIcon = ({
  data,
  className,
  fallbackClassName,
  badgeClassName,
  badgeSize = 18,
}: {
  data: any;
  className?: string;
  fallbackClassName?: string;
  badgeClassName?: string;
  badgeSize?: number;
}) => {
  const fallbackImageUrls: { [key: number]: string } = {
    // 0: 'https://images.unsplash.com/photo-1463852247062-1bbca38f7805?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    // 1: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // 2: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=749&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    3: "https://media.istockphoto.com/id/994269878/photo/the-rhesus-macaque.jpg?s=612x612&w=0&k=20&c=SjueYUVkW1KLH9Zk6tJCL226DYm81TjiGBJEXdn2yWY=",
  };
  return (
    <div className="relative w-fit">
      <Avatar
        className={cn("border-surface-secondary rounded-xs border", className)}
      >
        <AvatarImage
          alt="User"
          src={data?.user?.image || fallbackImageUrls[3]}
        />

        <AvatarFallback
          className={cn("rounded-xs text-xs font-medium", fallbackClassName)}
        >
          LT
        </AvatarFallback>
      </Avatar>

      <PremiumUserAccess>
        <span className={cn(`absolute -end-1.5 -top-1.5`, badgeClassName)}>
          <span className="sr-only">Verified</span>

          <svg
            aria-hidden="true"
            height={badgeSize}
            viewBox="0 0 24 24"
            width={badgeSize}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-emerald-500"
              d="M3.046 8.277A4.402 4.402 0 0 1 8.303 3.03a4.4 4.4 0 0 1 7.411 0 4.397 4.397 0 0 1 5.19 3.068c.207.713.23 1.466.067 2.19a4.4 4.4 0 0 1 0 7.415 4.403 4.403 0 0 1-3.06 5.187 4.398 4.398 0 0 1-2.186.072 4.398 4.398 0 0 1-7.422 0 4.398 4.398 0 0 1-5.257-5.248 4.4 4.4 0 0 1 0-7.437Z"
            />

            <path
              className="fill-brand-primary-600"
              d="M4.674 8.954a3.602 3.602 0 0 1 4.301-4.293 3.6 3.6 0 0 1 6.064 0 3.598 3.598 0 0 1 4.3 4.302 3.6 3.6 0 0 1 0 6.067 3.6 3.6 0 0 1-4.29 4.302 3.6 3.6 0 0 1-6.074 0 3.598 3.598 0 0 1-4.3-4.293 3.6 3.6 0 0 1 0-6.085Z"
            />

            <path
              className="fill-bg-primary"
              d="M15.707 9.293a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414L11 12.586l3.293-3.293a1 1 0 0 1 1.414 0Z"
            />
          </svg>
        </span>
      </PremiumUserAccess>
    </div>
  );
};
