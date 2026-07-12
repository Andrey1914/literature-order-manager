"use client";

import { useTranslations } from "next-intl";
import { GoogleSignInButton } from "@/components/ui/buttons/GoogleSignInButton";

export const LoginView = () => {
  const t = useTranslations("LoginView");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 transition-colors dark:bg-slate-950">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md text-center border border-transparent dark:bg-slate-900/50 dark:border-slate-800 dark:shadow-xl/20">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
            {t("title")}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
            {t("description")}
          </p>
        </div>

        <GoogleSignInButton />
      </div>
    </div>
  );
};
