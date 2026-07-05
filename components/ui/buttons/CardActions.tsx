import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/buttons";
import { PencilIcon, TrashIcon } from "../icons";
import { CardActionsProps } from "../types";

export const CardActions = ({ onEdit, onDelete }: CardActionsProps) => {
  const t = useTranslations("Common");
  return (
    <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
      <Button
        type="button"
        variant="icon"
        onClick={onEdit}
        title={t("editing")}
        className="bg-white border-gray-200! shadow-sm text-gray-700 hover:text-indigo-600"
      >
        <PencilIcon className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="icon"
        onClick={onDelete}
        title={t("delete")}
        className="bg-white border-gray-200! shadow-sm text-gray-700 hover:text-red-600"
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
