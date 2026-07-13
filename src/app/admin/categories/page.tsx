import { requireAdminSession } from "@/services/admin/admin-auth-service";
import { getAdminCategories } from "@/services/admin/admin-dashboard-service";
import { AdminCategoriesClient } from "@/features/admin/admin-categories-client";

export default async function AdminCategoriesPage() {
  const session = await requireAdminSession();
  const categories = await getAdminCategories();

  return (
    <main className="p-8">
      <AdminCategoriesClient session={session} categories={categories} />
    </main>
  );
}
