# Database

- Database provider: Supabase PostgreSQL.
- Migration trong `supabase/migrations` là nguồn chuẩn.

## Current storefront schema

Migration: `supabase/migrations/20260708101500_create_storefront_catalog.sql`

### `public.storefront_games`

- Mục tiêu: danh sách game hiển thị trên home và game picker.
- Cột chính: `id`, `slug`, `name`, `tagline`, `description`, `image_src`, `image_alt`, `is_active`, `sort_order`.
- Ràng buộc: `id` primary key, `slug` unique.

### `public.storefront_categories`

- Mục tiêu: danh mục item dùng cho tabs và phân loại sản phẩm.
- Cột chính: `id`, `label`, `description`, `is_active`, `sort_order`.
- Ràng buộc: `id` primary key.

### `public.storefront_products`

- Mục tiêu: nguồn dữ liệu sản phẩm chính cho home, game pages, cart.
- Cột chính: `id`, `slug`, `name`, `game_id`, `category_id`, `image_src`, `image_alt`, `price_usd`, `original_price_usd`, `stock_status`, `stock_quantity`, `delivery_speed`, `badge`, `featured`, `popular`, `trending`, `best_seller`, `description`, `is_active`, `sort_order`.
- Quan hệ:
  - `game_id -> storefront_games.id`
  - `category_id -> storefront_categories.id`
- Ràng buộc dữ liệu:
  - `price_usd >= 0`
  - `original_price_usd is null or original_price_usd >= price_usd`
  - `stock_status in ('in-stock', 'low-stock', 'out-of-stock', 'coming-soon')`
  - `badge` nullable, nếu có phải thuộc tập hợp badge đã định nghĩa.

### `public.storefront_faqs`

- Mục tiêu: câu hỏi thường gặp hiển thị ở home.
- Cột chính: `id`, `question`, `answer`, `is_active`, `sort_order`.

### `public.storefront_support_topics`

- Mục tiêu: data cho support widget.
- Cột chính: `id`, `label`, `description`, `response`, `is_active`, `sort_order`.

## Indexes

- `storefront_games_slug_idx`
- `storefront_products_game_sort_idx`
- `storefront_products_category_sort_idx`
- `storefront_products_flags_idx` (partial index where `is_active = true`)

## Row Level Security (RLS)

Các bảng storefront đã bật RLS và có policy read-only cho `anon` và `authenticated`:

- Public can read active storefront games
- Public can read active storefront categories
- Public can read active storefront products
- Public can read active storefront faqs
- Public can read active storefront support topics

Mỗi policy đều giới hạn bằng `is_active = true`.

## Seed data

Migration tạo dữ liệu khởi tạo cho:

- 5 game
- 11 categories
- 12 products
- 4 FAQs
- 4 support topics

## Ghi chú triển khai

- UI hiện lấy catalog data từ Supabase service layer.
- Delivery proof popup vẫn dùng sample data để làm hiệu ứng hiển thị.
- Cần regenerate `src/types/database.types.ts` từ Supabase sau khi migration được áp dụng vào môi trường chính.

## Checklist khi thay đổi database

- [ ] Tạo migration
- [ ] Kiểm tra foreign key
- [ ] Bật RLS nếu bảng được truy cập qua Supabase API
- [ ] Tạo policy phù hợp
- [ ] Kiểm tra index
- [ ] Generate lại database types
- [ ] Cập nhật tài liệu
- [ ] Kiểm tra migration ở local hoặc staging
