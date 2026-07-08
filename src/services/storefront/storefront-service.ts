import "server-only";

import { cache } from "react";
import {
  faqs as fallbackFaqs,
  games as fallbackGames,
  getCategoriesByGame as getFallbackCategoriesByGame,
  getGameBySlug as getFallbackGameBySlug,
  getProductsByGame as getFallbackProductsByGame,
  products as fallbackProducts,
  supportTopics as fallbackSupportTopics,
} from "@/features/storefront/mock-data";
import type {
  FAQItem,
  ItemCategory,
  ProductBadge,
  StockStatus,
  StorefrontGame,
  StorefrontProduct,
  SupportTopic,
} from "@/features/storefront/types";
import { createClient } from "@/lib/supabase/server";

type StorefrontSnapshot = {
  games: StorefrontGame[];
  products: StorefrontProduct[];
  faqs: FAQItem[];
  supportTopics: SupportTopic[];
  categoriesByGame: Map<string, ItemCategory[]>;
};

type HomeStorefrontData = {
  games: StorefrontGame[];
  products: StorefrontProduct[];
  bestSellerProducts: StorefrontProduct[];
  trendingProducts: StorefrontProduct[];
  faqs: FAQItem[];
  supportTopics: SupportTopic[];
};

type GameStorefrontData = {
  game: StorefrontGame;
  categories: ItemCategory[];
  products: StorefrontProduct[];
  supportTopics: SupportTopic[];
};

type GameRow = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image_src: string | null;
  image_alt: string | null;
};

type CategoryRow = {
  id: string;
  label: string;
  description: string | null;
};

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  game_id: string;
  category_id: string;
  image_src: string | null;
  image_alt: string | null;
  price_usd: number;
  original_price_usd: number | null;
  stock_status: string;
  stock_quantity: number | null;
  delivery_speed: string;
  badge: string | null;
  featured: boolean;
  popular: boolean;
  trending: boolean;
  best_seller: boolean;
  description: string;
};

type FaqRow = {
  id: string;
  question: string;
  answer: string;
};

type SupportTopicRow = {
  id: string;
  label: string;
  description: string;
  response: string;
};

const stockStatusValues: StockStatus[] = [
  "in-stock",
  "low-stock",
  "out-of-stock",
  "coming-soon",
];

const badgeValues: ProductBadge[] = [
  "featured",
  "popular",
  "new",
  "discount",
  "quick-delivery",
  "best-seller",
];

function normalizeStockStatus(value: string): StockStatus {
  if (stockStatusValues.includes(value as StockStatus)) {
    return value as StockStatus;
  }
  return "out-of-stock";
}

function normalizeBadge(value: string | null): ProductBadge | undefined {
  if (!value) {
    return undefined;
  }
  if (badgeValues.includes(value as ProductBadge)) {
    return value as ProductBadge;
  }
  return undefined;
}

function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

function buildFallbackSnapshot(): StorefrontSnapshot {
  const categoriesByGame = new Map<string, ItemCategory[]>();

  for (const game of fallbackGames) {
    categoriesByGame.set(game.slug, getFallbackCategoriesByGame(game.slug));
  }

  return {
    games: fallbackGames,
    products: fallbackProducts,
    faqs: fallbackFaqs,
    supportTopics: fallbackSupportTopics,
    categoriesByGame,
  };
}

