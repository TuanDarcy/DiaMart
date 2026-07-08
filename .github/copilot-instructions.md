# DiaMart AI Development Instructions

## Required context

Trước khi sửa code:

1. Đọc `docs/project-overview.md`.
2. Đọc `docs/architecture.md`.
3. Đọc tài liệu feature liên quan nếu có.
4. Kiểm tra code hiện tại.
5. Kiểm tra Supabase migrations nếu thay đổi liên quan dữ liệu.

Không được dựa hoàn toàn vào tài liệu nếu code hiện tại cho thấy sự khác biệt. Phải báo sự không thống nhất.

## Change classification

Phân loại thay đổi trước khi thực hiện:

### Level A — UI nhỏ

Bao gồm màu sắc, spacing, border, icon, animation nhỏ và responsive adjustment.

- Không cập nhật architecture.
- Không tạo feature document.
- Chỉ cập nhật UI documentation nếu component trở thành thành phần tái sử dụng quan trọng.

### Level B — UI feature

Bao gồm khay nội dung, tab, filter, search, modal, form và trạng thái loading/empty/error.

- Cập nhật feature document nếu hành vi người dùng thay đổi.
- Không cập nhật architecture nếu luồng dữ liệu không đổi.
- Cập nhật UI documentation khi tạo component tái sử dụng quan trọng.

### Level C — System logic

Bao gồm database, API, server action, authentication, authorization, RLS, payment, file upload và external service.

- Phải tạo hoặc cập nhật feature document.
- Phải tạo migration nếu schema thay đổi.
- Phải cập nhật database types.
- Phải cập nhật database documentation.
- Cập nhật Mermaid khi luồng hệ thống thay đổi.

## Architecture rules

- Tổ chức code kinh doanh theo feature hoặc domain.
- UI component không chứa business logic quan trọng.
- Supabase query phải nằm trong service hoặc data-access layer phù hợp.
- Server-only code không được import vào client component.
- Tái sử dụng code hiện có trước khi tạo abstraction mới.
- Không tạo wrapper hoặc helper không cần thiết.
- Dùng thuật ngữ thống nhất trong code, database và tài liệu.

## Supabase rules

- Không tự tạo bảng hoặc cột mà thiếu migration.
- Không sửa migration đã chạy production.
- Không sửa generated database types bằng tay.
- Không expose service-role key ra client.
- Mọi bảng chứa dữ liệu người dùng phải được xem xét RLS.
- Không tin dữ liệu hoặc giá trị quan trọng do client tự gửi lên.
- Sau thay đổi schema phải generate lại database types.

## Documentation rules

- Chỉ cập nhật tài liệu bị ảnh hưởng trực tiếp.
- Thay đổi UI nhỏ không cần sửa architecture.
- Thay đổi hành vi phải cập nhật feature document.
- Thay đổi database phải cập nhật migration và `docs/database.md`.
- Thay đổi luồng hệ thống phải cập nhật Mermaid.
- Không viết tài liệu cho chức năng chưa tồn tại hoặc chưa được xác nhận.

## Implementation rules

- Không sửa file không liên quan.
- Không tự mở rộng scope.
- Có loading, empty và error state khi phù hợp.
- Giữ accessibility và responsive behavior.
- Không hardcode secret.
- Validate dữ liệu ở server đối với hành động quan trọng.
- Dùng TypeScript strict và tránh `any`.

## Completion rules

Trước khi kết thúc:

1. Chạy lint.
2. Chạy TypeScript check hoặc production build.
3. Chạy test liên quan nếu có.
4. Kiểm tra import thừa.
5. Kiểm tra lỗi client/server boundary.
6. Kiểm tra tài liệu liên quan.
7. Báo file đã tạo hoặc sửa.
8. Báo migration và environment variable thay đổi.
9. Báo lỗi hoặc phần chưa hoàn thành.
