"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import {
  getCongregationWarehouse,
  bulkReceivePublications,
} from "@/features/orders/actions";
import { WarehouseItem } from "./types";
import { usePublisherStore } from "@/features/publishers/store";
import { CATEGORY_LABELS } from "@/features/orders/utils";

export const CongregationWarehouse = ({
  congregationId,
}: {
  congregationId: string;
}) => {
  const t = useTranslations("CongregationWarehouse");
  const tCategories = useTranslations("Categories");

  const [items, setItems] = useState<WarehouseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);

  const refreshPublishers = usePublisherStore(
    (state) => state.refreshPublishers,
  );

  const loadWarehouse = useCallback(async () => {
    const res = await getCongregationWarehouse(congregationId);
    if (res.success && res.data) {
      setItems(res.data as WarehouseItem[]);
    }
  }, [congregationId]);

  useEffect(() => {
    let isMounted = true;

    const initFetch = async () => {
      const res = await getCongregationWarehouse(congregationId);
      if (isMounted) {
        if (res.success && res.data) {
          setItems(res.data as WarehouseItem[]);
        }
        setIsLoading(false);
      }
    };

    initFetch();

    return () => {
      isMounted = false;
    };
  }, [congregationId]);

  const handleReceive = async (title: string, category: string) => {
    setIsPending(true);
    try {
      const res = await bulkReceivePublications(
        congregationId,
        title,
        category,
      );
      if (res.success) {
        await loadWarehouse();

        await refreshPublishers(congregationId);
      } else {
        alert(res.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  if (isLoading && items.length === 0)
    return <div className="h-32 bg-gray-50 animate-pulse rounded-2xl border" />;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
      <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
        📦 {t("warehouseTitle")}
      </h3>

      {items.length === 0 ? (
        <div className="py-8 px-4 text-center">
          <p className="text-sm font-medium text-gray-500">
            {t("emptyStateTitle")}
          </p>
          <p className="text-xs text-gray-400 mt-1 max-w-60 mx-auto">
            {t("emptyStateDescription")}
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50 max-h-96 overflow-y-auto pr-2 space-y-3">
          {items.map((item, idx) => {
            const displayLabel = tCategories(item.category);

            return (
              <div
                key={idx}
                className="pt-3 first:pt-0 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded font-medium ${CATEGORY_LABELS[item.category]?.className || CATEGORY_LABELS}`}
                    >
                      {displayLabel}
                    </span>
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded font-semibold ${
                        item.status === "ORDERED"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-indigo-50 text-indigo-700 animate-pulse"
                      }`}
                    >
                      {item.status === "ORDERED"
                        ? t("statusOrdered")
                        : t("statusInStock")}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm mt-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {t("totalQuantity")}{" "}
                    <span className="font-bold text-gray-700">
                      {item.quantity} {t("pcs")}
                    </span>
                  </p>
                </div>

                {item.status === "ORDERED" && (
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleReceive(item.title, item.category)}
                    className="px-3 py-1.5 text-xs font-semibold bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 shadow-sm transition-all whitespace-nowrap disabled:opacity-50"
                  >
                    {isPending
                      ? t("pendingBtn")
                      : `${t("receiveBtn")} (${item.quantity})`}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
