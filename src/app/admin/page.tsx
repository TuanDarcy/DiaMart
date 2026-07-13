import { AdminDashboardPage } from "@/features/admin/admin-dashboard-page";
import { getAdminDashboardData } from "@/services/admin/admin-dashboard-service";

export default async function AdminDashboardRoute() {
  const data = await getAdminDashboardData();

  return <AdminDashboardPage data={data} />;
}
