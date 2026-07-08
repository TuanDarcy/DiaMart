import { notFound } from "next/navigation";
import { GamePageClient } from "@/features/storefront/game-page-client";
import {
  games,
  getCategoriesByGame,
  getGameBySlug,
  getProductsByGame,
} from "@/features/storefront/mock-data";

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export default async function GameStorePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  return (
    <GamePageClient
      game={game}
      categories={getCategoriesByGame(slug)}
      products={getProductsByGame(slug)}
    />
  );
}
