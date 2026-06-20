"use client";

import { useState, useEffect } from "react";
import { UsersIcon } from "@/components/ui/icons/UsersIcon";
import { Modal } from "@/components/ui/Modal";
import { ActionButton } from "@/components/ui/ActionButton";
import { Button } from "@/components/ui/Button";
import { CongregationList } from "@/features/congregations/components/CongregationList";
import { CreateCongregationForm } from "@/features/congregations/components/CreateCongregationForm";
import { useCongregationStore } from "@/features/congregations/store";
import { DashboardViewProps } from "./types";

export const DashboardView = ({ initialCongregations }: DashboardViewProps) => {
  const {
    setCongregations,
    activeCongregationId,
    setActiveCongregation,
    congregations,
  } = useCongregationStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (initialCongregations) {
      setCongregations(initialCongregations);
    }
  }, [initialCongregations, setCongregations]);

  const activeCongregation = congregations.find(
    (c) => c.id === activeCongregationId,
  );

  return (
    <main className="flex-1 bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {activeCongregationId && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => setActiveCongregation(null)}
            className="flex items-center gap-2"
          >
            ← К списку собраний
          </Button>
        )}

        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {activeCongregation
              ? `Собрание: "${activeCongregation.name}"`
              : "Панель управления"}
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {activeCongregation
              ? `Управление возвещателями собрания "${activeCongregation.name}" и их заказами литературы.`
              : "Здесь вы можете управлять собраниями, заказами и пользователями."}
          </p>
        </div>

        {!activeCongregationId && (
          <>
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-5">
                Создайте собрание.
              </h3>
              <div className="flex flex-wrap gap-4">
                <ActionButton
                  label="+ Собрание"
                  icon={<UsersIcon className="h-6 w-6" />}
                  onClick={() => setIsModalOpen(true)}
                />
              </div>
            </section>

            <CongregationList />
          </>
        )}

        {activeCongregationId && activeCongregation && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">
                  Возвещатели.
                </h3>
                <Button
                  onClick={() =>
                    alert("Здесь откроется модалка добавления человека")
                  }
                >
                  + Добавить возвещателя.
                </Button>
              </div>

              <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-500">
                Здесь будет выводиться список возвещателей, привязанных к
                собранию:{" "}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-indigo-600">
                  {activeCongregation.name}
                </code>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-4">
              <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
                Информация
              </h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>Название:</strong> {activeCongregation?.name}
                </p>
                {activeCongregation?.country && (
                  <p>
                    <strong>Страна:</strong> 🌍 {activeCongregation.country}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Новое собрание"
        >
          <CreateCongregationForm onSuccess={() => setIsModalOpen(false)} />
        </Modal>
      </div>
    </main>
  );
};
