"use client";

import { ModalProps } from "./types";
import { CloseIcon } from "@/components/ui/icons/CloseIcon";

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-gray-950/40 backdrop-blur-sm"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-gray-100 z-10 animate-fade-in"
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-900 hover:bg-gray-50 hover:text-gray-700"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
