"use client";

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

import { PremiumUserAccess } from "./premium-user-access";

export const UserAvatar = () => {
  const { data } = useSession();
  const { logoutUser, loading: logoutLoading } = useLogout();

  const router = useRouter();

  return (
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
            className={"rounded-xl px-4"}
            onClick={() => router.push("/account")}
          >
            <User />
            Account
          </MenuItem>
        </MenuGroup>
        <MenuItem
          className={"rounded-xl px-4"}
          onClick={() => router.push("/upgrade")}
        >
          <CircleFadingArrowUpIcon className="text-accent-success" />
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
  );
};

export const UserIcon = ({ data }: { data: any }) => {
  return (
    <div className="relative">
      <Avatar className={cn(`rounded-xs border`)}>
        <AvatarImage alt="User" src={data?.user?.image} />
        <AvatarFallback className={cn(`rounded-xs`)}>LT</AvatarFallback>
      </Avatar>
      <PremiumUserAccess>
        <span className="absolute -end-1.5 -top-1.5">
          <span className="sr-only">Verified</span>
          <svg
            aria-hidden="true"
            height="20"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="accent-accent-success"
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