async function fetchSnapshotFromDatabase(): Promise<StorefrontSnapshot> {
  const supabase = await createClient();

  const [
    gamesResult,
    categoriesResult,
    productsResult,
    faqsResult,
    supportResult,
  ] = await Promise.all([
    supabase
      .from("storefront_games")
      .select("id, slug, name, tagline, description, image_src, image_alt")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("storefront_categories")
      .select("id, label, description")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("storefront_products")
      .select(
        "id, slug, name, game_id, category_id, image_src, image_alt, price_usd, original_price_usd, stock_status, stock_quantity, delivery_speed, badge, featured, popular, trending, best_seller, description",
      )
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("storefront_faqs")
      .select("id, question, answer")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("storefront_support_topics")
      .select("id, label, description, response")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
  ]);

  if (gamesResult.error) {
    throw gamesResult.error;
  }

  if (categoriesResult.error) {
    throw categoriesResult.error;
  }

  if (productsResult.error) {
    throw productsResult.error;
  }

  if (faqsResult.error) {
    throw faqsResult.error;
  }

  if (supportResult.error) {
    throw supportResult.error;
  }

  const gameRows = (gamesResult.data ?? []) as GameRow[];
  const categoryRows = (categoriesResult.data ?? []) as CategoryRow[];
  const productRows = (productsResult.data ?? []) as ProductRow[];
  const faqRows = (faqsResult.data ?? []) as FaqRow[];
  const supportRows = (supportResult.data ?? []) as SupportTopicRow[];

  const gameById = new Map<string, StorefrontGame>();
  const games = gameRows.map((row) => {
    const mappedGame: StorefrontGame = {
      id: row.id,
      slug: row.slug,
      name: row.name,
      tagline: row.tagline,
      description: row.description,
      active: true,
      image: {
        src: row.image_src ?? `gradient:${row.slug}`,
        alt: row.image_alt ?? `${row.name} artwork`,
      },
    };

    gameById.set(row.id, mappedGame);
    return mappedGame;
  });

  const categoryById = new Map<string, ItemCategory>();
  const orderedCategories: ItemCategory[] = categoryRows.map((row) => {
    const category: ItemCategory = {
      id: row.id,
      label: row.label,
      description: row.description ?? undefined,
    };

    categoryById.set(row.id, category);
    return category;
  });

  const products = productRows.reduce<StorefrontProduct[]>(
    (accumulator, row) => {
      const game = gameById.get(row.game_id);
      const category = categoryById.get(row.category_id);

      if (!game || !category) {
        return accumulator;
      }

      accumulator.push({
        id: row.id,
        slug: row.slug,
        name: row.name,
        game,
        category,
        image: {
          src: row.image_src ?? `placeholder:${row.slug}`,
          alt: row.image_alt ?? `${row.name} artwork`,
        },
        priceUsd: Number(row.price_usd),
        originalPriceUsd:
          row.original_price_usd !== null
            ? Number(row.original_price_usd)
            : undefined,
        stockStatus: normalizeStockStatus(row.stock_status),
        stockQuantity: row.stock_quantity ?? undefined,
        deliverySpeed: row.delivery_speed,
        badge: normalizeBadge(row.badge),
        featured: row.featured,
        popular: row.popular,
        trending: row.trending,
        bestSeller: row.best_seller,
        description: row.description,
      });

      return accumulator;
    },
    [],
  );

  const categoriesByGame = new Map<string, ItemCategory[]>();

  for (const game of games) {
    const categoryIds = new Set(
      products
        .filter((product) => product.game.slug === game.slug)
        .map((product) => product.category.id),
    );

    categoriesByGame.set(
      game.slug,
      orderedCategories.filter((category) => categoryIds.has(category.id)),
    );
  }

  const faqs = faqRows.map<FAQItem>((row) => ({
    id: row.id,
    question: row.question,
    answer: row.answer,
  }));

  const supportTopics = supportRows.map<SupportTopic>((row) => ({
    id: row.id,
    label: row.label,
    description: row.description,
    response: row.response,
  }));

  return {
    games,
    products,
    faqs,
    supportTopics,
    categoriesByGame,
  };
}

const getStorefrontSnapshot = cache(async (): Promise<StorefrontSnapshot> => {
  // Local development can run without Supabase envs while production reads from DB.
  if (!hasSupabaseEnv()) {
    return buildFallbackSnapshot();
  }

  try {
    const snapshot = await fetchSnapshotFromDatabase();
    const hasCoreData =
      snapshot.games.length > 0 && snapshot.products.length > 0;

    if (!hasCoreData) {
      return buildFallbackSnapshot();
    }

    return snapshot;
  } catch (error) {
    console.error("[storefront-service] Failed to read Supabase data", error);
    return buildFallbackSnapshot();
  }
});

export async function getStorefrontGames(): Promise<StorefrontGame[]> {
  const snapshot = await getStorefrontSnapshot();
  return snapshot.games;
}

export async function getHomeStorefrontData(): Promise<HomeStorefrontData> {
  const snapshot = await getStorefrontSnapshot();

  return {
    games: snapshot.games,
    products: snapshot.products,
    bestSellerProducts: snapshot.products.filter(
      (product) => product.bestSeller,
    ),
    trendingProducts: snapshot.products.filter((product) => product.trending),
    faqs: snapshot.faqs,
    supportTopics: snapshot.supportTopics,
  };
}

export async function getGameStorefrontData(
  slug: string,
): Promise<GameStorefrontData | null> {
  const snapshot = await getStorefrontSnapshot();

  const game = snapshot.games.find((candidate) => candidate.slug === slug);
  if (!game) {
    const fallbackGame = getFallbackGameBySlug(slug);

    if (!fallbackGame) {
      return null;
    }

    return {
      game: fallbackGame,
      categories: getFallbackCategoriesByGame(slug),
      products: getFallbackProductsByGame(slug),
      supportTopics: fallbackSupportTopics,
    };
  }

  return {
    game,
    categories: snapshot.categoriesByGame.get(slug) ?? [],
    products: snapshot.products.filter((product) => product.game.slug === slug),
    supportTopics: snapshot.supportTopics,
  };
}

export async function getStorefrontProductsForCart(): Promise<
  StorefrontProduct[]
> {
  const snapshot = await getStorefrontSnapshot();
  return snapshot.products;
}
