
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import {
  Button,
  Card,
  Checkbox,
  Description,
  FieldError,
  Form,
  InputGroup,
  Label,
  Link,
  TextField,
} from "@heroui/react";
type IconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
};

const ArrowRight = ({ size = 24, strokeWidth = 2, className }: IconProps) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const Eye = ({ size = 24, strokeWidth = 2, className }: IconProps) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOff = ({ size = 24, strokeWidth = 2, className }: IconProps) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a15.8 15.8 0 0 1-3.1 3.8M6.2 6.2C3.5 8 2 12 2 12s3.6 7 10 7c1 0 2-.2 2.9-.5" />
  </svg>
);

const LockKeyhole = ({ size = 24, strokeWidth = 2, className }: IconProps) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="10" width="18" height="11" rx="2" />
    <path d="M7 10V7a5 5 0 0 1 10 0v3m-5 4v3" />
  </svg>
);

const Mail = ({ size = 24, strokeWidth = 2, className }: IconProps) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const ShieldCheck = ({ size = 24, strokeWidth = 2, className }: IconProps) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const Dumbbell = ({ size = 24, strokeWidth = 2, className }: IconProps) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6.5 6.5 11 11m-14-8 5-5m6 16 5-5M3 9l3-3m12 12 3-3M2 12l4-4m12 12 4-4" />
  </svg>
);

