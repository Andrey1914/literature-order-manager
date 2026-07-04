import { DbSpecialOrder, DbRegularSubscription } from "@/features/orders/types";
import { OrderBadge } from "./OrderBadge";

interface Publisher {
  id: string;
  name: string;
  lastName: string | null;
  specialOrders: DbSpecialOrder[];
  regularSubscriptions: DbRegularSubscription[];
}

export const PublisherCard = ({ publisher }: { publisher: Publisher }) => {
  const totalOrdersCount =
    publisher.specialOrders.length + publisher.regularSubscriptions.length;

  return (
    <div className="border border-gray-100 rounded-lg p-3 bg-blue-50/40 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2 bg-transparent">
          <h4 className="text-xs font-bold text-gray-800 truncate">
            👤 {publisher.lastName ? `${publisher.lastName} ` : ""}
            {publisher.name}
          </h4>
          {totalOrdersCount > 0 && (
            <span className="text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-full font-semibold border border-amber-100 shrink-0">
              Заказов: {totalOrdersCount}
            </span>
          )}
        </div>

        <div className="space-y-2 mt-2 bg-blue-50/35">
          {publisher.specialOrders.map((order) => (
            <OrderBadge key={order._id.toString()} order={order} />
          ))}

          {publisher.regularSubscriptions.map((sub) => (
            <OrderBadge key={sub._id.toString()} order={sub} isRegular />
          ))}
        </div>

        {totalOrdersCount === 0 && (
          <p className="text-[11px] text-gray-400 italic mt-1">
            Нет активных заказов
          </p>
        )}
      </div>
    </div>
  );
};
