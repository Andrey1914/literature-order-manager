"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/modals";
import { SuccessCircleIcon } from "@/components/ui/icons";

interface SuccessDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessDeleteModal = ({
  isOpen,
  onClose,
}: SuccessDeleteModalProps) => {
  const t = useTranslations("SuccessDeleteModal");

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose();
      signOut({ callbackUrl: "/" });
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("title")}>
      <div className="flex flex-col items-center text-center space-y-4 py-6">
        <SuccessCircleIcon className="h-16 w-16 text-green-500 animate-scale-in" />
        <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed max-w-sm">
          {t("description")}
        </p>
      </div>
    </Modal>
  );
};
