import Image from "next/image";
import { useTranslations } from "next-intl";
import { UserRole } from "@/types/next-auth";
import { WithSessionProps } from "@/types";
import { TrashIcon } from "@/components/ui/icons";

interface UserProfileProps extends WithSessionProps {
  onOpenSettings?: () => void;
}

export const UserProfile = ({ session, onOpenSettings }: UserProfileProps) => {
  const tUser = useTranslations("User");

  const user = session?.user;
  if (!user) return null;

  const currentRole = (user.role || "user") as UserRole;
  const { image, name } = user;

  return (
    <div className="flex items-center gap-3">
      <div
        className={`relative group ${onOpenSettings ? "cursor-pointer" : ""}`}
        onClick={onOpenSettings}
        title={tUser("settings") || "Settings"}
      >
        {image && (
          <Image
            src={image}
            alt={name || tUser("avatar")}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full border border-indigo-200 dark:border-slate-700 bg-white dark:bg-slate-900 group-hover:opacity-25 group-hover:blur-[0.5px] transition-all duration-300"
          />
        )}

        {onOpenSettings && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none">
            <TrashIcon className="h-5 w-5 text-red-500 dark:text-red-400 drop-shadow-sm" />
          </div>
        )}
      </div>
      <div className="text-left">
        <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
          {tUser("enteredAs")}
        </p>
        <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
          {name}
        </p>
        <p className="text-xs text-gray-500 dark:text-slate-400 leading-tight">
          {tUser(`roles.${currentRole}`)}
        </p>
      </div>
    </div>
  );
};
