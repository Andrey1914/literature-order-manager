"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/config";
import { WithSessionProps } from "@/types";
import { MenuIcon, CloseIcon } from "./icons";
import { Button } from "@/components/ui/buttons";
import { ProfileDeleteFlow } from "./ProfileDeleteFlow";
import { HeaderNavigation } from "./HeaderNavigation";

export const Header = ({ session }: WithSessionProps) => {
  const tLogo = useTranslations("Logo");
  const tNavigation = useTranslations("Navigation");

  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  if (!session?.user) return null;

  const openSettings = () => {
    setIsOpen(false);
    setIsSettingsOpen(true);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
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

          <HeaderNavigation session={session} onOpenSettings={openSettings} />

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
            <HeaderNavigation
              session={session}
              isMobile
              onOpenSettings={openSettings}
              onAction={closeMobileMenu}
            />
          </div>
        )}
      </header>

      <ProfileDeleteFlow
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};
