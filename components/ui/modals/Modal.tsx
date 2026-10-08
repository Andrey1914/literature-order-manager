import { useEffect } from "react";
import { ModalProps } from "../types";
import { CloseIcon } from "@/components/ui/icons";

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-gray-950/40 dark:bg-gray-950/60 backdrop-blur-sm"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col w-full max-w-md max-h-[85vh] sm:max-h-[90vh] rounded-2xl bg-white shadow-xl border border-gray-100 dark:bg-slate-900 dark:border-slate-800 z-10 animate-fade-in overflow-hidden"
      >
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 p-6 pb-4 shrink-0">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-900 hover:bg-gray-50 hover:text-gray-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 pt-2 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};
