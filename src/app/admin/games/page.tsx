import { requireAdminSession } from "@/services/admin/admin-auth-service";
import { getAdminGames } from "@/services/admin/admin-dashboard-service";

export default async function AdminGamesPage() {
  await requireAdminSession();
  const games = await getAdminGames();

  return (
    <main className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold" style={{ color: "#0f172a" }}>
          Games
        </h1>
        <p className="text-sm" style={{ color: "#64748b" }}>
          {games.length} games
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
                Slug
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
            {games.map((g) => (
              <tr key={g.id} className="transition-colors hover:bg-[#f8fafc]">
                <td
                  className="px-4 py-3 font-mono text-xs"
                  style={{ color: "#64748b" }}
                >
                  {g.id}
                </td>
                <td
                  className="px-4 py-3 font-medium"
                  style={{ color: "#0f172a" }}
                >
                  {g.name}
                </td>
                <td className="px-4 py-3" style={{ color: "#64748b" }}>
                  {g.slug}
                </td>
                <td className="px-4 py-3">
                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: g.is_active ? "#dcfce7" : "#f1f5f9",
                      color: g.is_active ? "#166534" : "#64748b",
                    }}
                  >
                    {g.is_active ? "Active" : "Inactive"}
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
