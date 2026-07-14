"use client";

import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/modals";
import { Button } from "@/components/ui/buttons";
import { SuccessCircleIcon } from "@/components/ui/icons";

interface SuccessRestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessRestoreModal = ({
  isOpen,
  onClose,
}: SuccessRestoreModalProps) => {
  const t = useTranslations("SuccessRestoreModal");

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("title")}>
      <div className="space-y-5 py-2 text-center flex flex-col items-center">
        <SuccessCircleIcon className="h-14 w-14 text-green-500 animate-scale-in" />
        <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed max-w-sm">
          {t("description")}
        </p>
        <Button
          type="button"
          variant="secondary"
          className="w-full h-10 font-semibold mt-2"
          onClick={onClose}
        >
          {t("btnOk")}
        </Button>
      </div>
    </Modal>
  );
};
