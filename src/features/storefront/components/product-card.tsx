import { formatUsd } from "@/lib/utils/format-money";
import type { StorefrontProduct } from "../types";
import { ProductArtwork } from "./product-artwork";

type ProductCardProps = {
  product: StorefrontProduct;
  onAddToCart: (product: StorefrontProduct) => void;
  onViewDetails: (product: StorefrontProduct) => void;
};

const stockLabels: Record<
  StorefrontProduct["stockStatus"],
  { label: string; className: string }
> = {
  "in-stock": {
    label: "In stock",
    className:
      "border-cyan-300/40 bg-cyan-400/12 text-cyan-100 shadow-[0_0_22px_rgba(20,241,201,0.12)]",
  },
  "low-stock": {
    label: "Limited",
    className: "border-amber-300/35 bg-amber-300/10 text-amber-100",
  },
  "out-of-stock": {
    label: "Out of stock",
    className: "border-slate-500/40 bg-slate-500/10 text-slate-300",
  },
  "coming-soon": {
    label: "Coming soon",
    className: "border-fuchsia-300/35 bg-fuchsia-500/10 text-fuchsia-100",
  },
};

const badgeLabels: Partial<
  Record<NonNullable<StorefrontProduct["badge"]>, string>
> = {
  featured: "Featured",
  popular: "Popular",
  new: "New",
  discount: "Valid discount",
  "quick-delivery": "Quick delivery",
};

export function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
}: ProductCardProps) {
  const canAddToCart =
    product.stockStatus === "in-stock" || product.stockStatus === "low-stock";
  const stock = stockLabels[product.stockStatus];
  const stockText =
    product.stockStatus === "in-stock" && product.stockQuantity !== undefined
      ? `In stock: ${product.stockQuantity}`
      : product.stockStatus === "low-stock" &&
          product.stockQuantity !== undefined
        ? `Limited: ${product.stockQuantity}`
        : stock.label;
  const originalPriceUsd = product.originalPriceUsd;
  const hasDiscount =
    originalPriceUsd !== undefined && originalPriceUsd > product.priceUsd;

  return (
    <article className="entrance-rise group flex h-full min-h-[430px] flex-col rounded-[18px] border border-purple-400/20 bg-[var(--surface)] p-3 shadow-[0_12px_38px_rgba(0,0,0,0.24)] transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-[var(--surface-elevated)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <ProductArtwork
        image={product.image}
        label={product.name}
        category={product.category}
      />

      <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-slate-400">
              {product.game.name}
            </p>
            <h3 className="font-heading mt-1 line-clamp-2 text-base font-semibold leading-6 text-white">
              {product.name}
            </h3>
          </div>
          {product.badge ? (
            <span className="font-strong max-w-[96px] rounded-full border border-fuchsia-300/25 bg-fuchsia-500/10 px-2 py-1 text-center text-[10px] font-semibold leading-tight text-fuchsia-50 sm:max-w-[112px]">
              {badgeLabels[product.badge]}
            </span>
          ) : null}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-purple-400/20 bg-purple-500/8 px-2.5 py-1 text-xs text-slate-200">
            {product.category.label}
          </span>
          <span
            className={`font-strong rounded-full border px-2.5 py-1 text-xs font-semibold ${stock.className}`}
          >
            {stockText}
          </span>
        </div>

        <p className="mt-3 text-sm leading-6 text-slate-300">
          {product.deliverySpeed}
        </p>

        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="font-strong text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Price
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-strong text-xl font-semibold text-white">
                  {formatUsd(product.priceUsd)}
                </span>
                {hasDiscount ? (
                  <span className="text-sm text-slate-500 line-through">
                    {formatUsd(originalPriceUsd)}
                  </span>
                ) : null}
              </div>
            </div>
            {hasDiscount ? (
              <span className="font-strong rounded-full border border-cyan-300/30 bg-cyan-400/10 px-2.5 py-1 text-xs font-semibold text-cyan-100">
                Save {formatUsd(originalPriceUsd - product.priceUsd)}
              </span>
            ) : null}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              className="btn-secondary min-h-11"
              type="button"
              onClick={() => onViewDetails(product)}
            >
              View details
            </button>
            <button
              className="btn-primary min-h-11 disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
              disabled={!canAddToCart}
              onClick={() => onAddToCart(product)}
            >
              {canAddToCart ? "Add to cart" : "Unavailable"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
