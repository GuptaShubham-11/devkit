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
import { mapRHFErrorsToFormErrors } from "@/lib/form-error";

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
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = form;

  const { update, loading } = useUpdateTemplate();

  const watchSlug = watch("slug");
  const isSponsored = watch("isSponsored");

  useEffect(() => {
    if (template && open) {
      reset(template);
    }
  }, [template, open, reset]);

  useEffect(() => {
    if (!isSponsored) {
      setValue(
        "sponsoredBy",
        { name: "", url: "", logo: "" },
        { shouldDirty: true, shouldValidate: true }
      );
    }
  }, [isSponsored, setValue]);

  const onSubmit = async (data: CreateTemplateInput) => {
    console.log(data);

    if (loading) return;

    const response = await update(template._id, data);

    if (response) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPopup className="font-inter h-full sm:max-w-sm">
        <DialogHeader className="gap-0 pb-0">
          <DialogTitle className="text-xl">Update Template</DialogTitle>
          <DialogDescription>Update your existing template</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-80">
          <DialogPanel className="grid gap-4">
            <Form errors={mapRHFErrorsToFormErrors(errors)}>
              <Field name="name">
                <FieldLabel>Name</FieldLabel>
                <Input {...register("name")} />
                <FieldError />
              </Field>

              <Field name="slug">
                <FieldLabel>Slug</FieldLabel>
                <Input {...register("slug")} />
                <FieldError />
              </Field>

              <Field name="description">
                <FieldLabel>Description</FieldLabel>
                <Textarea {...register("description")} />
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

              {/* STACK */}
              <Controller
                control={control}
                name="stack"
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <Input
                      placeholder="Add stack (press enter)"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const value = e.currentTarget.value
                            .trim()
                            .toLowerCase();
                          if (!value) return;

                          if (!field.value?.includes(value)) {
                            field.onChange([...field.value, value]);
                          }

                          e.currentTarget.value = "";
                        }
                      }}
                    />

                    <div className="flex flex-wrap gap-1">
                      {field.value?.map((item: string, i: number) => (
                        <Badge
                          key={i}
                          onClick={() =>
                            field.onChange(
                              field.value.filter((v: string) => v !== item)
                            )
                          }
                          className="cursor-pointer"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              />

              {/* TAGS */}
              <Controller
                control={control}
                name="tags"
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <Input
                      placeholder="Add tag (press enter)"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const value = e.currentTarget.value
                            .trim()
                            .toLowerCase();
                          if (!value) return;

                          if (!field.value?.includes(value)) {
                            field.onChange([...field.value, value]);
                          }

                          e.currentTarget.value = "";
                        }
                      }}
                    />

                    <div className="flex flex-wrap gap-1">
                      {field.value?.map((item: string, i: number) => (
                        <Badge
                          key={i}
                          onClick={() =>
                            field.onChange(
                              field.value.filter((v: string) => v !== item)
                            )
                          }
                          className="cursor-pointer"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              />

              <Controller
                control={control}
                name="features"
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <Input
                      placeholder="Add feature (press enter)"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const value = e.currentTarget.value
                            .trim()
                            .toLowerCase();
                          if (!value) return;

                          if (!field.value?.includes(value)) {
                            field.onChange([...field.value, value]);
                          }

                          e.currentTarget.value = "";
                        }
                      }}
                    />

                    <div className="flex flex-wrap gap-1">
                      {field.value?.map((item: string, i: number) => (
                        <Badge
                          key={i}
                          onClick={() =>
                            field.onChange(
                              field.value.filter((v: string) => v !== item)
                            )
                          }
                          className="cursor-pointer"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              />

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
                  name="withoutLogin"
                >
                  <FieldLabel>Without Login</FieldLabel>
                  <Controller
                    control={control}
                    name="withoutLogin"
                    render={({ field }) => (
                      <Switch
                        className="data-checked:bg-text-muted"
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

              <Field name="repoUrl">
                <FieldLabel>Repo URL</FieldLabel>
                <Input {...register("repoUrl")} />
                <FieldError />
              </Field>

              <Field name="liveUrl">
                <FieldLabel>Live URL</FieldLabel>
                <Input {...register("liveUrl")} />
                <FieldError />
              </Field>

              <Field name="codeUrl">
                <FieldLabel>Code URL</FieldLabel>
                <Input {...register("codeUrl")} />
                <FieldError />
              </Field>

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

              <Field name="folderStructure">
                <FieldLabel>Folder Structure</FieldLabel>
                <Textarea placeholder="" {...register("folderStructure")} />
                <FieldError />
              </Field>

              {/* FILE UPLOAD FIX (important) */}
              <Field name="videoUrl">
                <FieldLabel>Template Video</FieldLabel>
                <Controller
                  control={control}
                  name="videoUrl"
                  render={({ field }) => (
                    <FileUpload
                      type="template-video"
                      slug={watchSlug}
                      onSuccess={(res) => field.onChange(res.url)}
                    />
                  )}
                />
                <FieldError />
              </Field>

              <Field name="imageUrl">
                <FieldLabel>Template Image</FieldLabel>
                <Controller
                  control={control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FileUpload
                      type="template-image"
                      slug={watchSlug}
                      onSuccess={(res) => field.onChange(res.url)}
                    />
                  )}
                />
                <FieldError />
              </Field>
            </Form>
          </DialogPanel>
        </ScrollArea>

        <DialogFooter>
          <Button disabled={loading} onClick={() => handleSubmit(onSubmit)()}>
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
      </DialogPopup>
    </Dialog>
  );
};
