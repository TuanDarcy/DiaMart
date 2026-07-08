# Database

- Database provider: Supabase PostgreSQL.
- Migration trong `supabase/migrations` là nguồn chuẩn.
- Chưa có bảng kinh doanh nào.
- Chưa có quan hệ database nào.
- Chưa có RLS policy nào được dự án định nghĩa.
- Chưa có trigger hoặc database function.
- Không tạo ER diagram giả khi chưa có bảng.

## Checklist khi thay đổi database

- [ ] Tạo migration
- [ ] Kiểm tra foreign key
- [ ] Bật RLS nếu bảng được truy cập qua Supabase API
- [ ] Tạo policy phù hợp
- [ ] Kiểm tra index
- [ ] Generate lại database types
- [ ] Cập nhật tài liệu
- [ ] Kiểm tra migration ở local hoặc staging
