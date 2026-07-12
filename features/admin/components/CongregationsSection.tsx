import { useTranslations } from "next-intl";
import { CongregationBlock } from "./CongregationBlock";

interface CongregationData {
  id: string;
  name: string;
}

interface CongregationsSectionProps {
  congregations: CongregationData[];
}

export const CongregationsSection = ({
  congregations,
}: CongregationsSectionProps) => {
  const t = useTranslations("AdminUserDetail");

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider pl-1">
        {t("sectionTitle")}
      </h2>

      {congregations.length === 0 ? (
        <div className="text-center py-12 text-sm text-gray-400 dark:text-slate-500 italic bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
          {t("noCongregations")}
        </div>
      ) : (
        congregations.map((cong) => (
          <CongregationBlock key={cong.id} congregation={cong} />
        ))
      )}
    </div>
  );
};
