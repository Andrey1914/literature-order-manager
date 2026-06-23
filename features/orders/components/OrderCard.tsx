"use client";

import { useState } from "react";
import { useOrderStore } from "../store";
import {
  updateOrderStatus,
  deleteOrder,
  updateOrderDetails,
} from "@/features/orders/actions";
import { CATEGORY_LABELS, STATUS_CONFIG, formatDate } from "../utils";
import { OrderCardProps } from "./types";

import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { EditOrderModal } from "./EditOrderModal";
import { CardActions } from "@/components/ui/CardActions";

export const OrderCard = ({ order, isRegular }: OrderCardProps) => {
  const { deleteOrderInState, updateOrderInState, updateStatusInState } =
    useOrderStore();
  const [isPending, setIsPending] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDelivered = order.status === "DELIVERED";

  const currentStatus = order.status;
  const config = STATUS_CONFIG[currentStatus];
  const catConfig = CATEGORY_LABELS[order.category] || {
    label: order.category,
    className: "bg-gray-50 text-gray-600",
  };

  const historyDates = Array.isArray(order.deliveryHistory)
    ? order.deliveryHistory
    : [];
  const hasHistory = historyDates.length > 0;

  const handleStatusChange = async () => {
    setIsPending(true);
    try {
      const result = await updateOrderStatus(
        order.id,
        isRegular,
        currentStatus,
      );

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

  const handleSaveConfirm = async (newQuantity: number) => {
    setIsSubmitting(true);
    const res = await updateOrderDetails(order.id, isRegular, {
      title: order.title,
      quantity: newQuantity,
    });

    if (res.success) {
      updateOrderInState(order.id, isRegular, order.title, newQuantity);
      setIsEditOpen(false);
    } else {
      alert(res.error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow relative group">
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded-md border ${catConfig.className}`}
          >
            {catConfig.label}
          </span>
          <span
            className={`px-2 py-0.5 text-xs rounded-md ${config.className}`}
          >
            {config.label}
          </span>
          {isRegular && (
            <span className="px-2 py-0.5 text-[10px] bg-gray-50 text-gray-400 font-mono rounded-md border border-gray-200/60">
              Ежемесячно
            </span>
          )}
        </div>

        <div>
          <h4 className="font-bold text-gray-800 text-base leading-tight">
            {order.title}
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">
            Количество:{" "}
            <span className="font-semibold text-gray-700">
              {order.quantity} шт.
            </span>
          </p>
        </div>

        {hasHistory && (
          <div className="pt-1.5 border-t border-gray-50/80">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
              {isRegular ? "Последние выдачи:" : "Выдано:"}
            </p>
            <div className="flex flex-wrap gap-1">
              {historyDates.map((dateStr, idx) => (
                <span
                  key={idx}
                  className="text-[11px] bg-emerald-50/60 border border-emerald-100/70 text-emerald-700 px-1.5 py-0.5 rounded-md font-medium"
                >
                  {formatDate(dateStr)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-row items-center justify-end gap-2 w-full sm:w-auto shrink-0">
        {currentStatus !== "DELIVERED" && config.btnLabel && (
          <button
            type="button"
            disabled={isPending}
            onClick={handleStatusChange}
            className={`w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-xl border transition-all shadow-sm ${
              currentStatus === "ORDERED"
                ? "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                : "bg-indigo-600 border-transparent text-white hover:bg-indigo-700 active:bg-indigo-800 shadow-indigo-500/10"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isPending ? "Обновление..." : config.btnLabel}
          </button>
        )}

        {!isDelivered && (
          <div className="sm:static sm:opacity-100 transition-opacity shrink-0 *:absolute *:sm:static *:top-auto *:right-auto *:inset-auto">
            <CardActions
              onEdit={() => setIsEditOpen(true)}
              onDelete={() => setIsDeleteOpen(true)}
            />
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Аннулировать заказ"
        message={`Вы уверены, что хотите полностью удалить и аннулировать заказ на "${order.title}" (${order.quantity} шт.)? Это действие нельзя будет отменить.`}
        isLoading={isSubmitting}
      />

      <EditOrderModal
        key={`${order.id}-${isEditOpen}`}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSaveConfirm}
        initialQuantity={order.quantity}
        isLoading={isSubmitting}
      />
    </div>
  );
};
