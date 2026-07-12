"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

import { getPublishersByCongregation } from "@/features/publishers/actions";

import { useCongregationStore } from "@/features/congregations/store";
import { usePublisherStore } from "@/features/publishers/store";
import {
  CreatePublisherForm,
  PublisherList,
} from "@/features/publishers/components";
import {
  CongregationWarehouse,
  CongregationInfoCard,
} from "@/features/congregations/components";

import { ArrowLeftIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/buttons";
import { Modal } from "@/components/ui/modals";

export const CongregationDetailsScreen = () => {
  const t = useTranslations("CongregationDetailsScreen");

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
        title="К списку собраний"
        type="button"
        variant="secondary"
        onClick={() => setActiveCongregation(null)}
        className="flex items-center gap-2"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span>{t("backToButton")}</span>
      </Button>

      <div className="border-b border-gray-200 pb-6 dark:border-slate-800">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-slate-100">
          {t("title", { name })}
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-slate-400">
          {t("description")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 dark:bg-slate-900 dark:border-slate-900/50">
            <h3 className="text-xl font-bold text-gray-800 dark:text-slate-200">
              {t("publishersTitle")}
            </h3>
            <div className="w-full sm:w-auto">
              <Button
                title="Добавить возвещателя"
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto"
              >
                + {t("addPublisherButton")}
              </Button>
            </div>
          </div>

          <PublisherList />
        </div>

        <div className="space-y-6 order-1 lg:order-2">
          <CongregationInfoCard name={name} country={country} />
          <CongregationWarehouse congregationId={activeCongregation.id} />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t("modalTitle", { name })}
      >
        <CreatePublisherForm
          congregationId={activeCongregation.id}
          onSuccess={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
