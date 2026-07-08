import type {
  DeliveryProofEvent,
  FAQItem,
  ItemCategory,
  StorefrontGame,
  StorefrontProduct,
  SupportTopic,
} from "./types";

export const activeGame: StorefrontGame = {
  id: "grow-a-garden-2",
  name: "Grow a Garden 2",
  slug: "grow-a-garden-2",
  tagline: "Pets, seeds & gear",
  active: true,
  image: {
    src: "gradient:grow-a-garden-2",
    alt: "Grow a Garden 2 store artwork placeholder",
  },
  description:
    "A curated Grow a Garden 2 store for pets, seeds, and gear with clear prices and fast delivery.",
};

export const bloxFruits: StorefrontGame = {
  id: "blox-fruits",
  name: "Blox Fruits",
  slug: "blox-fruits",
  tagline: "Fruits, gamepass & accounts",
  active: true,
  image: {
    src: "gradient:blox-fruits",
    alt: "Blox Fruits store artwork placeholder",
  },
  description:
    "Blox Fruits items, permanent fruits, and account upgrades delivered with clear pricing.",
};

export const adoptMe: StorefrontGame = {
  id: "adopt-me",
  name: "Adopt Me",
  slug: "adopt-me",
  tagline: "Pets, eggs & rides",
  active: true,
  image: {
    src: "gradient:adopt-me",
    alt: "Adopt Me store artwork placeholder",
  },
  description:
    "Adopt Me pets, eggs, and rides handled safely with transparent stock and fast handoff.",
};

export const murderMystery2: StorefrontGame = {
  id: "murder-mystery-2",
  name: "Murder Mystery 2",
  slug: "murder-mystery-2",
  tagline: "Knives, guns & bundles",
  active: true,
  image: {
    src: "gradient:murder-mystery-2",
    alt: "Murder Mystery 2 store artwork placeholder",
  },
  description:
    "Murder Mystery 2 knives, guns, and bundles with clear rarity and reliable delivery.",
};

export const grandPieceOnline: StorefrontGame = {
  id: "grand-piece-online",
  name: "Grand Piece Online",
  slug: "grand-piece-online",
  tagline: "Fruits, items & accounts",
  active: true,
  image: {
    src: "gradient:grand-piece-online",
    alt: "Grand Piece Online store artwork placeholder",
  },
  description:
    "Grand Piece Online (GPO) fruits, rare items, and accounts with straightforward pricing.",
};

export const games: StorefrontGame[] = [
  activeGame,
  bloxFruits,
  adoptMe,
  murderMystery2,
  grandPieceOnline,
];

export const itemCategories: ItemCategory[] = [
  {
    id: "all",
    label: "All",
    description: "Browse every Grow a Garden 2 item in the catalog.",
  },
  {
    id: "pets",
    label: "Pets",
    description: "Companion items prepared for quick delivery coordination.",
  },
  {
    id: "seeds",
    label: "Seeds",
    description: "Garden growth items with clear prices and availability.",
  },
  {
    id: "gear",
    label: "Gear",
    description: "Utility items for a cleaner Grow a Garden 2 setup.",
  },
];

const categoryById = Object.fromEntries(
  itemCategories.map((category) => [category.id, category]),
) as Record<ItemCategory["id"], ItemCategory>;

