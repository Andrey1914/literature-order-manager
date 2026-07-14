import { useTranslations } from "next-intl";
import { Link } from "@/i18n/config";
import { WithSessionProps } from "@/types";
import { ThemeToggle } from "@/components/ui/buttons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { UserProfile } from "./UserProfile";
import { SignOutButton } from "./buttons/SignOutButton";

interface HeaderNavigationProps extends WithSessionProps {
  isMobile?: boolean;
  onOpenSettings: () => void;
  onAction?: () => void;
}

export const HeaderNavigation = ({
  session,
  isMobile = false,
  onOpenSettings,
  onAction,
}: HeaderNavigationProps) => {
  const tNavigation = useTranslations("Navigation");
  const user = session?.user;

  if (!user) return null;

  const linkClass = isMobile
    ? "flex items-center justify-center w-full h-11.5 sm:w-22.5 px-3 py-2 text-xs font-semibold rounded-xl transition-all text-indigo-700 bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-800 dark:text-indigo-400 dark:hover:bg-slate-700"
    : "px-3 py-2 text-xs font-semibold rounded-lg shadow-sm text-indigo-700 bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-800 dark:text-indigo-400 dark:hover:bg-slate-700 transition-all";

  const renderAdminLinks = () => {
    if (user.role !== "superadmin") return null;

    return (
      <div className={`flex items-center gap-3 ${isMobile ? "w-full" : ""}`}>
        <Link href="/admin" onClick={onAction} className={linkClass}>
          {tNavigation("administration")}
        </Link>
        <Link href="/dashboard" onClick={onAction} className={linkClass}>
          {tNavigation("dashboard")}
        </Link>
      </div>
    );
  };

  if (isMobile) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800/50 pb-3">
          <UserProfile session={session} onOpenSettings={onOpenSettings} />
          <ThemeToggle />
        </div>

        <nav className="flex flex-col gap-3">
          <LanguageSwitcher />
          {renderAdminLinks()}
          <SignOutButton />
        </nav>
      </div>
    );
  }

  return (
    <nav className="hidden items-center gap-3 md:flex">
      <ThemeToggle />
      <LanguageSwitcher />

      {renderAdminLinks()}

      <div className="h-6 w-px bg-gray-200 dark:bg-slate-700" />

      <UserProfile session={session} onOpenSettings={onOpenSettings} />
      <SignOutButton />
    </nav>
  );
};
