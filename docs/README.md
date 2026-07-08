# DiaMart Technical Documentation

Thư mục `docs` là nơi lưu tài liệu kỹ thuật, yêu cầu sản phẩm đã xác nhận và quy trình phát triển của DiaMart.

## Tài liệu

- `project-overview.md`: thông tin sản phẩm đã xác nhận, phạm vi hiện tại và nội dung chưa xác định.
- `architecture.md`: kiến trúc hệ thống, luồng deploy dự kiến và cấu trúc code.
- `database.md`: nguyên tắc database, trạng thái schema và checklist thay đổi dữ liệu.
- `ui-components.md`: nguyên tắc component UI và danh sách component tái sử dụng quan trọng.
- `development-workflow.md`: workflow phát triển, branch, commit, review và deploy preview.
- `features/`: tài liệu từng chức năng khi có logic hoặc hành vi người dùng riêng.
- `decisions/`: Architecture Decision Records cho quyết định kiến trúc quan trọng.

## Nguồn chuẩn

Yêu cầu sản phẩm: `docs/project-overview.md` và `docs/features/`

Kiến trúc: `docs/architecture.md`

Database schema: `supabase/migrations/`

Database types: `src/types/database.types.ts`

Component tái sử dụng: `docs/ui-components.md`

Quyết định kiến trúc: `docs/decisions/`

Quy tắc dành cho AI: `.github/copilot-instructions.md`

## Quy tắc cập nhật

- Đổi màu, spacing, border hoặc layout nhỏ: không cập nhật architecture.
- Tạo component tái sử dụng quan trọng: cập nhật `ui-components.md`.
- Thay đổi hành vi người dùng: cập nhật feature document.
- Thêm bảng, cột, function, trigger hoặc RLS: tạo migration và cập nhật `database.md`.
- Thay đổi luồng dữ liệu hoặc tích hợp hệ thống: cập nhật `architecture.md`.
- Chỉ sửa tài liệu bị ảnh hưởng trực tiếp.
