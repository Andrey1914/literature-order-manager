"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { useOrderStore } from "../store";
import {
  updateOrderStatus,
  deleteOrder,
  updateOrderDetails,
} from "@/features/orders/actions";
import {
  CATEGORY_LABELS,
  STATUS_CONFIG,
  formatDate,
  getActionKey,
} from "../utils";
import { OrderCardProps } from "./types";

import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { EditOrderModal } from "./EditOrderModal";
import { CardActions } from "@/components/ui/CardActions";

export const OrderCard = ({ order, isRegular }: OrderCardProps) => {
  const t = useTranslations("OrderCard");
  const tCommon = useTranslations("Common");
  const tCategories = useTranslations("Categories");
  const locale = useLocale();

  const { deleteOrderInState, updateOrderInState, updateStatusInState } =
    useOrderStore();
  const [isPending, setIsPending] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDelivered = order.status === "DELIVERED";
  const currentStatus = order.status;

  const statusStyle =
    STATUS_CONFIG[currentStatus]?.className || "bg-gray-100 text-gray-600";
  const categoryStyle =
    CATEGORY_LABELS[order.category]?.className || CATEGORY_LABELS;

  const hasBtnAction = STATUS_CONFIG[currentStatus]?.btnLabel;

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
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow relative group hover:border-indigo-400/40">
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded-md border ${categoryStyle}`}
          >
            {tCategories(order.category)}
          </span>
          <span
            className={`px-2 py-0.5 text-xs rounded-md ${order.status === "EXPECTED" ? `${statusStyle} animate-pulse` : statusStyle}`}
          >
            {t(`statuses.${order.status}`)}
          </span>
          {isRegular && (
            <span className="px-2 py-0.5 text-[10px] bg-gray-50 text-gray-400 font-mono rounded-md border border-gray-200/60">
              {t("monthly")}
            </span>
          )}
        </div>

        <div>
          <h4 className="font-bold text-gray-800 text-base leading-tight">
            {order.title}
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">
            {t("quantityLabel")}{" "}
            <span className="font-semibold text-gray-700">
              {t("quantity", { count: order.quantity })}
            </span>
          </p>
        </div>

        {hasHistory && (
          <div className="pt-1.5 border-t border-gray-50/80">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
              {isRegular ? t("lastDeliveries") : t("issued")}
            </p>
            <div className="flex flex-wrap gap-1">
              {historyDates.map((dateStr, idx) => {
                const systemFormattedDate = formatDate(dateStr, locale);

                const d = new Date(dateStr);
                const day = String(d.getDate()).padStart(2, "0");
                const monthName = !isNaN(d.getTime())
                  ? tCommon(`months.${d.getMonth()}`)
                  : "";
                const year = d.getFullYear();
                const jsonFormattedDate = `${day} ${monthName} ${year}`;

                return (
                  <span
                    key={idx}
                    className="text-[11px] bg-emerald-50/60 border border-emerald-100/70 text-emerald-700 px-1.5 py-0.5 rounded-md font-medium"
                  >
                    {systemFormattedDate
                      ? systemFormattedDate
                      : jsonFormattedDate}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-row flex-wrap items-stretch justify-end gap-2 w-full sm:w-auto shrink-0">
        {!isDelivered && hasBtnAction && (
          <button
            type="button"
            disabled={isPending}
            onClick={handleStatusChange}
            className={`flex-1 sm:flex-initial flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-xl border transition-all shadow-sm ${
              currentStatus === "ORDERED"
                ? "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                : "bg-indigo-600 border-transparent text-white hover:bg-indigo-700 active:bg-indigo-800 shadow-indigo-500/10"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isPending
              ? tCommon("updating")
              : t(`actions.${getActionKey(currentStatus)}`)}
          </button>
        )}

        {!isDelivered && (
          <div className="flex shrink-0">
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
        isLoading={isSubmitting}
      />
    </div>
  );
};
