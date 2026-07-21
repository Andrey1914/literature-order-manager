// "use client";

import { useTranslations, useLocale } from "next-intl";
import { formatDate } from "../utils";
import { OrderHistoryProps } from "./types";

export const OrderHistory = ({
  historyDates,
  isRegular,
}: OrderHistoryProps) => {
  const t = useTranslations("OrderCard");
  const tCommon = useTranslations("Common");
  const locale = useLocale();

  if (!historyDates || historyDates.length === 0) return null;

  return (
    <div className="pt-1.5 border-t border-gray-50/80 dark:border-slate-800">
      <p className="text-[10px] text-gray-400 dark:text-slate-300 font-bold uppercase tracking-wider mb-1">
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
              className="text-[11px] bg-emerald-50/60 border border-emerald-100/70 text-emerald-700 px-1.5 py-0.5 rounded-md font-medium dark:bg-emerald-950/40 dark:border-emerald-900/30 dark:text-emerald-400"
            >
              {systemFormattedDate || jsonFormattedDate}
            </span>
          );
        })}
      </div>
    </div>
  );
};
