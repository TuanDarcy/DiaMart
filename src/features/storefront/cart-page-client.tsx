"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatUsd } from "@/lib/utils/format-money";
import { readStoredCart, writeStoredCart } from "./cart-storage";
import { products } from "./mock-data";
import type { CartLineItem } from "./types";
import { getCartItemCount, getCartSubtotal } from "./components/cart-drawer";

export function CartPageClient() {
  const [items, setItems] = useState<CartLineItem[]>(() => readStoredCart());

  useEffect(() => {
    writeStoredCart(items);
  }, [items]);

  const subtotal = useMemo(() => getCartSubtotal(items, products), [items]);
  const itemCount = getCartItemCount(items);

  function increase(productId: string) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  }

  function decrease(productId: string) {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function remove(productId: string) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productId),
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="container-shell py-8 sm:py-12">
        <Link className="btn-secondary inline-flex min-h-10 px-4" href="/">
          Back to storefront
        </Link>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="font-strong text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-300">
              Cart page
            </p>
            <h1 className="font-heading mt-2 text-3xl font-semibold text-white sm:text-4xl">
              Cart
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Review your selected items, quantities, and subtotal before
              checkout opens.
            </p>

            <div className="mt-6 space-y-3">
              {items.length === 0 ? (
                <div className="surface-panel rounded-[22px] p-6">
                  <h2 className="text-lg font-semibold text-white">
                    Your cart is empty.
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Return to the storefront and add Grow a Garden 2 items to
                    review your cart.
                  </p>
                </div>
              ) : (
                items.map((item) => {
                  const product = products.find(
                    (candidate) => candidate.id === item.productId,
                  );
                  if (!product) {
                    return null;
                  }

                  return (
                    <article
                      className="surface-panel rounded-[22px] p-4"
                      key={item.productId}
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-semibold text-white">
                            {product.name}
                          </p>
                          <p className="mt-1 text-sm text-slate-400">
                            {product.game.name} · {product.category.label} ·{" "}
                            {formatUsd(product.priceUsd)}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex min-h-10 items-center rounded-full border border-purple-400/20 bg-black/30 px-2">
                            <button
                              className="btn-icon h-8 w-8"
                              type="button"
                              onClick={() => decrease(product.id)}
                              aria-label={`Decrease ${product.name} quantity`}
                            >
                              -
                            </button>
                            <span className="min-w-10 text-center text-sm font-semibold text-white">
                              {item.quantity}
                            </span>
                            <button
                              className="btn-icon h-8 w-8"
                              type="button"
                              onClick={() => increase(product.id)}
                              aria-label={`Increase ${product.name} quantity`}
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="text-sm font-semibold text-slate-400 hover:text-white"
                            type="button"
                            onClick={() => remove(product.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>

          <aside className="surface-panel h-fit rounded-[24px] p-5">
            <h2 className="text-lg font-semibold text-white">Order summary</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <div className="flex items-center justify-between">
                <span>Items</span>
                <span>{itemCount}</span>
              </div>
              <div className="flex items-center justify-between border-t border-purple-400/18 pt-3">
                <span>Subtotal</span>
                <span className="text-xl font-semibold text-white">
                  {formatUsd(subtotal)}
                </span>
              </div>
            </div>
            <div className="mt-5 rounded-[16px] border border-amber-300/25 bg-amber-300/10 p-3 text-sm leading-6 text-amber-50">
              Checkout is opening soon. Payment processing is not available yet.
            </div>
            <button
              className="btn-primary mt-4 min-h-11 w-full cursor-not-allowed opacity-60"
              type="button"
              disabled
            >
              Checkout opening soon
            </button>
          </aside>
        </div>
      </section>
    </main>
  );
}
