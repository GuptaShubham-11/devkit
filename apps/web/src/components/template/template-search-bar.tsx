"use client";

import { Fragment, useEffect, useMemo, useState } from "react";

import { CornerDownLeftIcon, Search } from "lucide-react";

import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandItem,
  CommandList,
  CommandPanel,
  CommandSeparator,
  CommandShortcut,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Kbd,
} from "@repo/ui";

import { useDebounce } from "@/hooks/core/use-debounce";
import { useSetQuery } from "@/store/template";

export function TemplateSearchBar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [search, setSearch] = useState("");

  const setQuery = useSetQuery();
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    setQuery((prev: any) => ({
      ...prev,
      search: debouncedSearch || undefined,
      offset: 0,
    }));
  }, [debouncedSearch, setQuery]);

  const filteredGroups = useMemo(() => {
    if (!search) return groupedItems;

    const lower = search.toLowerCase();

    return groupedItems.map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.label.toLowerCase().includes(lower)
      ),
    }));
  }, [search]);

  function handleItemClick(item: Item) {
    setSearch(item.value);

    setQuery((prev: any) => ({
      ...prev,
      search: item.value,
      offset: 0,
    }));

    setOpen(false);
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogPopup className="font-inter max-w-md">
        <Command items={filteredGroups}>
          <InputGroup className="rounded-t-2xl border-none py-1 ring-0 outline-0">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates..."
              size="lg"
            />
          </InputGroup>

          <CommandPanel>
            <CommandList>
              {(group: Group) => (
                <Fragment key={group.value}>
                  <CommandGroup items={group.items}>
                    <CommandGroupLabel>{group.value}</CommandGroupLabel>

                    <CommandCollection>
                      {(item: Item) => (
                        <CommandItem
                          key={item.value}
                          onClick={() => handleItemClick(item)}
                          value={item.value}
                        >
                          <span className="flex-1">{item.label}</span>
                          {item.shortcut && (
                            <CommandShortcut>{item.shortcut}</CommandShortcut>
                          )}
                        </CommandItem>
                      )}
                    </CommandCollection>
                  </CommandGroup>
                  <CommandSeparator />
                </Fragment>
              )}
            </CommandList>
          </CommandPanel>

          <CommandFooter>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Kbd>
                  <CornerDownLeftIcon />
                </Kbd>
                <span>Open</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Kbd>Esc</Kbd>
              <span>Close</span>
            </div>
          </CommandFooter>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
}

export interface Item {
  value: string;
  label: string;
  shortcut?: string;
}

export interface Group {
  value: string;
  items: Item[];
}

export const suggestions: Item[] = [
  { label: "Authentication", value: "authentication" },
  { label: "Cloud Storage", value: "cloud-storage" },
  { label: "Payment", value: "payment" },
  { label: "Next.js", value: "nextjs" },
  { label: "Artificial Intelligence (AI)", value: "ai" },
  { label: "SaaS", value: "saas" },
  { label: "React", value: "react" },
  { label: "Dashboard", value: "dashboard" },
  { label: "TailwindCSS", value: "tailwindcss" },
  { label: "Database", value: "database" },
  { label: "Landing Page", value: "landing-page" },
];

// export const sorts = [
//     { label: "Popular", value: "popular", shortcut: "⌘ P" },
//     { label: "Trending", value: "trending", shortcut: "⌘ T" },
//     { label: "New", value: "createdAt", shortcut: "⌘ N" },
//     { label: "Views", value: "views", shortcut: "⌘ V" },
//     { label: "Copies", value: "copies", shortcut: "⌘ C" },
//     { label: "Downloads", value: "downloads", shortcut: "⌘ I" },
// ];

// export const orders = [
//     { label: "Ascending", shortcut: "⌘ A", value: "asc" },
//     { label: "Descending", shortcut: "⌘ D", value: "desc" },
// ];

export const groupedItems: Group[] = [
  { items: suggestions, value: "Suggestions" },
  // { items: sorts, value: "Sort" },
  // { items: orders, value: "Order" },
];
