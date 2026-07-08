import { useEffect, useId, useState } from "react";
import { formatUsd } from "@/lib/utils/format-money";
import type { StorefrontProduct } from "../types";
import { ProductArtwork } from "./product-artwork";

type ProductDetailModalProps = {
  product: StorefrontProduct | null;
  onClose: () => void;
  onAddToCart: (product: StorefrontProduct, quantity: number) => void;
};

export function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const titleId = useId();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, product]);

  if (!product) {
    return null;
  }

  const canAddToCart =
    product.stockStatus === "in-stock" || product.stockStatus === "low-stock";
  const originalPriceUsd = product.originalPriceUsd;
  const hasDiscount =
    originalPriceUsd !== undefined && originalPriceUsd > product.priceUsd;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="entrance-rise max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[24px] border border-purple-400/22 bg-[var(--surface-elevated)] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.5)] sm:p-5">
        <div className="flex items-center justify-between gap-4 border-b border-purple-400/18 pb-4">
          <div>
            <p className="font-strong text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
              Product details
            </p>
            <h2
              className="font-heading mt-1 text-xl font-semibold text-white"
              id={titleId}
            >
              {product.name}
            </h2>
          </div>
          <button
            className="btn-icon"
            type="button"
            onClick={onClose}
            aria-label="Close product details"
          >
            X
          </button>
        </div>

        <div className="grid gap-5 pt-5 md:grid-cols-[0.9fr_1fr]">
          <ProductArtwork
            image={product.image}
            label={product.name}
            category={product.category}
            size="detail"
          />

          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-purple-400/20 bg-purple-500/8 px-3 py-1 text-sm text-slate-200">
                {product.game.name}
              </span>
              <span className="rounded-full border border-purple-400/20 bg-purple-500/8 px-3 py-1 text-sm text-slate-200">
                {product.category.label}
              </span>
              <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-100">
                {product.deliverySpeed}
              </span>
            </div>

            <p className="text-sm leading-7 text-slate-300">
              {product.description}
            </p>

            <div className="rounded-[18px] border border-purple-400/20 bg-purple-500/8 p-4">
              <p className="font-strong text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Price
              </p>
              <div className="mt-2 flex flex-wrap items-baseline gap-3">
                <span className="font-strong text-3xl font-semibold text-white">
                  {formatUsd(product.priceUsd)}
                </span>
                {hasDiscount ? (
                  <span className="text-base text-slate-500 line-through">
                    {formatUsd(originalPriceUsd)}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm text-slate-400">
                Checkout is being prepared. You can still review this item and
                keep it in your cart.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <label className="flex-1 text-sm font-medium text-slate-200">
                Quantity
                <div className="mt-2 flex min-h-11 items-center rounded-full border border-purple-400/20 bg-black/30 px-2">
                  <button
                    className="btn-icon h-8 w-8"
                    type="button"
                    onClick={() =>
                      setQuantity((value) => Math.max(1, value - 1))
                    }
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="min-w-12 text-center text-sm font-semibold text-white">
                    {quantity}
                  </span>
                  <button
                    className="btn-icon h-8 w-8"
                    type="button"
                    onClick={() => setQuantity((value) => value + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </label>
              <button
                className="btn-primary min-h-11 flex-[1.3] disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                disabled={!canAddToCart}
                onClick={() => onAddToCart(product, quantity)}
              >
                {canAddToCart ? "Add to cart" : "Unavailable"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
