"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  Download,
  Edit,
  ExternalLink,
  Eye,
  MoreVerticalIcon,
  ScanEyeIcon,
} from "lucide-react";

import { Template } from "@repo/shared";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Menu,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from "@repo/ui";

import { AdminAccess } from "../core/admin-access";
import { DataIndicator } from "./data-indicator";
import { UpdateTemplateForm } from "./update-template-form";
import { ViewTemplate } from "./view-template";

export const TemplateCard = ({ template }: { template: Template }) => {
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleUpdateOpen = () => setUpdateOpen(true);

  return (
    <>
      <Card className="font-inter group bg-surface-primary relative max-w-xs pb-0">
        <CardHeader className="flex items-start justify-between gap-2">
          <div className="flex flex-col">
            <h3 className="line-clamp-1 text-base leading-tight font-semibold">
              {template.name}
            </h3>

            <div className="text-text-muted mt-0.5 flex items-center gap-2 text-[11px]">
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

          <Menu>
            <MenuTrigger render={<Button variant="ghost" size={"icon-xs"} />}>
              <MoreVerticalIcon />
            </MenuTrigger>
            <MenuPopup className={"bg-surface-primary"}>
              <MenuGroup className={"text-text-secondary"}>
                <MenuGroupLabel>Actions</MenuGroupLabel>
                <MenuItem onClick={handleOpen} className="cursor-pointer">
                  <Eye className="text-text-muted" />
                  Open
                </MenuItem>
                <AdminAccess>
                  <MenuItem
                    onClick={handleUpdateOpen}
                    className="cursor-pointer"
                  >
                    <Edit className="text-text-muted" />
                    Update
                  </MenuItem>
                </AdminAccess>
              </MenuGroup>
            </MenuPopup>
          </Menu>
        </CardHeader>

        <CardContent className="-mt-2 mb-6 grid gap-4">
          <p className="text-text-muted mt-1 line-clamp-2 text-sm font-light">
            {template.description}
          </p>

          <div className="flex flex-wrap gap-1 capitalize">
            {template.stack.slice(0, 3).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="bg-surface-secondary text-text-secondary px-2 py-0.5 font-thin"
              >
                {tech}
              </Badge>
            ))}
            {template.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="bg-surface-secondary text-text-secondary px-2 py-0.5 font-thin"
              >
                {tag}
              </Badge>
            ))}
            {(template.stack.length > 3 || template.tags.length > 3) && (
              <Badge
                key={"more"}
                variant="outline"
                className="bg-surface-secondary text-text-secondary px-2 py-0.5 font-thin"
              >
                +{template.stack.length - 3 + (template.tags.length - 3)}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="bg-surface-secondary flex w-full items-center justify-between rounded-b-2xl border border-b-0 p-3">
          <DataIndicator
            isPro={template.isPro}
            isFeatured={template.isFeatured}
            isSponsored={template.isSponsored}
            isPublished={template.isPublished}
            isDeleted={template.isDeleted}
          />

          <div className="text-text-muted flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <Download className="text-accent-success size-4" />
              <span className="font-medium">
                {template.downloads.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <ScanEyeIcon className="text-text-secondary size-4" />
              <span className="font-medium">
                {template.views.toLocaleString()}
              </span>
            </div>
          </div>
        </CardFooter>

        <div className="bg-surface-secondary absolute inset-x-0 bottom-0 flex translate-y-[110%] gap-2 rounded-b-2xl border-t p-3 opacity-0 transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:translate-y-0 group-hover:opacity-100">
          <Button onClick={handleOpen} size="sm" className="flex-1">
            Use Template
          </Button>
          <Button
            disabled={
              !template.codeUrl || template.isPro || !template.withoutLogin
            }
            onClick={() => router.push(template.codeUrl ?? "")}
            size="sm"
            variant="outline"
          >
            <ExternalLink />
            Link
          </Button>
        </div>
      </Card>

      <ViewTemplate template={template} open={open} setOpen={setOpen} />

      <UpdateTemplateForm
        open={updateOpen}
        setOpen={setUpdateOpen}
        template={template}
      />
    </>
  );
};