export default function SignInPage() {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const rememberMe = formData.get("rememberMe") === "on";

    try {
      const { error } = await signIn.email({
        email,
        password,
        rememberMe,
        callbackURL: "/",
      });

      if (error) {
        setAuthError(
          error.message || "Invalid email or password. Please try again."
        );
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      setAuthError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError(null);

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      setAuthError("Unable to sign in with Google. Please try again.");
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090b09] px-4 py-12 text-white selection:bg-[#ccff00] selection:text-black sm:px-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#ccff00]/[0.07] blur-[120px]" />
        <div className="absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-[#ccff00]/5 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-110">
        {/* Brand */}
        <Link
          href="/"
          className="mb-9 flex items-center justify-center gap-3 text-white no-underline"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ccff00] text-black shadow-[0_0_30px_rgba(204,255,0,0.12)]">
            <Dumbbell size={23} strokeWidth={2.5} />
          </div>

          <div className="leading-none">
            <p className="text-xl font-black tracking-[0.16em]">
              FIT<span className="text-[#ccff00]">LOG</span>
            </p>
            <p className="mt-1.5 text-[9px] font-medium tracking-[0.3em] text-white/40">
              TRAIN WITH INTENT
            </p>
          </div>
        </Link>

        {/* Sign-in card */}
        <Card className="rounded-3xl border border-white/9 bg-[#121512]/95 p-6 shadow-2xl shadow-black/30 sm:p-9">
          <div className="mb-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ccff00]/20 bg-[#ccff00]/8 text-[#ccff00]">
              <LockKeyhole size={22} />
            </div>

            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#ccff00]">
              Your training starts here
            </p>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Welcome <span className="text-[#ccff00]">back.</span>
            </h1>

            <p className="mt-3 text-sm leading-6 text-white/50">
              Sign in to access your workouts, track your progress, and stay
              consistent.
            </p>
          </div>

          {/* Error alert */}
          {authError && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 text-sm text-red-300"
            >
              {authError}
            </div>
          )}

          <Form
            className="flex flex-col gap-5"
            onSubmit={onSubmit}
          >
            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              autoComplete="email"
              validate={(value) => {
                if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                ) {
                  return "Enter a valid email address.";
                }

                return null;
              }}
              className="w-full"
            >
              <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">
                Email address
              </Label>

              <InputGroup className="h-12 w-full rounded-xl border border-white/10 bg-[#0b0d0b] transition-colors focus-within:border-[#ccff00]/60">
                <InputGroup.Prefix className="pl-3 text-white/35">
                  <Mail size={17} />
                </InputGroup.Prefix>

                <InputGroup.Input
                  placeholder="you@example.com"
                  className="text-sm text-white placeholder:text-white/25"
                />
              </InputGroup>

              <FieldError className="mt-2 text-xs text-red-400" />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              name="password"
              type="password"
              autoComplete="current-password"
              validate={(value) => {
                if (!value) return "Password is required.";
                return null;
              }}
              className="w-full"
            >
              <div className="mb-2 flex items-center justify-between">
                <Label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Password
                </Label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-[#ccff00] no-underline transition-colors hover:text-white"
                >
                  Forgot password?
                </Link>
              </div>

              <InputGroup className="h-12 w-full rounded-xl border border-white/10 bg-[#0b0d0b] transition-colors focus-within:border-[#ccff00]/60">
                <InputGroup.Prefix className="pl-3 text-white/35">
                  <LockKeyhole size={17} />
                </InputGroup.Prefix>

                <InputGroup.Input
                  type={isVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  className="text-sm text-white placeholder:text-white/25"
                />

                <InputGroup.Suffix className="pr-1">
                  <Button
                    isIconOnly
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-label={
                      isVisible ? "Hide password" : "Show password"
                    }
                    onPress={() => setIsVisible((prev) => !prev)}
                    className="text-white/40 hover:text-[#ccff00]"
                  >
                    {isVisible ? <EyeOff size={17} /> : <Eye size={17} />}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>

              <FieldError className="mt-2 text-xs text-red-400" />
            </TextField>

            {/* Remember me */}
            <div className="flex w-full items-center justify-between gap-3">
              <Checkbox name="rememberMe" defaultSelected>
                <span className="text-xs text-white/55">
                  Remember me
                </span>
              </Checkbox>

              <div className="flex items-center gap-1.5 text-[10px] text-white/35">
                <ShieldCheck size={13} className="text-[#ccff00]/70" />
                Secure sign in
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              isDisabled={isLoading}
              className="group mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#ccff00] font-bold text-black transition-all hover:bg-[#ddff55] active:scale-[0.99] disabled:opacity-60"
            >
              {isLoading ? (
                "Signing you in..."
              ) : (
                <>
                  Sign In
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </Button>

            {/* Divider */}
            <div className="flex w-full items-center gap-4 py-1">
              <div className="h-px flex-1 bg-white/9" />
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-white/9" />
            </div>

            {/* Google sign in */}
            <Button
              type="button"
              variant="outline"
              onPress={handleGoogleSignIn}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/3 font-medium text-white transition-colors hover:border-white/25 hover:bg-white/[0.07]"
            >
              <svg
                aria-hidden="true"
                className="h-4.5 w-4.5"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#4285F4"
                  d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.7c3.9-3.6 6-8.8 6-15z"
                />
                <path
                  fill="#34A853"
                  d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.7-5.1c-1.8 1.2-4.1 1.9-6.8 1.9-5.3 0-9.8-3.6-11.4-8.4H5.7v5.3A20 20 0 0 0 24 44z"
                />
                <path
                  fill="#FBBC05"
                  d="M12.6 27.5a12 12 0 0 1 0-7.1v-5.3H5.7a20 20 0 0 0 0 17.7z"
                />
                <path
                  fill="#EA4335"
                  d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8A19.5 19.5 0 0 0 24 4 20 20 0 0 0 5.7 15.1l6.9 5.3C14.2 15.6 18.7 12 24 12z"
                />
              </svg>
              Continue with Google
            </Button>
          </Form>

          {/* Sign up link */}
          <div className="mt-7 border-t border-white/8 pt-6 text-center">
            <p className="text-sm text-white/45">
              New to FitLog?{" "}
              <Link
                href="/sign-up"
                className="font-bold text-[#ccff00] no-underline transition-colors hover:text-white"
              >
                Create an account
              </Link>
            </p>
          </div>
        </Card>

        <p className="mt-6 text-center text-[10px] tracking-wide text-white/25">
          BUILT FOR CONSISTENCY. DESIGNED FOR PROGRESS.
        </p>
      </div>
    </main>
  );
}
