"use client";

import { useState } from "react";

import { usePathname } from "next/navigation";

import { SearchIcon } from "lucide-react";

import { Button, Kbd, KbdGroup, Separator } from "@repo/ui";

import { TemplateSearchBar } from "@/components/template/template-search-bar";

import { DiscoverMenu } from "./discover-menu";
import { Logo } from "./logo";
import { UserAvatar } from "./user-avatar";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isTemplatesPage = pathname === "/templates";

  return (
    <>
      <header className="bg-bg-primary font-inter absolute top-0 z-50 flex h-14 w-full items-center justify-center border">
        <nav className="flex w-full max-w-5xl items-center justify-between p-4">
          <Logo size={72} />

          <div className="flex gap-2">
            {isTemplatesPage && (
              <Button
                onClick={() => setIsOpen(true)}
                variant="outline"
                className="text-text-muted"
              >
                <SearchIcon aria-hidden="true" className="text-text-primary" />
                Search
                <KbdGroup className="-me-1">
                  <Kbd>&#8984;</Kbd>
                  <Kbd>J</Kbd>
                </KbdGroup>
              </Button>
            )}

            <DiscoverMenu />

            <Separator orientation="vertical" />

            <UserAvatar />
          </div>
        </nav>
      </header>

      <TemplateSearchBar open={isOpen} setOpen={setIsOpen} />
    </>
  );
};
