"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { WithSessionProps } from "@/types";
import { MenuIcon, CloseIcon } from "./icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { UserProfile } from "./UserProfile";
import { SignOutButton } from "./buttons/SignOutButton";
import { Button, ThemeToggle } from "@/components/ui/buttons";

export const Header = ({ session }: WithSessionProps) => {
  const tLogo = useTranslations("Logo");
  const tNavigation = useTranslations("Navigation");

  const [isOpen, setIsOpen] = useState(false);
  const user = session?.user;

  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:bg-slate-900 dark:border-slate-800 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 md:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {tLogo.rich("logo", {
            colored: (chunks) => (
              <span className="text-indigo-600 dark:text-indigo-400">
                {chunks}
              </span>
            ),
          })}
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <LanguageSwitcher />
          {session?.user?.role === "superadmin" && (
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="px-3 py-2 text-xs font-semibold rounded-lg shadow-sm text-indigo-700 bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-800 dark:text-indigo-400 dark:hover:bg-slate-700 transition-all"
              >
                {tNavigation("administration")}
              </Link>
              <Link
                href="/dashboard"
                className="px-3 py-2 text-xs font-semibold rounded-lg shadow-sm text-indigo-700 bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-800 dark:text-indigo-400 dark:hover:bg-slate-700 transition-all"
              >
                {tNavigation("dashboard")}
              </Link>
            </div>
          )}

          <div className="h-6 w-px bg-gray-200 dark:bg-slate-700" />

          <UserProfile session={session} />
          <SignOutButton />
        </nav>

        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="secondary"
          size="none"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 md:hidden focus:outline-none"
          aria-label={tNavigation("toggleMenu")}
        >
          {isOpen ? (
            <CloseIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </Button>
      </div>

      {isOpen && (
        <div className="h-full border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-inner md:hidden animate-fade-in">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800/50 pb-3">
              <UserProfile session={session} />

              <ThemeToggle />
            </div>

            <nav className="flex flex-col gap-3">
              <LanguageSwitcher />
              {session?.user?.role === "superadmin" && (
                <div className="flex items-center gap-3">
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-full h-11.5 sm:w-22.5 px-3 py-2 text-xs font-semibold rounded-xl transition-all text-indigo-700 bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-800 dark:text-indigo-400 dark:hover:bg-slate-700"
                  >
                    {tNavigation("administration")}
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-full h-11.5 sm:w-22.5 px-3 py-2 text-xs font-semibold rounded-xl transition-all text-indigo-700 bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-800 dark:text-indigo-400 dark:hover:bg-slate-700"
                  >
                    {tNavigation("dashboard")}
                  </Link>
                </div>
              )}
              <SignOutButton />
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
