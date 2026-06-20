"use client";

import { useState } from "react";
import { Congregation } from "../types";
import { Button } from "@/components/ui/Button";
import { useCongregationStore } from "../store";
import { updateCongregationAction } from "../actions";

interface EditCongregationFormProps {
  item: Congregation;
  onSuccess: () => void;
}

export const EditCongregationForm = ({
  item,
  onSuccess,
}: EditCongregationFormProps) => {
  const updateCongregation = useCongregationStore(
    (state) => state.updateCongregation,
  );

  const [name, setName] = useState(item.name);
  const [country, setCountry] = useState(item.country || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const updated = await updateCongregationAction(item.id, name, country);
      updateCongregation(updated);
      onSuccess();
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Название собрания <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-gray-300 p-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Страна{" "}
          <span className="text-gray-400 font-normal">(опционально)</span>
        </label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full rounded-xl border border-gray-300 p-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onSuccess}>
          Отмена
        </Button>
        <Button type="submit" isLoading={isLoading}>
          Сохранить
        </Button>
      </div>
    </form>
  );
};
