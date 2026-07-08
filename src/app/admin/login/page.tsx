import { redirect } from "next/navigation";
import { AdminLoginPage } from "@/features/admin/admin-login-page";
import { getCurrentAdminSession } from "@/services/admin/admin-auth-service";

export default async function AdminLoginRoute({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; message?: string }>;
}) {
  const [params, session] = await Promise.all([
    searchParams,
    getCurrentAdminSession(),
  ]);

  if (session) {
    redirect("/admin");
  }

  return <AdminLoginPage status={params.status} message={params.message} />;
}