export const products: StorefrontProduct[] = [
  {
    id: "sprout-hare",
    slug: "sprout-hare",
    name: "Sprout Hare",
    game: activeGame,
    category: categoryById.pets,
    image: {
      src: "placeholder:sprout-hare",
      alt: "Sprout Hare item placeholder",
    },
    priceUsd: 4.5,
    originalPriceUsd: 5.25,
    stockStatus: "in-stock",
    stockQuantity: 24,
    deliverySpeed: "Estimated 5-10 min",
    badge: "best-seller",
    featured: true,
    popular: true,
    trending: true,
    bestSeller: true,
    description:
      "A bright companion pick for buyers who want a clean starter pet with quick handoff coordination.",
  },
  {
    id: "moonlit-corgi",
    slug: "moonlit-corgi",
    name: "Moonlit Corgi",
    game: activeGame,
    category: categoryById.pets,
    image: {
      src: "placeholder:moonlit-corgi",
      alt: "Moonlit Corgi item placeholder",
    },
    priceUsd: 8,
    stockStatus: "low-stock",
    stockQuantity: 5,
    deliverySpeed: "Estimated 10-15 min",
    badge: "popular",
    featured: true,
    popular: true,
    description:
      "A polished pet option for collectors who want a premium-feeling item without unclear pricing.",
  },
  {
    id: "aurora-seed-pack",
    slug: "aurora-seed-pack",
    name: "Aurora Seed Pack",
    game: activeGame,
    category: categoryById.seeds,
    image: {
      src: "placeholder:aurora-seed-pack",
      alt: "Aurora Seed Pack item placeholder",
    },
    priceUsd: 2.99,
    stockStatus: "in-stock",
    stockQuantity: 42,
    deliverySpeed: "Estimated 5-10 min",
    badge: "quick-delivery",
    featured: true,
    popular: true,
    trending: true,
    description:
      "A balanced seed pack for quick cart building, clear pricing, and fast handoff planning.",
  },
  {
    id: "crystal-watering-kit",
    slug: "crystal-watering-kit",
    name: "Crystal Watering Kit",
    game: activeGame,
    category: categoryById.gear,
    image: {
      src: "placeholder:crystal-watering-kit",
      alt: "Crystal Watering Kit item placeholder",
    },
    priceUsd: 6.75,
    originalPriceUsd: 7.5,
    stockStatus: "in-stock",
    stockQuantity: 18,
    deliverySpeed: "Estimated 10-15 min",
    badge: "discount",
    featured: true,
    popular: false,
    bestSeller: true,
    description:
      "A utility gear item with a clear discount and straightforward delivery estimate.",
  },
  {
    id: "ember-fox",
    slug: "ember-fox",
    name: "Ember Fox",
    game: activeGame,
    category: categoryById.pets,
    image: { src: "placeholder:ember-fox", alt: "Ember Fox item placeholder" },
    priceUsd: 12,
    stockStatus: "coming-soon",
    deliverySpeed: "Coming soon",
    badge: "new",
    featured: false,
    popular: true,
    description:
      "A coming-soon pet for collectors who want to track upcoming Grow a Garden 2 drops.",
  },
  {
    id: "silver-soil-bundle",
    slug: "silver-soil-bundle",
    name: "Silver Soil Bundle",
    game: activeGame,
    category: categoryById.seeds,
    image: {
      src: "placeholder:silver-soil-bundle",
      alt: "Silver Soil Bundle item placeholder",
    },
    priceUsd: 3.25,
    stockStatus: "in-stock",
    stockQuantity: 31,
    deliverySpeed: "Estimated 5-10 min",
    featured: false,
    popular: true,
    description:
      "A straightforward seed support item for testing shelf density and pricing hierarchy.",
  },
  {
    id: "garden-signal-lamp",
    slug: "garden-signal-lamp",
    name: "Garden Signal Lamp",
    game: activeGame,
    category: categoryById.gear,
    image: {
      src: "placeholder:garden-signal-lamp",
      alt: "Garden Signal Lamp item placeholder",
    },
    priceUsd: 5.5,
    stockStatus: "in-stock",
    stockQuantity: 16,
    deliverySpeed: "Estimated 10-15 min",
    badge: "popular",
    featured: false,
    popular: true,
    trending: true,
    description:
      "A clean gear item that keeps the card layout practical for longer product names.",
  },
  {
    id: "sunrise-seed-crate",
    slug: "sunrise-seed-crate",
    name: "Sunrise Seed Crate",
    game: activeGame,
    category: categoryById.seeds,
    image: {
      src: "placeholder:sunrise-seed-crate",
      alt: "Sunrise Seed Crate item placeholder",
    },
    priceUsd: 9.99,
    stockStatus: "out-of-stock",
    deliverySpeed: "Currently unavailable",
    featured: true,
    popular: false,
    description:
      "A high-value seed crate shown with clear availability so buyers are not pushed by false urgency.",
  },
  {
    id: "harvest-gloves",
    slug: "harvest-gloves",
    name: "Harvest Gloves",
    game: activeGame,
    category: categoryById.gear,
    image: {
      src: "placeholder:harvest-gloves",
      alt: "Harvest Gloves item placeholder",
    },
    priceUsd: 1.99,
    stockStatus: "in-stock",
    stockQuantity: 58,
    deliverySpeed: "Estimated 5-10 min",
    badge: "quick-delivery",
    featured: false,
    popular: true,
    description:
      "A low-price gear item that keeps the storefront approachable while preserving premium presentation.",
  },

  {
    id: "bf-permanent-dragon",
    slug: "permanent-dragon",
    name: "Permanent Dragon",
    game: bloxFruits,
    category: { id: "fruits", label: "Fruits" },
    image: {
      src: "placeholder:permanent-dragon",
      alt: "Permanent Dragon artwork",
    },
    priceUsd: 24.99,
    originalPriceUsd: 29.99,
    stockStatus: "in-stock",
    stockQuantity: 7,
    deliverySpeed: "Estimated 10-20 min",
    badge: "best-seller",
    featured: true,
    popular: true,
    trending: true,
    bestSeller: true,
    description:
      "A permanent high-tier fruit for Blox Fruits with clear pricing and careful handoff.",
  },
  {
    id: "bf-fruit-notifier",
    slug: "fruit-notifier-gamepass",
    name: "Fruit Notifier Gamepass",
    game: bloxFruits,
    category: { id: "gamepass", label: "Gamepass" },
    image: {
      src: "placeholder:fruit-notifier",
      alt: "Fruit Notifier Gamepass artwork",
    },
    priceUsd: 3.5,
    stockStatus: "in-stock",
    stockQuantity: 35,
    deliverySpeed: "Estimated 5-10 min",
    badge: "quick-delivery",
    featured: false,
    popular: true,
    trending: true,
    description:
      "A convenient gamepass upgrade delivered quickly with transparent pricing.",
  },
  {
    id: "bf-max-account",
    slug: "max-level-account",
    name: "Max Level Account",
    game: bloxFruits,
    category: { id: "account", label: "Accounts" },
    image: { src: "placeholder:max-account", alt: "Max Level Account artwork" },
    priceUsd: 39,
    stockStatus: "low-stock",
    stockQuantity: 3,
    deliverySpeed: "Estimated 15-30 min",
    badge: "popular",
    featured: true,
    popular: true,
    bestSeller: true,
    description:
      "A prepared max-level account with clear specifications and secure delivery.",
  },
  {
    id: "am-neon-unicorn",
    slug: "neon-unicorn",
    name: "Neon Unicorn",
    game: adoptMe,
    category: { id: "pets", label: "Pets" },
    image: { src: "placeholder:neon-unicorn", alt: "Neon Unicorn artwork" },
    priceUsd: 14.5,
    originalPriceUsd: 17,
    stockStatus: "in-stock",
    stockQuantity: 9,
    deliverySpeed: "Estimated 10-15 min",
    badge: "best-seller",
    featured: true,
    popular: true,
    trending: true,
    bestSeller: true,
    description:
      "A sought-after Adopt Me pet with a clear discount and reliable delivery.",
  },
  {
    id: "am-mega-egg",
    slug: "mega-egg",
    name: "Mega Egg Bundle",
    game: adoptMe,
    category: { id: "eggs", label: "Eggs" },
    image: { src: "placeholder:mega-egg", alt: "Mega Egg Bundle artwork" },
    priceUsd: 8.25,
    stockStatus: "in-stock",
    stockQuantity: 21,
    deliverySpeed: "Estimated 10-15 min",
    badge: "quick-delivery",
    featured: false,
    popular: true,
    trending: true,
    description:
      "An egg bundle for faster pet collecting with clear pricing and stock.",
  },
  {
    id: "mm2-godly-knife",
    slug: "godly-knife",
    name: "Godly Knife",
    game: murderMystery2,
    category: { id: "knives", label: "Knives" },
    image: { src: "placeholder:godly-knife", alt: "Godly Knife artwork" },
    priceUsd: 9.99,
    originalPriceUsd: 12,
    stockStatus: "in-stock",
    stockQuantity: 14,
    deliverySpeed: "Estimated 5-15 min",
    badge: "best-seller",
    featured: true,
    popular: true,
    trending: true,
    bestSeller: true,
    description:
      "A godly-tier knife with clear rarity, discount, and secure delivery.",
  },
  {
    id: "mm2-classic-gun",
    slug: "classic-gun",
    name: "Classic Gun",
    game: murderMystery2,
    category: { id: "guns", label: "Guns" },
    image: { src: "placeholder:classic-gun", alt: "Classic Gun artwork" },
    priceUsd: 4.75,
    stockStatus: "in-stock",
    stockQuantity: 20,
    deliverySpeed: "Estimated 5-15 min",
    badge: "quick-delivery",
    featured: false,
    popular: true,
    description:
      "A collectible gun item with upfront pricing and quick handoff.",
  },
  {
    id: "gpo-rare-fruit",
    slug: "rare-fruit",
    name: "Rare Fruit",
    game: grandPieceOnline,
    category: { id: "fruits", label: "Fruits" },
    image: { src: "placeholder:gpo-rare-fruit", alt: "Rare Fruit artwork" },
    priceUsd: 11,
    originalPriceUsd: 13.5,
    stockStatus: "in-stock",
    stockQuantity: 6,
    deliverySpeed: "Estimated 15-25 min",
    badge: "best-seller",
    featured: true,
    popular: true,
    trending: true,
    bestSeller: true,
    description:
      "A rare GPO fruit with a clear discount and careful delivery coordination.",
  },
  {
    id: "gpo-rare-item",
    slug: "rare-item",
    name: "Rare Item Bundle",
    game: grandPieceOnline,
    category: { id: "items", label: "Items" },
    image: {
      src: "placeholder:gpo-rare-item",
      alt: "Rare Item Bundle artwork",
    },
    priceUsd: 7.25,
    stockStatus: "low-stock",
    stockQuantity: 4,
    deliverySpeed: "Estimated 15-25 min",
    badge: "popular",
    featured: false,
    popular: true,
    trending: true,
    description:
      "A bundle of useful GPO items with transparent stock and pricing.",
  },
];

