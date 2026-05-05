"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import { ChangePasswordData, changePasswordSchema } from "@repo/shared";
import {
  Button,
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldError,
  FieldLabel,
  Form,
  Input,
} from "@repo/ui";

import { useChangePassword } from "@/hooks/user/use-change-password";

export function ChangePassword() {
  const { update, loading } = useChangePassword();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordData) => {
    const success = await update(data);

    if (success) reset();
    setShowCurrentPassword(false);
    setShowNewPassword(false);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>
        Change Password
      </DialogTrigger>

      <DialogPopup className="font-inter sm:max-w-sm">
        <DialogHeader className="gap-1">
          <DialogTitle className="font-semibold">Change Password</DialogTitle>
          <DialogDescription>
            Make sure your new password is strong and easy to remember.
          </DialogDescription>
        </DialogHeader>

        <Form className="contents" errors={{}}>
          <DialogPanel className="grid gap-4">
            <Field name="currentPassword">
              <FieldLabel>Current Password</FieldLabel>
              <div className="relative w-full">
                <Input
                  {...register("currentPassword")}
                  aria-invalid={!!errors.currentPassword}
                  placeholder="Enter your password"
                  type={showCurrentPassword ? "text" : "password"}
                  className={"pr-6"}
                />
                <Button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  variant="ghost"
                  size="icon-xs"
                  className="text-text-muted absolute top-1/2 right-1 -translate-y-1/2"
                >
                  {showCurrentPassword ? <Eye /> : <EyeOff />}
                </Button>
              </div>
              <FieldError>{errors.currentPassword?.message}</FieldError>
            </Field>

            <Field name="newPassword">
              <FieldLabel>New Password</FieldLabel>
              <div className="relative w-full">
                <Input
                  {...register("newPassword")}
                  aria-invalid={!!errors.newPassword}
                  placeholder="Enter your password"
                  type={showNewPassword ? "text" : "password"}
                  className={"pr-6"}
                />
                <Button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  variant="ghost"
                  size="icon-xs"
                  className="text-text-muted absolute top-1/2 right-1 -translate-y-1/2"
                >
                  {showNewPassword ? <Eye /> : <EyeOff />}
                </Button>
              </div>
              <FieldError>{errors.newPassword?.message}</FieldError>
            </Field>
          </DialogPanel>

          <DialogFooter>
            <DialogClose render={<Button variant="ghost" type="button" />}>
              Cancel
            </DialogClose>

            <Button onClick={() => handleSubmit(onSubmit)()} disabled={loading}>
              {loading ? "Updating..." : "Change Password"}
            </Button>
          </DialogFooter>
        </Form>
      </DialogPopup>
    </Dialog>
  );
}
