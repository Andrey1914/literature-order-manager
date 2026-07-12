import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/config";
import { UserRowCardProps } from "@/types";

export const UserRowCard = ({ user }: UserRowCardProps) => {
  const t = useTranslations("AdminUserDetail");

  const congsList =
    user.congregations.map((c) => c.name).join(", ") ||
    t("noCongregationsList");

  return (
    <Link
      href={`/admin/${user.id}`}
      className="block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:border-indigo-200 hover:shadow-md dark:bg-slate-900 dark:border-slate-800 dark:hover:border-indigo-500/50 dark:hover:shadow-black/20 transition-all p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {user.image ? (
            <Image
              width={40}
              height={40}
              src={user.image}
              alt={user.name || t("defaultUserAlt")}
              className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-slate-800"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm dark:bg-indigo-500/10 dark:text-indigo-400">
              {user.name?.charAt(0) || "U"}
            </div>
          )}
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white transition-colors">
              {user.name || t("noName")}
            </h2>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">
              {user.email}
            </p>
            <span className="text-[11px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-medium dark:bg-indigo-500/10 dark:text-indigo-400">
              🏢 {congsList}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[10px] font-bold px-2 py-1 rounded-full border tracking-wide uppercase bg-amber-50 text-amber-700 border-amber-200 shadow-xs dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20">
            {user.role === "superadmin"
              ? t("roleSuperadmin")
              : t("roleLiterature")}
          </span>
          <span className="text-gray-300 dark:text-slate-600 font-mono text-xs">
            →
          </span>
        </div>
      </div>
    </Link>
  );
};
