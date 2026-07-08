import Link from "next/link";
import { formatUsd } from "@/lib/utils/format-money";
import type { StorefrontProduct } from "../types";
import { ProductArtwork } from "./product-artwork";

type ProductMarqueeProps = {
  products: StorefrontProduct[];
  speedSeconds?: number;
};

function MarqueeCard({ product }: { product: StorefrontProduct }) {
  const originalPriceUsd = product.originalPriceUsd;
  const hasDiscount =
    originalPriceUsd !== undefined && originalPriceUsd > product.priceUsd;
  const inStock =
    product.stockStatus === "in-stock" || product.stockStatus === "low-stock";

  return (
    <Link
      className="group block w-[220px] shrink-0 rounded-[18px] border border-purple-400/20 bg-[var(--surface)] p-3 transition hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-[var(--surface-elevated)] motion-reduce:transition-none"
      href={`/games/${product.game.slug}`}
      aria-label={`${product.name} from ${product.game.name}`}
    >
      <ProductArtwork
        image={product.image}
        label={product.name}
        category={product.category}
      />
      <div className="mt-3">
        <p className="text-xs font-medium text-slate-400">
          {product.game.name}
        </p>
        <h3 className="font-heading mt-1 truncate text-sm font-semibold text-white">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="font-strong text-base font-semibold text-white">
              {formatUsd(product.priceUsd)}
            </span>
            {hasDiscount ? (
              <span className="text-xs text-slate-500 line-through">
                {formatUsd(originalPriceUsd)}
              </span>
            ) : null}
          </div>
          <span
            className={`font-strong rounded-full border px-2 py-0.5 text-[10px] ${
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

export function ProductMarquee({
  products,
  speedSeconds = 46,
}: ProductMarqueeProps) {
  if (products.length === 0) {
    return null;
  }

  const loop = [...products, ...products];

  return (
    <div className="marquee-viewport group relative overflow-hidden">
      <div
        className="marquee-track flex w-max gap-4 group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {loop.map((product, index) => (
          <MarqueeCard product={product} key={`${product.id}-${index}`} />
        ))}
      </div>
    </div>
  );
}
