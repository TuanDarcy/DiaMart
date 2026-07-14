import { requireAdminSession } from "@/services/admin/admin-auth-service";
import { AdminSidebar } from "@/features/admin/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminSession();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>
      <AdminSidebar session={session} />
      <div className="pl-64">{children}</div>
    </div>
  );
}
