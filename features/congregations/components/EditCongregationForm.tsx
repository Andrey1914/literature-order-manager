"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { EditCongregationFormProps } from "./types";
import { Button } from "@/components/ui/buttons";
import { useCongregationStore } from "../store";
import { updateCongregationAction } from "../actions";

export const EditCongregationForm = ({
  item,
  onSuccess,
}: EditCongregationFormProps) => {
  const t = useTranslations("EditCongregationForm");
  const tCommon = useTranslations("Common");
  const tForm = useTranslations("CommonForm");

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
      console.error(t("errorLog"), error);
      alert(t("errorAlert"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1 dark:text-slate-300">
          {tForm("nameLabel")} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-gray-300 p-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500 transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">
          {tForm("countryLabel")}{" "}
          <span className="text-gray-400 font-normal dark:text-slate-500">
            ({tForm("optional")})
          </span>
        </label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full rounded-xl border border-gray-300 p-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500 transition-colors"
        />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onSuccess}>
          {tCommon("cancel")}{" "}
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {tCommon("save")}
        </Button>
      </div>
    </form>
  );
};
