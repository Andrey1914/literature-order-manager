"use client";

import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/modals";
import { Button } from "@/components/ui/buttons";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInitiateDelete: () => void;
}

export const SettingsModal = ({
  isOpen,
  onClose,
  onInitiateDelete,
}: SettingsModalProps) => {
  const t = useTranslations("SettingsModal");
  const tCommon = useTranslations("Common");

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("title")}>
      <div className="space-y-6 py-2 text-gray-900 dark:text-white">
        <div className="space-y-1 ">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-red-500 dark:text-red-400">
            {t("dangerZone")}
          </h4>
          <p className="text-sm text-red-500 dark:text-red-400 leading-relaxed">
            {t("dangerDesc")}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed  pt-3">
            {t("infoDesc")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 border-t border-gray-100 dark:border-slate-800 pt-5 space-y-4">
          <Button
            type="button"
            variant="primary"
            className="w-full sm:w-auto px-4 h-10 bg-red-500 text-red-600 hover:bg-red-600 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40 rounded-xl text-sm font-semibold transition-colors border border-red-100 dark:border-red-900/30"
            onClick={onInitiateDelete}
          >
            {t("btnDelete")}
          </Button>

          <Button
            type="button"
            variant="primary"
            className="w-full sm:w-auto sm:ml-auto h-10 px-5 text-sm font-semibold rounded-xl"
            onClick={onClose}
          >
            {tCommon("cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
