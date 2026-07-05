import { getAdminDashboardData } from "@/features/admin/actions";
import { AdminErrorBlock } from "@/components/ui/AdminErrorBlock";
import { AdminMainContent } from "@/components/ui/AdminMainContent";

export default async function AdminPage() {
  const { success, data: users, error } = await getAdminDashboardData();

  if (error || !success || !users) {
    return <AdminErrorBlock error={error} />;
  }

  return <AdminMainContent users={users} />;
}
