# PetMart Reference Analysis

## Scope

This document analyzes the available PetMart reference screenshots in `docs/ui/references/petmart/` for marketplace UI patterns only. It does not copy PetMart source code, branding, logo, imagery, copy, or pixel-level layout.

Observed screenshots:

- `home-page-desktop.png`
- `main-ui -mobile.PNG`
- `select-game-nav-bar-desktop.png`
- `select-game-category-mobile.PNG`
- `top-item-buy.PNG`
- `shopnow.PNG`
- `why-choose-pet-mart.PNG`
- `random-live-popup.png`
- `popup-stock-alert.PNG`
- `live-chat-desktop.png`
- `join comnunity-mobile.PNG`
- `footer-web-mobile.PNG`

## Reference Website Goal

The reference website presents itself as a Roblox item marketplace. The supplied screenshots emphasize fast delivery, proof of delivery, support access, game selection, product shelves, and visible cart entry points.

## Home-To-Product Flow

The observed flow is:

1. A top header exposes game selection, proof/status links, support/community links, currency, cart, and login on desktop.
2. The hero introduces the marketplace promise and offers primary shopping and proof-related CTAs.
3. Users are guided to select a game before browsing catalog items.
4. Product discovery continues through best-seller shelves and game-specific top picks.
5. Later sections reinforce trust with proof of delivery, delivery speed, payment safety, support, community, and FAQ-style entry points.
6. A final CTA invites the user to start shopping or read FAQ before the footer.

## Navigation Structure

Desktop navigation observed:

- Brand at left.
- A prominent game-selection trigger near the brand.
- Links for proofs, status, tutorial, FAQ, and Discord.
- Currency selector, cart button, and login button on the right.
- Some nav links show live/status badges.

Mobile navigation observed:

- Compact header with brand, currency button, cart button, and menu trigger.
- A top announcement or status strip appears above the mobile header in at least one screenshot.
- Game selection becomes a two-column card grid below the hero instead of a desktop dropdown.

## Main Sections Observed

- Announcement or operational status strip.
- Header/navigation.
- Hero with trust badge, headline, supporting copy, CTAs, and trust metrics.
- Floating recent purchase or proof notification.
- Floating chat launcher.
- Game selection grid or dropdown.
- Site-wide best sellers product shelf.
- Game-specific product picks with horizontal game tabs.
- Trust section explaining proof of delivery, delivery speed, secure payments, and support.
- Community CTA and proof CTA cards.
- Final shopping/FAQ CTA.
- Footer with brand description, Discord CTA, navigation columns, policy links, affiliate links, copyright, and Roblox non-affiliation disclaimer.

## Product Card Pattern

Product cards observed in shelves include:

- Large item image occupying the upper portion of the card.
- Product title below the image.
- Price shown prominently in green.
- Sold count with a small icon.
- Ranking badge for best sellers, such as `#1`, `#2`, and `#3`.
- Dark card background, subtle border, and rounded corners.

The screenshots do not show product detail pages, quantity controls, variant selection, explicit add-to-cart buttons inside cards, or checkout forms.

## Price And CTA Presentation

Price presentation observed:

- Prices are shown in USD format, such as `$2.49`, `$3.49`, and `$5.99`.
- The selected currency appears in the header as a compact selector.
- Cart is a highly visible icon button.

CTA presentation observed:

- Primary CTAs use a bright filled pill button.
- Secondary CTAs use dark or outlined buttons.
- Product shelves appear optimized for clicking product cards.
- Header cart, hero shopping CTA, proof-log links, final CTA, Discord CTA, and chat launcher are the main checkout/support entry points observed.

## Trust Signals

Observed trust signals include:

- Hero proof or delivery badge.
- Metrics for orders delivered, happy customers, and buyer rating.
- Proof log CTA.
- Delivery proof card that says orders are photographed and logged publicly.
- Delivery speed claim.
- Secure payment claim.
- Support availability claim.
- Live status/proof labels in navigation.
- Recent purchase popup with item name, amount, and relative time.
- Chat assistant with popular questions and live-agent entry.
- Footer disclaimer that the marketplace is not affiliated with or endorsed by Roblox Corporation.

## Purchase Process Explanation

The process is introduced through short CTA copy rather than a detailed checkout walkthrough in the screenshots:

- Pick a game.
- Choose items.
- Receive items after purchase.
- Delivery is backed by proof of delivery.

The screenshots do not show the full checkout flow, order confirmation page, delivery instructions form, or account flow.

## Responsive Pattern Observed

Desktop:

- Header uses a horizontal navigation layout.
- Game selection can appear as a dropdown panel with a two-column game list.
- Hero uses a two-column composition with copy on the left and proof/delivery visual on the right.
- Product shelves can span horizontally.

Mobile:

- Header collapses to brand, currency, cart, and menu trigger.
- Hero becomes single-column with stacked CTAs.
- Trust metrics remain visible in a row.
- Game cards render as a two-column grid.
- Product shelves scroll horizontally.
- Floating chat remains fixed near the lower-right area.
- Footer navigation becomes compact two-column link groups.

## Applicable Ideas For DiaMart

- Lead with a clear promise around fast and safe Roblox item delivery.
- Keep game selection as a primary product-discovery decision, while showing Grow a Garden 2 as the only active initial game.
- Use item categories after game context so the storefront does not feel empty with one active game.
- Separate featured products from popular or best-selling products.
- Give product cards a consistent hierarchy: image, name, game, category, USD price, stock status, delivery speed, and actions.
- Add support and proof-of-delivery entry points without making unsupported production claims.
- Make mobile product browsing easy through compact search, horizontal category navigation, and accessible cart/support entry points.
- Include Roblox non-affiliation language in the footer.

## Ideas DiaMart Should Not Copy

- PetMart logo, name, icons, game thumbnails, item artwork, screenshots, and copy.
- Exact color palette, spacing, typography, component proportions, or page composition.
- Pixel-level hero composition and card styling.
- Live purchase popups or proof claims unless DiaMart can support them truthfully.
- Fake order counts, review counts, stock pressure, false urgency, or fabricated delivery proof.
- The same product names or game list as default content unless DiaMart has permission and a real catalog reason.
- A large list of future games before admin tooling or real catalog management exists.

## DiaMart-Specific Direction From This Analysis

- DiaMart should be premium, polished, trustworthy, fast, clean, and modern.
- DiaMart should prioritize speed and safety before price.
- DiaMart should use English across the website.
- DiaMart should display USD only in the initial UI phase.
- DiaMart should use Grow a Garden 2 as the only active mock game.
- DiaMart should plan delivery proof carefully with clear sample/demo labeling in non-production contexts.
- DiaMart should prioritize Discord-first support in the initial support plan.

## Unverified Details

- Actual checkout flow and checkout fields.
- Product detail page structure.
- Cart drawer or cart page behavior.
- Account/login behavior.
- Search behavior.
- Real proof-log implementation.
- Payment providers available at checkout.
- Delivery automation mechanics.
- Exact desktop behavior below the fold outside the supplied screenshots.
- Accessibility behavior, keyboard navigation, and focus states.
- Animation timing and interaction details beyond the static screenshots.
