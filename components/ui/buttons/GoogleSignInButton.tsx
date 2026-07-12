import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "../icons/GoogleIcon";

export const GoogleSignInButton = () => {
  const t = useTranslations("Common");

  const handleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <button
      type="button"
      onClick={handleSignIn}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950 transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
    >
      <GoogleIcon />
      {t("signin")}
    </button>
  );
};
