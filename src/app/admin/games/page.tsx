import { requireAdminSession } from "@/services/admin/admin-auth-service";
import { getAdminGames } from "@/services/admin/admin-dashboard-service";
import { AdminGamesClient } from "@/features/admin/admin-games-client";

export default async function AdminGamesPage() {
  await requireAdminSession();
  const games = await getAdminGames();

  return (
    <main className="p-8">
      <AdminGamesClient games={games} />
    </main>
  );
}
