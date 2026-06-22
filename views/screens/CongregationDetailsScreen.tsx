"use client";

import { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@/components/ui/icons/ArrowLeftIcon";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useCongregationStore } from "@/features/congregations/store";
import { usePublisherStore } from "@/features/publishers/store";
import { CreatePublisherForm } from "@/features/publishers/components/CreatePublisherForm";
import { PublisherList } from "@/features/publishers/components/PublisherList";
import { CongregationInfoCard } from "@/features/congregations/components/CongregationInfoCard";
import { getPublishersByCongregation } from "@/features/publishers/actions";
import { CongregationWarehouse } from "@/features/congregations/components/CongregationWarehouse";

export const CongregationDetailsScreen = () => {
  const { activeCongregationId, setActiveCongregation, congregations } =
    useCongregationStore();
  const { setPublishers, setIsLoading } = usePublisherStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeCongregation = congregations.find(
    (c) => c.id === activeCongregationId,
  );

  useEffect(() => {
    if (!activeCongregationId) return;

    const fetchPublishers = async () => {
      setIsLoading(true);
      try {
        const result = await getPublishersByCongregation(activeCongregationId);

        if (result.success && result.data) {
          setPublishers(result.data);
        } else if (result.error) {
          console.error(result.error);
        }
      } catch (error) {
        console.error("Error loading publishers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublishers();
  }, [activeCongregationId, setPublishers, setIsLoading]);

  if (!activeCongregation) return null;

  const { name, country } = activeCongregation;

  return (
    <div className="space-y-8">
      <Button
        type="button"
        variant="secondary"
        onClick={() => setActiveCongregation(null)}
        className="flex items-center gap-2"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span>К списку собраний</span>
      </Button>

      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Собрание: &ldquo;{name}&rdquo;
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Управление возвещателями собрания и их заказами литературы.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800">Возвещатели</h3>
            <Button onClick={() => setIsModalOpen(true)}>
              + Добавить возвещателя
            </Button>
          </div>

          <PublisherList />
        </div>

        <div className="space-y-6">
          <CongregationInfoCard name={name} country={country} />
          <CongregationWarehouse congregationId={activeCongregation.id} />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Добавить возвещателя в "${name}"`}
      >
        <CreatePublisherForm
          congregationId={activeCongregation.id}
          onSuccess={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
