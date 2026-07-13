import { requireAdminSession } from "@/services/admin/admin-auth-service";
import { getAdminFaqs } from "@/services/admin/admin-dashboard-service";

export default async function AdminFaqsPage() {
  await requireAdminSession();
  const faqs = await getAdminFaqs();

  return (
    <main className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold" style={{ color: "#0f172a" }}>
          FAQs
        </h1>
        <p className="text-sm" style={{ color: "#64748b" }}>
          {faqs.length} FAQs
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
                Question
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
            {faqs.map((f) => (
              <tr key={f.id} className="transition-colors hover:bg-[#f8fafc]">
                <td
                  className="px-4 py-3 font-mono text-xs"
                  style={{ color: "#64748b" }}
                >
                  {f.id}
                </td>
                <td
                  className="px-4 py-3 font-medium"
                  style={{ color: "#0f172a" }}
                >
                  {f.question}
                </td>
                <td className="px-4 py-3">
                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: f.is_active ? "#dcfce7" : "#f1f5f9",
                      color: f.is_active ? "#166534" : "#64748b",
                    }}
                  >
                    {f.is_active ? "Active" : "Inactive"}
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
