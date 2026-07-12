"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePublisherStore } from "../store";
import { updatePublisher } from "../actions";
import { Button } from "@/components/ui/buttons";
import { EditPublisherFormProps } from "./types";

export const EditPublisherForm = ({
  publisher,
  onSuccess,
}: EditPublisherFormProps) => {
  const t = useTranslations("EditPublisherForm");
  const updatePublisherState = usePublisherStore(
    (state) => state.updatePublisherState,
  );
  // const [name, setName] = useState(publisher.name);
  // const [name, setName] = useState(publisher.name || "");
  // const [lastName, setLastName] = useState(publisher.lastName || "");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(t("errors.nameRequired"));
      return;
    }

    setError(null);
    setIsPending(true);

    try {
      const result = await updatePublisher({
        id: publisher.id,
        name: name.trim(),
        lastName: lastName.trim(),
      });
      console.log(result);
      if (result.error) {
        setError(result.error);
      } else if (result.success) {
        updatePublisherState(publisher.id, {
          name: name.trim(),
          lastName: lastName.trim() || null,
        });
        onSuccess();
      }
    } catch (err) {
      console.error(err);
      setError(t("errors.generalError"));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
      {error && (
        <div className="p-3 text-sm bg-red-50 text-red-600 rounded-xl border border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-900/30">
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <label
          htmlFor="edit-name"
          className="text-sm font-semibold text-gray-700 dark:text-slate-300"
        >
          {t("firstNameLabel")} <span className="text-red-500">*</span>
        </label>
        <input
          id="edit-name"
          type="text"
          autoComplete="off"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("firstNamePlaceholder") || ""}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-slate-950 dark:border-slate-600 dark:text-slate-300 dark:placeholder:text-slate-500 dark:focus:ring-indigo-500/20 transition-colors"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="edit-last-name"
          className="text-sm font-semibold text-gray-700 dark:text-slate-300"
        >
          {t("lastNameLabel")}
        </label>
        <input
          id="edit-last-name"
          type="text"
          autoComplete="off"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder={t("lastNamePlaceholder") || ""}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-slate-950 dark:border-slate-600 dark:text-slate-300 dark:placeholder:text-slate-500 dark:focus:ring-indigo-500/20 transition-colors"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
          {isPending ? t("loadingButton") : t("submitButton")}
        </Button>
      </div>
    </form>
  );
};
