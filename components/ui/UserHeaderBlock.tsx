import Image from "next/image";
import { useTranslations } from "next-intl";

interface UserHeaderProps {
  user: {
    name: string | null;
    email: string | null;
    image: string | null;
    role: string | null;
  };
}

export const UserHeaderBlock = ({ user }: UserHeaderProps) => {
  const t = useTranslations("AdminUserDetail");

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-wrap items-center justify-between gap-4 dark:bg-slate-900 dark:border-slate-800 transition-colors">
      <div className="flex items-center gap-4">
        {user.image ? (
          <Image
            width={56}
            height={56}
            src={user.image}
            alt={user.name || t("defaultUserAlt")}
            className="w-14 h-14 rounded-full object-cover border border-gray-200 dark:border-slate-800"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg dark:bg-indigo-500/10 dark:text-indigo-400">
            {user.name?.charAt(0) || "U"}
          </div>
        )}
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {user.name || t("noName")}
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            {user.email}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="text-[10px] font-bold px-2 py-1 rounded-full border tracking-wide uppercase bg-amber-50 text-amber-700 border-amber-200 shadow-xs dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20">
          {user.role === "superadmin"
            ? t("roleSuperadmin")
            : t("roleLiterature")}
        </span>
      </div>
    </div>
  );
};
