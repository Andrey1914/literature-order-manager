import { CongregationInfoCardProps } from "./types";
import { useTranslations } from "next-intl";

export const CongregationInfoCard = ({
  name,
  country,
}: CongregationInfoCardProps) => {
  const t = useTranslations("CongregationInfoCard");

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-4">
      <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
        {t("title")}
      </h3>
      <div className="text-sm text-gray-600 space-y-2">
        <p>
          <strong>{t("nameLabel")}</strong> {name}
        </p>
        {country && (
          <p>
            <strong>{t("countryLabel")}</strong> 🌍 {country}
          </p>
        )}
      </div>
    </div>
  );
};
