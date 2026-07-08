"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/config/site";
import { readStoredCart, writeStoredCart } from "./cart-storage";
import {
  activeGame,
  faqs,
  itemCategories,
  products,
  sampleDeliveryProofs,
  supportTopics,
} from "./mock-data";
import type { CartLineItem, CategoryId, StorefrontProduct } from "./types";
import { CartDrawer, getCartItemCount } from "./components/cart-drawer";
import { DeliveryProofPopup } from "./components/delivery-proof-popup";
import { ProductArtwork } from "./components/product-artwork";
import { ProductCard } from "./components/product-card";
import { ProductDetailModal } from "./components/product-detail-modal";
import { SectionHeader } from "./components/section-header";
import { SupportWidget } from "./components/support-widget";

type CatalogTabId = "trending" | CategoryId;

export function StorefrontApp() {
  const [activeCatalogTab, setActiveCatalogTab] =
    useState<CatalogTabId>("trending");
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState<CartLineItem[]>(() =>
    readStoredCart(),
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthPromptOpen, setIsAuthPromptOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<StorefrontProduct | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    writeStoredCart(cartItems);
  }, [cartItems]);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCatalogTab === "trending"
          ? product.popular
          : activeCatalogTab === "all" ||
            product.category.id === activeCatalogTab;
      const searchableText =
        `${product.name} ${product.category.label} ${product.game.name}`.toLowerCase();
      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableText.includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });
  }, [activeCatalogTab, normalizedSearch]);
  const cartItemCount = getCartItemCount(cartItems);

  function addToCart(product: StorefrontProduct, quantity = 1) {
    void product;
    void quantity;
    setIsAuthPromptOpen(true);
  }

  function increaseCartItem(productId: string) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  }

  function decreaseCartItem(productId: string) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeCartItem(productId: string) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productId),
    );
  }

  function resetFilters() {
    setActiveCatalogTab("trending");
    setSearchTerm("");
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <AnnouncementBar />
      <Header
        cartItemCount={cartItemCount}
        isMobileNavOpen={isMobileNavOpen}
        onCartOpen={() => setIsAuthPromptOpen(true)}
        onMobileNavToggle={() => setIsMobileNavOpen((value) => !value)}
        onSupportJump={() =>
          document
            .getElementById("support")
            ?.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      />

      <main>
        <section className="container-shell pt-5 sm:pt-7" id="shop">
          <SearchPanel
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            resultCount={filteredProducts.length}
          />
          <HeroSection
            onBrowse={() =>
              document
                .getElementById("games")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
          />
          <GameSelection />
        </section>

        <section className="container-shell section-gap" id="products">
          <CatalogTabs
            activeTab={activeCatalogTab}
            onTabChange={setActiveCatalogTab}
          />
          <ProductShelf
            title={getCatalogTitle(activeCatalogTab)}
            eyebrow="Catalog"
            description="Browse Grow a Garden 2 items by what is trending now or by item category."
            products={filteredProducts}
            emptyMessage="No items match this search yet."
            onAddToCart={addToCart}
            onViewDetails={setSelectedProduct}
            onResetFilters={resetFilters}
          />
        </section>

        <TrustSection />
        <HowItWorks />
        <DeliveryProofSection />
        <FAQSection />
        <SupportEntry />
      </main>

      <Footer />
      <SupportWidget topics={supportTopics} />
      <DeliveryProofPopup />
      <AuthPrompt
        isOpen={isAuthPromptOpen}
        onClose={() => setIsAuthPromptOpen(false)}
      />
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        products={products}
        onClose={() => setIsCartOpen(false)}
        onIncrease={increaseCartItem}
        onDecrease={decreaseCartItem}
        onRemove={removeCartItem}
      />
    </div>
  );
}

function getCatalogTitle(tab: CatalogTabId) {
  if (tab === "trending") {
    return "Trending in Grow a Garden 2";
  }

  const category = itemCategories.find((item) => item.id === tab);
  return category ? `${category.label} catalog` : "Grow a Garden 2 catalog";
}

function AnnouncementBar() {
  return (
    <div className="border-b border-purple-400/20 bg-[var(--background-elevated)] px-4 py-2 text-center text-xs font-medium text-slate-300 sm:text-sm">
      Fast delivery planning, secure transaction handling, and Discord-first
      support for DiaMart shoppers.
    </div>
  );
}

type HeaderProps = {
  cartItemCount: number;
  isMobileNavOpen: boolean;
  onCartOpen: () => void;
  onMobileNavToggle: () => void;
  onSupportJump: () => void;
};

function Header({
  cartItemCount,
  isMobileNavOpen,
  onCartOpen,
  onMobileNavToggle,
  onSupportJump,
}: HeaderProps) {
  const navLinks = [
    { href: "#shop", label: "Shop" },
    { href: "#delivery", label: "Delivery proof", live: true },
    { href: "#support", label: "Status", live: true },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-purple-400/20 bg-[rgba(7,7,10,0.9)] backdrop-blur-xl">
      <div className="container-shell flex min-h-16 items-center justify-between gap-4 py-3">
        <Link
          className="flex items-center gap-3"
          href="/"
          aria-label="DiaMart home"
        >
          <span className="font-brand flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/35 bg-purple-500/12 text-sm font-bold text-cyan-100">
            DM
          </span>
          <span className="font-brand text-lg font-semibold tracking-normal text-white">
            DiaMart
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-purple-500/10 hover:text-white"
              href={link.href}
              key={link.href}
            >
              {link.label}
              {"live" in link && link.live ? (
                <span className="font-strong ml-2 inline-flex items-center gap-1 rounded-full bg-[#14f1c9] px-2 py-0.5 text-[10px] uppercase tracking-normal text-slate-950">
                  <span className="live-pulse h-1.5 w-1.5 rounded-full bg-slate-950" />{" "}
                  live
                </span>
              ) : null}
            </a>
          ))}
          <button
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-purple-500/10 hover:text-white"
            type="button"
            onClick={onSupportJump}
          >
            Support
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <button
            className="btn-secondary relative min-h-10 px-4"
            type="button"
            onClick={onCartOpen}
            aria-label={`Open cart with ${cartItemCount} items`}
          >
            Cart
            {cartItemCount > 0 ? (
              <span className="font-strong ml-2 rounded-full bg-[#14f1c9] px-2 py-0.5 text-xs font-semibold text-slate-950">
                {cartItemCount}
              </span>
            ) : null}
          </button>
          <Link
            className="btn-secondary hidden min-h-10 px-4 md:flex"
            href="/login"
          >
            Login
          </Link>
          <button
            className="btn-icon md:hidden"
            type="button"
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-navigation"
            onClick={onMobileNavToggle}
            aria-label="Toggle mobile navigation"
          >
            <span aria-hidden="true">☰</span>
          </button>
        </div>
      </div>

      {isMobileNavOpen ? (
        <nav
          className="container-shell grid gap-2 border-t border-purple-400/20 pb-4 md:hidden"
          id="mobile-navigation"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <a
              className="rounded-[14px] border border-purple-400/20 bg-purple-500/8 px-4 py-3 text-sm font-medium text-slate-200"
              href={link.href}
              key={link.href}
            >
              {link.label}
              {"live" in link && link.live ? (
                <span className="font-strong ml-2 inline-flex items-center gap-1 rounded-full bg-[#14f1c9] px-2 py-0.5 text-[10px] uppercase text-slate-950">
                  <span className="live-pulse h-1.5 w-1.5 rounded-full bg-slate-950" />{" "}
                  live
                </span>
              ) : null}
            </a>
          ))}
          <button
            className="rounded-[14px] border border-purple-400/20 bg-purple-500/8 px-4 py-3 text-left text-sm font-medium text-slate-200"
            type="button"
            onClick={onSupportJump}
          >
            Support
          </button>
        </nav>
      ) : null}
    </header>
  );
}