export function getGameBySlug(slug: string): StorefrontGame | null {
  return games.find((game) => game.slug === slug) ?? null;
}

export function getProductsByGame(slug: string): StorefrontProduct[] {
  return products.filter((product) => product.game.slug === slug);
}

export function getCategoriesByGame(slug: string): ItemCategory[] {
  const seen = new Set<string>();
  const categories: ItemCategory[] = [];
  for (const product of getProductsByGame(slug)) {
    if (!seen.has(product.category.id)) {
      seen.add(product.category.id);
      categories.push(product.category);
    }
  }
  return categories;
}

export const bestSellerProducts = products.filter(
  (product) => product.bestSeller,
);

export const trendingProducts = products.filter((product) => product.trending);

export const faqs: FAQItem[] = [
  {
    id: "delivery-process",
    question: "How does delivery work?",
    answer:
      "Choose an item, add it to your cart, then coordinate delivery through the supported order flow once checkout opens.",
  },
  {
    id: "delivery-time",
    question: "How fast is delivery?",
    answer:
      "Orders are created automatically in Discord. The fastest delivery target is 5 minutes, and the longest expected delivery window is 1 hour.",
  },
  {
    id: "checkout-status",
    question: "How can I pay?",
    answer:
      "DiaMart will support multiple payment methods, with Stripe and crypto planned as the primary options.",
  },
  {
    id: "transaction-safety",
    question: "How does DiaMart keep transactions safe?",
    answer:
      "Every transaction is handled with strong security practices and careful encryption so customer information is not exposed.",
  },
  {
    id: "support-channel",
    question: "Where do I get support?",
    answer:
      "Join Discord to create a support ticket with an admin, or message the admin directly on Telegram at @tuandarcy.",
  },
];

