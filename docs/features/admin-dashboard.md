# Admin Dashboard

## Trạng thái

Implemented (phase 1)

## Mục tiêu

Xây dựng trang quản trị vận hành catalog storefront trực tiếp từ database: quản lý game, category, product, FAQ, support topics và ảnh.

## Người dùng liên quan

- Admin vận hành DiaMart catalog
- Editor (được cấp role trong `admin_users`)

## Hành vi

- Admin login qua Supabase Auth tại `/admin/login`.
- Route `/admin` yêu cầu quyền admin từ bảng `admin_users`.
- Dashboard hiển thị trạng thái catalog tổng quan.
- Admin CRUD trực tiếp 5 nhóm dữ liệu: games, categories, products, FAQs, support topics.
- Admin có thể upload ảnh vào Supabase Storage bucket `storefront-images`.
- URL ảnh upload được lấy để gán vào `image_src` của game/product.
- Admin cũng có thể paste URL ảnh trực tiếp (CDN/public URL) vào `image_src` mà không bắt buộc upload qua dashboard.

## Business rules

- Chỉ user có `is_active = true` trong `admin_users` mới được vào admin panel.
- CRUD catalog chỉ cho phép khi `public.is_admin(auth.uid()) = true`.
- Storefront public vẫn chỉ đọc các record `is_active = true`.
- Upload ảnh giới hạn mime type và kích thước theo bucket config.

## Luồng xử lý

1. Admin login thành công qua Supabase Auth.
2. Hệ thống kiểm tra user trong `admin_users`.
3. Nếu hợp lệ, admin vào dashboard để CRUD dữ liệu.
4. CRUD action gọi Supabase trực tiếp từ server action.
5. Nếu upload ảnh, file vào bucket `storefront-images`, sau đó trả public URL.
6. URL ảnh được ghi vào cột `image_src` để storefront render.

## UI liên quan

- `/admin/login`
- `/admin`

## Database liên quan

- `public.admin_users`
- `public.storefront_games`
- `public.storefront_categories`
- `public.storefront_products`
- `public.storefront_faqs`
- `public.storefront_support_topics`
- `storage.buckets` (`storefront-images`)
- `storage.objects`

## Quyền truy cập và RLS

- `public.is_admin()` dùng trong RLS policy cho CRUD storefront và storage objects.
- `admin_users` cho phép user đọc trạng thái admin của chính họ.
- CRUD storefront và storage upload/delete yêu cầu authenticated + admin policy.

## File code liên quan

- `src/app/admin/login/page.tsx`
- `src/app/admin/page.tsx`
- `src/features/admin/admin-login-page.tsx`
- `src/features/admin/admin-dashboard-page.tsx`
- `src/features/admin/admin-actions.ts`
- `src/services/admin/admin-auth-service.ts`
- `src/services/admin/admin-dashboard-service.ts`
- `supabase/migrations/20260708120000_admin_access_and_storage.sql`

## Trường hợp lỗi

- Login đúng nhưng không có row trong `admin_users`: bị từ chối truy cập admin.
- Upload ảnh lỗi do policy: user chưa có quyền admin hoặc bucket policy chưa apply.
- Xóa category đang có product liên kết có thể thất bại do FK.

## Acceptance criteria

- [x] Có trang login admin và route admin protected.
- [x] Có dashboard summary trạng thái catalog.
- [x] Có CRUD games.
- [x] Có CRUD categories.
- [x] Có CRUD products.
- [x] Có CRUD FAQs.
- [x] Có CRUD support topics.
- [x] Có upload ảnh Supabase Storage và lấy URL để lưu vào DB.
- [x] Cho phép paste URL ảnh trực tiếp vào image field.

## Những phần chưa xác định

- Quy trình quản lý nhiều cấp role beyond admin/editor.
- Lịch sử audit log cho thao tác admin.
- Realtime sync giữa nhiều admin cùng lúc chỉnh một record.
