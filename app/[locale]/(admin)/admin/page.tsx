import { getAdminDashboardData } from "@/features/admin/actions";
import { AdminErrorBlock, AdminMainContent } from "@/components/ui";

export default async function AdminPage() {
  const { success, data: users, error } = await getAdminDashboardData();

  if (error || !success || !users) {
    return <AdminErrorBlock error={error} />;
  }

  return <AdminMainContent users={users} />;
}
