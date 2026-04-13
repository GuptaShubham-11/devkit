"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";

import { VerifyOtpData, verifyOtpSchema } from "@repo/shared";
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
import { useRequestOtpEmail, useVerifyEmail } from "@/hooks";
import { mapRHFErrorsToFormErrors } from "@/lib/form-error";

export const EmailVerification = ({ email }: { email: string }) => {
  const [invalid, setInvalid] = useState(false);
  const [timer, setTimer] = useState(60);
  const router = useRouter();

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
  } = useForm<VerifyOtpData>({
    resolver: zodResolver(verifyOtpSchema),
    mode: "onChange",
    defaultValues: {
      email,
      otp: "",
    },
  });

  const otp = watch("otp");
  useEffect(() => {
    if (otp.length === 6) {
      setInvalid(false);
      handleSubmit(onSubmit)();
    }
  }, [otp]);

  const { emailVerification, loading: verifyLoading } = useVerifyEmail();

  const onSubmit = async (data: VerifyOtpData) => {
    const response = await emailVerification(data);

    if (!response) setInvalid(true);
    router.push("/auth/login");
  };

  const { requestOtp, loading: otpLoading } = useRequestOtpEmail();

  const handleResend = async () => {
    try {
      const response = await requestOtp({
        email,
        type: "register",
      });

      if (response) setTimer(60);
    } catch {
      // console.log('Failed to request otp:',error);
    }
  };

  const isDisabled = !isValid || verifyLoading;

  return (
    <Card className="font-inter bg-surface-primary flex w-full max-w-sm items-center justify-center">
      <CardHeader className="flex w-full items-center justify-center gap-px">
        <Logo size={64} />
        <div className="flex flex-col items-start justify-center">
          <CardTitle className="text-xl">Verify your account</CardTitle>
          <CardDescription>We sent a code to your email</CardDescription>
        </div>
      </CardHeader>
      <CardPanel className="w-full px-10 sm:px-14">
        <Form
          onSubmit={handleSubmit(onSubmit)}
          errors={mapRHFErrorsToFormErrors(errors)}
        >
          <Field name="email">
            <FieldLabel>Email</FieldLabel>
            <Input
              {...register("email")}
              aria-invalid={!!errors.email}
              type="email"
              disabled
            />
            <FieldError />
          </Field>
          <Field name="otp">
            <FieldLabel>Verfication code</FieldLabel>
            <InputOTP
              aria-label="Verification code"
              maxLength={6}
              disabled={verifyLoading}
              onChange={(nextValue) => {
                setValue("otp", nextValue);
              }}
              value={watch("otp")}
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

          <Button
            size={"lg"}
            disabled={isDisabled}
            type="submit"
            className="bg-brand-primary hover:bg-brand-primary-600 border-brand-primary hover:border-brand-primary-600 text-text-primary mt-2 flex-1 font-semibold"
          >
            {verifyLoading ? (
              <>
                <Spinner />
                Verifying...
              </>
            ) : (
              "Verify Account"
            )}
          </Button>
        </Form>
      </CardPanel>

      <CardFooter className="text-text-muted text-sm">
        Didn&apos;t received code?
        <Button
          onClick={handleResend}
          disabled={otpLoading || timer > 0 || verifyLoading}
          variant={"link"}
          className="text-text-secondary hover:text-text-primary ml-[-8]"
        >
          {otpLoading ? (
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