type SearchPanelProps = {
  searchTerm: string;
  resultCount: number;
  onSearchChange: (value: string) => void;
};

function SearchPanel({
  searchTerm,
  resultCount,
  onSearchChange,
}: SearchPanelProps) {
  const typewriterItems = useMemo(
    () => products.map((product) => product.name),
    [],
  );
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const activePlaceholder = typewriterItems[typewriterIndex] ?? "Search item";

  useEffect(() => {
    const timeout = window.setTimeout(
      () => {
        if (typedLength < activePlaceholder.length) {
          setTypedLength((length) => length + 1);
          return;
        }

        setTypedLength(0);
        setTypewriterIndex((index) => {
          if (typewriterItems.length <= 1) {
            return index;
          }

          const nextIndex = Math.floor(Math.random() * typewriterItems.length);
          return nextIndex === index
            ? (nextIndex + 1) % typewriterItems.length
            : nextIndex;
        });
      },
      typedLength < activePlaceholder.length ? 90 : 1200,
    );

    return () => window.clearTimeout(timeout);
  }, [activePlaceholder, typedLength, typewriterItems.length]);

  return (
    <div className="entrance-soft surface-panel rounded-[22px] p-3 shadow-[0_10px_32px_rgba(0,0,0,0.22)] sm:p-4">
      <label className="sr-only" htmlFor="product-search">
        Search Grow a Garden 2 products
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          className="min-h-12 flex-1 rounded-full border border-purple-400/20 bg-black/35 px-5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-fuchsia-400/50 focus:ring-4 focus:ring-fuchsia-500/20"
          id="product-search"
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={`Search item: ${activePlaceholder.slice(0, typedLength)}`}
        />
        {searchTerm.trim().length > 0 ? (
          <div
            className="font-strong rounded-full border border-purple-400/20 bg-purple-500/8 px-4 py-2 text-sm text-slate-300"
            aria-live="polite"
          >
            {resultCount} matching {resultCount === 1 ? "item" : "items"}
          </div>
        ) : null}
      </div>
    </div>
  );
}

