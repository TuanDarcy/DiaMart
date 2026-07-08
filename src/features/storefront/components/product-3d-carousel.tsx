"use client";

import Link from "next/link";
import { formatUsd } from "@/lib/utils/format-money";
import type { StorefrontProduct } from "../types";
import { ProductArtwork } from "./product-artwork";

type Product3DCarouselProps = {
  products: StorefrontProduct[];
  showTrendingBadge?: boolean;
};

const CARD_WIDTH_PX = 224;
const CARD_GAP_PX = 16;
const CARD_STEP = CARD_WIDTH_PX + CARD_GAP_PX;

function SliderCard({
  product,
  showTrendingBadge,
}: {
  product: StorefrontProduct;
  showTrendingBadge?: boolean;
}) {
  const originalPriceUsd = product.originalPriceUsd;
  const hasDiscount =
    originalPriceUsd !== undefined && originalPriceUsd > product.priceUsd;
  const inStock =
    product.stockStatus === "in-stock" || product.stockStatus === "low-stock";

  return (
    <Link
      className="relative flex h-full w-full flex-col rounded-[18px] border border-purple-400/22 bg-[var(--surface-elevated)] p-3 transition duration-200 hover:-translate-y-1 hover:border-cyan-300/35 hover:shadow-[0_20px_60px_rgba(0,0,0,0.38)] focus:outline-none focus-visible:ring-4 focus-visible:ring-fuchsia-500/25 motion-reduce:transition-none"
      href={`/games/${product.game.slug}`}
      draggable={false}
    >
      {showTrendingBadge ? (
        <span className="font-strong absolute right-2 top-2 z-10 rounded-full bg-amber-400/90 px-2 py-0.5 text-[10px] font-bold leading-none text-slate-950 shadow-[0_0_12px_rgba(251,191,36,0.5)]">
          🔥 Trending
        </span>
      ) : null}
      {!showTrendingBadge &&
      (product.badge === "best-seller" || product.bestSeller) ? (
        <span className="font-strong absolute right-2 top-2 z-10 rounded-full border border-cyan-300/40 bg-cyan-400/12 px-2 py-0.5 text-[10px] font-bold leading-none text-cyan-100">
          ⭐ Best seller
        </span>
      ) : null}

      <ProductArtwork
        image={product.image}
        label={product.name}
        category={product.category}
      />
      <div className="mt-3 flex flex-1 flex-col">
        <p className="text-[11px] font-medium text-slate-400">
          {product.game.name}
        </p>
        <h3 className="font-heading mt-1 line-clamp-2 text-sm font-semibold leading-tight text-white">
          {product.name}
        </h3>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="font-strong text-base font-bold text-white">
              {formatUsd(product.priceUsd)}
            </span>
            {hasDiscount ? (
              <span className="text-[11px] text-slate-500 line-through">
                {formatUsd(originalPriceUsd)}
              </span>
            ) : null}
          </div>
          <span
            className={`font-strong shrink-0 rounded-full border px-2 py-0.5 text-[10px] leading-none ${
              inStock
                ? "border-cyan-300/40 bg-cyan-400/12 text-cyan-100"
                : "border-slate-500/40 bg-slate-500/10 text-slate-300"
            }`}
          >
            {inStock && product.stockQuantity !== undefined
              ? `Stock ${product.stockQuantity}`
              : inStock
                ? "In stock"
                : "Out"}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function Product3DCarousel({
  products,
  showTrendingBadge = false,
}: Product3DCarouselProps) {
  if (products.length === 0) {
    return null;
  }

  const looped = [...products, ...products];
  const totalPx = products.length * CARD_STEP;
  const durationSec = (products.length * CARD_STEP) / 80;

  return (
    <div
      className="slider-viewport relative overflow-hidden"
      aria-label="Product slider"
    >
      <div
        className="slider-track flex gap-4 py-4"
        style={
          {
            "--slider-total": `${totalPx}px`,
            "--slider-dur": `${durationSec}s`,
          } as React.CSSProperties
        }
      >
        {looped.map((product, index) => (
          <div
            className="slider-card shrink-0"
            key={`${product.id}-${index}`}
            style={{ width: `${CARD_WIDTH_PX}px` }}
          >
            <SliderCard
              product={product}
              showTrendingBadge={showTrendingBadge}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
