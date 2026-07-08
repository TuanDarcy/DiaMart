import type { CartLineItem } from "./types";

export const CART_STORAGE_KEY = "diamart.preview.cart";

export function readStoredCart(): CartLineItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);
  if (!rawCart) {
    return [];
  }

  try {
    const parsedCart: unknown = JSON.parse(rawCart);
    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart.filter(isCartLineItem);
  } catch {
    return [];
  }
}

export function writeStoredCart(items: CartLineItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

function isCartLineItem(item: unknown): item is CartLineItem {
  if (!item || typeof item !== "object") {
    return false;
  }

  const candidate = item as Partial<CartLineItem>;
  return (
    typeof candidate.productId === "string" &&
    typeof candidate.quantity === "number" &&
    candidate.quantity > 0
  );
}
