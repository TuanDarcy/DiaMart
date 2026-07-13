import { requireAdminSession } from "@/services/admin/admin-auth-service";
import { getAdminSupportTopics } from "@/services/admin/admin-dashboard-service";

export default async function AdminSupportTopicsPage() {
  await requireAdminSession();
  const topics = await getAdminSupportTopics();

  return (
    <main className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold" style={{ color: "#0f172a" }}>Support topics</h1>
        <p className="text-sm" style={{ color: "#64748b" }}>{topics.length} topics</p>
      </div>
      <div className="overflow-hidden rounded-xl border" style={{ borderColor: "#e2e8f0" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "#f8fafc" }}>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: "#64748b" }}>ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: "#64748b" }}>Label</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: "#64748b" }}>Status</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "#e2e8f0" }}>
            {topics.map((t) => (
              <tr key={t.id} className="transition-colors hover:bg-[#f8fafc]">
                <td className="px-4 py-3 font-mono text-xs" style={{ color: "#64748b" }}>{t.id}</td>
                <td className="px-4 py-3 font-medium" style={{ color: "#0f172a" }}>{t.label}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={{ backgroundColor: t.is_active ? "#dcfce7" : "#f1f5f9", color: t.is_active ? "#166534" : "#64748b" }}>
                    {t.is_active ? "Active" : "Inactive"}
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
