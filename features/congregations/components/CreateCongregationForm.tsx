"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCongregationStore } from "../store";
import { createCongregationAction } from "../actions";
import { Button } from "@/components/ui/Button";
import { CreateCongregationFormProps } from "./types";

export const CreateCongregationForm = ({
  onSuccess,
}: CreateCongregationFormProps) => {
  const t = useTranslations("CreateCongregationForm");
  const tCommon = useTranslations("Common");
  const tForm = useTranslations("CommonForm");

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const addCongregation = useCongregationStore(
    (state) => state.addCongregation,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setIsLoading(true);
      const newCongregation = await createCongregationAction(name, country);
      addCongregation(newCongregation);

      setName("");
      setCountry("");
      onSuccess();
    } catch (error) {
      console.error(error);
      alert(t("errorAlert"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          {tForm("nameLabel")} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("namePlaceholder")}
          className="w-full rounded-xl border border-gray-300 p-3 text-sm text-gray-900 placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          {tForm("countryLabel")}{" "}
          <span className="text-gray-400 font-normal">
            ({tForm("optional")})
          </span>
        </label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder={t("countryPlaceholder")}
          className="w-full rounded-xl border border-gray-300 p-3 text-sm text-gray-900 placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onSuccess}>
          {tCommon("cancel")}
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {tCommon("save")}
        </Button>
      </div>
    </form>
  );
};
