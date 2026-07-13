# DiaMart Home Page UI Plan

## Status

Implemented.

## Purpose

The home page introduces DiaMart as a multi-game Roblox item marketplace. It helps buyers pick a game, discover best-selling and trending items across all games, understand delivery and payment expectations, and reach Discord/Telegram support. Browsing is public; cart and order actions require login.

## Home Structure (Implemented)

1. Announcement bar (delivery + support summary).
2. Header (games, trending, delivery proof, FAQ, cart, login; hamburger menu on mobile only).
3. Hero (marketplace positioning, multi-game stats, choose-a-game CTA, recent delivery proof card).
4. Game selection carousel (Telegram-style stacked, auto-rotating and manually swipeable; each card opens `/games/[slug]`).
5. Best sellers marquee (slow infinite carousel across games).
6. Trending marquee (slow infinite carousel across games).
7. Trust section.
8. How DiaMart works (general Roblox item marketplace flow).
9. Delivery proof section.
10. FAQ (direct question-and-answer cards).
11. Support entry (Discord + Telegram).
12. Footer (brand, store links, Discord/Telegram).

The home page no longer uses the single-game category tabs; item category tabs live on each game store page.

## User Roles

- First-time buyer evaluating whether DiaMart is safe and fast.
- Returning buyer looking for Grow a Garden 2 items.
- Mobile buyer searching by product name or item category.
- Buyer with a delivery or order question who needs Discord support.

## Confirmed Product Decisions

- Brand: premium, polished, trustworthy, fast, clean, modern, and professional.
- Core promise: fastest delivery, safe and reliable transactions, and clear competitive pricing.
- Website language: English.
- Initial currency: USD only.
- Initial active game: Grow a Garden 2.
- Initial useful categories: Pets, Seeds, and Gear.
- Initial data source: local mock data only.
- Initial checkout assumption: add-to-cart updates a cart drawer, then users can proceed to a dedicated cart page later.
- Real payment processing is not part of the initial UI phase.
- Discord is the preferred support escalation channel.
- Discord invite is configured as `https://discord.gg/DrZDg3gPuS`.
- Telegram direct admin support is configured as `https://t.me/tuandarcy`.
- Delivery proof is a planned feature, but production proof must only come from real delivered orders.
- Browsing products does not require login. Cart and order-start actions require login/register.

## Design System Direction

### Color Roles

- Page background: black and deep charcoal with restrained purple/red depth.
- Elevated surfaces: dark charcoal surfaces with controlled purple borders.
- Primary action: purple-to-magenta-to-dark-red gradient for shopping actions.
- Secondary accent: controlled fuchsia and dark red for information, support, and emphasis.
- Success: green only for real success states.
- Warning: amber for limited or coming-soon states.
- Error: clear red for unavailable actions and failures.

### Font System

- Bricolage Grotesque is the intended font for DiaMart logo, headings, hero copy, section headings, product names, and important promotional text.
- Fira Sans Regular is the intended font for body copy, navigation, descriptions, form labels, product metadata, FAQ, and support messages.
- Fira Sans Bold is the intended font for buttons, prices, badges, strong labels, and important popup content.
- `src/app/globals.css` defines `--font-heading`, `--font-body`, and `--font-strong` so components do not need scattered font-family assignments.
- The requested font files are not currently present in the repository, so the implementation uses safe fallbacks until the local `.woff2` files are added and connected with `next/font/local`.
- Page-load entrance motion starts sections about 18px above their final position, fades in, and slides gently down.
- Hero CTA copy is `Shopping now`, and the `Roblox items` phrase is highlighted with the mint/cyan accent to sit more comfortably with the purple theme.
- The hero side panel is implemented as an auto-rotating sample delivery-proof carousel with fade/slide transition, live badge, and sample proof text.
- Three simple static preview stats are shown for the static storefront phase: active game, preview items, and item categories.
- Header search shortcut was removed; the page-level search input remains the primary search surface.
- Search result count is hidden until the buyer starts typing. The placeholder uses a typewriter effect with product names.
- FAQ answers are displayed directly in cards.
- Login/register pages exist, and cart/order actions prompt login while browsing remains public.

### Background Colors

- `background`: `#07070A`.
- `backgroundRaised`: `#0D0D12`.
- `backgroundSubtle`: `#121219`.

### Surface Colors

- `surface`: `#121219`.
- `surfaceElevated`: `#181821`.
- `surfaceInteractive`: `#1E1826`.
- `border`: `rgba(168, 85, 247, 0.22)`.

