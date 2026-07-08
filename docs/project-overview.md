# DiaMart - Project Overview

## Confirmed Facts

- Project name: DiaMart.
- Product type: multi-game Roblox item marketplace.
- Supported games in the current UI: Grow a Garden 2, Blox Fruits, Adopt Me, Murder Mystery 2, and Grand Piece Online (GPO).
- Each game has its own store page at `/games/[slug]` with items specific to that game.
- The home page shows best-selling and trending items across all games.
- Planned payment methods: multiple options, with Stripe and crypto as the primary planned methods.
- Support channels: Discord ticket (`https://discord.gg/DrZDg3gPuS`) and direct Telegram admin (`https://t.me/tuandarcy`).
- Delivery model: orders are created automatically in Discord, with delivery from about 5 minutes up to 1 hour.
- Initial storefront language: English.
- Hosting: Vercel.
- Application framework: Next.js App Router with TypeScript and Tailwind CSS.
- Planned database: Supabase PostgreSQL.
- Planned authentication: Supabase Auth.
- Planned storage: Supabase Storage when image upload is introduced.
- Source control: GitHub.
- Diagram format: Mermaid.
- Current branch for UI planning: `feature/taolapUI`.

## Product Direction

DiaMart is a clean, premium, and trustworthy Roblox item marketplace focused on fast delivery, safe transactions, and clear USD pricing. The main positioning direction is fast, safe, and reliable game item delivery, with speed and safety taking priority before price.

The interface should feel professional and valuable while remaining easy to understand. It should not feel childish, cluttered, overly luxurious, aggressively esports-styled, visually casual, or unfinished.

## Core Promise

DiaMart should primarily communicate:

1. Fastest delivery.
2. Safe and reliable transactions.
3. Clear and competitive pricing.

Production UI must avoid unsupported claims. Fake order counts, fake review counts, fake stock pressure, fabricated urgency, and fabricated delivery proof are not allowed.

## Initial Scope

The initial UI phase is storefront planning only.

- Use mock data.
- Use English for all user-facing content.
- Display prices in USD only.
- Use Grow a Garden 2 as the only active mock game.
- Use item categories that fit the Grow a Garden 2 mock storefront, such as Pets, Seeds, and Gear.
- Keep mock data in dedicated files during implementation.
- Treat mock types as UI contracts, not final Supabase schema.
- Use local neutral placeholders or original project placeholders for images.
- Keep image rendering compatible with remote URLs later.

## Out Of Scope For The Current Backend Phase

- Real payment processing.
- Payment provider integration.
- Real checkout processing.
- Real Discord ticket integration.
- Real support bot backend.
- Staff or contributor dashboard implementation.
- Live website chat backend.

## Initial Game And Catalog Direction

The first active mock game is Grow a Garden 2. It should be presented as a focused storefront context rather than as one item in a long empty game list.

Products belong to a game and have an item category. Initial UI-level product fields may include:

- `id`
- `name`
- `slug`
- `game`
- `category`
- `image`
- `priceUsd`
- `originalPriceUsd`, optional
- `stockStatus`
- `deliverySpeed`
- `badge`, optional
- `featured`
- `description`, optional

These fields are for UI planning and mock data only. They are not the final database schema.

## Currency Direction

The storefront displays USD prices only. Formatting examples:

- `$0.99`
- `$4.50`
- `$12.00`

Implementation should use one consistent USD money formatter instead of manually concatenating strings throughout components. VND, Robux-equivalent pricing, and multiple currencies are out of scope for the first UI phase.

## Checkout Direction

Initial checkout assumption:

- Add-to-cart actions open or update a cart drawer.
- Users can proceed from the cart drawer to a dedicated cart page.
- Real payment and checkout processing are not implemented during the initial UI phase.
- Checkout actions must be clearly marked as unavailable, coming soon, or represented as a safe mock flow.
- The UI must not create fake payment processing.

This is an implementation assumption and can be changed later.

## Delivery Proof Direction

DiaMart is expected to support proof of delivery later. Planned UI may include a subtle delivery notification popup and a verified delivery section with optional proof image, item name, item category, delivery status, relative time, and anonymized customer identifier.

Integrity rules:

- Do not present fabricated orders as real customer deliveries.
- Development and preview environments may use synthetic sample events only when clearly marked as demo or sample data.
- Production social proof must come only from real, successfully delivered orders.
- Do not display personal customer information.
- Anonymize usernames where appropriate.
- Proof images will be uploaded later.
- Do not connect this feature to Supabase during the initial UI phase.

## Support Direction

Initial support strategy prioritizes Discord.

Planned flow:

1. The user opens the support widget.
2. A bot-style UI presents common troubleshooting options.
3. The UI attempts to identify the issue through safe mock interactions.
4. If unresolved, the user is guided toward live support.
5. The live-agent action creates or directs the user to a Discord ticket in future implementation.
6. Discord is the preferred escalation channel.

The initial UI phase documents the support experience only. It does not implement a real bot, ticket integration, live website chat backend, or Discord API integration.

## Future Admin Direction

The future admin dashboard should allow administrators to:

- Create a game.
- Select an item category.
- Create or edit an item.
- Upload an item image.
- Set the USD price.
- Set stock status.
- Mark an item as featured.

This is future scope only and should not be implemented during the initial UI phase.

## Current Application State

- Storefront routes now read primary catalog data from Supabase tables through a service layer in `src/services`.
- A Supabase migration now defines storefront games, categories, products, FAQs, and support topics.
- Admin dashboard is now available at `/admin` with protected login and CRUD operations for storefront catalog data.
- Supabase Storage image upload is available for admins, while direct image URL input remains supported.
- Decorative proof-of-delivery popups remain synthetic sample data for UI polish.
- Cart and checkout still run in preview mode, and payment flow is not active yet.
- Generated database types are still placeholders and need regeneration from Supabase after applying migrations.
- No real payment backend, delivery-proof backend, or support bot backend exists.

The UI uses English copy, USD pricing, and keeps checkout and decorative social proof in clearly marked preview behavior.

## Documentation References

- Home page UI plan: `docs/ui/pages/home.md`.
- Support widget UI plan: `docs/ui/pages/support-widget.md`.
- Delivery proof popup UI plan: `docs/ui/pages/delivery-proof-popup.md`.
- PetMart reference analysis: `docs/ui/references/petmart-analysis.md`.
- UI component planning: `docs/ui-components.md`.
