"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useOrderStore } from "../store";
import { createSpecialOrder, createRegularSubscription } from "../actions";
import { CreateOrderFormProps } from "./types";
import { CATEGORIES } from "@/features/constants";

export const CreateOrderForm = ({
  publisherId,
  onSuccess,
}: CreateOrderFormProps) => {
  const { addSpecialOrder, addRegularSubscription } = useOrderStore();

  const [category, setCategory] = useState("BOOK");
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isPending, setIsPending] = useState(false);

  const currentType =
    CATEGORIES.find((c) => c.value === category)?.type || "SPECIAL";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || quantity < 1) return;

    setIsPending(true);

    try {
      if (currentType === "REGULAR") {
        const result = await createRegularSubscription({
          publisherId,
          category: category as "MAGAZINE" | "WORKBOOK",
          title,
          quantity,
        });

        if (result.success && result.id) {
          addRegularSubscription({
            id: result.id,
            publisherId,
            category: category as "MAGAZINE" | "WORKBOOK",
            title,
            quantity,
            status: "ORDERED",
            isActive: true,
          });
          onSuccess();
        } else if (result.error) alert(result.error);
      } else {
        const result = await createSpecialOrder({
          publisherId,
          category: category as "BOOK" | "BROCHURE" | "CD" | "ANNUAL_EDITION",
          title,
          quantity,
        });

        if (result.success && result.id) {
          addSpecialOrder({
            id: result.id,
            publisherId,
            category: category as "BOOK" | "BROCHURE" | "CD" | "ANNUAL_EDITION",
            title,
            quantity,
            status: "ORDERED",
          });
          onSuccess();
        } else if (result.error) alert(result.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 pt-2">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">
          Категория публикации
        </label>
        <div className="grid grid-cols-2 gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setCategory(cat.value)}
              className={`p-3 text-left text-sm rounded-xl border transition-all ${
                category === cat.value
                  ? "border-indigo-600 bg-indigo-50 text-indigo-700 font-medium shadow-sm shadow-indigo-500/10"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {cat.label}
              <span className="block text-[10px] text-gray-400 mt-0.5 font-normal">
                {cat.type === "REGULAR"
                  ? "Постоянная подписка"
                  : "Разовый заказ"}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="title" className="text-sm font-semibold text-gray-700">
          Название публикации
        </label>
        <input
          id="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={
            currentType === "REGULAR"
              ? "Например: Сторожевая Башня (изучение)"
              : "Например: Радуйтесь жизни сейчас!"
          }
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 p-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="quantity"
          className="text-sm font-semibold text-gray-700"
        >
          Количество (шт.)
        </label>
        <input
          id="quantity"
          type="number"
          min={1}
          required
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 p-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <Button type="submit" isLoading={isPending}>
          Добавить в заказ
        </Button>
      </div>
    </form>
  );
};
