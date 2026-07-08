# Game Store Page UI Plan

## Status

Implemented.

## Route

`/games/[slug]` — statically generated for each active game via `generateStaticParams`.

## Purpose

Each game store page shows the items available for a single Roblox game so buyers can shop within one game context.

## Supported Games

- Grow a Garden 2 (`grow-a-garden-2`)
- Blox Fruits (`blox-fruits`)
- Adopt Me (`adopt-me`)
- Murder Mystery 2 (`murder-mystery-2`)
- Grand Piece Online / GPO (`grand-piece-online`)

More games can be added later by extending the `games` and `products` mock data; the UI does not hardcode a permanent game list in JSX.

## Structure

1. Shared header (`SiteHeader`).
2. Game hero (game artwork placeholder, tagline, description, browse/change-game actions).
3. Category tabs derived from the game's own products (for example Pets/Seeds/Gear for Grow a Garden 2, Fruits/Gamepass/Accounts for Blox Fruits).
4. Product grid using `ProductCard`.
5. Shared footer (`SiteFooter`).
6. Support widget and product detail modal.

## Behavior

- Browsing items and viewing details is public.
- Add-to-cart and cart actions open the login/register `AuthPrompt`.
- Product cards show image, game, category, price, discount, highlighted stock (with quantity when available), delivery estimate, and actions.

## Data

- `getGameBySlug`, `getProductsByGame`, and `getCategoriesByGame` in `src/features/storefront/mock-data.ts`.
- Images use local gradient/placeholder art now and can be swapped for uploaded/remote images later.

## Future Integration Notes

- Game artwork and item images will be uploaded and served from storage later.
- Real cart, checkout, and payment (Stripe and crypto planned) are future scope.
- Delivery is coordinated through Discord; support is Discord ticket + Telegram admin.
