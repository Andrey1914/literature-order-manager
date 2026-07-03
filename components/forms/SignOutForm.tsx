"use client";

import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export const SignOutForm = () => {
  const t = useTranslations("Common");
  const handleSignOut = async (e: React.FormEvent) => {
    e.preventDefault();
    await signOut({ callbackUrl: "/" });
  };

  return (
    <form onSubmit={handleSignOut} className="w-full sm:w-auto">
      <button
        type="submit"
        className="w-full sm:w-auto rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        {t("signout")}
      </button>
    </form>
  );
};
