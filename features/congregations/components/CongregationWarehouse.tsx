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
import { Button } from "@/components/ui/buttons";
import { formatLanguageLabel } from "@/lib/languages";

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
  const [activeItemKey, setActiveItemKey] = useState<string | null>(null);

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

  const handleReceive = async (
    title: string,
    category: string,
    language: string = "",
  ) => {
    const itemKey = `${category}-${title}-${language || "default"}`;
    setActiveItemKey(itemKey);
    setIsPending(true);

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    try {
      const [res] = await Promise.all([
        bulkReceivePublications(congregationId, title, category, language),
        delay(1000),
      ]);

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
      setActiveItemKey(null);
    }
  };

  if (isLoading && items.length === 0)
    return (
      <div className="h-32 bg-gray-50 dark:bg-slate-900/50 animate-pulse rounded-2xl border border-gray-100 dark:border-slate-800" />
    );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4 dark:bg-slate-900 dark:border-slate-800 transition-colors">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white border-b border-gray-100 dark:border-slate-800 pb-2">
        📦 {t("warehouseTitle")}
      </h3>

      {items.length === 0 ? (
        <div className="py-8 px-4 text-center">
          <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
            {t("emptyStateTitle")}
          </p>
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-1 max-w-60 mx-auto">
            {t("emptyStateDescription")}
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50 dark:divide-slate-800/60 max-h-96 overflow-y-auto pr-2 space-y-3">
          {items.map((item, idx) => {
            const displayLabel = tCategories(item.category);
            const currentItemKey = `${item.category}-${item.title}-${item.language || "default"}`;
            const isCurrentLoading =
              isPending && activeItemKey === currentItemKey;

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

                    {Boolean(item.language?.trim()) && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-indigo-50 text-indigo-600 rounded border border-indigo-100 dark:bg-indigo-950/50 dark:border-indigo-900/50 dark:text-indigo-400">
                        {formatLanguageLabel(item.language)}
                      </span>
                    )}
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded font-semibold transition-colors ${
                        item.status === "ORDERED"
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                          : "bg-indigo-50 text-indigo-700 animate-pulse dark:bg-indigo-500/10 dark:text-indigo-400"
                      }`}
                    >
                      {item.status === "ORDERED"
                        ? t("statusOrdered")
                        : t("statusInStock")}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-800 dark:text-slate-200 text-sm mt-1 truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-slate-400">
                    {t("totalQuantity")}{" "}
                    <span className="font-bold text-gray-700 dark:text-slate-300">
                      {item.quantity} {t("pcs")}
                    </span>
                  </p>
                </div>

                {item.status === "ORDERED" && (
                  <Button
                    variant="secondary"
                    size="none"
                    isLoading={isCurrentLoading}
                    disabled={isPending && !isCurrentLoading}
                    onClick={() =>
                      handleReceive(item.title, item.category, item.language)
                    }
                    className="w-31.25 h-8 text-xs font-semibold rounded-xl whitespace-nowrap"
                  >
                    {`${t("receiveBtn")} (${item.quantity})`}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
