# UI Components

## Multi-Game Layout Components (Implemented)

- `SiteHeader` (`src/features/storefront/components/site-header.tsx`): shared header with brand, main nav (Games, Trending, Delivery proof, FAQ), cart button, login link, and a mobile-only hamburger menu. The hamburger only renders the mobile navigation and is hidden on desktop.
- `SiteFooter` (`src/features/storefront/components/site-footer.tsx`): shared footer with the marketplace description, store links, and Discord/Telegram support links. It does not include login/register links.
- `AuthPrompt` (`src/features/storefront/components/auth-prompt.tsx`): modal shown when an unauthenticated user tries a cart/order action, linking to `/login` and `/register`.
- `GameCarousel` (`src/features/storefront/components/game-carousel.tsx`): Telegram-style stacked game cards that auto-rotate and can be swiped manually; the front card links to `/games/[slug]`.
- `ProductMarquee` (`src/features/storefront/components/product-marquee.tsx`): a slow, infinite horizontal carousel (carousel-horse style) used for best-seller and trending items across games. Cards link to the matching game store.
- `HomePage` (`src/features/storefront/home-page.tsx`): the home composition (hero, game carousel, best-seller/trending marquees, trust, process, delivery proof, FAQ, support, footer).
- `GamePageClient` (`src/features/storefront/game-page-client.tsx`) with route `src/app/games/[slug]/page.tsx`: per-game store page with a game hero, category tabs, and a product grid. Add-to-cart requires login.

## Principles

- User-facing website content must be written in English.
- UI components must not contain important business logic.
- Prefer focused components with clear responsibilities.
- Do not create reusable abstractions only to split a file.
- Reuse components when they are used in multiple places, define a major layout surface, or represent an important feature surface.
- Product, checkout, support, and delivery-proof UI must not make unsupported production claims.
- Mock data and mock types are UI contracts only, not final Supabase schema.

## Design System Direction

DiaMart should feel premium, dark, powerful, modern, slightly aggressive, clean, and trustworthy. The design should suit a game-item marketplace without becoming childish, neon-heavy, cheap, cluttered, or a generic esports template.

### Font System

- Headings, logo, section titles, product names, and important promotional text should use Bricolage Grotesque.
- Body text, navigation, descriptions, labels, metadata, FAQ copy, and support copy should use Fira Sans Regular.
- Buttons, prices, badges, strong labels, and important popup content should use Fira Sans Bold.
- The implementation defines reusable font variables in `src/app/globals.css`: `--font-heading`, `--font-body`, and `--font-strong`.
- The requested local files `BricolageGrotesque.woff2`, `FiraSans-Regular.woff2`, and `FiraSans-Bold.woff2` are not currently present in the repository outside `node_modules`. The UI uses safe fallbacks through the same variables until the files are added and wired with `next/font/local`.

### Color Roles

- Background: black and deep charcoal.
- Surfaces: dark charcoal with controlled purple/red elevation.
- Primary action: purple-to-magenta-to-dark-red gradient.
- Information and support: controlled purple and fuchsia.
- Success: green only for true success states.
- Warning: amber.
- Error: red.
- Text: high-contrast purple-white with muted lavender-gray secondary levels.

### Core Tokens

- `background`: `#07070A`.
- `backgroundElevated`: `#0D0D12`.
- `surface`: `#121219`.
- `surfaceElevated`: `#181821`.
- `surfaceInteractive`: `#1E1826`.
- `border`: `rgba(168, 85, 247, 0.22)`.
- `borderStrong`: `rgba(239, 68, 68, 0.35)`.
- `primary`: `#8B5CF6`.
- `primaryHover`: `#7C3AED`.
- `magenta`: `#C026D3`.
- `red`: `#EF4444`.
- `redDark`: `#991B1B`.
- `success`: `#22C55E`.
- `warning`: `#F59E0B`.
- `error`: `#EF4444`.
- `textPrimary`: `#F7F4FF`.
- `textSecondary`: `#AAA4B5`.
- `textMuted`: `#777181`.

### Radius Scale

- `xs`: 6px.
- `sm`: 10px.
- `md`: 14px.
- `lg`: 18px.
- `pill`: 999px.

### Shadow Scale

- `sm`: subtle product-card lift.
- `md`: cart drawer and floating support surfaces.
- `focus`: visible emerald focus ring.
- Entrance motion uses subtle top-down fade utilities in `src/app/globals.css`: `entrance-rise`, `entrance-soft`, and delay helpers. Page content starts about 18px above its final position, fades in, and slides gently down. Motion respects `prefers-reduced-motion`.
- Delivery proof popup motion uses `proof-popup-enter`, `proof-popup-exit`, and `proof-progress`: the popup starts outside the right edge, slides left while fading in, shows a progress bar, then fades and slides out to the right.
- The purple theme now uses mint/cyan as the friendly highlight accent for active controls, live status, proof progress, and important hero emphasis. Decorative red is avoided except for true error states.
- Header live badges use a compact pulsing dot treatment for proof/status links without copying the reference navigation pixel-for-pixel.

### Spacing Scale

- Base unit: 4px.
- Common steps: 8, 12, 16, 20, 24, 32, 40, 56, 72.
- Main content max width: 1200px.
- Product grid max width: 1280px.

### Typography

- Display: compact and confident, 44-56px desktop and 34-40px mobile.
- Section heading: 24-30px desktop and 22-26px mobile.
- Body: 15-17px.
- Product title: 15-17px semibold.
- Metadata: 13-14px.
- Price: 18-22px semibold.

## Implemented UI Primitives

### Button

Implemented variants through shared CSS classes in `src/app/globals.css`:

