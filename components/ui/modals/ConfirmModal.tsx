import { useTranslations } from "next-intl";
import { Modal } from "./Modal";
import { Button } from "@/components/ui/buttons";
import { ConfirmModalProps } from "../types";

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading,
}: ConfirmModalProps) => {
  const t = useTranslations("Common");

  const handleConfirm = async () => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    try {
      await Promise.all([onConfirm(), delay(1000)]);
    } catch (error) {
      console.error("Ошибка при выполнении действия:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
          {message}
        </p>
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
            className="bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white w-full sm:w-24 h-10 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-500"
            isLoading={isLoading}
            onClick={handleConfirm}
          >
            {t("delete")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
