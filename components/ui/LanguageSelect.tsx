"use client";

import { useState } from "react";
import { getLanguageLabel } from "@/lib/languages";
import { LanguageSelectProps } from "./types";
import { LanguageListModal } from "@/components/ui/modals";

export const LanguageSelect = ({
  value,
  onChange,
  placeholder = "Выберите язык (опционально)...",
  disabled = false,
}: LanguageSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  const handleSelect = (code: string) => {
    onChange(code);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white text-gray-900 focus:outline-none focus:border-indigo-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white dark:focus:border-indigo-500 transition-colors disabled:opacity-50"
      >
        <span
          className={
            value ? "font-medium" : "text-gray-400 dark:text-slate-500"
          }
        >
          {value ? getLanguageLabel(value) : placeholder}
        </span>

        <div className="flex items-center gap-1.5">
          {value && (
            <span
              onClick={handleClear}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 dark:hover:bg-slate-800 dark:text-slate-500 transition-colors"
              title="Очистить"
            >
              ✕
            </span>
          )}
          <span className="text-xs text-gray-400 dark:text-slate-500">🌐</span>
        </div>
      </button>

      <LanguageListModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        value={value}
        onSelect={handleSelect}
      />
    </div>
  );
};
