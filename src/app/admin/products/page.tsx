import { requireAdminSession } from "@/services/admin/admin-auth-service";
import { getAdminProducts } from "@/services/admin/admin-dashboard-service";

export default async function AdminProductsPage() {
  await requireAdminSession();
  const products = await getAdminProducts();

  return (
    <main className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold" style={{ color: "#0f172a" }}>
          Products
        </h1>
        <p className="text-sm" style={{ color: "#64748b" }}>
          {products.length} products
        </p>
      </div>
      <div
        className="overflow-hidden rounded-xl border"
        style={{ borderColor: "#e2e8f0" }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "#f8fafc" }}>
              <th
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: "#64748b" }}
              >
                ID
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: "#64748b" }}
              >
                Name
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: "#64748b" }}
              >
                Game
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: "#64748b" }}
              >
                Category
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: "#64748b" }}
              >
                Price
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: "#64748b" }}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "#e2e8f0" }}>
            {products.map((p) => (
              <tr key={p.id} className="transition-colors hover:bg-[#f8fafc]">
                <td
                  className="px-4 py-3 font-mono text-xs"
                  style={{ color: "#64748b" }}
                >
                  {p.id}
                </td>
                <td
                  className="px-4 py-3 font-medium"
                  style={{ color: "#0f172a" }}
                >
                  {p.name}
                </td>
                <td className="px-4 py-3" style={{ color: "#64748b" }}>
                  {p.game_id}
                </td>
                <td className="px-4 py-3" style={{ color: "#64748b" }}>
                  {p.category_id}
                </td>
                <td className="px-4 py-3 font-medium">${p.price_usd}</td>
                <td className="px-4 py-3">
                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: p.is_active ? "#dcfce7" : "#f1f5f9",
                      color: p.is_active ? "#166534" : "#64748b",
                    }}
                  >
                    {p.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
