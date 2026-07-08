export type CategoryId = string;

export type StockStatus =
  | "in-stock"
  | "low-stock"
  | "out-of-stock"
  | "coming-soon";

export type ProductBadge =
  | "featured"
  | "popular"
  | "new"
  | "discount"
  | "quick-delivery"
  | "best-seller";

export type ImageRef = {
  src: string;
  alt: string;
};

export type StorefrontGame = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  image: ImageRef;
  description: string;
  active: boolean;
};

export type ItemCategory = {
  id: CategoryId;
  label: string;
  description?: string;
};

export type StorefrontProduct = {
  id: string;
  slug: string;
  name: string;
  game: StorefrontGame;
  category: ItemCategory;
  image: ImageRef;
  priceUsd: number;
  originalPriceUsd?: number;
  stockStatus: StockStatus;
  stockQuantity?: number;
  deliverySpeed: string;
  badge?: ProductBadge;
  featured: boolean;
  popular: boolean;
  trending?: boolean;
  bestSeller?: boolean;
  description: string;
};

export type CartLineItem = {
  productId: string;
  quantity: number;
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export type DeliveryProofEvent = {
  id: string;
  itemName: string;
  itemCategory: string;
  gameName: string;
  deliveryStatus: "sample-delivered" | "sample-coordinating";
  relativeTime: string;
  anonymizedCustomer: string;
  image?: ImageRef;
};

export type SupportTopic = {
  id: string;
  label: string;
  description: string;
  response: string;
};
