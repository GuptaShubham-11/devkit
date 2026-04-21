import { useSession } from "next-auth/react";

import { motion } from "framer-motion";
import { CheckIcon, CopyIcon, Download, TerminalIcon } from "lucide-react";

import { Template } from "@repo/shared";
import {
  Badge,
  Button,
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
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

  const installCommand =
    template.isPro && session?.user.currentPlan !== "pro"
      ? "You just got fooled! This template is Pro."
      : `devkit add ${template.slug}`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPopup className="font-inter sm:max-w-lg">
        <DialogHeader className="flex flex-row items-center justify-between gap-2">
          <div className="flex flex-col">
            <h2 className="line-clamp-1 text-xl leading-tight font-semibold">
              {template.name}
            </h2>

            <div className="text-text-muted mt-0.5 flex items-center gap-2 text-xs">
              <span>v{template.version}</span>

              {template.isRepoTemplate && (
                <span className="text-accent-primary">Repo</span>
              )}

              {(template.isPro || template.creditCost > 0) && (
                <span className="text-brand-primary">
                  c{template.creditCost}
                </span>
              )}

              {!template.isPro && template.creditCost === 0 && (
                <span className="text-text-secondary">Free</span>
              )}
            </div>
          </div>
          {/* <SponsoredLogo
                        logoUrl={template.sponserdBy.logo}
                        websiteUrl={template.sponserdBy.url}
                        sponsoredName={template.sponserdBy.name}
                    /> */}
        </DialogHeader>
        <DialogPanel>
          <div className="[&_strong]:text-foreground flex flex-col gap-4 [&_strong]:font-semibold">
            <p className="text-text-muted mt-1 line-clamp-2 text-base">
              {template.description}
            </p>
            <div>
              <Preview
                imageUrl={template.folderStructureImage}
                videoUrl={template.videoUrl}
              />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-bg-secondary flex items-center justify-between gap-2 px-4 py-2 text-base"
            >
              {template.isPro ? (
                <span className="relative flex flex-wrap items-center gap-2 font-mono text-base">
                  <div className="absolute top-0 left-0 h-8 w-full backdrop-blur-xs" />
                  <TerminalIcon className="text-accent-warning size-4" />
                  You just got fooled! This template is Pro.
                </span>
              ) : (
                <span className="flex flex-wrap items-center gap-2 font-mono text-base">
                  <TerminalIcon className="text-accent-warning size-4" />
                  {installCommand}
                </span>
              )}

              <Button
                size="icon-sm"
                variant="outline"
                onClick={() => copyToClipboard(installCommand)}
              >
                {isCopied ? (
                  <CheckIcon className="text-accent-success" />
                ) : (
                  <CopyIcon />
                )}
              </Button>
            </motion.div>
            <div className="flex flex-wrap gap-1">
              {[...template.stack, ...template.tags].map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  size={"lg"}
                  className="bg-surface-secondary text-text-secondary px-2 py-0.5 font-light capitalize"
                >
                  {tech}
                </Badge>
              ))}
            </div>
            <span className="text-text-muted text-right text-sm">
              Last updated: {formatDate(template.updatedAt)}
            </span>
          </div>
        </DialogPanel>
        <DialogFooter className="sm:justify-between">
          <DataIndicator
            isPublished={template.isPublished}
            isFeatured={template.isFeatured}
            isSponsored={template.isSponsored}
            isPro={template.isPro}
            isDeleted={template.isDeleted}
          />
          <div className="flex items-center justify-end text-base">
            <span className="text-text-secondary flex flex-wrap items-center gap-1">
              <Download className="text-accent-success size-4" />
              {template.downloads}
            </span>
          </div>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
