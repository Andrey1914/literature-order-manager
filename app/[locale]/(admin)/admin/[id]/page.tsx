import { getAdminDashboardData } from "@/features/admin/actions";
import { CongregationBlock } from "@/features/admin/components/CongregationBlock";
import { Link } from "@/i18n/config";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function UserDetailPage({ params }: Props) {
  const { id } = await params;
  const { success, data: users } = await getAdminDashboardData();

  const user = users?.find((u) => u.id === id);

  if (!success || !user) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-indigo-600 transition-colors bg-white border border-gray-200 px-3 py-1.5 rounded-xl shadow-xs"
        >
          ← Назад к списку
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {user.image ? (
            <Image
              width={56}
              height={56}
              src={user.image}
              alt={user.name || "User"}
              className="w-14 h-14 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
              {user.name?.charAt(0) || "U"}
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {user.name || "Без имени"}
            </h1>
            <p className="text-sm text-gray-500">{user.email}</p>
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
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider pl-1">
          Управляемые собрания и заказы
        </h2>

        {user.congregations.length === 0 ? (
          <div className="text-center py-12 text-sm text-gray-400 italic bg-white rounded-2xl border border-gray-100 shadow-sm">
            У этого служителя литературы ещё нет созданных собраний.
          </div>
        ) : (
          user.congregations.map((cong) => (
            <CongregationBlock key={cong.id} congregation={cong} />
          ))
        )}
      </div>
    </div>
  );
}
