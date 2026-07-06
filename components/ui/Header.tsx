"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { WithSessionProps } from "@/types";
import { MenuIcon, CloseIcon } from "./icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { UserProfile } from "./UserProfile";
import { SignOutButton } from "./buttons/SignOutButton";
import { Button } from "@/components/ui/buttons";

export const Header = ({ session }: WithSessionProps) => {
  const tLogo = useTranslations("Logo");
  const tNavigation = useTranslations("Navigation");

  const [isOpen, setIsOpen] = useState(false);
  const user = session?.user;

  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 md:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-gray-900"
        >
          {tLogo.rich("logo", {
            colored: (chunks) => (
              <span className="text-indigo-600">{chunks}</span>
            ),
          })}
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          {session?.user?.role === "superadmin" && (
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="px-3 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all"
              >
                {tNavigation("administration")}
              </Link>
              <Link
                href="/dashboard"
                className="px-3 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all"
              >
                {tNavigation("dashboard")}
              </Link>
            </div>
          )}

          <div className="h-6 w-px bg-gray-200" />

          <UserProfile session={session} />
          <SignOutButton />
        </nav>

        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="secondary"
          size="none"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 md:hidden"
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
        <div className="border-t border-gray-100 bg-white p-4 shadow-inner md:hidden animate-fade-in">
          <div className="space-y-4">
            <UserProfile session={session} />
            <nav className="flex flex-col pt-2 gap-3">
              <LanguageSwitcher />
              {session?.user?.role === "superadmin" && (
                <div className="flex items-center gap-3">
                  <Link
                    href="/admin"
                    className="px-3 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all"
                  >
                    {tNavigation("administration")}
                  </Link>
                  <Link
                    href="/dashboard"
                    className="px-3 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all"
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
