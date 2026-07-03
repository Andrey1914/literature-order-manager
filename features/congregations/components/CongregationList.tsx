"use client";

import { useTranslations } from "next-intl";
import { useCongregationStore } from "../store";
import { CongregationCard } from "./CongregationCard";

export const CongregationList = () => {
  const t = useTranslations("CongregationList");

  const { congregations, activeCongregationId, setActiveCongregation } =
    useCongregationStore();

  if (congregations.length === 0) return null;

  return (
    <section className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800">{t("title")}</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {congregations.map((item) => (
          <CongregationCard
            key={item.id}
            item={item}
            isActive={activeCongregationId === item.id}
            onSelect={setActiveCongregation}
          />
        ))}
      </div>
    </section>
  );
};
