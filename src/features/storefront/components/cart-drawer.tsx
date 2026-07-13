import Link from "next/link";
import { formatUsd } from "@/lib/utils/format-money";
import type { CartLineItem, StorefrontProduct } from "../types";

type CartDrawerProps = {
  isOpen: boolean;
  items: CartLineItem[];
  products: StorefrontProduct[];
  onClose: () => void;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
};

export function getCartSubtotal(
  items: CartLineItem[],
  products: StorefrontProduct[],
) {
  return items.reduce((subtotal, item) => {
    const product = products.find(
      (candidate) => candidate.id === item.productId,
    );
    return subtotal + (product?.priceUsd ?? 0) * item.quantity;
  }, 0);
}

export function getCartItemCount(items: CartLineItem[]) {
  return items.reduce((count, item) => count + item.quantity, 0);
}

export function CartDrawer({
  isOpen,
  items,
  products,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
}: CartDrawerProps) {
  const subtotal = getCartSubtotal(items, products);

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <button
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
        type="button"
        aria-label="Close cart drawer"
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-purple-400/22 bg-[var(--surface-elevated)] shadow-[0_24px_80px_rgba(0,0,0,0.5)] transition-transform duration-200 motion-reduce:transition-none ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between gap-4 border-b border-purple-400/18 p-5">
          <div>
            <p className="font-strong text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
              Cart
            </p>
            <h2 className="mt-1 text-xl font-semibold text-white">
              Your items
            </h2>
          </div>
          <button
            className="btn-icon"
            type="button"
            onClick={onClose}
            aria-label="Close cart"
          >
            <svg
              className="icon-md icon-wrap"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="rounded-[20px] border border-purple-400/20 bg-purple-500/8 p-5 text-sm leading-6 text-slate-300">
              <p className="font-semibold text-white">Your cart is empty.</p>
              <p className="mt-2">
                Add Grow a Garden 2 items to review quantities and subtotal
                before checkout opens.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => {
                const product = products.find(
                  (candidate) => candidate.id === item.productId,
                );
                if (!product) {
                  return null;
                }

                return (
                  <div
                    className="rounded-[18px] border border-purple-400/20 bg-purple-500/8 p-4"
                    key={item.productId}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-white">
                          {product.name}
                        </p>
                        <p className="mt-1 text-sm text-slate-400">
                          {product.category.label} ·{" "}
                          {formatUsd(product.priceUsd)}
                        </p>
                      </div>
                      <button
                        className="text-sm font-semibold text-slate-400 transition hover:text-white"
                        type="button"
                        onClick={() => onRemove(product.id)}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="flex min-h-10 items-center rounded-full border border-purple-400/20 bg-black/30 px-2">
                        <button
                          className="btn-icon h-8 w-8"
                          type="button"
                          onClick={() => onDecrease(product.id)}
                          aria-label={`Decrease ${product.name} quantity`}
                        >
                          <svg
                            className="icon-sm icon-wrap"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>
                        <span className="min-w-10 text-center text-sm font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          className="btn-icon h-8 w-8"
                          type="button"
                          onClick={() => onIncrease(product.id)}
                          aria-label={`Increase ${product.name} quantity`}
                        >
                          <svg
                            className="icon-sm icon-wrap"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>
                      </div>
                      <p className="font-semibold text-white">
                        {formatUsd(product.priceUsd * item.quantity)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="border-t border-purple-400/18 p-5">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Subtotal</span>
            <span className="text-xl font-semibold text-white">
              {formatUsd(subtotal)}
            </span>
          </div>
          <div className="mt-4 rounded-[16px] border border-amber-300/25 bg-amber-300/10 p-3 text-sm leading-6 text-amber-50">
            Checkout is opening soon. Payment processing is not available yet.
          </div>
          <Link
            className="btn-secondary mt-3 flex min-h-11 items-center justify-center"
            href="/cart"
            onClick={onClose}
          >
            Open cart page
          </Link>
          <button
            className="btn-primary mt-3 min-h-11 w-full cursor-not-allowed opacity-60"
            type="button"
            disabled
          >
            Checkout opening soon
          </button>
        </div>
      </aside>
    </div>
  );
}
