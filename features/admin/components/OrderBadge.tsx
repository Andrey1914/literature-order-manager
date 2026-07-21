import { useTranslations } from "next-intl";
import { DbSpecialOrder, DbRegularSubscription } from "@/features/orders/types";
import { CATEGORY_LABELS, STATUS_CONFIG } from "@/features/orders/utils";
import { formatLanguageLabel } from "@/lib/languages";

interface OrderBadgeProps {
  order: DbSpecialOrder | DbRegularSubscription;
  isRegular?: boolean;
}

export const OrderBadge = ({ order, isRegular = false }: OrderBadgeProps) => {
  const tCategories = useTranslations("Categories");
  const t = useTranslations("OrderCard");
  const tCommon = useTranslations("Common");

  const currentStatus = order.status;
  const categoryStyle =
    CATEGORY_LABELS[order.category]?.className || CATEGORY_LABELS;
  const statusStyle =
    STATUS_CONFIG[currentStatus]?.className ||
    "bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-400";

  return (
    <div className="text-[11px] bg-white p-2.5 rounded-lg border border-gray-100 flex flex-wrap items-center gap-2 dark:bg-slate-900 dark:border-slate-800 transition-colors">
      <span
        className={`px-2 py-0.5 text-xs font-medium rounded-md border shrink-0 ${categoryStyle} ${
          isRegular
            ? "italic dark:text-slate-200"
            : "text-gray-400 dark:text-slate-200"
        }`}
      >
        {tCategories(order.category)}
      </span>

      <span className="font-medium text-gray-800 dark:text-slate-100 wrap-break-word">
        {order.title}
      </span>

      {Boolean(order.language?.trim()) && (
        <span className="px-1.5 py-0.5 text-[10px] font-bold bg-indigo-50 text-indigo-600 rounded-md border border-indigo-100 dark:bg-indigo-950/50 dark:border-indigo-900/50 dark:text-indigo-400 shrink-0">
          {formatLanguageLabel(order.language)}
        </span>
      )}

      <span className="font-bold text-gray-900 dark:text-white text-xs shrink-0">
        {order.quantity} {tCommon("pcs")}
      </span>

      <span
        className={`px-2 py-0.5 text-xs rounded-md shrink-0 ${
          order.status === "EXPECTED"
            ? `${statusStyle} animate-pulse`
            : statusStyle
        }`}
      >
        {t(`statuses.${order.status}`)}
      </span>
    </div>
  );
};