### Primary Action Color

- `primary`: `#8B5CF6`.
- `primaryHover`: `#7C3AED`.
- `primaryText`: `#F7F4FF`.

### Success, Warning, And Error Colors

- `success`: `#22C55E`.
- `warning`: `#F59E0B`.
- `error`: `#EF4444`.
- `info`: `#A855F7`.

### Text Hierarchy

- `textPrimary`: `#F7F4FF`.
- `textSecondary`: `#AAA4B5`.
- `textMuted`: `#777181`.
- `textDisabled`: `#667380`.

### Border Radius Scale

- `xs`: 6px for small badges.
- `sm`: 10px for inputs and small controls.
- `md`: 14px for product cards.
- `lg`: 18px for feature panels.
- `pill`: 999px for primary CTAs and compact filters.

### Shadow Scale

- `sm`: subtle product lift, `0 8px 24px rgba(0, 0, 0, 0.18)`.
- `md`: cart drawer and floating support, `0 18px 48px rgba(0, 0, 0, 0.28)`.
- `focus`: `0 0 0 3px rgba(33, 212, 155, 0.28)`.

### Spacing Scale

- Base unit: 4px.
- Common spacing: 8, 12, 16, 20, 24, 32, 40, 56, 72.
- Section spacing: 48-72px desktop, 32-48px mobile.
- Card gap: 16-20px desktop, 12-16px mobile.

### Container Widths

- Main content: max-width 1200px.
- Product grid: max-width 1280px when four or five cards fit comfortably.
- Desktop side padding: 32px.
- Tablet side padding: 24px.
- Mobile side padding: 16-20px.

### Typography Hierarchy

- Display: 44-56px desktop, 34-40px mobile, semibold.
- Page heading: 32-40px desktop, 28-32px mobile.
- Section heading: 24-30px desktop, 22-26px mobile.
- Product title: 15-17px, semibold.
- Body: 15-17px.
- Supporting text: 13-14px.
- Price: 18-22px, semibold.

Use a purposeful sans-serif during implementation, such as `Sora`, `Manrope`, or `Nunito Sans`, if a font decision is approved. Do not install a font dependency during this documentation task.

### Button Variants

- Primary: emerald fill, dark text, pill shape, used for `Add to cart`, `Shop Grow a Garden 2`, and key checkout actions.
- Secondary: dark surface with border, used for `View details`, `How delivery works`, and support links.
- Ghost: transparent with subtle hover, used for nav links and low-emphasis actions.
- Disabled/coming soon: muted surface, disabled cursor, explanatory tooltip or helper text.
- Icon: square or circular with accessible label, used for search, cart, menu, close, and support.

### Card Variants

- Product card: image area, concise metadata, price, stock status, delivery speed, add-to-cart action.
- Game context card: Grow a Garden 2 summary, category shortcuts, and product count label based on mock data.
- Trust card: one icon, one title, one short support sentence.
- Support entry card: Discord-first escalation with clear expectation.

### Badge Variants

- Category badge: neutral surface.
- Featured badge: emerald soft fill.
- Discount badge: amber or emerald depending on discount semantics.
- Stock badge: success, warning, or neutral.
- Demo/sample badge: blue or neutral, required for synthetic proof events in preview documentation.

Avoid excessive badges and visual noise.

### Input And Search Styles

- Search should be prominent near the top of the home page.
- Inputs use dark elevated surface, clear border, visible placeholder, and strong focus ring.
- Search suggestions should distinguish products and categories.
- Empty search state copy should be English and calm, such as `No matching items yet.`

### Focus States

- Every interactive element must have a visible focus ring.
- Focus ring should use the primary emerald token with sufficient contrast.
- Focus order should follow the visual shopping flow: announcement, header, search, categories, products, support, footer.

## User Flow

1. Buyer lands on the home page and sees a compact announcement, header, search, and hero.
2. Buyer understands DiaMart's promise: fast delivery, safe transactions, and clear USD pricing.
3. Buyer searches or reviews the Grow a Garden 2 context.
4. Buyer filters by Pets, Seeds, or Gear.
5. Buyer selects the active game card to open the Grow a Garden 2 catalog.
6. Buyer switches between Trending, Pets, Seeds, and Gear catalog tabs.
7. Buyer opens product details freely.
8. Buyer is prompted to login/register when attempting cart or order actions.
9. Buyer can read delivery expectations, proof information, FAQ, or open Discord/Telegram support.

