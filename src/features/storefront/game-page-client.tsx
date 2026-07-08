"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type {
  ItemCategory,
  StorefrontGame,
  StorefrontProduct,
  SupportTopic,
} from "./types";
import { AuthPrompt } from "./components/auth-prompt";
import { ProductArtwork } from "./components/product-artwork";
import { ProductCard } from "./components/product-card";
import { ProductDetailModal } from "./components/product-detail-modal";
import { SectionHeader } from "./components/section-header";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { SupportWidget } from "./components/support-widget";

type GamePageClientProps = {
  game: StorefrontGame;
  categories: ItemCategory[];
  products: StorefrontProduct[];
  supportTopics: SupportTopic[];
};

export function GamePageClient({
  game,
  categories,
  products,
  supportTopics,
}: GamePageClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] =
    useState<StorefrontProduct | null>(null);
  const [isAuthPromptOpen, setIsAuthPromptOpen] = useState(false);

  const tabs = useMemo(
    () => [
      { id: "all", label: "All" },
      ...categories.map((category) => ({
        id: category.id,
        label: category.label,
      })),
    ],
    [categories],
  );

  const visibleProducts = useMemo(
    () =>
      activeCategory === "all"
        ? products
        : products.filter((product) => product.category.id === activeCategory),
    [activeCategory, products],
  );

  function requireAuth() {
    setIsAuthPromptOpen(true);
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader cartItemCount={0} onCartClick={requireAuth} />

      <main>
        <section className="container-shell pt-6 sm:pt-8">
          <div className="surface-panel-strong entrance-rise grid gap-5 rounded-[24px] p-5 md:grid-cols-[minmax(0,320px)_1fr] md:items-center">
            <ProductArtwork
              image={game.image}
              label={game.name}
              size="detail"
            />
            <div>
              <p className="font-strong text-xs uppercase tracking-[0.22em] text-cyan-200">
                {game.tagline}
              </p>
              <h1 className="font-heading mt-2 text-3xl font-semibold text-white sm:text-4xl">
                {game.name}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                {game.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a className="btn-primary min-h-11 px-5" href="#game-items">
                  Browse items
                </a>
                <Link className="btn-secondary min-h-11 px-5" href="/#games">
                  Change game
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="container-shell section-gap" id="game-items">
          <SectionHeader
            eyebrow="Catalog"
            title={`${game.name} items`}
            description="Browse items available for this game by category. Login is required to add items to your cart."
          />

          <nav
            className="mb-6 overflow-x-auto pb-1"
            aria-label="Item categories"
          >
            <div className="flex min-w-max gap-2">
              {tabs.map((tab) => (
                <button
                  className={`min-h-11 rounded-full border px-5 text-sm font-semibold transition ${
                    activeCategory === tab.id
                      ? "border-cyan-300/50 bg-[#14f1c9] text-slate-950"
                      : "border-purple-400/20 bg-purple-500/8 text-slate-300 hover:border-cyan-300/30 hover:bg-cyan-400/10"
                  }`}
                  type="button"
                  key={tab.id}
                  aria-pressed={activeCategory === tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>

          {visibleProducts.length === 0 ? (
            <div className="surface-panel rounded-[22px] p-6 text-slate-300">
              <p className="font-semibold text-white">
                No items in this category yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {visibleProducts.map((product) => (
                <ProductCard
                  product={product}
                  onAddToCart={requireAuth}
                  onViewDetails={setSelectedProduct}
                  key={product.id}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
      <SupportWidget topics={supportTopics} />
      <AuthPrompt
        isOpen={isAuthPromptOpen}
        onClose={() => setIsAuthPromptOpen(false)}
      />
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={requireAuth}
      />
    </div>
  );
}
