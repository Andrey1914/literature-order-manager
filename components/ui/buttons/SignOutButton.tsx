"use client";

import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Button } from "./Button";

export const SignOutButton = () => {
  const t = useTranslations("Common");

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <Button type="button" onClick={handleSignOut} variant="secondary">
      {t("signout")}
    </Button>
  );
};
