"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { Check, Lock } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import { resetPassword } from "@/lib/auth-client";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = Object.fromEntries(
      Array.from(formData.entries(), ([key, value]) => [
        key,
        String(value),
      ]),
    );

    const resData = await resetPassword({
      newPassword: data.password,
      token: token ?? undefined,
    });

    toast.success("Your password is reset successfully!");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#101010] px-4 py-12 text-white">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#ccff00]/20 bg-[#ccff00]/10 text-[#ccff00]">
            <Lock className="h-8 w-8" />
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
            Account Security
          </p>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Reset Password
          </h1>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-gray-400">
            Create a strong new password to secure your FitLog account and
            get back to your fitness journey.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-white/10 bg-[#171717] p-6 shadow-2xl shadow-black/20 sm:p-8">
          <Form
            className="flex w-full flex-col gap-6"
            onSubmit={onSubmit}
          >
            <Fieldset className="w-full">
              <Fieldset.Legend className="mb-2 text-lg font-bold text-white">
                Create New Password
              </Fieldset.Legend>

              <Description className="mb-6 text-sm leading-6 text-gray-500">
                Choose a password you haven&apos;t used before.
              </Description>

              <TextField
                isRequired
                minLength={8}
                name="password"
                type="password"
                validate={(value) => {
                  if (value.length < 8) {
                    return "Password must be at least 8 characters";
                  }

                  if (!/[A-Z]/.test(value)) {
                    return "Password must contain at least one uppercase letter";
                  }

                  if (!/[0-9]/.test(value)) {
                    return "Password must contain at least one number";
                  }

                  return null;
                }}
              >
                <Label className="mb-2 block text-sm font-medium text-gray-200">
                  New Password
                </Label>

                <Input
                  placeholder="Enter your new password"
                  className="w-full rounded-xl border border-white/10 bg-[#101010] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus-within:border-[#ccff00]/60"
                />

                <Description className="mt-2 text-xs leading-5 text-gray-500">
                  At least 8 characters, including one uppercase letter and
                  one number.
                </Description>

                <FieldError className="mt-2 text-sm text-red-400" />
              </TextField>
            </Fieldset>

            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <Button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ccff00] px-5 py-3 font-bold text-black transition hover:bg-white"
              >
                <Check />
                Reset Password
              </Button>

              <Button
                type="reset"
                variant="secondary"
                className="w-full rounded-xl border border-white/10 bg-transparent px-5 py-3 font-semibold text-gray-300 transition hover:bg-white/5 sm:w-auto"
              >
                Reset
              </Button>
            </div>
          </Form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs leading-5 text-gray-600">
          Keep your password private. Never share it with anyone.
        </p>
      </div>
    </main>
  );
};

export default ResetPasswordForm;