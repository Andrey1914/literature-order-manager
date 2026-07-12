import { useTranslations } from "next-intl";
import type { Publisher } from "@/types";
import { OrderBadge } from "./OrderBadge";

export const PublisherCard = ({ publisher }: { publisher: Publisher }) => {
  const t = useTranslations("AdminUserDetail");

  const totalOrdersCount =
    (publisher.specialOrders?.length || 0) +
    (publisher.regularSubscriptions?.length || 0);

  return (
    <div className="border border-gray-100 rounded-lg p-3 bg-blue-50/40 flex flex-col justify-between dark:bg-slate-950/40 dark:border-slate-800 transition-colors">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2 bg-transparent">
          <h4 className="text-xs font-bold text-gray-800 dark:text-slate-200 truncate">
            👤 {publisher.lastName ? `${publisher.lastName} ` : ""}
            {publisher.name}
          </h4>
          {totalOrdersCount > 0 && (
            <span className="text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-full font-semibold border border-amber-100 shrink-0 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20">
              {t("ordersCount", { count: totalOrdersCount })}
            </span>
          )}
        </div>

        <div className="space-y-2 mt-2 bg-blue-50/35 dark:bg-transparent">
          {publisher.specialOrders?.map((order) => (
            <OrderBadge key={order._id.toString()} order={order} />
          ))}

          {publisher.regularSubscriptions?.map((sub) => (
            <OrderBadge key={sub._id.toString()} order={sub} isRegular />
          ))}
        </div>

        {totalOrdersCount === 0 && (
          <p className="text-[11px] text-gray-400 dark:text-slate-500 italic mt-1">
            {t("noActiveOrders")}
          </p>
        )}
      </div>
    </div>
  );
};
