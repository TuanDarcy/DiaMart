import { notFound } from "next/navigation";
import { GamePageClient } from "@/features/storefront/game-page-client";
import {
  getGameStorefrontData,
  getStorefrontGames,
} from "@/services/storefront/storefront-service";

export async function generateStaticParams() {
  const games = await getStorefrontGames();
  return games.map((game) => ({ slug: game.slug }));
}

export default async function GameStorePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const gameData = await getGameStorefrontData(slug);

  if (!gameData) {
    notFound();
  }

  return (
    <GamePageClient
      game={gameData.game}
      categories={gameData.categories}
      products={gameData.products}
      supportTopics={gameData.supportTopics}
    />
  );
}