- `primary`: main shopping actions such as `Add to cart`.
- `secondary`: details, delivery info, and support actions.
- `ghost`: navigation and low-emphasis actions.
- `icon`: cart, search, menu, close, support.
- `disabled`: coming-soon or unavailable actions with clear helper text.

### Badge

Planned variants:

- Category.
- Featured.
- Discount.
- Stock status.
- Demo/sample.
- Coming soon.

Badges should be limited to useful information. Avoid excessive badge stacking.

### Input

Inputs should use dark elevated surfaces, visible borders, clear labels, accessible descriptions when needed, and strong focus states.

### SearchBar

Search is implemented inside `src/features/storefront/storefront-app.tsx`. It supports product name, category, and game-name matching for Grow a Garden 2 mock data. The result count appears only after the buyer types, and the placeholder uses a typewriter effect that rotates through product names.

### ProductImage

Product image rendering is implemented in `src/features/storefront/components/product-artwork.tsx`. It uses local CSS-based placeholders now and can render remote-compatible URLs later. It does not use PetMart assets and does not define a final image database schema.

## Implemented Layout Components

### AnnouncementBar

Implemented inside `src/features/storefront/storefront-app.tsx` as a compact top message for delivery, security, and Discord support. It does not create false urgency.

### Header

Implemented inside `src/features/storefront/storefront-app.tsx` with brand, shopping links, search access, cart entry, support access, and mobile menu trigger.

### MobileNavigation

Implemented as a compact mobile navigation panel inside `src/features/storefront/storefront-app.tsx`.

### Footer

Implemented inside `src/features/storefront/storefront-app.tsx` with navigation groups, support labels, policy placeholders, and Roblox non-affiliation disclaimer.

### CartDrawer

Implemented in `src/features/storefront/components/cart-drawer.tsx`. It opens from add-to-cart actions, stores preview items locally, and clearly marks checkout as coming soon. It does not simulate payment processing.

## Implemented Feature Components

### GameContextPanel

Implemented inside `src/features/storefront/storefront-app.tsx` for the active Grow a Garden 2 storefront context. The mock data structure can accept additional games later without displaying a large future catalog now.

### CategoryNav

Implemented inside `src/features/storefront/storefront-app.tsx` for All, Pets, Seeds, and Gear. It supports horizontal scrolling on mobile and selected-state accessibility.

### ProductShelf

Implemented inside `src/features/storefront/storefront-app.tsx` for featured and popular products. It owns empty states for filtered/search results.

### ProductCard

Implemented in `src/features/storefront/components/product-card.tsx`. The core marketplace card shows:

- Product image.
- Product name.
- Game name.
- Item category.
- Current USD price.
- Original USD price when relevant.
- Discount badge when valid.
- Stock status and quantity when available.
- Estimated delivery speed.
- Add-to-cart action.
- View-details action when appropriate.

Prices are formatted with `src/lib/utils/format-money.ts`.

### HeroSection

Implemented inside `src/features/storefront/storefront-app.tsx` as a compact value proposition section that keeps shopping/search visible early.

### TrustExplainer

Implemented inside `src/features/storefront/storefront-app.tsx` with no fake metrics.

### HowItWorks

Implemented inside `src/features/storefront/storefront-app.tsx` as a four-step section.

### DeliveryProofSection

Implemented inside `src/features/storefront/storefront-app.tsx`. Preview/sample events are clearly labeled and do not represent real deliveries.

### DeliveryProofPopup

Implemented in `src/features/storefront/components/delivery-proof-popup.tsx`. It is development/preview-only, delayed, dismissible, non-disruptive, and hidden in production builds while only mock proof events exist.

### SupportWidget

Implemented in `src/features/storefront/components/support-widget.tsx`. It routes common support topics, presents Discord-first escalation through `https://discord.gg/DrZDg3gPuS`, and includes direct Telegram admin support through `https://t.me/tuandarcy`. It does not implement a real bot, live chat backend, or Discord ticket integration.

### Auth Pages

Implemented in `src/features/auth/auth-page.tsx` with routes `src/app/login/page.tsx` and `src/app/register/page.tsx`. Browsing is public, while cart/order-start actions prompt users to login or register. Account access is visually prepared but not connected to authentication yet.

### Catalog Tabs

Implemented inside `src/features/storefront/storefront-app.tsx`. The Grow a Garden 2 catalog supports Trending, Pets, Seeds, and Gear tabs. The active game card scrolls users into the catalog.

### FAQSection

Implemented inside `src/features/storefront/storefront-app.tsx` as direct question-and-answer cards so answers are visible without expanding disclosures.

## Utility Components And Helpers

### USD Money Formatter

Implemented in `src/lib/utils/format-money.ts` with `Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })`. Product data stores numeric `priceUsd` values rather than primary preformatted price strings.

### ProductDetailModal

Implemented in `src/features/storefront/components/product-detail-modal.tsx`. It provides a lightweight accessible modal with product image, name, category, price, delivery estimate, stock state, description, quantity controls, and add-to-cart action.

### CartPageClient

Implemented in `src/features/storefront/cart-page-client.tsx` and routed through `src/app/cart/page.tsx`. It reads the same local cart storage as the drawer and keeps checkout clearly unavailable in preview.

## Documentation Links

- Home page plan: `docs/ui/pages/home.md`.
- Support widget plan: `docs/ui/pages/support-widget.md`.
- Delivery proof popup plan: `docs/ui/pages/delivery-proof-popup.md`.
- Reference analysis: `docs/ui/references/petmart-analysis.md`.

## Update Rules

Update this document when:

- A component becomes reused across pages.
- A component becomes a major layout surface.
- A component becomes an important feature surface.
- A design system token or rule is accepted for implementation.

Do not update this document for one-off internal markup that has no reuse or architectural importance.
