"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignOutForm } from "@/components/forms/SignOutForm";
import { UserRole } from "@/types/next-auth";
import { WithSessionProps } from "@/types";
import { MenuIcon } from "./icons/MenuIcon";
import { CloseIcon } from "./icons/CloseIcon";

const roleLabels: Record<UserRole, string> = {
  user: "Ответственный за литературу",
  superadmin: "Администратор",
};

export const Header = ({ session }: WithSessionProps) => {
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
          Менеджер <span className="text-indigo-600">Литературы</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-4 text-sm font-medium text-gray-600">
            <Link
              href="/dashboard"
              className="hover:text-indigo-600 transition-colors"
            >
              Панель управления
            </Link>
          </nav>

          <div className="h-6 w-px bg-gray-200" />

          <div className="flex items-center gap-3">
            {user.image && (
              <div className="relative h-9 w-9 overflow-hidden rounded-full border border-gray-200">
                <Image
                  src={user.image}
                  alt={user.name || "Аватар"}
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
                {roleLabels[currentRole]}
              </p>
            </div>
          </div>

          <SignOutForm />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 md:hidden focus:outline-none"
          aria-label="Переключить меню"
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
                    alt={user.name || "Аватар"}
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
                  {roleLabels[currentRole]}
                </p>
              </div>
            </div>

            {/* <nav className="flex flex-col gap-2">
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="rounded-xl bg-gray-50 p-3 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                Панель управления
              </Link>
            </nav> */}

            <div className="pt-2">
              <SignOutForm />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
