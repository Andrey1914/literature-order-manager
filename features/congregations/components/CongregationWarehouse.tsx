"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getCongregationWarehouse,
  bulkReceivePublications,
} from "@/features/orders/actions";
import { CATEGORIES } from "@/features/constants";
import { WarehouseItem } from "./types";

export const CongregationWarehouse = ({
  congregationId,
}: {
  congregationId: string;
}) => {
  const [items, setItems] = useState<WarehouseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(true);
    const res = await bulkReceivePublications(congregationId, title, category);
    if (res.success) {
      await loadWarehouse();
    } else {
      alert(res.error);
      setIsLoading(false);
    }
  };

  if (isLoading)
    return <div className="h-32 bg-gray-50 animate-pulse rounded-2xl border" />;
  if (items.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
      <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
        📦 Сводный склад заказов
      </h3>

      <div className="divide-y divide-gray-50 max-h-96 overflow-y-auto pr-2 space-y-3">
        {items.map((item, idx) => {
          const currentCategoryInfo = CATEGORIES.find(
            (c) => c.value === item.category,
          );
          const displayLabel = currentCategoryInfo
            ? currentCategoryInfo.label
            : item.category;

          return (
            <div
              key={idx}
              className="pt-3 first:pt-0 flex items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">
                    {displayLabel}
                  </span>
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded font-semibold ${
                      item.status === "ORDERED"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-indigo-50 text-indigo-700"
                    }`}
                  >
                    {item.status === "ORDERED"
                      ? "В заказе"
                      : "На складе (ждёт выдачи)"}
                  </span>
                </div>
                <h4 className="font-bold text-gray-800 text-sm mt-1">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500">
                  Общее кол-во:{" "}
                  <span className="font-bold text-gray-700">
                    {item.quantity} шт.
                  </span>
                </p>
              </div>

              {item.status === "ORDERED" && (
                <button
                  type="button"
                  onClick={() => handleReceive(item.title, item.category)}
                  className="px-3 py-1.5 text-xs font-semibold bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 shadow-sm transition-all whitespace-nowrap"
                >
                  Прибыло ({item.quantity})
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
