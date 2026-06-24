import { useTranslations } from "next-intl";
import { PublisherStatusCardProps } from "./types";

export const PublisherStatusCard = ({
  totalOrders = 0,
  needsDelivery = false,
}: PublisherStatusCardProps) => {
  const t = useTranslations("PublisherStatusCard");

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-4">
      <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
        {t("title")}
      </h3>
      <div className="text-sm text-gray-600 space-y-2">
        <p>
          <strong>{t("totalOrders")}</strong> {totalOrders} {t("pcs")}
        </p>
        <p>
          <strong>{t("needsDelivery")}</strong>{" "}
          {needsDelivery ? t("yes") : t("no")}
        </p>
      </div>
    </div>
  );
};
