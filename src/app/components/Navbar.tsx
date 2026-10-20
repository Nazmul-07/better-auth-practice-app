"use client";

import { useState } from "react";
import { Link, Button } from "@heroui/react";
import { signOut, useSession } from "@/lib/auth-client";
import {
  Bars,
  Xmark,
  Person,
  ArrowRightFromSquare,
  LayoutCells,
} from "@gravity-ui/icons";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data } = useSession();

  const handleLogoutBtn = () => {
    signOut();
  };

  const authLinks = (
    <>
      {data?.user ? (
        <>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ccff00]/10 text-[#ccff00]">
              <Person className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                Welcome back
              </p>
              <p className="max-w-32 truncate text-sm font-semibold text-white">
                {data.user.name}
              </p>
            </div>
          </div>

          <Button
            onPress={handleLogoutBtn}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-4 py-2 text-sm font-semibold text-gray-300 transition hover:border-red-400/40 hover:bg-red-400/10 hover:text-red-400"
          >
            <ArrowRightFromSquare className="h-4 w-4" />
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Link
            href="/sign-in"
            className="text-sm font-semibold text-gray-300 transition hover:text-[#ccff00]"
          >
            Login
          </Link>

          <Link href="/sign-up">
            <Button className="flex items-center gap-2 rounded-xl bg-[#ccff00] px-5 py-2.5 text-sm font-bold text-black transition hover:bg-white">
              Sign Up
              <ArrowRightFromSquare className="h-4 w-4" />
            </Button>
          </Link>
        </>
      )}
    </>
  );

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#101010]/90 text-white backdrop-blur-xl">
      <header className="mx-auto flex h-19 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:border-[#ccff00]/40 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <Xmark className="h-5 w-5" />
            ) : (
              <Bars className="h-5 w-5" />
            )}
          </button>

          <Link
            href="/"
            className="group flex items-center gap-3 text-white"
            onPress={closeMenu}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ccff00] text-black transition group-hover:-rotate-6">
              <Person className="h-6 w-6" />
            </div>

            <div>
              <span className="block text-lg font-black tracking-[0.12em] sm:text-xl">
                FIT<span className="text-[#ccff00]">LOG</span>
              </span>
              <span className="hidden text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500 sm:block">
                Train with intent
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-2 md:flex">
          <li>
            <Link
              href="#features"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
            >
              Features
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-lg bg-[#ccff00]/10 px-4 py-2 text-sm font-semibold text-[#ccff00] transition hover:bg-[#ccff00]/15"
              aria-current="page"
            >
              <LayoutCells className="h-4 w-4" />
              Dashboard
            </Link>
          </li>

          {data?.user && (
            <li>
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-[#ccff00]"
              >
                <Person className="h-4 w-4" />
                Profile
              </Link>
            </li>
          )}
        </ul>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 md:flex">{authLinks}</div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#141414] px-4 pb-5 pt-3 md:hidden">
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="#features"
                onPress={closeMenu}
                className="flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-[#ccff00]"
              >
                Features
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard"
                onPress={closeMenu}
                className="flex w-full items-center gap-3 rounded-xl bg-[#ccff00]/10 px-4 py-3 text-sm font-semibold text-[#ccff00]"
              >
                <LayoutCells className="h-4 w-4" />
                Dashboard
              </Link>
            </li>

            {data?.user && (
              <li>
                <Link
                  href="/profile"
                  onPress={closeMenu}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-[#ccff00]"
                >
                  <Person className="h-4 w-4" />
                  Profile
                </Link>
              </li>
            )}
          </ul>

          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
            {authLinks}
          </div>
        </div>
      )}
    </nav>
  );
}