## Section Order

1. Announcement bar.
2. Header.
3. Search.
4. Hero section.
5. Grow a Garden 2 game selection card.
6. Catalog tabs: Trending, Pets, Seeds, Gear.
7. Product shelf for the selected tab.
8. Login/register gate for cart and order actions.
9. Fast and safe delivery explanation.
10. How DiaMart works.
11. Delivery proof or verified delivery section.
12. FAQ.
13. Discord-first support entry.
14. Footer.

## Desktop Wireframe

```text
+------------------------------------------------------------------------------+
| Announcement: Fast delivery planning notice / Discord support entry          |
+------------------------------------------------------------------------------+
| DiaMart  Shop  Delivery proof  Support  FAQ      [Search]  [Cart]  [Menu]   |
+------------------------------------------------------------------------------+
| Search products in Grow a Garden 2                                           |
| [ Search pets, seeds, or gear...                                      ]      |
+------------------------------------------------------------------------------+
| Compact hero: Fast Roblox item delivery, clear prices, safer transactions    |
| [Shop Grow a Garden 2] [How delivery works]     Trust chips / cart preview   |
+------------------------------------------------------------------------------+
| Grow a Garden 2 storefront context                                           |
| Active game card + short delivery/pricing notes + category shortcuts         |
+------------------------------------------------------------------------------+
| Categories: [All] [Pets] [Seeds] [Gear]                                      |
+------------------------------------------------------------------------------+
| Featured products                                              [View all]     |
| [Product] [Product] [Product] [Product] [Product]                            |
+------------------------------------------------------------------------------+
| Popular products                                               [View all]     |
| [Product] [Product] [Product] [Product] [Product]                            |
+------------------------------------------------------------------------------+
| Fast and safe delivery                                                       |
| [Delivery speed] [Transaction safety] [Clear USD pricing]                    |
+------------------------------------------------------------------------------+
| How DiaMart works: Find item -> Add to cart -> Confirm later -> Support      |
+------------------------------------------------------------------------------+
| Verified delivery proof plan                                                 |
| [Sample proof card clearly marked demo in preview contexts]                  |
+------------------------------------------------------------------------------+
| FAQ                                                                          |
+------------------------------------------------------------------------------+
| Discord-first support entry                                                  |
+------------------------------------------------------------------------------+
| Footer with links, policies, and Roblox non-affiliation disclaimer           |
+------------------------------------------------------------------------------+
```

## Mobile Wireframe

```text
+------------------------------+
| Announcement                  |
+------------------------------+
| DiaMart        Search Cart M  |
+------------------------------+
| Search field                  |
+------------------------------+
| Compact hero                  |
| Promise copy                  |
| [Shop now]                    |
| [Delivery info]               |
+------------------------------+
| Grow a Garden 2 context       |
+------------------------------+
| Categories scroll: All Pets...|
+------------------------------+
| Featured products             |
| <horizontal cards>            |
+------------------------------+
| Popular products              |
| <horizontal cards>            |
+------------------------------+
| Fast and safe delivery cards  |
+------------------------------+
| How it works                  |
+------------------------------+
| Delivery proof plan           |
+------------------------------+
| FAQ                           |
+------------------------------+
| Discord support entry         |
+------------------------------+
| Footer                        |
+------------------------------+
```

## Component Tree

```text
HomePage
|- AnnouncementBar
|- Header
|  |- SearchBar compact trigger
|  |- CartButton
|  |- MobileNavigation
|- SearchBar
|- HeroSection
|- GameContextPanel
|- CategoryNav
|- ProductShelf: Featured products
|  |- SectionHeader
|  |- ProductCard[]
|- ProductShelf: Popular products
|  |- SectionHeader
|  |- ProductCard[]
|- TrustExplainer
|- HowItWorks
|- DeliveryProofSection
|- FAQSection
|- SupportEntry
|- Footer
|- CartDrawer
|- DeliveryProofPopup optional
```

## Reusable Components

- `AnnouncementBar`: reusable across storefront pages.
- `Header`: global layout component.
- `MobileNavigation`: global mobile navigation component.
- `SearchBar`: reusable for storefront search and future catalog pages.
- `CategoryNav`: reusable for product category filtering.
- `SectionHeader`: reusable when shelves share title/action structure.
- `ProductShelf`: reusable for featured, popular, and future category shelves.
- `ProductCard`: core marketplace card.
- `CartDrawer`: reusable checkout entry surface.
- `SupportEntry`: reusable support CTA block.
- `FAQSection`: reusable support and content section.
- `Footer`: global layout component.

