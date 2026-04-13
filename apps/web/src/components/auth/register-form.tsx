"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import { RegisterData, registerSchema } from "@repo/shared";
import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
  Checkbox,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Form,
  Input,
  Spinner,
} from "@repo/ui";

import { Logo } from "@/components/core/logo";
import { useGoogleAuthentication, useRegister } from "@/hooks";
import { mapRHFErrorsToFormErrors } from "@/lib/form-error";

import { GoogleAuthentication } from "./google-authentication";

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isAcceptConditions, setIsAcceptConditions] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  // Credentials Authentication
  const { register: registerUser, loading: registerLoading } = useRegister();

  const onSubmit = async (data: RegisterData) => {
    if (registerLoading) return;

    const success = await registerUser(data);
    if (success) {
      setIsAcceptConditions(false);
      router.push(`/auth/verify-email?email=${encodeURIComponent(data.email)}`);
      reset();
    }
  };

  // Google Authentication
  const { googleAuthentication, loading: googleLoading } =
    useGoogleAuthentication();

  const isDisabled = !isAcceptConditions || registerLoading || googleLoading;

  return (
    <Card className="font-inter bg-surface-primary flex w-full max-w-sm items-center justify-center">
      <CardHeader className="flex w-full items-center justify-center gap-px">
        <Logo size={64} />
        <div className="flex flex-col items-start justify-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>To access production code</CardDescription>
        </div>
      </CardHeader>
      <CardPanel>
        <Form
          errors={mapRHFErrorsToFormErrors(errors)}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Field name="email">
            <FieldLabel>Email</FieldLabel>
            <Input
              {...register("email")}
              aria-invalid={!!errors.email}
              placeholder="you@example.com"
              type="email"
            />
            <FieldError />
            <FieldDescription>
              We'll send a verification code to this email.
            </FieldDescription>
          </Field>

          <Field name="password">
            <FieldLabel>Password</FieldLabel>
            <div className="relative w-full">
              <Input
                {...register("password")}
                aria-invalid={!!errors.password}
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
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

          <Field className={"mt-1"}>
            <div className="flex items-center gap-2">
              <Checkbox
                required
                checked={isAcceptConditions}
                onCheckedChange={setIsAcceptConditions}
                className={"data-checked:bg-accent-success"}
              />

              <FieldLabel className="text-text-muted md:text-md cursor-pointer text-sm">
                I accept the
                <Link
                  target="_blank"
                  href="/legal/terms"
                  className="text-text-secondary ml-[-2] hover:underline"
                >
                  terms
                </Link>
                and
                <Link
                  target="_blank"
                  href="/legal/privacy-policy"
                  className="text-text-secondary ml-[-2] hover:underline"
                >
                  privacy policy.
                </Link>
              </FieldLabel>
            </div>
          </Field>

          <div className="mt-2 flex items-center justify-center gap-2">
            <Button
              disabled={isDisabled}
              size={"lg"}
              type="submit"
              className="bg-brand-primary hover:bg-brand-primary-600 border-brand-primary hover:border-brand-primary-600 text-text-primary flex-1 font-semibold"
            >
              {registerLoading ? (
                <>
                  <Spinner />
                  Creating
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            <GoogleAuthentication
              googleAuthentication={googleAuthentication}
              googleLoading={googleLoading}
            />
          </div>
        </Form>
      </CardPanel>
      <CardFooter className="text-text-muted text-sm">
        Already have an account?
        <Button
          onClick={() => router.push("/auth/login")}
          variant={"link"}
          className="text-text-secondary hover:text-text-primary ml-[-8]"
        >
          Sign in
        </Button>
      </CardFooter>
    </Card>
  );
};
