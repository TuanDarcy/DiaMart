import { requireAdminSession } from "@/services/admin/admin-auth-service";

export default async function AdminUsersPage() {
  const session = await requireAdminSession();

  return (
    <main className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold" style={{ color: "#0f172a" }}>
          Users
        </h1>
        <p className="text-sm" style={{ color: "#64748b" }}>
          User management &amp; activity tracking
        </p>
      </div>

      <div
        className="rounded-xl border bg-white p-6"
        style={{ borderColor: "#e2e8f0" }}
      >
        <p className="text-sm font-medium" style={{ color: "#0f172a" }}>
          Admin session
        </p>
        <div className="mt-3 grid gap-2 text-sm" style={{ color: "#64748b" }}>
          <p>
            <span className="font-medium" style={{ color: "#0f172a" }}>
              Email:
            </span>{" "}
            {session.email}
          </p>
          <p>
            <span className="font-medium" style={{ color: "#0f172a" }}>
              Role:
            </span>{" "}
            {session.role}
          </p>
          <p>
            <span className="font-medium" style={{ color: "#0f172a" }}>
              ID:
            </span>{" "}
            {session.userId}
          </p>
        </div>
        <p className="mt-4 text-xs" style={{ color: "#64748b" }}>
          User activity tracking - coming soon. This will show registered users,
          order history, and login activity.
        </p>
      </div>
    </main>
  );
}
