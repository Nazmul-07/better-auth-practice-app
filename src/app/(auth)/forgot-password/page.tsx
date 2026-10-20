"use client";

import { requestPasswordReset } from "@/lib/auth-client";
import { Check, Envelope } from "@gravity-ui/icons";
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

const ForgotPasswordPage = () => {
  const handleForgotPassword = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    console.log("user data before submit", userData);

    const resData = await requestPasswordReset({
      email: userData.email.toString(),
      redirectTo: "/reset-password",
    });

    toast.success("An Email is sent to your email address. Please check.");
    console.log("user data after submit", resData);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#101010] px-4 py-12 text-white">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#ccff00]/20 bg-[#ccff00]/10 text-[#ccff00]">
            <Envelope className="h-8 w-8" />
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
            Account Recovery
          </p>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Forgot Password?
          </h1>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-gray-400">
            No worries. Enter the email address associated with your account
            and we&apos;ll send you a password reset link.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-white/10 bg-[#171717] p-6 shadow-2xl shadow-black/20 sm:p-8">
          <Form
            className="flex w-full flex-col gap-6"
            onSubmit={handleForgotPassword}
          >
            <Fieldset className="w-full">
              <Fieldset.Legend className="mb-2 text-lg font-bold text-white">
                Reset your password
              </Fieldset.Legend>

              <Description className="mb-6 text-sm leading-6 text-gray-500">
                We&apos;ll email you instructions to securely reset your
                password.
              </Description>

              <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                  if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                  ) {
                    return "Please enter a valid email address";
                  }

                  return null;
                }}
              >
                <Label className="mb-2 block text-sm font-medium text-gray-200">
                  Email Address
                </Label>

                <Input
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-white/10 bg-[#101010] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus-within:border-[#ccff00]/60"
                />

                <FieldError className="mt-2 text-sm text-red-400" />
              </TextField>
            </Fieldset>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ccff00] px-5 py-3 font-bold text-black transition hover:bg-white"
              >
                <Check />
                Send Reset Link
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

        {/* Footer Note */}
        <p className="mt-6 text-center text-xs leading-5 text-gray-600">
          Check your inbox after submitting. If you don&apos;t see the email,
          check your spam folder.
        </p>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;