import { useTranslations } from "next-intl";
import { ButtonLink, SignOutButton } from "@/components/ui/buttons";
import { WithSessionProps } from "@/types";

export const HomeView = ({ session }: WithSessionProps) => {
  const t = useTranslations("HomeView");
  const user = session?.user;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <main className="w-full max-w-2xl space-y-6 rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mx-auto max-w-md text-base text-gray-600 sm:text-lg">
          {t("description")}
        </p>

        <div className="pt-4">
          {user ? (
            <div className="space-y-4">
              <p className="text-xl font-semibold text-gray-800">
                {t("welcome", { name: user.name ?? t("noName") })}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <ButtonLink href="/dashboard" variant="primary">
                  {t("dashboardLink")}
                </ButtonLink>
                <SignOutButton />
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <ButtonLink href="/login" variant="primary">
                {t("loginLink")}
              </ButtonLink>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
