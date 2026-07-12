import { useTranslations } from "next-intl";
import { UserRowCard } from "@/features/admin/components";
import type { UserRowCardProps } from "@/types";

type AdminUser = UserRowCardProps["user"];

interface AdminMainContentProps {
  users: AdminUser[];
}

export const AdminMainContent = ({ users }: AdminMainContentProps) => {
  const t = useTranslations("AdminDashboard");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-gray-200 dark:border-slate-800 pb-5">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("title")}
        </h1>
        <p className="text-sm text-gray-500 dark:text-slate-400">
          {t("description")}
        </p>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12 text-sm text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800/50 shadow-sm">
          {t("noUsers")}
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <UserRowCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};
