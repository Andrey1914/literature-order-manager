"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePublisherStore } from "../store";
import { deletePublisher } from "../actions";
import { CardActions } from "@/components/ui/buttons";
import { Modal, ConfirmModal } from "@/components/ui/modals";
import { EditPublisherForm } from "./EditPublisherForm";
import { PublisherCardProps } from "./types";

export const PublisherCard = ({ publisher }: PublisherCardProps) => {
  const t = useTranslations("PublisherCard");

  const setActivePublisher = usePublisherStore(
    (state) => state.setActivePublisher,
  );
  const removePublisher = usePublisherStore((state) => state.removePublisher);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeletePending, setIsDeletePending] = useState(false);

  const confirmDelete = async () => {
    setIsDeletePending(true);
    try {
      const result = await deletePublisher(publisher.id);
      if (result.success) {
        removePublisher(publisher.id);
        setIsDeleteOpen(false);
      } else if (result.error) {
        alert(result.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeletePending(false);
    }
  };

  return (
    <>
      <div
        onClick={() => setActivePublisher(publisher.id)}
        className="group cursor-pointer rounded-2xl border p-6 shadow-sm transition-all hover:shadow-md bg-white hover:border-indigo-400/40"
      >
        <div className="flex items-start justify-between gap-4 w-full">
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-gray-800 group-hover:text-indigo-700 transition-colors wrap-break-word">
              {publisher.name}

              {publisher.pendingCount && publisher.pendingCount > 0 ? (
                <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1.5 text-xs font-bold text-white ring-2 ring-white animate-pulse">
                  {publisher.pendingCount}
                </span>
              ) : null}
            </h4>
            {publisher.lastName && (
              <p className="font-bold text-gray-500 mt-1.5 flex items-center gap-1 wrap-break-word">
                {publisher.lastName}
              </p>
            )}
          </div>

          <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
            <CardActions
              onEdit={() => setIsEditOpen(true)}
              onDelete={() => setIsDeleteOpen(true)}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title={t("editModalTitle")}
      >
        <EditPublisherForm
          publisher={publisher}
          onSuccess={() => setIsEditOpen(false)}
        />
      </Modal>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isDeletePending}
        title={t("deleteModalTitle")}
        message={t("deleteConfirmMessage", {
          name: publisher.name,
          lastName: publisher.lastName || "",
        })}
      />
    </>
  );
};
