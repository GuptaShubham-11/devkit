import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  BoxIcon,
  CheckIcon,
  CopyIcon,
  ExternalLink,
  FolderTree,
  HouseIcon,
  PackageIcon,
  Play,
  SnowflakeIcon,
  TerminalIcon,
} from "lucide-react";

import { Template } from "@repo/shared";
import {
  Badge,
  Button,
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  ScrollArea,
  Separator,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
  useCopyToClipboard,
} from "@repo/ui";

import { formatDate } from "@/lib/formate-date";

import { DataIndicator } from "./data-indicator";
import { Preview } from "./preview";
import { SponsoredLogo } from "./sponserd-logo";

export function ViewTemplate({
  template,
  setOpen,
  open,
}: {
  template: Template;
  setOpen: (open: boolean) => void;
  open: boolean;
}) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  const { data: session } = useSession();

  const router = useRouter();
  const canUse = template.isPro && session?.user.currentPlan === "pro";

  const installCommand = `devkit add ${template.slug}`;

  const isSponsored =
    template.isSponsored &&
    template.sponsoredBy !== undefined &&
    template.sponsoredBy.name !== undefined &&
    template.sponsoredBy.url !== undefined &&
    template.sponsoredBy.logo !== undefined;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPopup className="font-inter sm:max-w-4xl">
        <DialogHeader className="bg-surface-secondary/30 flex flex-row items-center justify-between gap-2 rounded-t-2xl border-b">
          <div className="flex flex-col">
            <h2 className="line-clamp-1 text-xl leading-tight font-medium">
              {template.name}
            </h2>

            <div className="text-text-muted mt-0.5 flex items-center gap-2 text-xs">
              <span>v{template.version}</span>

              {template.isRepoTemplate && (
                <span className="text-accent-primary">Repo</span>
              )}

              {(template.isPro || template.creditCost > 0) && (
                <span className="text-accent-warning">
                  c{template.creditCost}
                </span>
              )}

              {!template.isPro && template.creditCost === 0 && (
                <span className="text-text-secondary">Free</span>
              )}
            </div>
          </div>
        </DialogHeader>
        <DialogPanel className="grid w-full gap-2 sm:grid-cols-[17fr_auto_3fr]">
          <div className="p-2 sm:p-4">
            <TooltipProvider>
              <Tabs className="items-start" defaultValue="overview">
                <TabsList className={"[--radius:9999px]"}>
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <TabsTab aria-label="Overview" value="overview" />
                      }
                    >
                      <HouseIcon aria-hidden="true" />
                    </TooltipTrigger>
                    <TooltipPopup>Overview</TooltipPopup>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger
                      render={<TabsTab aria-label="Preview" value="preview" />}
                    >
                      <Play aria-hidden="true" />
                    </TooltipTrigger>
                    <TooltipPopup>Preview</TooltipPopup>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <TabsTab
                          aria-label="Folder Structure"
                          value="folder-structure"
                        />
                      }
                    >
                      <FolderTree aria-hidden="true" />
                    </TooltipTrigger>
                    <TooltipPopup>Folder Structure</TooltipPopup>
                  </Tooltip>
                </TabsList>
                <TabsPanel value="overview">
                  <div className="grid gap-4 px-2 py-1">
                    <p className="text-text-muted text-base">
                      {template.description}
                    </p>
                    <div>
                      <h5 className="text-text-secondary text-base font-semibold">
                        Features
                      </h5>
                      <ul className="text-text-muted mt-1 flex flex-col gap-1 leading-relaxed">
                        {template?.features?.map((feature) => (
                          <li className="text-sm capitalize" key={feature}>
                            <span className="text-accent-success">✓</span>{" "}
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {[...template.stack, ...template.tags].map((item) => (
                        <Badge
                          key={item}
                          variant="outline"
                          size={"lg"}
                          className="bg-surface-secondary text-text-secondary px-2 py-0.5 font-thin capitalize"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                    <Separator orientation="horizontal" />
                    <div className="flex flex-row items-center gap-2">
                      <div className="flex w-full flex-col items-center text-sm">
                        <span className="text-center text-xl font-semibold">
                          {template.downloads.toString().padStart(2, "0")}
                        </span>
                        Downloads
                      </div>
                      <Separator orientation="vertical" />
                      <div className="flex w-full flex-col items-center text-sm">
                        <span className="text-center text-xl font-semibold">
                          {template.views.toString().padStart(2, "0")}
                        </span>
                        Views
                      </div>
                      <Separator orientation="vertical" />
                      <div className="flex w-full flex-col items-center text-sm">
                        <span className="text-center text-xl font-semibold">
                          {template.copies.toString().padStart(2, "0")}
                        </span>
                        Copies
                      </div>
                    </div>
                  </div>
                </TabsPanel>
                <TabsPanel value="preview" className={"w-full"}>
                  <Preview
                    imageUrl={template?.imageUrl}
                    videoUrl={template?.videoUrl}
                  />
                </TabsPanel>
                <TabsPanel value="folder-structure" className={"w-full"}>
                  <div className="flex flex-col items-center gap-2 px-2 py-1">
                    <ScrollArea className={"h-84 max-w-72 sm:max-w-full"}>
                      <div className="bg-bg-secondary w-max rounded-2xl border p-4 sm:w-full">
                        <div className="absolute inset-0 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-size-[20px_20px] opacity-[0.07]" />
                        <pre className="text-text-secondary relative text-sm leading-relaxed whitespace-pre">
                          {template?.folderStructure}
                        </pre>
                      </div>
                    </ScrollArea>
                  </div>
                </TabsPanel>
              </Tabs>
            </TooltipProvider>
          </div>

          <Separator orientation="vertical" />

          <div className="grid items-center gap-4 p-2 sm:p-4">
            <div className="flex flex-col gap-0.5">
              <h4 className="text-text-muted text-sm font-semibold">
                Install Command
              </h4>
              <div className="bg-bg-secondary flex items-center justify-between gap-2 border pr-2 pl-2">
                <div className="flex items-center gap-2 font-mono text-sm">
                  <TerminalIcon className="text-accent-warning size-4" />
                  <ScrollArea className={"max-w-54"} scrollFade scrollbarGutter>
                    <div className="w-max pt-2">
                      {canUse
                        ? installCommand
                        : "Upgrade to Pro to use this template"}
                    </div>
                  </ScrollArea>
                </div>

                <Button
                  size="icon-sm"
                  variant="outline"
                  disabled={!canUse}
                  onClick={() => copyToClipboard(installCommand)}
                >
                  {isCopied ? (
                    <CheckIcon className="text-accent-success" />
                  ) : (
                    <CopyIcon />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              <h4 className="text-text-muted text-sm font-semibold">
                Install Dependencies
              </h4>
              <div className="bg-bg-secondary flex items-center justify-between gap-2 border pr-2 pl-2">
                <div className="flex items-center gap-2 font-mono text-sm">
                  <PackageIcon className="text-accent-warning size-4" />
                  <ScrollArea className={"max-w-54"} scrollbarGutter scrollFade>
                    <div className="w-max pt-2">
                      {template.installer.dependencies}
                    </div>
                  </ScrollArea>
                </div>

                <Button
                  size="icon-sm"
                  variant="outline"
                  disabled={!canUse}
                  onClick={() =>
                    copyToClipboard(template.installer.dependencies)
                  }
                >
                  {isCopied ? (
                    <CheckIcon className="text-accent-success" />
                  ) : (
                    <CopyIcon />
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-bg-secondary flex items-center justify-between gap-2 border pr-2 pl-2">
              <div className="flex items-center gap-2 font-mono text-sm">
                <BoxIcon className="text-accent-warning size-4" />
                <ScrollArea className={"max-w-54"} scrollbarGutter scrollFade>
                  <div className="w-max pt-2">
                    {template.installer.devDependencies}
                  </div>
                </ScrollArea>
              </div>

              <Button
                size="icon-sm"
                variant="outline"
                disabled={!canUse}
                onClick={() =>
                  copyToClipboard(template.installer.devDependencies)
                }
              >
                {isCopied ? (
                  <CheckIcon className="text-accent-success" />
                ) : (
                  <CopyIcon />
                )}
              </Button>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                size="lg"
                variant="default"
                disabled={!template.liveUrl}
                onClick={() => router.push(template.liveUrl ?? "")}
                className="bg-brand-primary hover:bg-brand-primary-600 border-brand-primary hover:border-brand-primary-600 text-text-primary font-semibold"
              >
                <SnowflakeIcon className="size-5" />
                Production Live Demo
              </Button>

              <Button
                size="lg"
                variant="secondary"
                disabled={!template.codeUrl}
                onClick={() => router.push(template.codeUrl ?? "")}
                className="text-text-primary"
              >
                <ExternalLink className="size-5" />
                View Repository
              </Button>
            </div>

            <Separator orientation="horizontal" />

            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-text-muted font-medium">Updated:</span>
                <span className="text-text-secondary">
                  {formatDate(new Date(template.updatedAt))}
                </span>
              </div>

              {template.createdAt !== template.updatedAt && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-text-muted font-medium">
                    Published:
                  </span>
                  <span className="text-text-secondary">
                    {formatDate(new Date(template.createdAt))}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm">
                <span className="text-text-muted font-medium">
                  Template Id:
                </span>
                <span className="text-text-secondary font-mono">
                  {template._id.toString().slice(-12)}
                </span>
              </div>
            </div>
          </div>
        </DialogPanel>

        <DialogFooter className="flex-row items-center justify-between sm:justify-between">
          <DataIndicator
            isPublished={template.isPublished}
            isFeatured={template.isFeatured}
            isSponsored={template.isSponsored}
            isPro={template.isPro}
            isDeleted={template.isDeleted}
          />

          {isSponsored && (
            <div className="text-text-muted flex items-center gap-2 text-xs sm:text-sm">
              Sponsored by
              <SponsoredLogo
                websiteUrl={template.sponsoredBy?.url!}
                logoUrl={template.sponsoredBy?.logo!}
                sponsoredName={template.sponsoredBy?.name!}
              />
            </div>
          )}
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
