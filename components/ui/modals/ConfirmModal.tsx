import { useTranslations } from "next-intl";
import { Modal } from "./Modal";
import { Button } from "@/components/ui/buttons";
import { ConfirmModalProps } from "../types";

interface EnhancedConfirmModalProps extends ConfirmModalProps {
  variant?: "danger" | "primary" | "success";
  confirmLabel?: string;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading,
  variant = "danger",
  confirmLabel,
}: EnhancedConfirmModalProps) => {
  const tCommon = useTranslations("Common");

  const handleConfirm = async () => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    try {
      await Promise.all([onConfirm(), delay(1000)]);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const buttonStyles = {
    danger:
      "bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 focus:ring-red-500",
    primary:
      "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:ring-indigo-500",
    success:
      "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 focus:ring-emerald-500",
  };

  const modalStyles = {
    danger:
      "bg-red-50/50 border-red-100 dark:bg-red-950/20 dark:border-red-900/30 text-red-800 dark:text-red-300",
    primary:
      "bg-indigo-50/50 border-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900/30 text-indigo-800 dark:text-indigo-300",
    success:
      "bg-emerald-50/50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        <div className={`rounded-xl p-4 border ${modalStyles[variant]}`}>
          <p className="text-sm font-medium leading-relaxed">{message}</p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
            className="w-full sm:w-auto h-10 px-4"
          >
            {tCommon("cancel")}
          </Button>
          <Button
            type="button"
            isLoading={isLoading}
            onClick={handleConfirm}
            className={`w-full sm:w-auto min-w-25 h-10 px-4 text-white font-semibold shadow-sm ${buttonStyles[variant]}`}
          >
            {confirmLabel || tCommon("confirm")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
