"use client";

import { useState } from "react";

import {
  ActivityIcon,
  CheckIcon,
  CogIcon,
  CopyIcon,
  DollarSignIcon,
  FileLock2Icon,
  User,
  UserCogIcon,
} from "lucide-react";

import { Button, cn, useCopyToClipboard } from "@repo/ui";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@repo/ui";

import { formatDate } from "@/lib/formate-date";
import { useUser } from "@/store/user";

import { Container } from "../core/container";
import { UserIcon } from "../core/user-avatar";
import { BillingTable } from "./billing-table";
import { ChangePassword } from "./change-password";
import { DeleteAccount } from "./delete-account";
import { EditProfile } from "./edit-account";

export function Account() {
  const [editProfile, setEditProfile] = useState(false);
  const userData: any = useUser();
  const setUser = useUser();

  return (
    <Container
      className={cn(
        "mt-20 mb-20 grid items-start gap-6 px-4 sm:px-6"
        // isFetching && "pointer-events-none opacity-70"
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
          <div className="mx-auto flex w-full flex-col gap-4">
            {/* profile hero */}
            <div className="border-surface-secondary bg-surface-primary relative overflow-hidden border p-5 sm:p-6">
              {/* ambient */}
              <div className="bg-surface-primary pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full blur-3xl" />

              <div className="relative flex flex-col gap-6">
                {/* top */}
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  {/* user */}
                  <div className="flex min-w-0 items-center gap-4">
                    <UserIcon
                      className="border-surface-secondary size-14"
                      badgeSize={18}
                      data={userData}
                    />

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-text-primary truncate text-lg font-semibold tracking-tight sm:text-xl">
                          {userData?.email}
                        </h4>
                      </div>

                      <p className="text-text-muted max-w-2xl text-xs leading-normal md:text-base">
                        {userData?.bio ||
                          "I am a software developer with years of experience."}
                      </p>
                    </div>
                  </div>

                  {/* action */}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setEditProfile(true);
                    }}
                    className="border-surface-secondary bg-bg-secondary border px-4"
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>

            {/* content grid */}
            <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
              {/* left */}
              <div className="space-y-4">
                {/* account */}
                <div className="border-surface-secondary bg-surface-primary overflow-hidden border">
                  <div className="border-surface-secondary border-b px-5 py-3">
                    <h3 className="text-text-secondary flex items-center gap-2 text-sm font-medium tracking-wide">
                      <UserCogIcon className="text-text-primary size-5" />
                      Account Details
                    </h3>
                  </div>

                  <div className="divide-surface-secondary divide-y">
                    {[
                      ["Email", userData?.email],
                      ["GitHub", userData?.githubUsername],
                      ["Website", userData?.website],
                      ["Plan", userData?.currentPlan],
                      ["Credits", userData?.creditBalance],
                    ].map(([label, value]) => (
                      <Row key={label} label={label} value={value} />
                    ))}
                  </div>
                </div>

                {/* security */}
                <div className="border-surface-secondary bg-surface-primary overflow-hidden border">
                  <div className="border-surface-secondary border-b px-5 py-3">
                    <h3 className="text-text-secondary flex items-center gap-2 text-sm font-medium tracking-wide">
                      <FileLock2Icon className="text-text-primary size-5" />
                      Security & Access
                    </h3>
                  </div>

                  <div className="divide-surface-secondary divide-y">
                    {[
                      ["Private Key", userData?.privateKey],
                      ["Role", userData?.isRole],
                      ["Verified", userData?.isVerified ? "Yes" : "No"],
                      ["Google", userData?.oAuth?.google?.email],
                    ].map(([label, value]) => (
                      <Row key={label} label={label} value={value} />
                    ))}
                  </div>
                </div>
              </div>

              {/* right */}
              <div className="border-surface-secondary bg-surface-primary h-fit overflow-hidden border">
                <div className="border-surface-secondary border-b px-5 py-3">
                  <h3 className="text-text-secondary flex items-center gap-2 text-sm font-medium tracking-wide">
                    <ActivityIcon className="text-text-primary size-5" />
                    Activity
                  </h3>
                </div>

                <div className="divide-surface-secondary divide-y">
                  {[
                    [
                      "Last Login",
                      userData?.lastLoginAt
                        ? formatDate(new Date(userData.lastLoginAt))
                        : "-",
                    ],

                    ["Joined", formatDate(new Date(userData?.createdAt))],

                    ["Last Updated", formatDate(new Date(userData?.updatedAt))],
                  ].map(([label, value]) => (
                    <Row key={label} label={label} value={value} />
                  ))}
                </div>

                {/* bottom note */}
                <div className="border-surface-secondary bg-bg-secondary/40 border-t p-5">
                  <p className="text-text-muted text-sm leading-6">
                    Your account information and activity are securely managed
                    and synced across Devkit systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsPanel>
        <TabsPanel value="billing">
          <div className="min-h-screen max-w-xl md:max-w-3xl lg:max-w-4xl">
            <BillingTable />
          </div>
        </TabsPanel>
        <TabsPanel value="settings">
          <div className="min-h-screen w-fit">
            <div className="bg-surface-primary border-surface-secondary divide-surface-secondary divide-x divide-y border">
              <div className="grid grid-cols-[20px_1fr] items-center px-4 py-3 transition duration-200 sm:grid-cols-[30px_1fr]">
                <span className="text-text-muted text-xs font-bold tracking-wide sm:text-lg">
                  1.
                </span>
                <ChangePassword />
              </div>
              <div className="grid grid-cols-[30px_1fr] items-center px-4 py-3 transition duration-200">
                <span className="text-text-muted text-xs font-bold tracking-wide sm:text-lg">
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
      />
    </Container>
  );
}

function Row({ label, value }: { label?: string; value: any }) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  return (
    <div className="hover:bg-surface-secondary/40 grid grid-cols-[100px_1fr] items-center px-4 py-3 transition duration-200 sm:grid-cols-[180px_1fr]">
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
