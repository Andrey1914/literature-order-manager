import { PublisherStatusCardProps } from "./types";

export const PublisherStatusCard = ({
  totalOrders = 0,
  needsDelivery = false,
}: PublisherStatusCardProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-4">
      <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Статус</h3>
      <div className="text-sm text-gray-600 space-y-2">
        <p>
          <strong>Всего заказов:</strong> {totalOrders} шт.
        </p>
        <p>
          <strong>Ожидает выдачи:</strong> {needsDelivery ? "Да" : "Нет"}
        </p>
      </div>
    </div>
  );
};
