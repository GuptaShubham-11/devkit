"use client";

import { useRouter } from "next/navigation";

import { House, MailQuestionMark } from "lucide-react";

import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui";

import { CloudQuestionMark } from "@/components/path-animation/cloud-question-mark";

import { Container } from "../core/container";

export const EmailInvalid = () => {
  const router = useRouter();

  return (
    <Container className="font-inter relative flex min-h-screen w-full items-center justify-center">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <CloudQuestionMark />
      </div>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MailQuestionMark />
          </EmptyMedia>
          <EmptyTitle>No email found</EmptyTitle>
          <EmptyDescription>
            Register with your email to get started.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => router.push("/auth/register")}>
              Create Account
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => router.push("/")}
            >
              <House />
              Home
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </Container>
  );
};
