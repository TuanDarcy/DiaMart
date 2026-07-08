# Supabase

Thư mục này chứa cấu hình Supabase local và migration của DiaMart.

- Migration trong `supabase/migrations` là nguồn chuẩn của database schema.
- Không chỉnh production database tùy tiện trên Supabase Dashboard.
- Mỗi thay đổi schema phải có migration tương ứng.
- Sau khi schema thay đổi phải generate lại TypeScript types vào `src/types/database.types.ts`.
- Chưa có bảng database nào được xác định trong giai đoạn này.

Không login, link project remote hoặc chạy migration lên remote database trong giai đoạn khởi tạo nền móng.
