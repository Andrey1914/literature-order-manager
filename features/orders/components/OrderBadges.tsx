"use client";

import { useTranslations } from "next-intl";
import { CATEGORY_LABELS, STATUS_CONFIG } from "../utils";
import { formatLanguageLabel } from "@/lib/languages";
import { OrderBadgesProps } from "./types";

export const OrderBadges = ({
  category,
  status,
  language,
  isRegular,
}: OrderBadgesProps) => {
  const t = useTranslations("OrderCard");
  const tCategories = useTranslations("Categories");

  const statusStyle =
    STATUS_CONFIG[status]?.className ||
    "bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-400";
  const categoryStyle = CATEGORY_LABELS[category]?.className || "";

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span
        className={`px-2 py-0.5 text-xs font-medium rounded-md border ${categoryStyle}`}
      >
        {tCategories(category)}
      </span>

      <span
        className={`px-2 py-0.5 text-xs rounded-md ${
          status === "EXPECTED" ? `${statusStyle} animate-pulse` : statusStyle
        }`}
      >
        {t(`statuses.${status}`)}
      </span>

      {Boolean(language?.trim()) && (
        <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-50 text-indigo-600 rounded-md border border-indigo-100 dark:bg-indigo-950/50 dark:border-indigo-900/50 dark:text-indigo-400">
          {formatLanguageLabel(language)}
        </span>
      )}

      {isRegular && (
        <span className="px-2 py-0.5 text-[10px] bg-gray-50 text-gray-400 font-mono rounded-md border border-gray-200/60 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-500">
          {t("monthly")}
        </span>
      )}
    </div>
  );
};
