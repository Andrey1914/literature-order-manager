"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePublisherStore } from "../store";
import { createPublisher } from "../actions";
import { Button } from "@/components/ui/Button";
import { CreatePublisherFormProps } from "./types";

export const CreatePublisherForm = ({
  congregationId,
  onSuccess,
}: CreatePublisherFormProps) => {
  const t = useTranslations("CreatePublisherForm");

  const addPublisher = usePublisherStore((state) => state.addPublisher);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    const result = await createPublisher({ name, lastName, congregationId });
    setIsPending(false);

    if (result.error) {
      setError(result.error);
    } else if (result.success && result.publisher) {
      addPublisher(result.publisher);
      setName("");
      setLastName("");
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
      {error && (
        <div className="p-3 text-sm bg-red-50 text-red-600 rounded-xl border border-red-100">
          {error}
        </div>
      )}
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm font-semibold text-gray-700">
          {t("firstNameLabel")} <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("firstNamePlaceholder")}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 p-3 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 "
        />
      </div>
      <div className="space-y-1.5">
        <label
          htmlFor="last-name"
          className="text-sm font-semibold text-gray-700"
        >
          {t("lastNameLabel")}
        </label>
        <input
          id="last-name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder={t("lastNamePlaceholder")}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 p-3 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 "
        />
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
          {isPending ? t("loadingButton") : t("submitButton")}
        </Button>
      </div>
    </form>
  );
};
