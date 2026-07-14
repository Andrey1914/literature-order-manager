"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  SettingsModal,
  SuccessDeleteModal,
  ConfirmModal,
} from "@/components/ui/modals";
import { deactivateOwnProfile } from "@/features/admin/actions";

interface ProfileDeleteFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileDeleteFlow = ({
  isOpen,
  onClose,
}: ProfileDeleteFlowProps) => {
  const t = useTranslations("ProfileDeleteFlow");

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTransitionToConfirm = () => {
    onClose();
    setIsConfirmOpen(true);
  };

  const handleDeleteProfile = async () => {
    setIsDeleting(true);
    setErrorMessage(null);
    try {
      const result = await deactivateOwnProfile();
      if (result.success) {
        setIsConfirmOpen(false);
        setIsSuccessOpen(true);
      } else {
        setErrorMessage(
          result.error || "An error occurred while deactivating your profile.",
        );
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Network error. Failed to connect to the server.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <SettingsModal
        isOpen={isOpen}
        onClose={onClose}
        onInitiateDelete={handleTransitionToConfirm}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setErrorMessage(null);
        }}
        onConfirm={handleDeleteProfile}
        title={t("confirmTitle")}
        message={errorMessage || t("confirmMessage")}
        isLoading={isDeleting}
      />

      <SuccessDeleteModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
    </>
  );
};
