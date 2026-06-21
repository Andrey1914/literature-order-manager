"use client";

import { usePublisherStore } from "../store";
import { PublisherCard } from "./PublisherCard";

export const PublisherList = () => {
  const { publishers, isLoading } = usePublisherStore();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 4].map((n) => (
          <div
            key={n}
            className="h-20 bg-gray-100 animate-pulse rounded-2xl border border-gray-200/60"
          />
        ))}
      </div>
    );
  }

  if (publishers.length === 0) {
    return (
      <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-400 text-sm">
        В этом собрании пока нет ни одного возвещателя.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {publishers.map((publisher) => (
        <PublisherCard key={publisher.id} publisher={publisher} />
      ))}
    </div>
  );
};
