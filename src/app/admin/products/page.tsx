import { requireAdminSession } from "@/services/admin/admin-auth-service";
import {
  getAdminProducts,
  getAdminCategories,
  getAdminGames,
} from "@/services/admin/admin-dashboard-service";
import { AdminProductsClient } from "@/features/admin/admin-products-client";

export default async function AdminProductsPage() {
  await requireAdminSession();
  const [products, categories, games] = await Promise.all([
    getAdminProducts(),
    getAdminCategories(),
    getAdminGames(),
  ]);

  return (
    <main className="p-8">
      <AdminProductsClient
        products={products}
        categories={categories}
        games={games}
      />
    </main>
  );
}
