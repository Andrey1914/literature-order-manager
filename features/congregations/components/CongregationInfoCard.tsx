import { CongregationInfoCardProps } from "./types";

export const CongregationInfoCard = ({
  name,
  country,
}: CongregationInfoCardProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-4">
      <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
        Информация
      </h3>
      <div className="text-sm text-gray-600 space-y-2">
        <p>
          <strong>Название:</strong> {name}
        </p>
        {country && (
          <p>
            <strong>Страна:</strong> 🌍 {country}
          </p>
        )}
      </div>
    </div>
  );
};
