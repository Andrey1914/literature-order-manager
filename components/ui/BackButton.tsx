import { Link } from "@/i18n/config";
import { ArrowLeftIcon } from "@/components/ui/icons/ArrowLeftIcon";
import { useTranslations } from "next-intl";

export function BackButton() {
  const t = useTranslations("AdminUserDetail");

  return (
    <Link
      href="/admin"
      className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-indigo-600 transition-colors bg-white border border-gray-200 px-3 py-1.5 rounded-xl shadow-xs"
    >
      <ArrowLeftIcon className="w-3 h-3" />
      {t("backToList")}
    </Link>
  );
}
