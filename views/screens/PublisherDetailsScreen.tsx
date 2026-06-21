"use client";

import { ArrowLeftIcon } from "@/components/ui/icons/ArrowLeftIcon";
import { Button } from "@/components/ui/Button";
import { usePublisherStore } from "@/features/publishers/store";

export const PublisherDetailsScreen = () => {
  const { activePublisherId, setActivePublisher, publishers } =
    usePublisherStore();

  const currentPublisher = publishers.find((p) => p.id === activePublisherId);

  if (!currentPublisher) return null;

  return (
    <div className="space-y-8">
      <Button
        type="button"
        variant="secondary"
        onClick={() => setActivePublisher(null)}
        className="flex items-center gap-2"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span>Назад к собранию</span>
      </Button>

      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span>Имя:</span> {currentPublisher.name}
        </h1>
        <p className="mt-2 text-md text-gray-500 flex items-center gap-1">
          <span>Фамилия:</span> {currentPublisher.lastName ?? "не добавлена"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">
              Заказы литературы
            </h3>
            <Button onClick={() => alert("Добавить книгу в заказ")}>
              + Новый заказ
            </Button>
          </div>

          <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-400 text-sm">
            У этого возвещателя пока нет активных заказов литературы.
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-4">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
            Статус
          </h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>Всего заказов:</strong> 0 шт.
            </p>
            <p>
              <strong>Ожидает выдачи:</strong> Нет
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