type HeroSectionProps = {
  onBrowse: () => void;
};

function HeroSection({ onBrowse }: HeroSectionProps) {
  const [proofIndex, setProofIndex] = useState(0);
  const activeProof =
    sampleDeliveryProofs[proofIndex % sampleDeliveryProofs.length];

  useEffect(() => {
    if (sampleDeliveryProofs.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setProofIndex((index) => (index + 1) % sampleDeliveryProofs.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      className="entrance-rise grid gap-5 py-8 sm:py-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center"
      aria-labelledby="hero-title"
    >
      <div>
        <p className="font-strong inline-flex rounded-full border border-cyan-300/35 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
          Grow a Garden 2 storefront
        </p>
        <h1
          className="font-heading mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl"
          id="hero-title"
        >
          Fast <span className="text-[#14f1c9]">Roblox items</span>, clear
          prices, safer support.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
          Shop Grow a Garden 2 pets, seeds, and gear with clear USD prices,
          delivery expectations, and an easy cart flow while checkout is being
          prepared.
        </p>
        <div className="mt-5 grid max-w-xl grid-cols-3 gap-3">
          {[
            ["1", "active game"],
            ["9", "items listed"],
            ["3", "item categories"],
          ].map(([value, label]) => (
            <div
              className="border-l border-purple-400/20 pl-3 first:border-l-0 first:pl-0"
              key={label}
            >
              <p className="font-strong text-2xl font-bold text-white sm:text-3xl">
                {value}
              </p>
              <p className="font-strong mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
                {label}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            className="btn-primary min-h-12 px-6"
            type="button"
            onClick={onBrowse}
          >
            Shopping now
          </button>
          <a className="btn-secondary min-h-12 px-6" href="#support">
            Get Discord support
          </a>
        </div>
      </div>

      <div className="surface-panel-strong entrance-rise entrance-delay-1 rounded-[24px] p-4">
        {activeProof ? (
          <ProofShowcase proof={activeProof} proofIndex={proofIndex} />
        ) : null}
      </div>
    </section>
  );
}

type ProofShowcaseProps = {
  proof: (typeof sampleDeliveryProofs)[number];
  proofIndex: number;
};

function ProofShowcase({ proof, proofIndex }: ProofShowcaseProps) {
  return (
    <div className="relative overflow-hidden rounded-[20px] border border-purple-400/20 bg-black/25 p-4">
      <div className="flex items-center justify-between gap-4 border-b border-purple-400/18 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-400/10 text-cyan-100">
            ✓
          </span>
          <div>
            <p className="font-heading text-lg font-semibold text-white">
              Order delivered
            </p>
            <p className="text-sm text-slate-400">
              Photo proof attached · verified
            </p>
          </div>
        </div>
        <span className="font-strong inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
          <span className="live-pulse h-2 w-2 rounded-full bg-[#14f1c9]" /> live
        </span>
      </div>

      <div
        className="proof-slide grid gap-4 py-4 sm:grid-cols-[72px_1fr_auto] sm:items-center"
        key={proof.id}
      >
        {proof.image ? (
          <ProductArtwork
            image={proof.image}
            label={proof.itemName}
            size="proof"
          />
        ) : null}
        <div className="min-w-0">
          <p className="font-strong truncate text-base font-semibold text-white">
            {proof.itemName}
          </p>
          <p className="mt-1 text-sm text-slate-400">
            {proof.relativeTime} · {proof.anonymizedCustomer}
          </p>
        </div>
        <p className="font-strong text-xl font-bold text-[#14f1c9]">Live</p>
      </div>

      <div className="flex items-center justify-between border-t border-purple-400/18 pt-4 text-sm text-slate-400">
        <span>Proof log</span>
        <div className="flex gap-2">
          {sampleDeliveryProofs.map((proofItem, index) => (
            <span
              className={`h-2 w-2 rounded-full ${index === proofIndex % sampleDeliveryProofs.length ? "bg-[#14f1c9]" : "bg-slate-700"}`}
              key={proofItem.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function GameSelection() {
  return (
    <section
      className="surface-panel entrance-rise entrance-delay-2 rounded-[24px] p-4 sm:p-5"
      id="games"
      aria-labelledby="game-context-title"
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <button
          className="group text-left"
          type="button"
          onClick={() =>
            document
              .getElementById("products")
              ?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        >
          <ProductArtwork
            image={activeGame.image}
            label={activeGame.name}
            size="detail"
          />
        </button>
        <div>
          <p className="font-strong text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-300">
            Pick your game
          </p>
          <h2
            className="font-heading mt-2 text-2xl font-semibold text-white sm:text-3xl"
            id="game-context-title"
          >
            {activeGame.name}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
            {activeGame.description}
          </p>
          <p className="font-strong mt-3 text-sm text-[#14f1c9]">
            {1} active game available. Click the game card to open its catalog.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {itemCategories
              .filter((category) => category.id !== "all")
              .map((category) => (
                <div
                  className="rounded-[16px] border border-purple-400/18 bg-purple-500/8 p-3"
                  key={category.id}
                >
                  <p className="font-semibold text-white">{category.label}</p>
                  <p className="mt-1 text-sm leading-5 text-slate-400">
                    {category.description}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type CatalogTabsProps = {
  activeTab: CatalogTabId;
  onTabChange: (tab: CatalogTabId) => void;
};

function CatalogTabs({ activeTab, onTabChange }: CatalogTabsProps) {
  const tabs: Array<{ id: CatalogTabId; label: string }> = [
    { id: "trending", label: "Trending" },
    ...itemCategories
      .filter((category) => category.id !== "all")
      .map((category) => ({ id: category.id, label: category.label })),
  ];

  return (
    <nav className="mb-6 overflow-x-auto pb-1" aria-label="Catalog tabs">
      <div className="flex min-w-max gap-2">
        {tabs.map((tab) => (
          <button
            className={`min-h-11 rounded-full border px-5 text-sm font-semibold transition ${
              activeTab === tab.id
                ? "border-cyan-300/50 bg-[#14f1c9] text-slate-950"
                : "border-purple-400/20 bg-purple-500/8 text-slate-300 hover:border-cyan-300/30 hover:bg-cyan-400/10"
            }`}
            type="button"
            key={tab.id}
            aria-pressed={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

type AuthPromptProps = {
  isOpen: boolean;
  onClose: () => void;
};

function AuthPrompt({ isOpen, onClose }: AuthPromptProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-required-title"
    >
      <div className="entrance-rise surface-panel-strong max-w-md rounded-[24px] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-strong text-xs uppercase tracking-[0.2em] text-fuchsia-300">
              Account required
            </p>
            <h2
              className="font-heading mt-2 text-2xl font-semibold text-white"
              id="auth-required-title"
            >
              Login to continue
            </h2>
          </div>
          <button
            className="btn-icon"
            type="button"
            onClick={onClose}
            aria-label="Close login prompt"
          >
            X
          </button>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-300">
          You can browse products freely. Adding items to cart and starting an
          order requires a DiaMart account.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Link className="btn-primary min-h-11" href="/login">
            Login
          </Link>
          <Link className="btn-secondary min-h-11" href="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

type ProductShelfProps = {
  eyebrow: string;
  title: string;
  description: string;
  products: StorefrontProduct[];
  emptyMessage: string;
  onAddToCart: (product: StorefrontProduct) => void;
  onViewDetails: (product: StorefrontProduct) => void;
  onResetFilters: () => void;
};

function ProductShelf({
  eyebrow,
  title,
  description,
  products,
  emptyMessage,
  onAddToCart,
  onViewDetails,
  onResetFilters,
}: ProductShelfProps) {
  return (
    <div>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      {products.length === 0 ? (
        <div className="surface-panel rounded-[22px] p-6 text-slate-300">
          <p className="font-semibold text-white">{emptyMessage}</p>
          <p className="mt-2 text-sm leading-6">
            Try another category or clear your search to return to all items.
          </p>
          <button
            className="btn-secondary mt-4 min-h-11 px-5"
            type="button"
            onClick={onResetFilters}
          >
            Show all items
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
              key={product.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TrustSection() {
  const cards = [
    [
      "Fast delivery planning",
      "Clear delivery windows help buyers understand when and how items will be handed off.",
    ],
    [
      "Safer transaction design",
      "Checkout, payment, and order handling are designed to open only when the flow is reliable.",
    ],
    [
      "Clear support path",
      "Discord tickets and Telegram admin contact give buyers a direct path when help is needed.",
    ],
    [
      "Transparent pricing",
      "Every item shows a clear USD price, stock state, and delivery estimate before any order action.",
    ],
  ];

  return (
    <section
      className="container-shell section-gap"
      aria-labelledby="trust-title"
    >
      <SectionHeader
        eyebrow="Trust"
        title="Built around clear prices, safer orders, and real support."
        description="DiaMart keeps the buying flow direct: know the price, understand availability, and reach support before committing to an order."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(([title, copy]) => (
          <div
            className="surface-panel entrance-soft rounded-[20px] p-5"
            key={title}
          >
            <h3
              className="font-semibold text-white"
              id={title === cards[0][0] ? "trust-title" : undefined}
            >
              {title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    [
      "Choose an item",
      "Pick a supported Roblox game and browse items by category or trend.",
    ],
    [
      "Login to order",
      "Browsing is open, while cart and order actions require an account.",
    ],
    [
      "Coordinate delivery",
      "Orders are coordinated through the supported delivery and support flow.",
    ],
    [
      "Get support",
      "Create a Discord ticket or message Telegram when an admin needs to help.",
    ],
  ];

  return (
    <section
      className="container-shell section-gap"
      aria-labelledby="how-title"
    >
      <SectionHeader
        eyebrow="Process"
        title="How DiaMart works"
        description="A simple flow for Roblox game-item shopping: choose a game, select items, login, and coordinate delivery with support available."
      />
      <div className="grid gap-4 md:grid-cols-4">
        {steps.map(([title, copy], index) => (
          <div
            className="surface-panel entrance-soft rounded-[20px] p-5"
            key={title}
          >
            <span className="font-strong flex h-9 w-9 items-center justify-center rounded-full bg-[#14f1c9] text-sm font-bold text-slate-950">
              {index + 1}
            </span>
            <h3
              className="mt-4 font-semibold text-white"
              id={index === 0 ? "how-title" : undefined}
            >
              {title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function DeliveryProofSection() {
  const proof = sampleDeliveryProofs[0];

  return (
    <section
      className="container-shell section-gap"
      id="delivery"
      aria-labelledby="proof-title"
    >
      <div className="surface-panel-strong entrance-rise grid gap-5 rounded-[24px] p-5 md:grid-cols-[1fr_0.8fr] md:items-center">
        <div>
          <p className="font-strong text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-300">
            Delivery proof
          </p>
          <h2
            className="font-heading mt-2 text-2xl font-semibold text-white sm:text-3xl"
            id="proof-title"
          >
            Verified delivery proof is planned carefully.
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
            Delivery proof is designed to keep handoffs transparent, private,
            and easy to review after an order is completed.
          </p>
        </div>
        {proof ? (
          <div className="rounded-[20px] border border-fuchsia-300/22 bg-fuchsia-500/10 p-4">
            <span className="font-strong rounded-full border border-fuchsia-300/30 bg-fuchsia-500/10 px-2.5 py-1 text-xs font-semibold text-fuchsia-100">
              Proof activity
            </span>
            <p className="mt-4 font-semibold text-white">{proof.itemName}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {proof.itemCategory} · {proof.relativeTime} ·{" "}
              {proof.anonymizedCustomer}
            </p>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Customer identifiers are anonymized and proof images will stay
              tied to completed deliveries.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section
      className="container-shell section-gap"
      id="faq"
      aria-labelledby="faq-title"
    >
      <SectionHeader
        eyebrow="FAQ"
        title="Answers before checkout goes live"
        description="Concise guidance for shopping, delivery, support, and checkout availability."
      />
      <div className="grid gap-3">
        {faqs.map((faq) => (
          <article className="surface-panel rounded-[18px] p-5" key={faq.id}>
            <h3 className="font-strong text-base font-semibold text-white">
              {faq.question}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {faq.answer}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SupportEntry() {
  const hasDiscordPlaceholder =
    siteConfig.discordSupportUrl.includes("example.com");

  return (
    <section
      className="container-shell section-gap"
      id="support"
      aria-labelledby="support-title"
    >
      <div className="surface-panel rounded-[24px] p-5 sm:p-6">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="font-strong text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-300">
              Support
            </p>
            <h2
              className="font-heading mt-2 text-2xl font-semibold text-white sm:text-3xl"
              id="support-title"
            >
              Discord is the preferred support channel.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              The support widget routes common questions and points unresolved
              issues toward Discord-first escalation.
            </p>
            {hasDiscordPlaceholder ? (
              <p className="mt-3 text-sm text-amber-100">
                Placeholder support URL in use. Replace it in central site
                config before launch.
              </p>
            ) : null}
          </div>
          <a
            className="btn-primary min-h-12 px-6"
            href={siteConfig.discordSupportUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open Discord support
          </a>
          <a
            className="btn-secondary min-h-12 px-6"
            href={siteConfig.telegramSupportUrl}
            target="_blank"
            rel="noreferrer"
          >
            Message admin on Telegram
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-purple-400/20 bg-[var(--background-elevated)]">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-brand flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/35 bg-purple-500/12 text-sm font-bold text-cyan-100">
              DM
            </span>
            <span className="font-brand text-lg font-semibold text-white">
              DiaMart
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            A premium Roblox item storefront focused on speed, safety, and clear
            USD pricing.
          </p>
          <p className="mt-4 text-xs leading-5 text-slate-500">
            DiaMart is not affiliated with, endorsed by, or sponsored by Roblox
            Corporation.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-white">Store</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>
              <a className="transition hover:text-white" href="#shop">
                Shop
              </a>
            </li>
            <li>
              <a className="transition hover:text-white" href="#games">
                Games
              </a>
            </li>
            <li>
              <a className="transition hover:text-white" href="#products">
                Catalog
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white">Support</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>
              <a
                className="transition hover:text-white"
                href={siteConfig.discordSupportUrl}
                target="_blank"
                rel="noreferrer"
              >
                Discord ticket
              </a>
            </li>
            <li>
              <a
                className="transition hover:text-white"
                href={siteConfig.telegramSupportUrl}
                target="_blank"
                rel="noreferrer"
              >
                Telegram admin
              </a>
            </li>
            <li>
              <a className="transition hover:text-white" href="#faq">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white">Store Info</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>
              <a className="transition hover:text-white" href="#delivery">
                Delivery proof
              </a>
            </li>
            <li>
              <Link className="transition hover:text-white" href="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" href="/register">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
