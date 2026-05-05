"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";

import { useQuery } from "@tanstack/react-query";
import {
  CheckCircleIcon,
  CheckIcon,
  CogIcon,
  CopyIcon,
  DollarSignIcon,
  KeyRoundIcon,
  Mail,
  SettingsIcon,
  User,
} from "lucide-react";

import {
  Badge,
  Button,
  cn,
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
  Input,
  ScrollArea,
  Separator,
  Spinner,
  useCopyToClipboard,
} from "@repo/ui";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@repo/ui";

import { formatDate } from "@/lib/formate-date";
import { http } from "@/lib/http";

import { Container } from "../core/container";
import { UserIcon } from "../core/user-avatar";
import { ChangePassword } from "./change-password";
import { DeleteAccount } from "./delete-account";
import { EditProfile } from "./edit-account";

export function Account() {
  const [editProfile, setEditProfile] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await http.get(`/user`);
      setUserData(res.data.user);
      return res.data.user;
    },
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Spinner />;

  return (
    <Container
      className={cn(
        "mt-20 mb-20 grid items-start gap-6 px-4 sm:px-6",
        isFetching && "pointer-events-none opacity-70"
      )}
    >
      <Tabs
        className="w-full flex-row"
        defaultValue="profile"
        orientation="vertical"
      >
        <div className="border-r">
          <TabsList variant="underline">
            <TabsTab value="profile">
              <User aria-hidden="true" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTab>
            <TabsTab value="billing">
              <DollarSignIcon aria-hidden="true" />
              <span className="hidden sm:inline">Billing</span>
            </TabsTab>
            <TabsTab value="settings">
              <CogIcon aria-hidden="true" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTab>
          </TabsList>
        </div>
        <TabsPanel value="profile">
          <div className="flex flex-col gap-4 sm:px-6">
            <div className="relative flex items-center gap-4 border-b px-4 py-3 sm:py-5">
              <div className="bg-surface-secondary border-surface-secondary relative flex h-12 w-12 items-center justify-center rounded-xl border sm:h-14 sm:w-14">
                <img
                  src={userData?.profileImage}
                  alt="avatar"
                  className="h-full w-full rounded-xl object-cover"
                />
                <div className="pointer-events-none absolute inset-0 rounded-xl border" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  {userData?.oAuth?.profile?.name || "Anonymous"}
                </h4>

                <span className="text-text-muted truncate text-[11px] sm:text-xs">
                  {userData?.bio}
                </span>
              </div>

              <Button
                variant="secondary"
                onClick={() => {
                  setEditProfile(true);
                  setUserData(data);
                }}
                size="sm"
                className="absolute top-2 right-3"
              >
                Edit
              </Button>
            </div>
            <div className="mt-2 flex w-full max-w-2xl flex-col gap-4">
              <div className="bg-surface-primary border-surface-secondary divide-surface-secondary divide-y rounded-2xl border">
                {[
                  ["Email", userData?.email],
                  ["GitHub Username", userData?.githubUsername],
                  ["Website", userData?.website],
                  ["Plan", userData?.currentPlan],
                  ["Credits", userData?.creditBalance],
                ].map(([label, value]) => (
                  <Row key={label} label={label} value={value} />
                ))}
              </div>

              <div className="bg-surface-primary border-surface-secondary divide-surface-secondary divide-y rounded-2xl border">
                {[
                  ["Private Key", userData?.privateKey],
                  ["Role", userData?.isRole],
                  ["Verified", userData?.isVerified ? "Yes" : "No"],
                  ["Google", userData?.oAuth?.google?.email],
                ].map(([label, value]) => (
                  <Row key={label} label={label} value={value} />
                ))}
              </div>

              <div className="bg-surface-primary border-surface-secondary divide-surface-secondary divide-y rounded-2xl border">
                {[
                  [
                    "Last Login",
                    userData?.lastLoginAt
                      ? formatDate(new Date(userData.lastLoginAt))
                      : "-",
                  ],
                  ["Joined Us", formatDate(new Date(userData?.createdAt))],
                  ["Last Updated", formatDate(new Date(userData?.updatedAt))],
                ].map(([label, value]) => (
                  <Row key={label} label={label} value={value} />
                ))}
              </div>
            </div>
          </div>
        </TabsPanel>
        <TabsPanel value="billing">
          <p className="text-muted-foreground p-4 text-center text-xs">
            Billing content
          </p>
        </TabsPanel>
        <TabsPanel value="settings">
          <div className="min-h-screen w-fit">
            <div className="bg-surface-primary border-surface-secondary divide-surface-secondary divide-x divide-y border">
              <div className="hover:bg-surface-secondary/40 grid grid-cols-[20px_1fr] items-center px-4 py-3 transition duration-200 sm:grid-cols-[30px_1fr]">
                <span className="text-text-muted text-[11px] font-medium tracking-wide sm:text-xs">
                  1.
                </span>
                <ChangePassword />
              </div>
              <div className="hover:bg-surface-secondary/40 grid grid-cols-[30px_1fr] items-center px-4 py-3 transition duration-200">
                <span className="text-text-muted text-[11px] font-medium tracking-wide sm:text-xs">
                  2.
                </span>
                <DeleteAccount />
              </div>
            </div>
          </div>
        </TabsPanel>
      </Tabs>
      <EditProfile
        open={editProfile}
        onOpenChange={setEditProfile}
        user={userData}
        onSuccess={() => refetch()}
      />
    </Container>
  );
}

function Row({ label, value }: { label: string; value: any }) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  return (
    <div className="hover:bg-surface-secondary/40 grid grid-cols-[100px_1fr] items-center px-4 py-3 transition duration-200 first:rounded-t-2xl last:rounded-b-2xl sm:grid-cols-[180px_1fr]">
      <span className="text-text-muted text-[11px] font-medium tracking-wide sm:text-xs">
        {label}
      </span>

      <div className="flex items-center justify-between gap-4">
        <span className="text-text-primary text-sm font-medium break-all">
          {label === "Private Key" ? maskKey(value) : value || "-"}
        </span>

        {label === "Private Key" && (
          <Button
            size="icon-sm"
            variant="outline"
            onClick={() => copyToClipboard(value)}
          >
            {isCopied ? (
              <CheckIcon className="text-accent-success" />
            ) : (
              <CopyIcon />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

function maskKey(key?: string) {
  if (!key) return "-";
  return key.slice(0, 6) + "••••••" + key.slice(-4);
}