Single-use sections such as `HeroSection`, `GameContextPanel`, `TrustExplainer`, `HowItWorks`, and `DeliveryProofSection` can start as home feature components unless reuse becomes clear.

## Important Component Props

### ProductCard

```ts
type ProductCardProps = {
  product: MockProduct;
  showGameName?: boolean;
  onAddToCart?: (productId: string) => void;
  viewDetailsHref?: string;
};
```

Product card may show:

- Product image.
- Product name.
- Game name.
- Item category.
- Current USD price.
- Original USD price when relevant.
- Discount badge when valid.
- Stock status.
- Estimated delivery speed.
- Add-to-cart action.
- View-details action when appropriate.

### ProductShelf

```ts
type ProductShelfProps = {
  title: string;
  description?: string;
  products: MockProduct[];
  layout?: "grid" | "horizontal";
  emptyMessage: string;
};
```

### SearchBar

```ts
type SearchBarProps = {
  value: string;
  placeholder: string;
  suggestions: SearchSuggestion[];
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
};
```

### CategoryNav

```ts
type CategoryNavProps = {
  categories: ItemCategory[];
  activeCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
};
```

### CartDrawer

```ts
type CartDrawerProps = {
  isOpen: boolean;
  items: CartLineItem[];
  checkoutStatus: "mock" | "coming-soon" | "unavailable";
  onClose: () => void;
  onProceedToCart: () => void;
};
```

### DeliveryProofPopup

```ts
type DeliveryProofPopupProps = {
  event: DeliveryProofEvent;
  isDemo: boolean;
  onDismiss: () => void;
};
```

### SupportEntry

```ts
type SupportEntryProps = {
  title: string;
  description: string;
  discordHref?: string;
  disabled?: boolean;
};
```

## Mock Data Requirements

Mock data should live in a dedicated file during implementation, such as `src/features/home/mock-data.ts`. Mock types can live in `src/features/home/types.ts`. Do not hardcode long product lists directly in JSX.

```ts
type ItemCategory = {
  id: "all" | "pets" | "seeds" | "gear";
  label: string;
  description?: string;
};

type MockGame = {
  id: string;
  name: "Grow a Garden 2";
  slug: "grow-a-garden-2";
  image: ImageRef;
  description: string;
  active: true;
};

type StockStatus = "in-stock" | "low-stock" | "out-of-stock" | "coming-soon";

type MockProduct = {
  id: string;
  name: string;
  slug: string;
  game: MockGame;
  category: ItemCategory;
  image: ImageRef;
  priceUsd: number;
  originalPriceUsd?: number;
  stockStatus: StockStatus;
  deliverySpeed: string;
  badge?: "featured" | "popular" | "new" | "discount";
  featured: boolean;
  description?: string;
};

type ImageRef = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};
```

Initial mock content:

- One active game: Grow a Garden 2.
- Categories: All, Pets, Seeds, Gear.
- 8-12 mock products total across categories.
- 4-6 featured products.
- 4-8 popular products.
- 3 trust explanation cards.
- 3-4 how-it-works steps.
- 5-7 FAQ items.
- Support entry content pointing to Discord-first support.

USD formatting requirement:

- Use a shared formatter such as `Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })` during implementation.
- Do not store preformatted `priceLabel` strings as the primary price source in mock product data.

## Loading State

- Search loads immediately with local mock data; if delayed later, show a compact input skeleton.
- Product shelves show fixed-size skeleton product cards.
- Category navigation shows skeleton pills.
- Cart drawer can show a short loading row if cart state is being initialized.

## Empty State

- Search: `No matching items yet.`
- Category: `No items in this category yet.`
- Featured products: `Featured items are being prepared.`
- Cart drawer: `Your cart is empty.`
- Empty states should include a route back to all Grow a Garden 2 items.

## Error State

- Mock data errors should be rare. If product data cannot render, show `We could not load this shelf.`
- Cart drawer errors should not fake payment processing. Use copy such as `Checkout is not available in this preview.`
- Support errors should direct users to Discord once a real support URL exists.

## Success State

- Selecting a category updates visible product shelves.
- Searching filters products or opens suggestions.
- Add-to-cart opens or updates the cart drawer.
- Cart drawer shows item, quantity, subtotal in USD, and a clear checkout-unavailable or coming-soon message.

