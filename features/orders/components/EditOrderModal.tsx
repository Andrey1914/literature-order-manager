"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { EditOrderModalProps } from "./types";

export const EditOrderModal = ({
  isOpen,
  onClose,
  onSave,
  initialQuantity,
  isLoading,
}: EditOrderModalProps) => {
  const t = useTranslations("EditOrderModal");
  const tCommon = useTranslations("Common");

  const [quantity, setQuantity] = useState(initialQuantity);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity < 1) return;
    await onSave(quantity);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("title")}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            {t("quantityLabel")}
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full text-sm p-2.5 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            min="1"
            disabled={isLoading}
            required
            autoFocus
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            {tCommon("cancel")}
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            disabled={quantity < 1}
          >
            {tCommon("save")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
