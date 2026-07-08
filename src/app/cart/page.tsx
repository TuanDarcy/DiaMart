import { CartPageClient } from "@/features/storefront/cart-page-client";
import { getStorefrontProductsForCart } from "@/services/storefront/storefront-service";

export default async function CartPage() {
  const products = await getStorefrontProductsForCart();

  return <CartPageClient products={products} />;
}
