import { useTranslations } from "next-intl";
import { DbSpecialOrder, DbRegularSubscription } from "@/features/orders/types";
import { CATEGORY_LABELS, STATUS_CONFIG } from "@/features/orders/utils";

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
    STATUS_CONFIG[currentStatus]?.className || "bg-gray-100 text-gray-600";

  return (
    <div className="text-[11px] bg-white p-2 rounded-lg border border-gray-100 flex justify-between items-center gap-2">
      <div className="truncate flex gap-2.5 items-center">
        <span
          className={`px-2 py-0.5 text-xs font-medium rounded-md border ${categoryStyle} ${isRegular ? "text-italic" : "text-gray-500"}`}
        >
          {tCategories(order.category)}
        </span>
        <span className="text-gray-700">{order.title}</span>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="font-bold text-gray-900">
          {order.quantity} {tCommon("pcs")}
        </span>
        <span
          className={`px-2 py-0.5 text-xs rounded-md ${order.status === "EXPECTED" ? `${statusStyle} animate-pulse` : statusStyle}`}
        >
          {t(`statuses.${order.status}`)}
        </span>
      </div>
    </div>
  );
};
