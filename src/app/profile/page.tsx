"use client";

import { updateUser } from "@/lib/auth-client";
import { FloppyDisk, Person } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

export default function ProfilePage() {
  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = Object.fromEntries(
      [...formData.entries()].map(([key, value]) => [key, String(value)]),
    );

    const resData = await updateUser({
      name: data.name,
    });
  };

  return (
    <main className="min-h-screen bg-[#101010] px-4 py-10 text-white sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-3xl">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
            Account Management
          </p>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Profile Settings
          </h1>

          <p className="mt-3 max-w-lg text-sm leading-6 text-gray-400 sm:text-base">
            Manage your personal information and keep your FitLog profile up
            to date.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#171717] shadow-2xl shadow-black/20">
          {/* Card Header */}
          <div className="flex items-center gap-4 border-b border-white/10 px-5 py-6 sm:px-8">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#ccff00]/10 text-[#ccff00]">
              <Person className="h-7 w-7" />
            </div>

            <div>
              <h2 className="text-lg font-bold">Personal Information</h2>
              <p className="mt-1 text-sm text-gray-500">
                Update your account details below.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-5 sm:p-8">
            <Form className="w-full" onSubmit={handleUpdateUser}>
              <Fieldset className="w-full">
                <Fieldset.Legend className="mb-2 text-base font-semibold text-white">
                  Basic Details
                </Fieldset.Legend>

                <Description className="mb-6 text-sm text-gray-400">
                  Your name will be used to personalize your experience.
                </Description>

                <FieldGroup className="gap-5">
                  <TextField
                    isRequired
                    name="name"
                    validate={(value) => {
                      if (value.length < 3) {
                        return "Name must be at least 3 characters";
                      }

                      return null;
                    }}
                  >
                    <Label className="mb-2 text-sm font-medium text-gray-200">
                      Full Name
                    </Label>

                    <Input
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-white/10 bg-[#101010] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus-within:border-[#ccff00]/60"
                    />

                    <FieldError className="mt-2 text-sm text-red-400" />
                  </TextField>
                </FieldGroup>

                <Fieldset.Actions className="mt-8 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
                  <Button
                    type="reset"
                    variant="secondary"
                    className="w-full border border-white/15 bg-transparent px-5 py-3 font-semibold text-gray-300 transition hover:bg-white/5 sm:w-auto"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    className="w-full bg-[#ccff00] px-6 py-3 font-bold text-black transition hover:bg-white sm:w-auto"
                  >
                    <FloppyDisk />
                    Save Changes
                  </Button>
                </Fieldset.Actions>
              </Fieldset>
            </Form>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-5 text-center text-xs text-gray-600">
          Keep your profile information accurate and up to date.
        </p>
      </div>
    </main>
  );
}