import Image from "next/image";
import { useTranslations } from "next-intl";
import { UserRole } from "@/types/next-auth";
import { WithSessionProps } from "@/types";

export const UserProfile = ({ session }: WithSessionProps) => {
  const tUser = useTranslations("User");

  const user = session?.user;
  if (!user) return null;

  const currentRole = (user.role || "user") as UserRole;
  const { image, name } = user;

  return (
    <div className="flex items-center gap-3">
      {image && (
        <Image
          src={image}
          alt={name || tUser("avatar")}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full border border-indigo-200"
        />
      )}
      <div className="text-left">
        <p className="text-sm font-medium text-gray-500">
          {tUser("enteredAs")}
        </p>
        <p className="text-base font-semibold text-gray-900">{name}</p>
        <p className="text-xs text-gray-500 ">
          {tUser(`roles.${currentRole}`)}
        </p>
      </div>
    </div>
  );
};
