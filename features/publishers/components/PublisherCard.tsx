"use client";

import { useState } from "react";
import { usePublisherStore } from "../store";
import { deletePublisher } from "../actions";
import { CardActions } from "@/components/ui/CardActions";
import { Modal } from "@/components/ui/Modal";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { EditPublisherForm } from "./EditPublisherForm";
import { PublisherCardProps } from "./types";

export const PublisherCard = ({ publisher }: PublisherCardProps) => {
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
        className="relative flex flex-col justify-center bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-500/40 hover:shadow-md hover:shadow-indigo-500/5 transition-all cursor-pointer group"
      >
        <CardActions
          onEdit={() => setIsEditOpen(true)}
          onDelete={() => setIsDeleteOpen(true)}
        />

        <div className="pr-20">
          <h4 className="font-bold text-gray-800 group-hover:text-indigo-700 transition-colors">
            {publisher.name}
          </h4>
          {publisher.lastName && (
            <p className="font-bold text-gray-500 mt-1.5 flex items-center gap-1">
              {publisher.lastName}
            </p>
          )}
        </div>
      </div>

      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Редактировать возвещателя"
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
        title="Удалить возвещателя"
        message={`Вы уверены, что хотите удалить возвещателя ${publisher.name} ${publisher.lastName || ""}? Это действие необратимо удалит все связанные с ним заказы литературы.`}
      />
    </>
  );
};
