// "use client";

import { useTranslations } from "next-intl";
import { CardActions } from "@/components/ui/buttons";
import { getActionKey, STATUS_CONFIG } from "../utils";
import { OrderActionsProps } from "./types";

export const OrderActions = ({
  status,
  isPending,
  onStatusChange,
  onEdit,
  onDelete,
}: OrderActionsProps) => {
  const t = useTranslations("OrderCard");
  const tCommon = useTranslations("Common");

  const isDelivered = status === "DELIVERED";
  const hasBtnAction = Boolean(STATUS_CONFIG[status]?.btnLabel);

  if (isDelivered) return null;

  return (
    <div className="flex flex-row flex-wrap items-stretch justify-end gap-2 w-full sm:w-auto shrink-0">
      {hasBtnAction && (
        <button
          type="button"
          disabled={isPending}
          onClick={onStatusChange}
          className={`flex-1 sm:flex-initial flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-xl border transition-all shadow-sm ${
            status === "ORDERED"
              ? "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 active:bg-gray-100 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
              : "bg-indigo-600 border-transparent text-white hover:bg-indigo-700 active:bg-indigo-800 shadow-indigo-500/10 dark:bg-indigo-600 dark:hover:bg-indigo-500"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isPending
            ? tCommon("updating")
            : t(`actions.${getActionKey(status)}`)}
        </button>
      )}

      <div className="flex shrink-0">
        <CardActions onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
};
