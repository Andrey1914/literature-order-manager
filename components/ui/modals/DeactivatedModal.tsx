"use client";

import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/modals";
import { Button } from "@/components/ui/buttons";

interface DeactivatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  isLoading: boolean;
  onConfirm: () => void;
}

export const DeactivatedModal = ({
  isOpen,
  onClose,
  email,
  isLoading,
  onConfirm,
}: DeactivatedModalProps) => {
  const t = useTranslations("DeactivatedModal");
  const tCommon = useTranslations("Common");

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Профиль деактивирован">
      <div className="space-y-6 py-2">
        <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
          {t("description")}
        </p>

        {email && (
          <div className="rounded-lg bg-gray-50 dark:bg-slate-800/50 p-3 text-xs text-gray-500 dark:text-slate-400 text-center font-mono">
            {t("accountLabel", { email })}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 border-t border-gray-100 dark:border-slate-800/80 pt-4">
          <Button
            type="button"
            isLoading={isLoading}
            className="w-full sm:w-auto h-10 px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl"
            onClick={onConfirm}
          >
            {t("btnSubmit")}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full sm:w-auto sm:ml-auto h-10 px-5 font-semibold"
            onClick={onClose}
          >
            {tCommon("cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
