import Image from "next/image";
import { Link } from "@/i18n/config";
import { UserRole } from "@/types";

interface UserRowCardProps {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    role: UserRole;
    congregations: Array<{ name: string }>;
  };
}

export const UserRowCard = ({ user }: UserRowCardProps) => {
  const congsList =
    user.congregations.map((c) => c.name).join(", ") || "Нет собраний";

  return (
    <Link
      href={`/admin/${user.id}`}
      className="block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:border-indigo-200 hover:shadow-md transition-all p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {user.image ? (
            <Image
              width={40}
              height={40}
              src={user.image}
              alt={user.name || "User"}
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
              {user.name?.charAt(0) || "U"}
            </div>
          )}
          <div>
            <h2 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
              {user.name || "Без имени"}
            </h2>
            <p className="text-xs text-gray-500 mb-1">{user.email}</p>
            <span className="text-[11px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-medium">
              🏢 {congsList}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span
            className={`text-[10px] font-bold px-2 py-1 rounded-full border tracking-wide uppercase bg-amber-50 text-amber-700 border-amber-200 shadow-xs`}
          >
            {user.role === "superadmin"
              ? "Администратор"
              : "Ответственный за литературу"}
          </span>
          <span className="text-gray-300 font-mono text-xs">→</span>
        </div>
      </div>
    </Link>
  );
};
