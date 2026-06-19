import Image from "next/image";
import { UserRole } from "@/types/next-auth";

interface UserProfileProps {
  image?: string | null;
  name?: string | null;
  role: UserRole;
}

export const UserProfile = ({ image, name, role }: UserProfileProps) => {
  return (
    <div className="flex items-center justify-center gap-3 rounded-xl bg-indigo-50 p-4 max-w-sm mx-auto">
      {image && (
        <Image
          src={image}
          alt={name || "Аватар"}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full border border-indigo-200"
        />
      )}
      <div className="text-left">
        <p className="text-sm font-medium text-gray-500">Вы вошли как:</p>
        <p className="text-base font-semibold text-gray-900">{name}</p>
        <span className="inline-block mt-0.5 rounded bg-indigo-200 px-1.5 py-0.5 text-xs font-semibold text-indigo-800">
          Роль: {role}
        </span>
      </div>
    </div>
  );
};
