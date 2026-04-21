"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { CreateTemplateInput, createTemplateSchema } from "@repo/shared";
import {
  Badge,
  Button,
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  Field,
  FieldError,
  FieldLabel,
  Form,
  Input,
  ScrollArea,
  Spinner,
  Switch,
  Textarea,
} from "@repo/ui";

import { useUpdateTemplate } from "@/hooks";

import { FileUpload } from "../core/file-upload";

type UpdateTemplateProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  template: CreateTemplateInput & { _id: string };
};

export const UpdateTemplateForm = ({
  open,
  setOpen,
  template,
}: UpdateTemplateProps) => {
  const form = useForm<CreateTemplateInput>({
    resolver: zodResolver(createTemplateSchema),
    mode: "onChange",
    defaultValues: template,
  });

  const {
    register,
    control,
    setValue,
    getValues,
    watch,
    formState: { isValid, isSubmitting },
    handleSubmit,
    reset,
  } = form;

  const { update, loading } = useUpdateTemplate();

  const watchName = watch("name");
  const watchSlug = watch("slug");
  const watchStack = watch("stack") ?? [];
  const watchTags = watch("tags") ?? [];
  const isSponsored = watch("isSponsored");

  useEffect(() => {
    if (template && open) {
      reset(template);
    }
  }, [template, open, reset]);

  useEffect(() => {
    if (!watchSlug && watchName?.trim()) {
      const nextSlug = watchName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      setValue("slug", nextSlug, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [watchName, watchSlug, setValue]);

  useEffect(() => {
    if (!isSponsored) {
      setValue("sponsoredBy", {
        name: "",
        url: "",
        logo: "",
      });
    }
  }, [isSponsored, setValue]);

  const addItem = (field: "stack" | "tags", rawValue: string) => {
    const value = rawValue.trim().toLowerCase();
    if (!value) return;

    const current = getValues(field) ?? [];
    if (current.includes(value)) return;

    setValue(field, [...current, value], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const removeItem = (field: "stack" | "tags", item: string) => {
    const current = getValues(field) ?? [];
    setValue(
      field,
      current.filter((v) => v !== item),
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  const onSubmit = async (data: CreateTemplateInput) => {
    const response = await update(template._id, data);

    if (response) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPopup className="font-inter sm:max-w-sm">
        <DialogHeader className="gap-0 pb-0">
          <DialogTitle className="text-xl">Update Template</DialogTitle>
          <DialogDescription>Update your existing template</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="contents">
          <ScrollArea className="h-80">
            <DialogPanel className="grid gap-4">
              <Field name="name">
                <FieldLabel>Name</FieldLabel>
                <Input {...register("name")} />
                <FieldError />
              </Field>

              <Field name="slug">
                <FieldLabel>Slug</FieldLabel>
                <Input
                  placeholder="nextjs-saas-starter"
                  {...register("slug")}
                />
                <FieldError />
              </Field>

              <Field name="description">
                <FieldLabel>Description</FieldLabel>
                <Textarea
                  placeholder="Next.js SaaS Starter for your business"
                  {...register("description")}
                />
                <FieldError />
              </Field>

              <div className="flex w-full items-center gap-2">
                <Field name="stack" className="flex-1">
                  <FieldLabel>Stack</FieldLabel>
                  <Input
                    placeholder="typescript"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const el = e.currentTarget;
                        addItem("stack", el.value);
                        el.value = "";
                      }
                    }}
                  />
                  <FieldError />
                </Field>

                <Field name="tags" className="flex-1">
                  <FieldLabel>Tag</FieldLabel>
                  <Input
                    placeholder="saas"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const el = e.currentTarget;
                        addItem("tags", el.value);
                        el.value = "";
                      }
                    }}
                  />
                  <FieldError />
                </Field>
              </div>

              <div className="flex w-full flex-wrap gap-1">
                {watchStack.map((item, index) => (
                  <Badge
                    key={`stack-${item}-${index}`}
                    onClick={() => removeItem("stack", item)}
                    variant="outline"
                    className="bg-surface-secondary text-text-secondary cursor-pointer px-2 py-0.5 text-xs font-light capitalize"
                  >
                    {item}
                  </Badge>
                ))}
                {watchTags.map((item, index) => (
                  <Badge
                    key={`tag-${item}-${index}`}
                    onClick={() => removeItem("tags", item)}
                    variant="outline"
                    className="bg-surface-secondary text-text-secondary cursor-pointer px-2 py-0.5 text-xs font-light capitalize"
                  >
                    {item}
                  </Badge>
                ))}
              </div>

              <Field name="repoUrl">
                <FieldLabel>Repo URL</FieldLabel>
                <Input
                  placeholder="https://github.com/nextjs-saas-starter"
                  {...register("repoUrl")}
                />
                <FieldError />
              </Field>

              <div className="flex w-full items-end justify-center gap-2">
                <Field name="version" className="flex-1">
                  <FieldLabel>Version</FieldLabel>
                  <Input placeholder="1.0.0" {...register("version")} />
                  <FieldError />
                </Field>

                <Field name="creditCost" className="flex-1">
                  <FieldLabel>Credit Cost</FieldLabel>
                  <Input
                    type="number"
                    min={0}
                    placeholder="0"
                    {...register("creditCost", {
                      setValueAs: (v) => (v === "" ? 0 : Number(v)),
                    })}
                  />
                  <FieldError />
                </Field>
              </div>

              <div className="grid w-full grid-cols-2 gap-2">
                <Field
                  className="bg-surface-secondary flex-row items-center justify-between gap-2 rounded-xs border p-1.5"
                  name="isPro"
                >
                  <FieldLabel>Premium</FieldLabel>
                  <Controller
                    control={control}
                    name="isPro"
                    render={({ field }) => (
                      <Switch
                        className="data-checked:bg-brand-primary"
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <FieldError />
                </Field>

                <Field
                  className="bg-surface-secondary flex-row items-center justify-between gap-2 rounded-xs border p-1.5"
                  name="isPublished"
                >
                  <FieldLabel>Published</FieldLabel>
                  <Controller
                    control={control}
                    name="isPublished"
                    render={({ field }) => (
                      <Switch
                        className="data-checked:bg-accent-primary"
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <FieldError />
                </Field>

                <Field
                  className="bg-surface-secondary flex-row items-center justify-between gap-2 rounded-xs border p-1.5"
                  name="isFeatured"
                >
                  <FieldLabel>Featured</FieldLabel>
                  <Controller
                    control={control}
                    name="isFeatured"
                    render={({ field }) => (
                      <Switch
                        className="data-checked:bg-accent-success"
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <FieldError />
                </Field>

                <Field
                  className="bg-surface-secondary flex-row items-center justify-between gap-2 rounded-xs border p-1.5"
                  name="isRepoTemplate"
                >
                  <FieldLabel>Repository</FieldLabel>
                  <Controller
                    control={control}
                    name="isRepoTemplate"
                    render={({ field }) => (
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <FieldError />
                </Field>

                <Field
                  className="bg-surface-secondary flex-row items-center justify-between gap-2 rounded-xs border p-1.5"
                  name="isSponsored"
                >
                  <FieldLabel>Sponsored</FieldLabel>
                  <Controller
                    control={control}
                    name="isSponsored"
                    render={({ field }) => (
                      <Switch
                        className="data-checked:bg-accent-warning"
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <FieldError />
                </Field>

                <Field
                  className="bg-surface-secondary flex-row items-center justify-between gap-2 rounded-xs border p-1.5"
                  name="isDeleted"
                >
                  <FieldLabel>Deleted</FieldLabel>
                  <Controller
                    control={control}
                    name="isDeleted"
                    render={({ field }) => (
                      <Switch
                        className="data-checked:bg-accent-error"
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <FieldError />
                </Field>
              </div>

              {isSponsored && (
                <div className="grid gap-4">
                  <Field name="sponsoredBy.name">
                    <FieldLabel>Sponsor Name</FieldLabel>
                    <Input
                      placeholder="Vercel"
                      {...register("sponsoredBy.name")}
                    />
                    <FieldError />
                  </Field>

                  <Field name="sponsoredBy.url">
                    <FieldLabel>Sponsor URL</FieldLabel>
                    <Input
                      placeholder="https://vercel.com"
                      {...register("sponsoredBy.url")}
                    />
                    <FieldError />
                  </Field>

                  <Field name="sponsoredBy.logo">
                    <FieldLabel>Sponsor Logo</FieldLabel>
                    <Input
                      placeholder="https://cdn.example.com/logo.png"
                      {...register("sponsoredBy.logo")}
                    />
                    <FieldError />
                  </Field>
                </div>
              )}

              <div className="grid gap-4">
                <Field name="installer.name">
                  <FieldLabel>Installer Name</FieldLabel>
                  <Input placeholder="pnpm" {...register("installer.name")} />
                  <FieldError />
                </Field>

                <Field name="installer.installCommand">
                  <FieldLabel>Install Command</FieldLabel>
                  <Input
                    placeholder="pnpm install"
                    {...register("installer.installCommand")}
                  />
                  <FieldError />
                </Field>

                <Field name="installer.addDependenciesCommand">
                  <FieldLabel>Add Dependencies Command</FieldLabel>
                  <Input
                    placeholder="pnpm add"
                    {...register("installer.addDependenciesCommand")}
                  />
                  <FieldError />
                </Field>

                <Field name="installer.addDevDependenciesCommand">
                  <FieldLabel>Add Dev Dependencies Command</FieldLabel>
                  <Input
                    placeholder="pnpm add -D"
                    {...register("installer.addDevDependenciesCommand")}
                  />
                  <FieldError />
                </Field>

                <Field name="installer.dependencies">
                  <FieldLabel>Dependencies</FieldLabel>
                  <Textarea
                    placeholder="react next zod"
                    {...register("installer.dependencies")}
                  />
                  <FieldError />
                </Field>

                <Field name="installer.devDependencies">
                  <FieldLabel>Dev Dependencies</FieldLabel>
                  <Textarea
                    placeholder="typescript eslint prettier"
                    {...register("installer.devDependencies")}
                  />
                  <FieldError />
                </Field>
              </div>

              <Field name="videoUrl">
                <FieldLabel>Video</FieldLabel>
                <FileUpload
                  type="template-video"
                  slug={watchSlug}
                  onSuccess={(res) => {
                    setValue("videoUrl", res.url, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }}
                />
                <FieldError />
              </Field>
            </DialogPanel>
          </ScrollArea>

          <DialogFooter>
            <Button
              disabled={loading || isSubmitting || !isValid}
              type="submit"
            >
              {loading ? (
                <>
                  <Spinner />
                  Updating...
                </>
              ) : (
                "Update Template"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  );
};
