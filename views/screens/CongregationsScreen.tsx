"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { UsersIcon } from "@/components/ui/icons/UsersIcon";
import { Modal } from "@/components/ui/Modal";
import { CongregationList } from "@/features/congregations/components/CongregationList";
import { CreateCongregationForm } from "@/features/congregations/components/CreateCongregationForm";
import { Button } from "@/components/ui/Button";

export const CongregationsScreen = () => {
  const t = useTranslations("CongregationsScreen");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 text-lg text-gray-600">{t("description")}</p>
      </div>

      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-5">
          {t("createSectionTitle")}
        </h3>
        <div className="flex flex-wrap gap-4">
          <Button
            title={t("createButtonTitle")}
            className="flex flex-wrap gap-4"
            onClick={() => setIsModalOpen(true)}
          >
            <UsersIcon className="h-6 w-6" />+ {t("createButtonText")}
          </Button>
        </div>
      </section>

      <CongregationList />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t("modalTitle")}
      >
        <CreateCongregationForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};
