"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

import { ResetPasswordData, resetPasswordSchema } from "@repo/shared";
import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Form,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  Spinner,
} from "@repo/ui";

import { Logo } from "@/components/core/logo";
import { useForgotPassword, useRequestOtpEmail } from "@/hooks";
import { mapRHFErrorsToFormErrors } from "@/lib/form-error";

export const ForgotPasswordForm = () => {
  const [timer, setTimer] = useState(0);
  const [invalid, setInvalid] = useState(false);
  const [isOtpSended, setIsOtpSended] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  // timer for resend
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const email = watch("email");
  const { reset: resetPassword, loading: resetLoading } = useForgotPassword();

  const onSubmit = async (data: ResetPasswordData) => {
    const response = await resetPassword(data);

    if (!response) {
      setInvalid(true);
      return;
    }

    router.push("/auth/login");
  };

  const { requestOtp, loading: otpLoading } = useRequestOtpEmail();

  const handleResetPasswordOtpSendToEmail = async () => {
    if (timer > 0 || otpLoading) return;

    const response = await requestOtp({
      email,
      type: "resetPassword",
    });

    if (response) {
      setTimer(60);
      setIsOtpSended(true);
    }
  };

  const otp = watch("otp");
  useEffect(() => {
    if (otp?.length < 6) {
      setInvalid(false);
    }
  }, [otp]);

  const isOtpReady = isOtpSended && !otpLoading;
  const isDisabled = !isValid || resetLoading || !isOtpReady;

  return (
    <Card className="font-inter bg-surface-primary flex w-full max-w-sm items-center justify-center">
      <CardHeader className="flex w-full items-center justify-center gap-px">
        <Logo size={64} />
        <div className="flex flex-col items-start justify-center">
          <CardTitle className="text-xl">Reset your password</CardTitle>
          <CardDescription>We will send you a code to email</CardDescription>
        </div>
      </CardHeader>
      <CardPanel className="w-full px-10 sm:px-14">
        <Form
          onSubmit={handleSubmit(onSubmit)}
          errors={mapRHFErrorsToFormErrors(errors)}
        >
          <Field name="email">
            <FieldLabel>Email</FieldLabel>
            <div className="relative w-full">
              <Input
                {...register("email")}
                aria-invalid={!!errors.email}
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                disabled={isOtpSended}
              />

              <Button
                type="button"
                size={"icon-xs"}
                onClick={handleResetPasswordOtpSendToEmail}
                disabled={isOtpSended || timer > 0 || otpLoading || !email}
                className="bg-accent-success hover:bg-accent-success/80 border-bg-accent-success hover:border-bg-accent-success/80 absolute top-1/2 right-1 -translate-y-1/2 border-0"
              >
                {otpLoading ? <Spinner /> : <ArrowRight />}
              </Button>
            </div>
            <FieldError />
          </Field>
          <Field name="otp">
            <FieldLabel>Verfication code</FieldLabel>
            <InputOTP
              aria-label="Verification code"
              maxLength={6}
              disabled={resetLoading || !isOtpReady}
              onChange={(nextValue) => {
                setValue("otp", nextValue, { shouldValidate: true });
              }}
              value={watch("otp")}
              aria-disabled={resetLoading || !isOtpReady}
            >
              <InputOTPGroup>
                <InputOTPSlot
                  aria-invalid={invalid || !!errors.otp}
                  index={0}
                />
                <InputOTPSlot
                  aria-invalid={invalid || !!errors.otp}
                  index={1}
                />
                <InputOTPSeparator />
                <InputOTPSlot
                  aria-invalid={invalid || !!errors.otp}
                  index={2}
                />
                <InputOTPSlot
                  aria-invalid={invalid || !!errors.otp}
                  index={3}
                />
                <InputOTPSeparator />
                <InputOTPSlot
                  aria-invalid={invalid || !!errors.otp}
                  index={4}
                />
                <InputOTPSlot
                  aria-invalid={invalid || !!errors.otp}
                  index={5}
                />
              </InputOTPGroup>
            </InputOTP>
            <FieldError />
            <FieldDescription>
              Please check your <b className={"text-accent-warning"}>spam</b>{" "}
              folder if you don&apos;t see the code.
            </FieldDescription>
          </Field>

          <Field name="newPassword">
            <FieldLabel>New Password</FieldLabel>
            <div className="relative w-full">
              <Input
                {...register("newPassword")}
                aria-invalid={!!errors.newPassword}
                type={showPassword ? "text" : "password"}
                disabled={resetLoading || !isOtpReady}
                placeholder="Enter new password"
                className={"pr-6"}
              />
              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                variant="ghost"
                size="icon-xs"
                className="text-text-muted absolute top-1/2 right-1 -translate-y-1/2"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </Button>
            </div>
            <FieldError />
          </Field>

          <Button
            size={"lg"}
            disabled={isDisabled}
            type="submit"
            className="bg-brand-primary hover:bg-brand-primary-600 border-brand-primary hover:border-brand-primary-600 text-text-primary mt-2 flex-1 font-semibold"
          >
            {resetLoading ? (
              <>
                <Spinner />
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </Form>
      </CardPanel>

      <CardFooter className="text-text-muted text-sm">
        Didn&apos;t receive code?
        <Button
          onClick={handleResetPasswordOtpSendToEmail}
          disabled={otpLoading || timer > 0}
          variant={"link"}
          className="text-text-secondary hover:text-text-primary ml-[-8]"
        >
          {otpLoading && isOtpSended ? (
            <Spinner />
          ) : timer > 0 ? (
            `Resend in ${timer}s`
          ) : (
            "Resend"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
