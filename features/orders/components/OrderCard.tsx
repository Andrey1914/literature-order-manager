"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useOrderStore } from "../store";
import {
  updateOrderStatus,
  deleteOrder,
  updateOrderDetails,
} from "@/features/orders/actions";
import { OrderCardProps } from "./types";

import { ConfirmModal } from "@/components/ui/modals";
import { EditOrderModal } from "./EditOrderModal";
import { OrderBadges } from "./OrderBadges";
import { OrderHistory } from "./OrderHistory";
import { OrderActions } from "./OrderActions";

export const OrderCard = ({ order, isRegular }: OrderCardProps) => {
  const t = useTranslations("OrderCard");

  const { deleteOrderInState, updateOrderInState, updateStatusInState } =
    useOrderStore();

  const [isPending, setIsPending] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const historyDates = Array.isArray(order.deliveryHistory)
    ? order.deliveryHistory
    : [];

  const handleStatusChange = async () => {
    setIsPending(true);
    try {
      const result = await updateOrderStatus(order.id, isRegular, order.status);

      if (result.success && result.nextStatus) {
        updateStatusInState(order.id, isRegular, result.nextStatus);
      } else if (result.error) {
        alert(result.error);
      }
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
    } finally {
      setIsPending(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsSubmitting(true);
    const res = await deleteOrder(order.id, isRegular);

    if (res.success) {
      deleteOrderInState(order.id, isRegular);
      setIsDeleteOpen(false);
    } else {
      alert(res.error);
    }
    setIsSubmitting(false);
  };

  const handleSaveConfirm = async (
    newQuantity: number,
    newLanguage: string,
  ) => {
    setIsSubmitting(true);
    const res = await updateOrderDetails(order.id, isRegular, {
      title: order.title,
      quantity: newQuantity,
      language: newLanguage,
    });

    if (res.success) {
      updateOrderInState(
        order.id,
        isRegular,
        order.title,
        newQuantity,
        newLanguage,
      );
      setIsEditOpen(false);
    } else {
      alert(res.error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow relative group hover:border-indigo-400/40 dark:bg-slate-900/90 dark:border-slate-800 dark:hover:border-indigo-500/30">
      <div className="space-y-2">
        <OrderBadges
          category={order.category}
          status={order.status}
          language={order.language}
          isRegular={isRegular}
        />

        <div>
          <h4 className="font-bold text-gray-800 text-base leading-tight dark:text-slate-100">
            {order.title}
          </h4>
          <p className="text-xs text-gray-500 dark:text-slate-300 mt-0.5">
            {t("quantityLabel")}{" "}
            <span className="font-semibold text-gray-700 dark:text-slate-300">
              {t("quantity", { count: order.quantity })}
            </span>
          </p>
        </div>

        <OrderHistory historyDates={historyDates} isRegular={isRegular} />
      </div>

      <OrderActions
        status={order.status}
        isPending={isPending}
        onStatusChange={handleStatusChange}
        onEdit={() => setIsEditOpen(true)}
        onDelete={() => setIsDeleteOpen(true)}
      />

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={t("deleteModalTitle")}
        message={t("deleteModalMessage", {
          title: order.title,
          count: order.quantity,
        })}
        isLoading={isSubmitting}
      />

      <EditOrderModal
        key={`${order.id}-${isEditOpen}`}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSaveConfirm}
        initialQuantity={order.quantity}
        initialLanguage={order.language || ""}
        isLoading={isSubmitting}
      />
    </div>
  );
};
