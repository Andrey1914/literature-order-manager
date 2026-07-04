import { PublisherCard } from "./PublisherCard";
import { DbSpecialOrder, DbRegularSubscription } from "@/features/orders/types";

interface Congregation {
  id: string;
  name: string;
  publishers: Array<{
    id: string;
    name: string;
    lastName: string | null;
    specialOrders: DbSpecialOrder[];
    regularSubscriptions: DbRegularSubscription[];
  }>;
}

export const CongregationBlock = ({
  congregation,
}: {
  congregation: Congregation;
}) => {
  return (
    <div className="border border-gray-100 rounded-xl p-4 bg-white shadow-xs">
      <h3 className="text-base font-bold text-indigo-900 mb-3 flex items-center gap-2">
        Собрание: {congregation.name}
      </h3>

      {congregation.publishers.length === 0 ? (
        <p className="text-xs text-gray-400 italic pl-4">
          В собрании нет возвещателей
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-2">
          {congregation.publishers.map((pub) => (
            <PublisherCard key={pub.id} publisher={pub} />
          ))}
        </div>
      )}
    </div>
  );
};
