# DiaMart

DiaMart is a web application foundation initialized with Next.js, TypeScript, Tailwind CSS, Supabase, and technical documentation.

## Trạng thái dự án

Project foundation initialized. Chưa có chức năng kinh doanh nào được xác nhận.

## Tech stack

- Next.js App Router
- TypeScript strict mode
- Tailwind CSS
- ESLint
- Supabase PostgreSQL, Auth và Storage khi có nhu cầu
- Vercel deployment
- npm package manager

## Yêu cầu môi trường

- Node.js 22 hoặc phiên bản tương thích với Next.js hiện tại
- npm
- Supabase CLI nếu làm việc với migration local

## Cài dependency

```bash
npm install
```

## Environment variables

Tạo `.env.local` từ `.env.example` và điền giá trị thật trong môi trường local:

```bash
cp .env.example .env.local
```

Không commit `.env.local` hoặc secret vào repository.

## Chạy development

```bash
npm run dev
```

## NPM scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

## Tài liệu

Tài liệu kỹ thuật nằm trong `docs/`:

- `docs/project-overview.md`
- `docs/architecture.md`
- `docs/database.md`
- `docs/ui-components.md`
- `docs/development-workflow.md`
- `docs/features/`
- `docs/decisions/`

## Supabase migration

Migration trong `supabase/migrations/` là nguồn chuẩn của database schema. Không chỉnh production database tùy tiện trên Dashboard. Mỗi thay đổi schema phải có migration và sau đó generate lại database types vào `src/types/database.types.ts`.

## Phạm vi hiện tại

Nền móng kỹ thuật, tài liệu và quy trình phát triển đã được khởi tạo. Chưa có chức năng kinh doanh nào được xác nhận.
