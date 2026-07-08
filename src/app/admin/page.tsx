import { AdminDashboardPage } from "@/features/admin/admin-dashboard-page";
import { requireAdminSession } from "@/services/admin/admin-auth-service";
import { getAdminDashboardData } from "@/services/admin/admin-dashboard-service";

export default async function AdminDashboardRoute({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    message?: string;
    uploadedUrl?: string;
  }>;
}) {
  const session = await requireAdminSession();
  const [data, params] = await Promise.all([
    getAdminDashboardData(),
    searchParams,
  ]);

  return (
    <AdminDashboardPage
      session={session}
      data={data}
      status={params.status}
      message={params.message}
      uploadedUrl={params.uploadedUrl}
    />
  );
}
