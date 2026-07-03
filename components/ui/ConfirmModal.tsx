"use client";

import { useTranslations } from "next-intl";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { ConfirmModalProps } from "./types";

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading,
}: ConfirmModalProps) => {
  const t = useTranslations("Common");
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        <p className="text-sm text-gray-600 leading-relaxed">{message}</p>
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            {t("cancel")}
          </Button>
          <Button
            type="button"
            className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
            isLoading={isLoading}
            onClick={onConfirm}
          >
            {t("delete")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
