"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { SignOutForm } from "@/components/forms/SignOutForm";
import { UserRole } from "@/types/next-auth";
import { WithSessionProps } from "@/types";
import { MenuIcon } from "./icons/MenuIcon";
import { CloseIcon } from "./icons/CloseIcon";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Header = ({ session }: WithSessionProps) => {
  const tUser = useTranslations("User");
  const tLogo = useTranslations("Logo");
  const tNavigation = useTranslations("Navigation");

  const [isOpen, setIsOpen] = useState(false);
  const user = session?.user;

  if (!user) return null;

  const currentRole = (user.role || "user") as UserRole;

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

        <div className="hidden items-center gap-6 md:flex">
          <LanguageSwitcher />
          {session?.user?.role === "superadmin" && (
            <nav>
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
            </nav>
          )}

          <div className="h-6 w-px bg-gray-200" />

          <div className="flex items-center gap-3">
            {user.image && (
              <div className="relative h-9 w-9 overflow-hidden rounded-full border border-gray-200">
                <Image
                  src={user.image}
                  alt={user.name || tUser("avatar")}
                  fill
                  sizes="9"
                  className="object-cover"
                />
              </div>
            )}
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900 leading-tight">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 ">
                {tUser(`roles.${currentRole}`)}
              </p>
            </div>
          </div>

          <SignOutForm />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 md:hidden focus:outline-none"
          aria-label={tNavigation("toggleMenu")}
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-gray-100 bg-white p-4 shadow-inner md:hidden animate-fade-in">
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-3">
              {user.image && (
                <div className="relative h-11 w-11 overflow-hidden rounded-full border border-gray-200">
                  <Image
                    src={user.image}
                    alt={user.name || tUser("avatar")}
                    fill
                    sizes="9"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="text-left">
                <p className="text-base font-semibold text-gray-900">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 ">
                  {tUser(`roles.${currentRole}`)}
                </p>
              </div>
            </div>

            <nav className="flex flex-col pt-2 gap-5">
              <LanguageSwitcher />
              {session?.user?.role === "superadmin" && (
                <>
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
                </>
              )}
              <SignOutForm />
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
