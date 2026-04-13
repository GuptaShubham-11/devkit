"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import { LoginData, loginSchema } from "@repo/shared";
import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
  Field,
  FieldError,
  FieldLabel,
  Form,
  Input,
  Spinner,
} from "@repo/ui";

import { Logo } from "@/components/core/logo";
import { useGoogleAuthentication, useLogin } from "@/hooks";
import { mapRHFErrorsToFormErrors } from "@/lib/form-error";

import { GoogleAuthentication } from "./google-authentication";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  // Credentials Authentication
  const { loginUser, loading: loginLoading } = useLogin();

  const onSubmit = async (data: LoginData) => {
    if (loginLoading) return;

    const success = await loginUser(data);
    if (success) {
      reset();
      router.push("/dashboard");
    }
  };

  // Google Authentication
  const { googleAuthentication, loading: googleLoading } =
    useGoogleAuthentication();

  const isDisabled = loginLoading || googleLoading;

  return (
    <Card className="font-inter bg-surface-primary flex w-full max-w-sm items-center justify-center">
      <CardHeader className="flex w-full items-center justify-center gap-px">
        <Logo size={64} />
        <div className="flex flex-col items-start justify-center">
          <CardTitle className="text-xl">Sign in your account</CardTitle>
          <CardDescription>To access production code</CardDescription>
        </div>
      </CardHeader>
      <CardPanel className="w-full px-10 sm:px-14">
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
          </Field>

          <Field name="password">
            <div className="flex w-full items-center justify-between">
              <FieldLabel>Password</FieldLabel>
              <Link
                href="/auth/forgot-password"
                className="text-text-muted hover:text-text-secondary text-xs"
              >
                Forgot Password?
              </Link>
            </div>
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

          <div className="mt-2 flex items-center justify-center gap-2">
            <Button
              size={"lg"}
              disabled={isDisabled}
              type="submit"
              className="bg-brand-primary hover:bg-brand-primary-600 border-brand-primary hover:border-brand-primary-600 text-text-primary flex-1 font-semibold"
            >
              {loginLoading ? (
                <>
                  <Spinner />
                  Authenticating...
                </>
              ) : (
                "Sign In"
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
        Don't have an account?
        <Button
          onClick={() => router.push("/auth/register")}
          variant={"link"}
          className="text-text-secondary hover:text-text-primary ml-[-8]"
        >
          Sign up
        </Button>
      </CardFooter>
    </Card>
  );
};
