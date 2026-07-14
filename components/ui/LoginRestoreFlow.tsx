"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { requestProfileRestoration } from "@/features/admin/actions";
import {
  DeactivatedModal,
  PendingRestoreModal,
  SuccessRestoreModal,
} from "@/components/ui/modals";

export const LoginRestoreFlow = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const error = searchParams.get("error");
  const email = searchParams.get("email") || "";

  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isDeactivatedOpen = error === "Deactivated";
  const isPendingOpen = error === "PendingRestore";

  const handleCloseAll = () => {
    setIsSuccessOpen(false);
    router.replace("/login");
  };

  const handleSendRequest = async () => {
    setIsLoading(true);
    try {
      const result = await requestProfileRestoration(email);

      if (result.success) {
        router.replace("/login");
        setIsSuccessOpen(true);
      } else {
        if (
          result.error === "PENDING_RESTORE" ||
          result.error === "ALREADY_SENT"
        ) {
          router.replace("/login?error=PendingRestore");
        } else {
          alert(result.error || "Something went wrong");
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DeactivatedModal
        isOpen={isDeactivatedOpen}
        onClose={handleCloseAll}
        email={email}
        isLoading={isLoading}
        onConfirm={handleSendRequest}
      />
      <PendingRestoreModal isOpen={isPendingOpen} onClose={handleCloseAll} />
      <SuccessRestoreModal isOpen={isSuccessOpen} onClose={handleCloseAll} />
    </>
  );
};
