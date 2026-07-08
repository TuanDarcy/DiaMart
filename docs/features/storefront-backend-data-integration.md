# Storefront Backend Data Integration

## Trạng thái

In progress

## Mục tiêu

Chuyển nguồn dữ liệu storefront từ mock-data sang Supabase để home page, game page, cart page, FAQ và support widget hiển thị dữ liệu từ database.

## Người dùng liên quan

- Buyer truy cập storefront
- Admin vận hành catalog dữ liệu trong database

## Hành vi

- Home page đọc games, products, FAQs, support topics từ Supabase service layer.
- Game page theo slug đọc game, categories và products từ Supabase.
- Cart page đọc product catalog từ Supabase để render thông tin line item.
- Delivery proof popup vẫn dùng sample data cho hiệu ứng trang trí.

## Business rules

- UI chỉ hiển thị bản ghi `is_active = true`.
- Giá hiển thị USD và dùng formatter thống nhất.
- Không giả lập thanh toán thật trong giai đoạn này.

## Luồng xử lý

1. Server component gọi service trong `src/services/storefront/storefront-service.ts`.
2. Service query các bảng `storefront_*` từ Supabase.
3. Service map row database sang UI types trong `src/features/storefront/types.ts`.
4. Client component nhận data qua props để render.
5. Khi thiếu env hoặc query lỗi, service fallback sang mock-data để local dev không bị gãy màn hình.

## UI liên quan

- `/`
- `/games/[slug]`
- `/cart`

## Database liên quan

- `public.storefront_games`
- `public.storefront_categories`
- `public.storefront_products`
- `public.storefront_faqs`
- `public.storefront_support_topics`

## Quyền truy cập và RLS

- RLS bật cho toàn bộ bảng storefront.
- `anon` và `authenticated` chỉ có quyền `SELECT` với điều kiện `is_active = true`.

## File code liên quan

- `src/services/storefront/storefront-service.ts`
- `src/app/page.tsx`
- `src/app/games/[slug]/page.tsx`
- `src/app/cart/page.tsx`
- `src/features/storefront/home-page.tsx`
- `src/features/storefront/game-page-client.tsx`
- `src/features/storefront/cart-page-client.tsx`
- `supabase/migrations/20260708101500_create_storefront_catalog.sql`

## Trường hợp lỗi

- Thiếu env Supabase ở local: fallback mock-data.
- Query Supabase lỗi: log server error và fallback mock-data.
- Database chưa seed dữ liệu: fallback mock-data để UI vẫn render.

## Acceptance criteria

- [x] Home page nhận data chính từ Supabase service layer.
- [x] Game page theo slug nhận data chính từ Supabase service layer.
- [x] Cart page lấy product catalog từ Supabase service layer.
- [x] Có migration tạo schema storefront + seed + RLS cơ bản.
- [x] Delivery proof popup vẫn là sample data trang trí.

## Những phần chưa xác định

- Dashboard admin để CRUD catalog.
- Quy trình sync image thật bằng Supabase Storage.
- Backend checkout và payment workflow.
