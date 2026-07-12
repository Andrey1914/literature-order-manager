"use client";

import { useLocale } from "next-intl";
import { useState, useRef, useEffect } from "react";
// import { Link } from "@/i18n/config";
import {
  locales,
  localeNames,
  Locale,
  usePathname,
  useRouter,
} from "@/i18n/config";

import { flagIcons } from "@/components/ui/icons/utils";

export const LanguageSwitcher = () => {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (nextLocale: Locale) => {
    router.replace(pathname, { locale: nextLocale });
    setIsOpen(false);
  };

  const CurrentFlag = flagIcons[currentLocale];

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full pl-3 pr-8 py-1.5 text-xs font-medium bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none cursor-pointer text-gray-700 flex items-center gap-2 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 transition-colors"
      >
        {CurrentFlag && (
          <CurrentFlag className="w-4 h-3 object-cover rounded-sm shrink-0" />
        )}{" "}
        <span>{localeNames[currentLocale].name}</span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400 dark:text-slate-500 text-[10px]">
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-full min-w-35 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 dark:bg-slate-900 dark:border-slate-800 shadow-black/10 dark:shadow-black/40 animate-fade-in">
          {locales.map((loc) => {
            const Flag = flagIcons[loc];

            return (
              <button
                key={loc}
                type="button"
                onClick={() => handleLanguageChange(loc)}
                className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left transition-colors ${
                  currentLocale === loc
                    ? "bg-indigo-50 text-indigo-700 font-semibold dark:bg-indigo-500/10 dark:text-indigo-400"
                    : "text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                <Flag className="w-4 h-3 object-cover rounded-sm shrink-0" />
                <span>{localeNames[loc].name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
