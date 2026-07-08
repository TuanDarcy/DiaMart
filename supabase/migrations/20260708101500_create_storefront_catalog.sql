begin;

create table if not exists public.storefront_games (
  id text primary key,
  slug text not null unique,
  name text not null,
  tagline text not null,
  description text not null,
  image_src text,
  image_alt text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.storefront_categories (
  id text primary key,
  label text not null,
  description text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.storefront_products (
  id text primary key,
  slug text not null unique,
  name text not null,
  game_id text not null references public.storefront_games(id) on delete cascade,
  category_id text not null references public.storefront_categories(id),
  image_src text,
  image_alt text,
  price_usd numeric(10,2) not null check (price_usd >= 0),
  original_price_usd numeric(10,2) check (original_price_usd is null or original_price_usd >= price_usd),
  stock_status text not null check (stock_status in ('in-stock', 'low-stock', 'out-of-stock', 'coming-soon')),
  stock_quantity integer check (stock_quantity is null or stock_quantity >= 0),
  delivery_speed text not null,
  badge text check (badge in ('featured', 'popular', 'new', 'discount', 'quick-delivery', 'best-seller')),
  featured boolean not null default false,
  popular boolean not null default false,
  trending boolean not null default false,
  best_seller boolean not null default false,
  description text not null,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.storefront_faqs (
  id text primary key,
  question text not null,
  answer text not null,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.storefront_support_topics (
  id text primary key,
  label text not null,
  description text not null,
  response text not null,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists storefront_games_slug_idx
  on public.storefront_games (slug);

create index if not exists storefront_products_game_sort_idx
  on public.storefront_products (game_id, sort_order);

create index if not exists storefront_products_category_sort_idx
  on public.storefront_products (category_id, sort_order);

create index if not exists storefront_products_flags_idx
  on public.storefront_products (best_seller, trending, featured)
  where is_active = true;

alter table public.storefront_games enable row level security;
alter table public.storefront_categories enable row level security;
alter table public.storefront_products enable row level security;
alter table public.storefront_faqs enable row level security;
alter table public.storefront_support_topics enable row level security;

drop policy if exists "Public can read active storefront games" on public.storefront_games;
create policy "Public can read active storefront games"
  on public.storefront_games
  for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "Public can read active storefront categories" on public.storefront_categories;
create policy "Public can read active storefront categories"
  on public.storefront_categories
  for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "Public can read active storefront products" on public.storefront_products;
create policy "Public can read active storefront products"
  on public.storefront_products
  for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "Public can read active storefront faqs" on public.storefront_faqs;
create policy "Public can read active storefront faqs"
  on public.storefront_faqs
  for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "Public can read active storefront support topics" on public.storefront_support_topics;
create policy "Public can read active storefront support topics"
  on public.storefront_support_topics
  for select
  to anon, authenticated
  using (is_active = true);

grant select on public.storefront_games to anon, authenticated;
grant select on public.storefront_categories to anon, authenticated;
grant select on public.storefront_products to anon, authenticated;
grant select on public.storefront_faqs to anon, authenticated;
grant select on public.storefront_support_topics to anon, authenticated;

insert into public.storefront_games (
  id,
  slug,
  name,
  tagline,
  description,
  image_src,
  image_alt,
  sort_order
)
values
  (
    'grow-a-garden-2',
    'grow-a-garden-2',
    'Grow a Garden 2',
    'Pets, seeds and gear',
    'A curated Grow a Garden 2 store with clear USD pricing and fast handoff coordination.',
    'gradient:grow-a-garden-2',
    'Grow a Garden 2 store artwork',
    1
  ),
  (
    'blox-fruits',
    'blox-fruits',
    'Blox Fruits',
    'Fruits, gamepass and accounts',
    'Blox Fruits catalog with transparent stock labels and reliable delivery support.',
    'gradient:blox-fruits',
    'Blox Fruits store artwork',
    2
  ),
  (
    'adopt-me',
    'adopt-me',
    'Adopt Me',
    'Pets, eggs and rides',
    'Adopt Me pet and egg offers with straightforward pricing and support access.',
    'gradient:adopt-me',
    'Adopt Me store artwork',
    3
  ),
  (
    'murder-mystery-2',
    'murder-mystery-2',
    'Murder Mystery 2',
    'Knives, guns and bundles',
    'MM2 inventory with clear rarity-focused labels and consistent delivery windows.',
    'gradient:murder-mystery-2',
    'Murder Mystery 2 store artwork',
    4
  ),
  (
    'grand-piece-online',
    'grand-piece-online',
    'Grand Piece Online',
    'Fruits, items and accounts',
    'GPO catalog for fruits and bundles with clear prices and low-stock visibility.',
    'gradient:grand-piece-online',
    'Grand Piece Online store artwork',
    5
  )
on conflict (id) do update
set
  slug = excluded.slug,
  name = excluded.name,
  tagline = excluded.tagline,
  description = excluded.description,
  image_src = excluded.image_src,
  image_alt = excluded.image_alt,
  sort_order = excluded.sort_order,
  is_active = true,
  updated_at = timezone('utc', now());

insert into public.storefront_categories (id, label, description, sort_order)
values
  ('pets', 'Pets', 'Companion-focused items for Roblox players.', 1),
  ('seeds', 'Seeds', 'Grow a Garden 2 growth packs and bundles.', 2),
  ('gear', 'Gear', 'Utility and boost items for faster progression.', 3),
  ('fruits', 'Fruits', 'Blox Fruits and GPO fruit items.', 4),
  ('gamepass', 'Gamepass', 'Permanent account upgrades and boosters.', 5),
  ('accounts', 'Accounts', 'Prepared account inventory and progression packs.', 6),
  ('eggs', 'Eggs', 'Adopt Me egg inventory and related bundles.', 7),
  ('rides', 'Rides', 'Ride and mobility upgrades.', 8),
  ('knives', 'Knives', 'MM2 knife inventory.', 9),
  ('guns', 'Guns', 'MM2 gun inventory.', 10),
  ('items', 'Items', 'General-purpose item bundles.', 11)
on conflict (id) do update
set
  label = excluded.label,
  description = excluded.description,
  sort_order = excluded.sort_order,
  is_active = true,
  updated_at = timezone('utc', now());

insert into public.storefront_products (
  id,
  slug,
  name,
  game_id,
  category_id,
  image_src,
  image_alt,
  price_usd,
  original_price_usd,
  stock_status,
  stock_quantity,
  delivery_speed,
  badge,
  featured,
  popular,
  trending,
  best_seller,
  description,
  sort_order
)
values
  (
    'sprout-hare',
    'sprout-hare',
    'Sprout Hare',
    'grow-a-garden-2',
    'pets',
    'placeholder:sprout-hare',
    'Sprout Hare artwork',
    4.50,
    5.25,
    'in-stock',
    24,
    'Estimated 5-10 min',
    'best-seller',
    true,
    true,
    true,
    true,
    'Starter pet pick with quick handoff coordination and clear discount visibility.',
    10
  ),
  (
    'moonlit-corgi',
    'moonlit-corgi',
    'Moonlit Corgi',
    'grow-a-garden-2',
    'pets',
    'placeholder:moonlit-corgi',
    'Moonlit Corgi artwork',
    8.00,
    null,
    'low-stock',
    5,
    'Estimated 10-15 min',
    'popular',
    true,
    true,
    false,
    false,
    'Premium-feeling companion with low-stock visibility for transparent buying decisions.',
    20
  ),
  (
    'aurora-seed-pack',
    'aurora-seed-pack',
    'Aurora Seed Pack',
    'grow-a-garden-2',
    'seeds',
    'placeholder:aurora-seed-pack',
    'Aurora Seed Pack artwork',
    2.99,
    null,
    'in-stock',
    42,
    'Estimated 5-10 min',
    'quick-delivery',
    true,
    true,
    true,
    false,
    'Balanced seed bundle for quick cart building and fast delivery planning.',
    30
  ),
  (
    'crystal-watering-kit',
    'crystal-watering-kit',
    'Crystal Watering Kit',
    'grow-a-garden-2',
    'gear',
    'placeholder:crystal-watering-kit',
    'Crystal Watering Kit artwork',
    6.75,
    7.50,
    'in-stock',
    18,
    'Estimated 10-15 min',
    'discount',
    true,
    false,
    false,
    true,
    'Utility gear with clear discount label and stable stock availability.',
    40
  ),
  (
    'bf-permanent-dragon',
    'permanent-dragon',
    'Permanent Dragon',
    'blox-fruits',
    'fruits',
    'placeholder:permanent-dragon',
    'Permanent Dragon artwork',
    24.99,
    29.99,
    'in-stock',
    7,
    'Estimated 10-20 min',
    'best-seller',
    true,
    true,
    true,
    true,
    'Permanent high-tier fruit with transparent pricing and careful support handoff.',
    50
  ),
  (
    'bf-fruit-notifier',
    'fruit-notifier-gamepass',
    'Fruit Notifier Gamepass',
    'blox-fruits',
    'gamepass',
    'placeholder:fruit-notifier',
    'Fruit Notifier Gamepass artwork',
    3.50,
    null,
    'in-stock',
    35,
    'Estimated 5-10 min',
    'quick-delivery',
    false,
    true,
    true,
    false,
    'Fast utility gamepass option with immediate clarity on stock and pricing.',
    60
  ),
  (
    'am-neon-unicorn',
    'neon-unicorn',
    'Neon Unicorn',
    'adopt-me',
    'pets',
    'placeholder:neon-unicorn',
    'Neon Unicorn artwork',
    14.50,
    17.00,
    'in-stock',
    9,
    'Estimated 10-15 min',
    'best-seller',
    true,
    true,
    true,
    true,
    'Popular Adopt Me pet listing with visible discount and reliable delivery timing.',
    70
  ),
  (
    'am-mega-egg',
    'mega-egg',
    'Mega Egg Bundle',
    'adopt-me',
    'eggs',
    'placeholder:mega-egg',
    'Mega Egg Bundle artwork',
    8.25,
    null,
    'in-stock',
    21,
    'Estimated 10-15 min',
    'quick-delivery',
    false,
    true,
    true,
    false,
    'Egg bundle for players expanding pet collections without hidden pricing.',
    80
  ),
  (
    'mm2-godly-knife',
    'godly-knife',
    'Godly Knife',
    'murder-mystery-2',
    'knives',
    'placeholder:godly-knife',
    'Godly Knife artwork',
    9.99,
    12.00,
    'in-stock',
    14,
    'Estimated 5-15 min',
    'best-seller',
    true,
    true,
    true,
    true,
    'Godly-tier knife listing with explicit discount, rarity context, and stock visibility.',
    90
  ),
  (
    'mm2-classic-gun',
    'classic-gun',
    'Classic Gun',
    'murder-mystery-2',
    'guns',
    'placeholder:classic-gun',
    'Classic Gun artwork',
    4.75,
    null,
    'in-stock',
    20,
    'Estimated 5-15 min',
    'quick-delivery',
    false,
    true,
    false,
    false,
    'Collectible gun with straightforward pricing and quick dispatch estimate.',
    100
  ),
  (
    'gpo-rare-fruit',
    'rare-fruit',
    'Rare Fruit',
    'grand-piece-online',
    'fruits',
    'placeholder:gpo-rare-fruit',
    'Rare Fruit artwork',
    11.00,
    13.50,
    'in-stock',
    6,
    'Estimated 15-25 min',
    'best-seller',
    true,
    true,
    true,
    true,
    'Rare GPO fruit listing with visible discount and low-stock indicator.',
    110
  ),
  (
    'gpo-rare-item',
    'rare-item',
    'Rare Item Bundle',
    'grand-piece-online',
    'items',
    'placeholder:gpo-rare-item',
    'Rare Item Bundle artwork',
    7.25,
    null,
    'low-stock',
    4,
    'Estimated 15-25 min',
    'popular',
    false,
    true,
    true,
    false,
    'Low-stock GPO item bundle with clear pricing and support-ready fulfillment.',
    120
  )
on conflict (id) do update
set
  slug = excluded.slug,
  name = excluded.name,
  game_id = excluded.game_id,
  category_id = excluded.category_id,
  image_src = excluded.image_src,
  image_alt = excluded.image_alt,
  price_usd = excluded.price_usd,
  original_price_usd = excluded.original_price_usd,
  stock_status = excluded.stock_status,
  stock_quantity = excluded.stock_quantity,
  delivery_speed = excluded.delivery_speed,
  badge = excluded.badge,
  featured = excluded.featured,
  popular = excluded.popular,
  trending = excluded.trending,
  best_seller = excluded.best_seller,
  description = excluded.description,
  sort_order = excluded.sort_order,
  is_active = true,
  updated_at = timezone('utc', now());

insert into public.storefront_faqs (id, question, answer, sort_order)
values
  (
    'delivery-process',
    'How does delivery work?',
    'Choose an item, add it to your cart, then coordinate delivery through supported channels once checkout opens.',
    1
  ),
  (
    'delivery-time',
    'How fast is delivery?',
    'Orders are coordinated automatically in Discord. Typical delivery starts at about 5 minutes and can take up to 1 hour.',
    2
  ),
  (
    'payment-methods',
    'How can I pay?',
    'DiaMart is preparing multiple payment options, with Stripe and crypto as the primary methods.',
    3
  ),
  (
    'support-channel',
    'Where do I get support?',
    'Open a Discord ticket for order support or message the admin on Telegram for quick help.',
    4
  )
on conflict (id) do update
set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order,
  is_active = true,
  updated_at = timezone('utc', now());

insert into public.storefront_support_topics (
  id,
  label,
  description,
  response,
  sort_order
)
values
  (
    'delivery-timing',
    'Delivery timing',
    'Understand expected handoff speed before checkout is fully open.',
    'Delivery estimates are listed on each product card. Support can confirm queue status and handoff details.',
    1
  ),
  (
    'item-availability',
    'Item availability',
    'Check low-stock and coming-soon statuses before placing an order.',
    'Stock labels are synced from the catalog table. Low-stock and out-of-stock items are shown clearly in the UI.',
    2
  ),
  (
    'cart-checkout',
    'Cart or checkout',
    'Review cart behavior and current checkout rollout status.',
    'The cart is available for item review and subtotal checks. Payment flow is being opened in a later backend phase.',
    3
  ),
  (
    'issue-resolution',
    'Refund or issue resolution',
    'Understand where to contact support for order issues.',
    'Issue resolution requests are handled by support staff through Discord ticket workflows and Telegram escalation.',
    4
  )
on conflict (id) do update
set
  label = excluded.label,
  description = excluded.description,
  response = excluded.response,
  sort_order = excluded.sort_order,
  is_active = true,
  updated_at = timezone('utc', now());

commit;
