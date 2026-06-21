"use client";

import { useEffect } from "react";
import { useCongregationStore } from "@/features/congregations/store";
import { usePublisherStore } from "@/features/publishers/store";
import { DashboardViewProps } from "./types";
import { CongregationsScreen } from "./screens/CongregationsScreen";
import { CongregationDetailsScreen } from "./screens/CongregationDetailsScreen";
import { PublisherDetailsScreen } from "./screens/PublisherDetailsScreen";

export const DashboardView = ({ initialCongregations }: DashboardViewProps) => {
  const { setCongregations, activeCongregationId } = useCongregationStore();
  const { activePublisherId } = usePublisherStore();

  useEffect(() => {
    if (initialCongregations) {
      setCongregations(initialCongregations);
    }
  }, [initialCongregations, setCongregations]);

  return (
    <main className="flex-1 bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {!activeCongregationId ? (
          <CongregationsScreen />
        ) : !activePublisherId ? (
          <CongregationDetailsScreen />
        ) : (
          <PublisherDetailsScreen />
        )}
      </div>
    </main>
  );
};
