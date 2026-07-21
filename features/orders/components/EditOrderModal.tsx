"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Modal } from "@/components/ui/modals";
import { Button } from "@/components/ui/buttons";
import { EditOrderModalProps } from "./types";
import { LanguageSelect } from "@/components/ui";

export const EditOrderModal = ({
  isOpen,
  onClose,
  onSave,
  initialQuantity,
  initialLanguage,
  isLoading,
}: EditOrderModalProps) => {
  const t = useTranslations("EditOrderModal");
  const tCommon = useTranslations("Common");

  const [quantity, setQuantity] = useState(initialQuantity);
  const [language, setLanguage] = useState(initialLanguage || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity < 1) return;
    // if (quantity < 1 || !language.trim()) return;
    await onSave(quantity, language);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("title")}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-slate-300">
            {t("quantityLabel")}
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full text-sm p-2.5 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-600 dark:focus:ring-indigo-500/20 transition-colors"
            min="1"
            disabled={isLoading}
            required
            autoFocus
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-slate-300">
            Язык
          </label>
          <LanguageSelect
            value={language}
            onChange={setLanguage}
            disabled={isLoading}
            placeholder="По умолчанию"
          />
          {/* <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full text-sm p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white transition-colors uppercase"
            disabled={isLoading}
            required
          /> */}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            {tCommon("cancel")}
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            disabled={quantity < 1}
          >
            {tCommon("save")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
