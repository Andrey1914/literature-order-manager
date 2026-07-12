import { useTranslations } from "next-intl";
import { PublisherStatusCardProps } from "./types";

export const PublisherStatusCard = ({
  totalOrders = 0,
  needsDelivery = false,
}: PublisherStatusCardProps) => {
  const t = useTranslations("PublisherStatusCard");

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-4 dark:bg-slate-900/50 dark:border-slate-800">
      <h3 className="text-lg font-bold text-gray-800 border-b pb-2 dark:text-slate-100 dark:border-slate-800">
        {t("title")}
      </h3>
      <div className="text-sm text-gray-600 space-y-2 dark:text-slate-400">
        <p>
          <strong className="dark:text-slate-200">{t("totalOrders")}</strong>{" "}
          {totalOrders} {t("pcs")}
        </p>
        <p>
          <strong className="dark:text-slate-200">{t("needsDelivery")}</strong>{" "}
          <span
            className={
              needsDelivery
                ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                : ""
            }
          >
            {needsDelivery ? t("yes") : t("no")}
          </span>
        </p>
      </div>
    </div>
  );
};
