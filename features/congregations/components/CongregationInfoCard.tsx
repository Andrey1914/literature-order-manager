import { CongregationInfoCardProps } from "./types";
import { useTranslations } from "next-intl";

export const CongregationInfoCard = ({
  name,
  country,
}: CongregationInfoCardProps) => {
  const t = useTranslations("CongregationInfoCard");

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-4 dark:bg-slate-900 dark:border-slate-800 transition-colors">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white border-b border-gray-100 dark:border-slate-800 pb-2">
        {t("title")}
      </h3>
      <div className="text-sm text-gray-600 space-y-2 dark:text-slate-300">
        <p>
          <strong className="text-gray-800 dark:text-slate-200">
            {t("nameLabel")}
          </strong>{" "}
          {name}
        </p>
        {country && (
          <p>
            <strong className="text-gray-800 dark:text-slate-200">
              {t("countryLabel")}
            </strong>{" "}
            🌍 {country}
          </p>
        )}
      </div>
    </div>
  );
};
