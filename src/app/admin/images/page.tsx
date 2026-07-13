import { requireAdminSession } from "@/services/admin/admin-auth-service";
import { AdminImagesClient } from "@/features/admin/admin-images-client";

export default async function AdminImagesPage() {
  const session = await requireAdminSession();

  return (
    <main className="p-8">
      <AdminImagesClient session={session} />
    </main>
  );
}
