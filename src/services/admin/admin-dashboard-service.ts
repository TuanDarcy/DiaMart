import "server-only";

import { createClient } from "@/lib/supabase/server";

export type AdminGame = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image_src: string | null;
  image_alt: string | null;
  is_active: boolean;
  sort_order: number;
};

export type AdminCategory = {
  id: string;
  label: string;
  description: string | null;
  is_active: boolean;
  sort_order: number;
};

export type AdminProduct = {
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
  is_active: boolean;
  sort_order: number;
};

export type AdminFaq = {
  id: string;
  question: string;
  answer: string;
  is_active: boolean;
  sort_order: number;
};

export type AdminSupportTopic = {
  id: string;
  label: string;
  description: string;
  response: string;
  is_active: boolean;
  sort_order: number;
};

export type AdminDashboardData = {
  games: AdminGame[];
  categories: AdminCategory[];
  products: AdminProduct[];
  faqs: AdminFaq[];
  supportTopics: AdminSupportTopic[];
  loadError?: string;
  summary: {
    totalGames: number;
    totalCategories: number;
    totalProducts: number;
    activeProducts: number;
    inactiveProducts: number;
    totalFaqs: number;
    totalSupportTopics: number;
  };
};

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const supabase = await createClient();
  if (!supabase) {
    return {
      games: [],
      categories: [],
      products: [],
      faqs: [],
      supportTopics: [],
      summary: {
        totalGames: 0,
        totalCategories: 0,
        totalProducts: 0,
        activeProducts: 0,
        inactiveProducts: 0,
        totalFaqs: 0,
        totalSupportTopics: 0,
      },
    };
  }

  const [
    gamesResult,
    categoriesResult,
    productsResult,
    faqsResult,
    supportResult,
  ] = await Promise.all([
    supabase
      .from("storefront_games")
      .select(
        "id, slug, name, tagline, description, image_src, image_alt, is_active, sort_order",
      )
      .order("sort_order", { ascending: true }),
    supabase
      .from("storefront_categories")
      .select("id, label, description, is_active, sort_order")
      .order("sort_order", { ascending: true }),
    supabase
      .from("storefront_products")
      .select(
        "id, slug, name, game_id, category_id, image_src, image_alt, price_usd, original_price_usd, stock_status, stock_quantity, delivery_speed, badge, featured, popular, trending, best_seller, description, is_active, sort_order",
      )
      .order("sort_order", { ascending: true }),
    supabase
      .from("storefront_faqs")
      .select("id, question, answer, is_active, sort_order")
      .order("sort_order", { ascending: true }),
    supabase
      .from("storefront_support_topics")
      .select("id, label, description, response, is_active, sort_order")
      .order("sort_order", { ascending: true }),
  ]);

  const errors = [
    gamesResult.error,
    categoriesResult.error,
    productsResult.error,
    faqsResult.error,
    supportResult.error,
  ].filter(Boolean);

  const loadError =
    errors.length > 0
      ? `Admin data query error: ${errors
          .map((error) => (error ? error.message : "unknown"))
          .join(" | ")}`
      : undefined;

  if (loadError) {
    console.error("[admin-dashboard-service]", loadError);
  }

  const games = (gamesResult.data ?? []) as AdminGame[];
  const categories = (categoriesResult.data ?? []) as AdminCategory[];
  const products = (productsResult.data ?? []) as AdminProduct[];
  const faqs = (faqsResult.data ?? []) as AdminFaq[];
  const supportTopics = (supportResult.data ?? []) as AdminSupportTopic[];

  return {
    games,
    categories,
    products,
    faqs,
    supportTopics,
    loadError,
    summary: {
      totalGames: games.length,
      totalCategories: categories.length,
      totalProducts: products.length,
      activeProducts: products.filter((product) => product.is_active).length,
      inactiveProducts: products.filter((product) => !product.is_active).length,
      totalFaqs: faqs.length,
      totalSupportTopics: supportTopics.length,
    },
  };
}
