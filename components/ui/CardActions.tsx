"use client";

import { Button } from "./Button";
import { PencilIcon } from "./icons/PencilIcon";
import { TrashIcon } from "./icons/TrashIcon";

interface CardActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const CardActions = ({ onEdit, onDelete }: CardActionsProps) => {
  return (
    <div
      className="absolute top-4 right-4 flex gap-1.5"
      onClick={(e) => e.stopPropagation()}
    >
      <Button
        type="button"
        variant="icon"
        onClick={onEdit}
        title="Редактировать"
        className="hover:text-indigo-600"
      >
        <PencilIcon className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="icon"
        onClick={onDelete}
        title="Удалить"
        className="hover:text-red-600"
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
