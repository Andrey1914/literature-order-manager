"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CongregationCardProps } from "./types";
import { Modal, ConfirmModal } from "@/components/ui/modals";
import { CardActions } from "@/components/ui/buttons";
import { EditCongregationForm } from "./EditCongregationForm";
import { useCongregationStore } from "../store";
import { deleteCongregationAction } from "../actions";

export const CongregationCard = ({
  item,
  isActive,
  onSelect,
}: CongregationCardProps) => {
  const t = useTranslations("CongregationCard");

  const deleteCongregation = useCongregationStore(
    (state) => state.deleteCongregation,
  );

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteCongregationAction(item.id);
      deleteCongregation(item.id);
      setIsDeleteOpen(false);
    } catch (error) {
      console.error(t("errors.deleteLog"), error);
      alert(t("errors.deleteAlert"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={() => onSelect(item.id)}
      className={`group cursor-pointer rounded-2xl border p-6 shadow-sm transition-all hover:shadow-md bg-white hover:border-indigo-400/40 ${
        isActive
          ? "border-indigo-600 ring-2 ring-indigo-100"
          : "border-gray-100"
      }`}
    >
      <div className="flex items-start justify-between gap-4 w-full">
        <div className="min-w-0 flex-1">
          <h4 className="text-xl font-bold text-gray-900 wrap-break-word">
            {item.name}
          </h4>

          {item.country && (
            <p className="mt-1 text-sm font-medium text-gray-500">
              🌍 {item.country}
            </p>
          )}
        </div>

        <div className="shrink-0">
          <CardActions
            onEdit={() => setIsEditOpen(true)}
            onDelete={() => setIsDeleteOpen(true)}
          />
        </div>
      </div>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        isLoading={isLoading}
        title={t("deleteModalTitle")}
        message={t("deleteModalMessage", { name: item.name })}
      />

      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title={t("editModalTitle")}
      >
        <EditCongregationForm
          item={item}
          onSuccess={() => setIsEditOpen(false)}
        />
      </Modal>
    </div>
  );
};
