"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Button } from "./Button";

export const SignOutButton = () => {
  const t = useTranslations("Common");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    try {
      await Promise.all([signOut({ callbackUrl: "/" }), delay(700)]);
    } catch (error) {
      console.error("Ошибка при выходе:", error);
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="secondary"
      isLoading={isLoading}
      onClick={handleSignOut}
      className="w-full h-11.5 sm:w-22.5"
    >
      {t("signout")}
    </Button>
  );
};
