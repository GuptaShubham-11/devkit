"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { RotateCcwKeyIcon } from "lucide-react";

import { UpdateProfileData, updateProfileSchema } from "@repo/shared";
import {
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
  Textarea,
} from "@repo/ui";

import { FileUpload } from "@/components/core/file-upload";
import { useUpdateProfile } from "@/hooks/user/use-update-profile";
import { mapRHFErrorsToFormErrors } from "@/lib/form-error";
import { generateRandom } from "@/lib/generate-random";
import { http } from "@/lib/http";

export function EditProfile({
  open,
  onOpenChange,
  user,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  user: any;
  onSuccess?: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      profileImage: user?.profileImage,
      bio: user?.bio,
      website: user?.website,
      githubUsername: user?.githubUsername,
      // privateKey: user?.privateKey,
    },
  });

  const { loading, update } = useUpdateProfile();

  const onSubmit = async (user: UpdateProfileData) => {
    await update(user);
    onSuccess?.();
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup className="sm:max-w-sm">
        <DialogHeader className="gap-0 px-10">
          <DialogTitle className={"text-xl font-bold"}>
            Edit profile
          </DialogTitle>
          <DialogDescription>Update your account details.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-72">
          <Form errors={mapRHFErrorsToFormErrors(errors)} className="contents">
            <DialogPanel className="grid gap-4 px-10">
              <Field name="profileImage">
                <FieldLabel>Profile Image</FieldLabel>

                <FileUpload
                  type="user"
                  slug={user?._id}
                  onSuccess={(res) => setValue("profileImage", res.url)}
                />

                <FieldError />
              </Field>

              <Field name="name">
                <FieldLabel>Name</FieldLabel>
                <Input {...register("name")} placeholder="Alice" />
                <FieldError />
              </Field>

              <Field name="bio">
                <FieldLabel>Bio</FieldLabel>
                <Input {...register("bio")} placeholder="Short bio..." />
                <FieldError />
              </Field>

              <Field name="website">
                <FieldLabel>Website</FieldLabel>
                <Input {...register("website")} placeholder="https://..." />
                <FieldError />
              </Field>

              <Field name="githubUsername">
                <FieldLabel>GitHub Username</FieldLabel>
                <Input {...register("githubUsername")} placeholder="username" />
                <FieldError />
              </Field>

              {/* <Field name="">
                                <FieldLabel>Private Key</FieldLabel>
                                <div className="relative w-full">
                                    <Input {...register("privateKey")} placeholder="••••••••" />
                                    <Button
                                        type="button"
                                        size={'icon-xs'}
                                        variant="ghost"
                                        onClick={() => setValue("privateKey", '')}
                                        className="absolute top-1/2 right-2 -translate-y-1/2"
                                    >
                                        <RotateCcwKeyIcon className="w-4 h-4" />
                                    </Button>
                                </div>
                            </Field> */}
            </DialogPanel>
          </Form>
        </ScrollArea>

        <DialogFooter>
          <Button disabled={loading} onClick={() => handleSubmit(onSubmit)()}>
            {loading ? (
              <>
                <Spinner />
                updating...
              </>
            ) : (
              "Update Profile"
            )}
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
