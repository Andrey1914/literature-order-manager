import { useTranslations } from "next-intl";

interface AdminErrorBlockProps {
  error: string | null | undefined;
}

export const AdminErrorBlock = ({ error }: AdminErrorBlockProps) => {
  const t = useTranslations("AdminDashboard");

  return (
    <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100">
      {error || t("defaultError")}
    </div>
  );
};