## Responsive Behavior

Desktop:

- Use a clean centered content container.
- Use product grids with four or five product cards per row depending on available width.
- Keep search visible near the top.
- Keep category navigation close to product shelves.

Tablet:

- Use two or three product cards per row.
- Use compact navigation.
- Keep filters accessible without taking over the page.

Mobile:

- Use a compact header.
- Search remains easy to access.
- Category navigation may scroll horizontally.
- Product shelves may scroll horizontally when appropriate.
- Touch targets must be at least 44px where practical.
- Cart and support actions remain easy to reach.
- No whole-page horizontal overflow.

## Accessibility

- Use semantic `header`, `main`, `section`, `nav`, and `footer` landmarks.
- The first search input should have a visible label or accessible label.
- Product cards should expose product name, game, category, price, stock status, and delivery speed to assistive technology.
- Add-to-cart buttons must be keyboard accessible.
- Cart drawer must manage focus when opened and return focus when closed.
- Category navigation must expose selected state.
- Discount badges must not rely on color alone.
- Delivery proof samples in preview must be labeled as demo/sample content.
- Do not show personal customer information.

## Database Impact

No database impact.

- Do not create Supabase migrations.
- Do not create database tables.
- Do not connect Supabase.
- Do not edit generated database types.
- Mock types are UI contracts only.

## Architecture Impact

No documented system-flow change for this planning task. `docs/architecture.md` does not need an update.

Future implementation should follow the existing architecture rule that UI components do not own important business logic. Future Supabase queries should live in a service or data-access layer, not directly inside UI components.

## Future Integration Notes

- Product and proof images will later be uploaded through the database and storage system.
- Image rendering should accept both local placeholders and future remote URLs.
- Admin tooling should later create games, categories, items, images, USD prices, stock status, and featured flags.
- Real checkout will require a separate payment and order-flow design.
- Real delivery proof must only use successful delivered orders.
- Discord ticket creation requires a future integration plan and should not be mocked as real.

## Files Created Or Modified

Implemented storefront files:

- `src/app/page.tsx`
- `src/app/cart/page.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/config/site.ts`
- `src/features/storefront/home-page.tsx`
- `src/features/storefront/cart-page-client.tsx`
- `src/features/storefront/types.ts`
- `src/features/storefront/mock-data.ts`
- `src/features/storefront/cart-storage.ts`
- `src/features/storefront/components/cart-drawer.tsx`
- `src/features/storefront/components/delivery-proof-popup.tsx`
- `src/features/storefront/components/product-artwork.tsx`
- `src/features/storefront/components/product-card.tsx`
- `src/features/storefront/components/product-detail-modal.tsx`
- `src/features/storefront/components/section-header.tsx`
- `src/features/storefront/components/support-widget.tsx`
- `src/lib/utils/format-money.ts`

Documentation files related to this plan:

- `docs/project-overview.md`
- `docs/ui-components.md`
- `docs/ui/pages/support-widget.md`
- `docs/ui/pages/delivery-proof-popup.md`

## Testable Acceptance Criteria

- All user-facing copy in the planned UI is English.
- Header, search, and compact hero are visible before product sections.
- Hero does not take most of the first viewport.
- Grow a Garden 2 is the only active game in mock data.
- Category navigation supports Pets, Seeds, and Gear.
- Product cards show image, name, game, category, USD price, stock status, delivery speed, add-to-cart action, and view-details action when appropriate.
- Prices are formatted through a shared USD formatter.
- Featured and popular shelves use mock data from a dedicated file.
- Cart drawer clearly marks checkout as mock, coming soon, or unavailable.
- No fake payment processing is represented.
- Delivery proof areas do not present synthetic events as real production orders.
- Discord-first support entry is visible.
- Mobile view has no whole-page horizontal overflow.
- No PetMart assets, copy, branding, or pixel-level layout is copied.
- No Supabase migration, schema, storage integration, payment integration, Discord integration, commit, push, or merge occurs.

## Open Questions

- What is the exact public Discord support URL?
- The first cart page now exists as a non-checkout preview page. Confirm whether it should remain visible before real checkout work starts.
- Which original placeholder image style should DiaMart use for products: minimal 3D objects, clean icons, or neutral framed item silhouettes?
- What refund or issue-resolution policy should be shown once business rules are confirmed?
- Should product detail pages be part of the first implementation or deferred until after the home storefront?
