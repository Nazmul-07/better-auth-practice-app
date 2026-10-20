"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { UserRound, Mail, LockKeyhole, Dumbbell } from "lucide-react";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");


    try {
      const formData = new FormData(e.currentTarget);

      const name = String(formData.get("name") ?? "");
      const email = String(formData.get("email") ?? "");
      const password = String(formData.get("password") ?? "");

      const { data, error } = await signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message || "Signup failed.");
        return;
      }

      console.log("Signup successful:", data);
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090b09] px-4 py-12 text-white sm:px-6">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#ccff00]/[0.07] blur-[120px]" />
        <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-[#ccff00]/[0.05] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/10">
            <Dumbbell size={25} strokeWidth={2.5} />
          </div>

          <div>
            <h2 className="text-xl font-black tracking-[0.16em]">
              FIT<span className="text-[#ccff00]">LOG</span>
            </h2>
            <p className="mt-1 text-[9px] font-medium tracking-[0.3em] text-white/40">
              TRAIN WITH INTENT
            </p>
          </div>
        </div>

        {/* Signup Card */}
        <div className="rounded-3xl border border-white/[0.09] bg-[#121512]/95 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-9">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ccff00]/20 bg-[#ccff00]/[0.08] text-[#ccff00]">
              <UserRound size={23} />
            </div>

            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#ccff00]">
              Start your journey
            </p>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Create your <span className="text-[#ccff00]">account.</span>
            </h1>

            <p className="mt-3 text-sm leading-6 text-white/50">
              Join FitLog and take control of your workouts, build consistency,
              and track your progress.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-500/20 bg-red-500/[0.08] px-4 py-3 text-sm text-red-300"
            >
              {errorMessage}
            </div>
          )}

          <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
            {/* Name */}
            <TextField
              isRequired
              name="name"
              validate={(value) =>
                value.length < 3 ? "Name must be at least 3 characters" : null
              }
              className="w-full"
            >
              <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">
                Full Name
              </Label>

              <div className="relative">
                <UserRound
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                />
                <Input
                  name="name"
                  placeholder="Your Name"
                  className="h-12 w-full rounded-xl border border-white/10 bg-[#0b0d0b] pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus-within:border-[#ccff00]/60"
                />
              </div>

              <FieldError className="mt-2 text-xs text-red-400" />
            </TextField>

            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) =>
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                  ? "Please enter a valid email address"
                  : null
              }
              className="w-full"
            >
              <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">
                Email Address
              </Label>

              <div className="relative">
                <Mail
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className="h-12 w-full rounded-xl border border-white/10 bg-[#0b0d0b] pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus-within:border-[#ccff00]/60"
                />
              </div>

              <FieldError className="mt-2 text-xs text-red-400" />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              name="password"
              type="password"
              minLength={8}
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }

                if (!/[A-Z]/.test(value)) {
                  return "Password must contain an uppercase letter";
                }

                if (!/[0-9]/.test(value)) {
                  return "Password must contain a number";
                }

                return null;
              }}
              className="w-full"
            >
              <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">
                Password
              </Label>

              <div className="relative">
                <LockKeyhole
                  size={17}
                  className="pointer-events-none absolute left-4 top-4 text-white/35"
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-xl border border-white/10 bg-[#0b0d0b] pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus-within:border-[#ccff00]/60"
                />
              </div>

              <Description className="mt-2 text-xs leading-5 text-white/40">
                At least 8 characters, including 1 uppercase letter and 1
                number.
              </Description>

              <FieldError className="mt-2 text-xs text-red-400" />
            </TextField>

            {/* Submit & Reset */}
            <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row">
              <Button
                type="submit"
                isDisabled={loading}
                className="h-12 w-full rounded-xl bg-[#ccff00] font-bold text-black transition-all hover:bg-[#ddff55] active:scale-[0.99] disabled:opacity-60 sm:flex-1"
              >
                {loading ? "Creating account..." : "Create Account"}
              </Button>

              <Button
                type="reset"
                variant="secondary"
                isDisabled={loading}
                className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] font-semibold text-white/70 transition-colors hover:bg-white/[0.08] sm:w-auto sm:px-6"
              >
                Reset
              </Button>
            </div>
          </Form>

          {/* Footer */}
          <div className="mt-7 border-t border-white/[0.08] pt-6 text-center">
            <p className="text-sm text-white/45">
              Already have an account?{" "}
              <a
                href="/sign-in"
                className="font-bold text-[#ccff00] transition-colors hover:text-white"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="mt-6 text-center text-[10px] tracking-wide text-white/25">
          BUILT FOR CONSISTENCY. DESIGNED FOR PROGRESS.
        </p>
      </div>
    </main>
  );
}
