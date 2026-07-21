"use client";

import { useState, useMemo } from "react";
import { getSortedLanguages } from "@/lib/languages";
import { Modal } from "./Modal";
import { LanguageListModalProps } from "../types";

export const LanguageListModal = ({
  isOpen,
  onClose,
  value,
  onSelect,
}: LanguageListModalProps) => {
  const [search, setSearch] = useState("");

  const languages = useMemo(() => getSortedLanguages(), []);

  const filteredLanguages = useMemo(() => {
    if (!search.trim()) return languages;
    const q = search.toLowerCase().trim();
    return languages.filter(
      (language) =>
        language.code.toLowerCase().includes(q) ||
        language.name.toLowerCase().includes(q) ||
        language.nativeName.toLowerCase().includes(q),
    );
  }, [languages, search]);

  const handleSelect = (code: string) => {
    onSelect(code);
    setSearch("");
  };

  const handleClose = () => {
    onClose();
    setSearch("");
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Выберите язык">
      <div className="flex flex-col gap-3">
        <input
          type="text"
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск языка..."
          className="w-full px-3.5 py-2 rounded-xl text-sm bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-indigo-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white"
        />

        <div className="max-h-72 overflow-y-auto rounded-xl border border-gray-100 dark:border-slate-800 divide-y divide-gray-50 dark:divide-slate-800/60">
          <button
            type="button"
            onClick={() => handleSelect("")}
            className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${
              !value
                ? "bg-indigo-50 text-indigo-600 font-medium dark:bg-indigo-950/40 dark:text-indigo-400"
                : "text-gray-500 hover:bg-gray-50 dark:text-slate-400 dark:hover:bg-slate-800/50"
            }`}
          >
            — Не указан (по умолчанию)
          </button>

          {filteredLanguages.map((lang) => {
            const isSelected = value === lang.code;

            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors text-left ${
                  isSelected
                    ? "bg-indigo-50 text-indigo-700 font-medium dark:bg-indigo-950/50 dark:text-indigo-400"
                    : "text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800/50"
                }`}
              >
                <span className="capitalize">{lang.nativeName}</span>
                <span className="text-xs uppercase font-mono text-gray-400 dark:text-slate-500">
                  {lang.code}
                </span>
              </button>
            );
          })}

          {filteredLanguages.length === 0 && (
            <div className="p-6 text-center text-xs text-gray-400 dark:text-slate-500">
              Язык не найден
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
