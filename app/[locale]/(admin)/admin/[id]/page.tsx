import { getAdminDashboardData } from "@/features/admin/actions";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";
import { UserHeaderBlock } from "@/components/ui/UserHeaderBlock";
import { CongregationsSection } from "@/features/admin/components/CongregationsSection";

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
        <BackButton />
      </div>

      <UserHeaderBlock user={user} />

      <CongregationsSection congregations={user.congregations} />
    </div>
  );
}
