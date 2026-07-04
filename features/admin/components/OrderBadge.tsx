import { DbSpecialOrder, DbRegularSubscription } from "@/features/orders/types";
import { CATEGORY_LABELS } from "@/features/orders/utils/category-labels";

interface OrderBadgeProps {
  order: DbSpecialOrder | DbRegularSubscription;
  isRegular?: boolean;
}

export const OrderBadge = ({ order, isRegular = false }: OrderBadgeProps) => {
  const categoryConfig = CATEGORY_LABELS[order.category] || {
    label: order.category,
    className: "bg-gray-50 text-gray-700 border-gray-100",
  };
  const categoryStyle =
    CATEGORY_LABELS[order.category]?.className || CATEGORY_LABELS;

  return (
    <div className="text-[11px] bg-white p-2 rounded-lg border border-gray-100 flex justify-between items-center gap-2">
      <div className="truncate flex gap-2.5 items-center">
        <span
          className={`px-2 py-0.5 text-xs font-medium rounded-md border ${categoryStyle} ${isRegular ? "text-italic" : "text-gray-500"}`}
        >
          {categoryConfig.label}
        </span>
        <span className="text-gray-700">{order.title}</span>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="font-bold text-gray-900">{order.quantity} шт.</span>
        <span
          className={`text-[9px] px-1 rounded font-medium ${
            order.status === "EXPECTED"
              ? "bg-green-50 text-green-600 border border-green-100"
              : "status" in order && order.status === "DELIVERED"
                ? "bg-gray-100 text-gray-500"
                : "bg-blue-50 text-blue-600 border border-blue-100"
          }`}
        >
          {order.status}
        </span>
      </div>
    </div>
  );
};