export const sampleDeliveryProofs: DeliveryProofEvent[] = [
  {
    id: "proof-1",
    itemName: "Permanent Dragon",
    itemCategory: "Fruits",
    gameName: "Blox Fruits",
    deliveryStatus: "sample-delivered",
    relativeTime: "8 min ago",
    anonymizedCustomer: "Customer A***",
    image: {
      src: "placeholder:proof-dragon",
      alt: "Delivery proof placeholder",
    },
  },
  {
    id: "proof-2",
    itemName: "Neon Unicorn",
    itemCategory: "Pets",
    gameName: "Adopt Me",
    deliveryStatus: "sample-delivered",
    relativeTime: "14 min ago",
    anonymizedCustomer: "Customer M***",
    image: {
      src: "placeholder:proof-unicorn",
      alt: "Delivery proof placeholder",
    },
  },
  {
    id: "proof-3",
    itemName: "Godly Knife",
    itemCategory: "Knives",
    gameName: "Murder Mystery 2",
    deliveryStatus: "sample-coordinating",
    relativeTime: "Just now",
    anonymizedCustomer: "Customer R***",
    image: {
      src: "placeholder:proof-knife",
      alt: "Delivery proof placeholder",
    },
  },
];

export const supportTopics: SupportTopic[] = [
  {
    id: "delivery-timing",
    label: "Delivery timing",
    description: "Understand delivery estimates before checkout is live.",
    response:
      "Delivery estimates are shown on each product card. Discord support can help confirm timing and handoff details when checkout opens.",
  },
  {
    id: "item-availability",
    label: "Item availability",
    description: "Check stock labels and coming-soon items.",
    response:
      "Use the stock status on each product card. Coming-soon and out-of-stock items cannot be added to the cart.",
  },
  {
    id: "cart-checkout",
    label: "Cart or checkout",
    description: "Review cart behavior and checkout availability.",
    response:
      "The cart lets you review items and subtotal. Checkout is not open yet because payment setup is still being prepared.",
  },
  {
    id: "issue-resolution",
    label: "Refund or issue resolution",
    description: "See how support will be routed later.",
    response:
      "Refund and issue-resolution policies are not finalized yet. The production flow should document clear expectations before accepting payments.",
  },
];
