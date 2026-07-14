"use client";

import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/modals";
import { Button } from "@/components/ui/buttons";

interface PendingRestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PendingRestoreModal = ({
  isOpen,
  onClose,
}: PendingRestoreModalProps) => {
  const t = useTranslations("PendingRestoreModal");

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Заявка на рассмотрении">
      <div className="space-y-5 py-2 text-center flex flex-col items-center">
        <div className="h-12 w-12 rounded-full bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-amber-500 text-2xl">
          ⏳
        </div>
        <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed max-w-sm">
          {t("description")}
        </p>
        <Button
          type="button"
          variant="secondary"
          className="w-full h-10 font-semibold mt-2"
          onClick={onClose}
        >
          {t("btnUnderstand")}
        </Button>
      </div>
    </Modal>
  );
};
