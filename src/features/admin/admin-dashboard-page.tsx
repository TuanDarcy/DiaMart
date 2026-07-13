"use client";

import { useState } from "react";
import Link from "next/link";
import type { AdminSession } from "@/services/admin/admin-auth-service";
import type { AdminDashboardData } from "@/services/admin/admin-dashboard-service";
import {
  adminLogoutAction,
  deleteCategoryAction,
  deleteFaqAction,
  deleteGameAction,
  deleteProductAction,
  deleteSupportTopicAction,
  upsertCategoryAction,
  upsertFaqAction,
  upsertGameAction,
  upsertProductAction,
  upsertSupportTopicAction,
  uploadStorefrontImageAction,
} from "./admin-actions";

type AdminDashboardPageProps = {
  session: AdminSession;
  data: AdminDashboardData;
  status?: string;
  message?: string;
  uploadedUrl?: string;
};

/* ── Design tokens for admin (distinct from storefront) ── */
const C = {
  sidebarBg: "#0f172a",
  sidebarText: "#94a3b8",
  sidebarActive: "#3b82f6",
  sidebarHover: "#1e293b",
  cardBg: "#ffffff",
  cardBorder: "#e2e8f0",
  textPrimary: "#0f172a",
  textSecondary: "#64748b",
  accent: "#3b82f6",
  accentLight: "#eff6ff",
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
  bodyBg: "#f8fafc",
};

/* ── Sidebar ── */
function Sidebar({ activeSection, session, onNavigate }: {
  activeSection: string;
  session: AdminSession;
  onNavigate: (id: string) => void;
}) {
  const menu = [
    { id: "summary", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { id: "games", label: "Games", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { id: "categories", label: "Categories", icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" },
    { id: "products", label: "Products", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
    { id: "images", label: "Image tools", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { id: "faqs", label: "FAQs", icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" },
    { id: "support-topics", label: "Support topics", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r"
      style={{ backgroundColor: C.sidebarBg, borderColor: "rgba(255,255,255,0.06)" }}>
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold"
          style={{ backgroundColor: C.accent, color: "#fff" }}>DM</div>
        <div>
          <p className="text-sm font-semibold text-white">DiaMart</p>
          <p className="text-xs" style={{ color: C.sidebarText }}>Admin panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {menu.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button key={item.id} type="button"
              onClick={() => { onNavigate(item.id); document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" }); }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all"
              style={{
                backgroundColor: isActive ? "rgba(59,130,246,0.12)" : "transparent",
                color: isActive ? C.accent : C.sidebarText,
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = C.sidebarHover; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = "transparent"; }}>
              <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User card */}
      <div className="mx-3 mb-2 rounded-lg p-3" style={{ backgroundColor: C.sidebarHover }}>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold"
            style={{ backgroundColor: C.accent, color: "#fff" }}>
            {session.email.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">{session.email}</p>
            <p className="text-xs" style={{ color: C.accent }}>{session.role}</p>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="border-t border-white/10 px-3 py-3">
        <form action={adminLogoutAction}>
          <button type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
            style={{ color: C.sidebarText }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = C.sidebarHover}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}

/* ── Metric card ── */
function MetricCard({ label, value, sublabel, color }: {
  label: string; value: number | string; sublabel?: string; color?: string;
}) {
  return (
    <div className="rounded-xl border p-5 transition-shadow hover:shadow-md"
      style={{ backgroundColor: C.cardBg, borderColor: C.cardBorder }}>
      <p className="text-xs font-medium uppercase tracking-wider" style={{ color: C.textSecondary }}>{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight" style={{ color: color ?? C.textPrimary }}>{value}</p>
      {sublabel ? <p className="mt-1 text-xs" style={{ color: C.textSecondary }}>{sublabel}</p> : null}
    </div>
  );
}

/* ── Category chart (CSS bars) ── */
function CategoryChart({ categories, products }: {
  categories: { id: string; label: string }[];
  products: { category_id: string }[];
}) {
  const counts = new Map<string, number>();
  for (const p of products) counts.set(p.category_id, (counts.get(p.category_id) ?? 0) + 1);
  const maxCount = Math.max(...counts.values(), 1);

  return (
    <div className="rounded-xl border p-5" style={{ backgroundColor: C.cardBg, borderColor: C.cardBorder }}>
      <p className="text-sm font-semibold" style={{ color: C.textPrimary }}>Products by category</p>
      <div className="mt-4 space-y-3">
        {categories.map(cat => {
          const count = counts.get(cat.id) ?? 0;
          const pct = Math.round((count / maxCount) * 100);
          return (
            <div key={cat.id}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span style={{ color: C.textSecondary }}>{cat.label}</span>
                <span className="font-semibold" style={{ color: C.textPrimary }}>{count}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: "#e2e8f0" }}>
                <div className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, backgroundColor: C.accent }} />
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs" style={{ color: C.textSecondary }}>
        {products.length} total products across {categories.length} categories
      </p>
    </div>
  );
}

/* ── Form fields (admin-styled) ── */
function Field({ name, label, defaultValue, type = "text", required = false }: {
  name: string; label: string; defaultValue?: string | number | null; type?: string; required?: boolean;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-medium" style={{ color: C.textSecondary }}>{label}</span>
      <input className="min-h-10 rounded-lg border px-3 text-sm outline-none transition-all focus:ring-2"
        style={{ borderColor: C.cardBorder, backgroundColor: "#fff", color: C.textPrimary }}
        name={name} defaultValue={defaultValue ?? ""} type={type} required={required}
        onFocus={e => e.currentTarget.style.borderColor = C.accent}
        onBlur={e => e.currentTarget.style.borderColor = C.cardBorder} />
    </label>
  );
}

function TextareaField({ name, label, defaultValue, rows = 3 }: {
  name: string; label: string; defaultValue?: string | null; rows?: number;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-medium" style={{ color: C.textSecondary }}>{label}</span>
      <textarea className="rounded-lg border px-3 py-2 text-sm outline-none transition-all focus:ring-2"
        style={{ borderColor: C.cardBorder, backgroundColor: "#fff", color: C.textPrimary }}
        name={name} rows={rows} defaultValue={defaultValue ?? ""}
        onFocus={e => e.currentTarget.style.borderColor = C.accent}
        onBlur={e => e.currentTarget.style.borderColor = C.cardBorder} />
    </label>
  );
}

function ActiveSelect({ defaultValue = true }: { defaultValue?: boolean }) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-medium" style={{ color: C.textSecondary }}>is_active</span>
      <select className="min-h-10 rounded-lg border px-3 text-sm outline-none transition-all focus:ring-2"
        style={{ borderColor: C.cardBorder, backgroundColor: "#fff", color: C.textPrimary }}
        name="is_active" defaultValue={defaultValue ? "true" : "false"}
        onFocus={e => e.currentTarget.style.borderColor = C.accent}
        onBlur={e => e.currentTarget.style.borderColor = C.cardBorder}>
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
    </label>
  );
}

function CrudSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="rounded-xl border p-6" style={{ backgroundColor: C.cardBg, borderColor: C.cardBorder }}>
        <h2 className="mb-5 text-lg font-semibold" style={{ color: C.textPrimary }}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Btn({ variant = "primary", children, ...props }: {
  variant?: "primary" | "secondary" | "danger";
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const styles: Record<string, React.CSSProperties> = {
    primary: { backgroundColor: C.accent, color: "#fff", border: "none" },
    secondary: { backgroundColor: "#fff", color: C.textPrimary, border: `1px solid ${C.cardBorder}` },
    danger: { backgroundColor: C.error, color: "#fff", border: "none" },
  };
  return (
    <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition-all hover:opacity-90"
      style={styles[variant]} {...props}>{children}</button>
  );
}

/* ── Main page ── */
export function AdminDashboardPage({ session, data, status, message, uploadedUrl }: AdminDashboardPageProps) {
  const [activeSection, setActiveSection] = useState("summary");

  function scrollTo(id: string) {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.bodyBg }}>
      <Sidebar activeSection={activeSection} session={session} onNavigate={setActiveSection} />

      <div className="pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-white px-8 py-4"
          style={{ borderColor: C.cardBorder }}>
          <div>
            <h1 className="text-xl font-bold" style={{ color: C.textPrimary }}>Dashboard</h1>
            <p className="text-sm" style={{ color: C.textSecondary }}>
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:opacity-80"
              href="/"
              style={{ backgroundColor: C.accentLight, color: C.accent }}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Storefront
            </Link>
            <form action={adminLogoutAction}>
              <button type="submit"
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:opacity-80"
                style={{ backgroundColor: C.cardBg, color: C.textSecondary, border: `1px solid ${C.cardBorder}` }}>
                Logout
              </button>
            </form>
          </div>
        </header>

        <main className="space-y-6 p-8">
          {/* Flash */}
          {message ? (
            <div className="rounded-lg border px-4 py-3 text-sm"
              style={{
                borderColor: status === "error" ? "#fecaca" : "#bbf7d0",
                backgroundColor: status === "error" ? "#fef2f2" : "#f0fdf4",
                color: status === "error" ? "#991b1b" : "#166534",
              }}>{message}</div>
          ) : null}
          {data.loadError ? (
            <div className="rounded-lg border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm text-[#991b1b]">
              Dashboard loaded with partial data. {data.loadError}
            </div>
          ) : null}

          {/* Metric cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" id="summary">
            <MetricCard label="Games" value={data.summary.totalGames} sublabel={`${data.games.length} active`} />
            <MetricCard label="Categories" value={data.summary.totalCategories} />
            <MetricCard label="Products" value={data.summary.totalProducts}
              sublabel={`${data.summary.activeProducts} active, ${data.summary.inactiveProducts} inactive`} color={C.accent} />
            <MetricCard label="Content" value={data.summary.totalFaqs + data.summary.totalSupportTopics}
              sublabel={`${data.summary.totalFaqs} FAQs · ${data.summary.totalSupportTopics} topics`} />
          </div>

          {/* Charts + quick actions */}
          <div className="grid gap-6 lg:grid-cols-2">
            <CategoryChart categories={data.categories} products={data.products} />
            <div className="rounded-xl border p-5" style={{ backgroundColor: C.cardBg, borderColor: C.cardBorder }}>
              <p className="text-sm font-semibold" style={{ color: C.textPrimary }}>Quick actions</p>
              <div className="mt-4 grid gap-3">
                {[
                  { label: "Manage Games", target: "games", desc: `${data.games.length} games` },
                  { label: "Manage Products", target: "products", desc: `${data.products.length} products` },
                  { label: "Upload Images", target: "images", desc: "PNG, JPG, WebP" },
                ].map(a => (
                  <button key={a.target} type="button" onClick={() => scrollTo(a.target)}
                    className="flex items-center justify-between rounded-lg px-4 py-3 text-sm transition-all hover:opacity-80"
                    style={{ backgroundColor: C.accentLight, color: C.textPrimary }}>
                    <span className="font-medium">{a.label}</span>
                    <span style={{ color: C.textSecondary }}>{a.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CRUD sections — same functionality, new styling */}
          <CrudSection id="images" title="Image tools">
            <p className="mb-4 text-sm" style={{ color: C.textSecondary }}>
              Upload images to Supabase Storage or paste a public URL directly into the image_src field.
            </p>
            <form action={uploadStorefrontImageAction} className="flex flex-wrap gap-3">
              <input className="min-h-10 flex-1 rounded-lg border px-3 text-sm"
                style={{ borderColor: C.cardBorder, backgroundColor: "#fff", color: C.textPrimary }}
                name="imageFile" type="file" accept="image/png,image/jpeg,image/webp,image/gif" required />
              <Btn type="submit">Upload image</Btn>
            </form>
            {uploadedUrl ? (
              <div className="mt-3 rounded-lg border p-3 text-sm" style={{ borderColor: C.cardBorder, backgroundColor: C.accentLight }}>
                <p className="font-semibold" style={{ color: C.textPrimary }}>Uploaded URL</p>
                <p className="mt-1 break-all" style={{ color: C.accent }}>{uploadedUrl}</p>
              </div>
            ) : null}
          </CrudSection>

          {/* Games */}
          <CrudSection id="games" title="Games">
            <form action={upsertGameAction}
              className="mb-6 grid gap-3 rounded-lg border p-4 md:grid-cols-3"
              style={{ borderColor: C.cardBorder, backgroundColor: C.accentLight }}>
              <Field name="id" label="id (optional)" />
              <Field name="slug" label="slug (optional)" />
              <Field name="name" label="name" required />
              <Field name="tagline" label="tagline" />
              <Field name="image_src" label="image_src" />
              <Field name="image_alt" label="image_alt" />
              <Field name="sort_order" label="sort_order" type="number" defaultValue={0} />
              <ActiveSelect defaultValue />
              <div className="md:col-span-3"><TextareaField name="description" label="description" /></div>
              <div className="md:col-span-3"><Btn type="submit">Create game</Btn></div>
            </form>
            <div className="space-y-3">
              {data.games.map(game => (
                <form key={game.id} action={upsertGameAction}
                  className="rounded-lg border p-4" style={{ borderColor: C.cardBorder, backgroundColor: "#fff" }}>
                  <div className="grid gap-3 md:grid-cols-3">
                    <Field name="id" label="id" defaultValue={game.id} required />
                    <Field name="slug" label="slug" defaultValue={game.slug} required />
                    <Field name="name" label="name" defaultValue={game.name} required />
                    <Field name="tagline" label="tagline" defaultValue={game.tagline} />
                    <Field name="image_src" label="image_src" defaultValue={game.image_src} />
                    <Field name="image_alt" label="image_alt" defaultValue={game.image_alt} />
                    <Field name="sort_order" label="sort_order" type="number" defaultValue={game.sort_order} />
                    <ActiveSelect defaultValue={game.is_active} />
                    <div className="md:col-span-3"><TextareaField name="description" label="description" defaultValue={game.description} /></div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Btn type="submit">Save changes</Btn>
                    <Btn variant="danger" type="submit" formAction={deleteGameAction}>Delete</Btn>
                  </div>
                </form>
              ))}
            </div>
          </CrudSection>

          {/* Categories */}
          <CrudSection id="categories" title="Categories">
            <form action={upsertCategoryAction}
              className="mb-6 grid gap-3 rounded-lg border p-4 md:grid-cols-3"
              style={{ borderColor: C.cardBorder, backgroundColor: C.accentLight }}>
              <Field name="id" label="id (optional)" />
              <Field name="label" label="label" required />
              <Field name="sort_order" label="sort_order" type="number" defaultValue={0} />
              <ActiveSelect defaultValue />
              <div className="md:col-span-3"><TextareaField name="description" label="description" /></div>
              <div className="md:col-span-3"><Btn type="submit">Create category</Btn></div>
            </form>
            <div className="space-y-3">
              {data.categories.map(cat => (
                <form key={cat.id} action={upsertCategoryAction}
                  className="rounded-lg border p-4" style={{ borderColor: C.cardBorder, backgroundColor: "#fff" }}>
                  <div className="grid gap-3 md:grid-cols-3">
                    <Field name="id" label="id" defaultValue={cat.id} required />
                    <Field name="label" label="label" defaultValue={cat.label} required />
                    <Field name="sort_order" label="sort_order" type="number" defaultValue={cat.sort_order} />
                    <ActiveSelect defaultValue={cat.is_active} />
                    <div className="md:col-span-3"><TextareaField name="description" label="description" defaultValue={cat.description} /></div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Btn type="submit">Save changes</Btn>
                    <Btn variant="danger" type="submit" formAction={deleteCategoryAction}>Delete</Btn>
                  </div>
                </form>
              ))}
            </div>
          </CrudSection>

          {/* Products */}
          <CrudSection id="products" title="Products">
            <form action={upsertProductAction}
              className="mb-6 grid gap-3 rounded-lg border p-4 md:grid-cols-3"
              style={{ borderColor: C.cardBorder, backgroundColor: C.accentLight }}>
              <Field name="id" label="id (optional)" />
              <Field name="slug" label="slug" />
              <Field name="name" label="name" required />
              <Field name="game_id" label="game_id" required />
              <Field name="category_id" label="category_id" required />
              <Field name="image_src" label="image_src" />
              <Field name="image_alt" label="image_alt" />
              <Field name="price_usd" label="price_usd" type="number" defaultValue={0} />
              <Field name="original_price_usd" label="orig. price" type="number" defaultValue={0} />
              <Field name="stock_status" label="stock_status" defaultValue="in-stock" />
              <Field name="stock_quantity" label="stock_qty" type="number" defaultValue={0} />
              <Field name="delivery_speed" label="delivery_speed" defaultValue="~5-30 min" />
              <Field name="badge" label="badge" />
              <Field name="sort_order" label="sort_order" type="number" defaultValue={0} />
              <ActiveSelect defaultValue />
              <label className="flex items-center gap-2 text-sm" style={{ color: C.textSecondary }}>
                <input type="checkbox" name="featured" /> featured
              </label>
              <label className="flex items-center gap-2 text-sm" style={{ color: C.textSecondary }}>
                <input type="checkbox" name="popular" /> popular
              </label>
              <label className="flex items-center gap-2 text-sm" style={{ color: C.textSecondary }}>
                <input type="checkbox" name="trending" /> trending
              </label>
              <label className="flex items-center gap-2 text-sm" style={{ color: C.textSecondary }}>
                <input type="checkbox" name="best_seller" /> best seller
              </label>
              <div className="md:col-span-3"><TextareaField name="description" label="description" /></div>
              <div className="md:col-span-3"><Btn type="submit">Create product</Btn></div>
            </form>
            <div className="space-y-3">
              {data.products.map(prod => (
                <form key={prod.id} action={upsertProductAction}
                  className="rounded-lg border p-4" style={{ borderColor: C.cardBorder, backgroundColor: "#fff" }}>
                  <div className="grid gap-3 md:grid-cols-3">
                    <Field name="id" label="id" defaultValue={prod.id} required />
                    <Field name="slug" label="slug" defaultValue={prod.slug} />
                    <Field name="name" label="name" defaultValue={prod.name} required />
                    <Field name="game_id" label="game_id" defaultValue={prod.game_id} required />
                    <Field name="category_id" label="category_id" defaultValue={prod.category_id} required />
                    <Field name="image_src" label="image_src" defaultValue={prod.image_src} />
                    <Field name="image_alt" label="image_alt" defaultValue={prod.image_alt} />
                    <Field name="price_usd" label="price_usd" type="number" defaultValue={prod.price_usd} />
                    <Field name="original_price_usd" label="orig. price" type="number" defaultValue={prod.original_price_usd} />
                    <Field name="stock_status" label="stock_status" defaultValue={prod.stock_status} />
                    <Field name="stock_quantity" label="stock_qty" type="number" defaultValue={prod.stock_quantity} />
                    <Field name="delivery_speed" label="delivery_speed" defaultValue={prod.delivery_speed} />
                    <Field name="badge" label="badge" defaultValue={prod.badge} />
                    <Field name="sort_order" label="sort_order" type="number" defaultValue={prod.sort_order} />
                    <ActiveSelect defaultValue={prod.is_active} />
                    <label className="flex items-center gap-2 text-sm" style={{ color: C.textSecondary }}>
                      <input type="checkbox" name="featured" defaultChecked={prod.featured} /> featured
                    </label>
                    <label className="flex items-center gap-2 text-sm" style={{ color: C.textSecondary }}>
                      <input type="checkbox" name="popular" defaultChecked={prod.popular} /> popular
                    </label>
                    <label className="flex items-center gap-2 text-sm" style={{ color: C.textSecondary }}>
                      <input type="checkbox" name="trending" defaultChecked={prod.trending} /> trending
                    </label>
                    <label className="flex items-center gap-2 text-sm" style={{ color: C.textSecondary }}>
                      <input type="checkbox" name="best_seller" defaultChecked={prod.best_seller} /> best seller
                    </label>
                    <div className="md:col-span-3"><TextareaField name="description" label="description" defaultValue={prod.description} /></div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Btn type="submit">Save changes</Btn>
                    <Btn variant="danger" type="submit" formAction={deleteProductAction}>Delete</Btn>
                  </div>
                </form>
              ))}
            </div>
          </CrudSection>

          {/* FAQs */}
          <CrudSection id="faqs" title="FAQs">
            <form action={upsertFaqAction}
              className="mb-6 grid gap-3 rounded-lg border p-4 md:grid-cols-3"
              style={{ borderColor: C.cardBorder, backgroundColor: C.accentLight }}>
              <Field name="id" label="id (optional)" />
              <Field name="question" label="question" required />
              <Field name="sort_order" label="sort_order" type="number" defaultValue={0} />
              <ActiveSelect defaultValue />
              <div className="md:col-span-3"><TextareaField name="answer" label="answer" /></div>
              <div className="md:col-span-3"><Btn type="submit">Create FAQ</Btn></div>
            </form>
            <div className="space-y-3">
              {data.faqs.map(faq => (
                <form key={faq.id} action={upsertFaqAction}
                  className="rounded-lg border p-4" style={{ borderColor: C.cardBorder, backgroundColor: "#fff" }}>
                  <div className="grid gap-3 md:grid-cols-3">
                    <Field name="id" label="id" defaultValue={faq.id} required />
                    <Field name="question" label="question" defaultValue={faq.question} required />
                    <Field name="sort_order" label="sort_order" type="number" defaultValue={faq.sort_order} />
                    <ActiveSelect defaultValue={faq.is_active} />
                    <div className="md:col-span-3"><TextareaField name="answer" label="answer" defaultValue={faq.answer} /></div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Btn type="submit">Save changes</Btn>
                    <Btn variant="danger" type="submit" formAction={deleteFaqAction}>Delete</Btn>
                  </div>
                </form>
              ))}
            </div>
          </CrudSection>

          {/* Support topics */}
          <CrudSection id="support-topics" title="Support topics">
            <form action={upsertSupportTopicAction}
              className="mb-6 grid gap-3 rounded-lg border p-4 md:grid-cols-3"
              style={{ borderColor: C.cardBorder, backgroundColor: C.accentLight }}>
              <Field name="id" label="id (optional)" />
              <Field name="label" label="label" required />
              <Field name="description" label="description" />
              <Field name="sort_order" label="sort_order" type="number" defaultValue={0} />
              <ActiveSelect defaultValue />
              <div className="md:col-span-3"><TextareaField name="response" label="response" /></div>
              <div className="md:col-span-3"><Btn type="submit">Create topic</Btn></div>
            </form>
            <div className="space-y-3">
              {data.supportTopics.map(topic => (
                <form key={topic.id} action={upsertSupportTopicAction}
                  className="rounded-lg border p-4" style={{ borderColor: C.cardBorder, backgroundColor: "#fff" }}>
                  <div className="grid gap-3 md:grid-cols-3">
                    <Field name="id" label="id" defaultValue={topic.id} required />
                    <Field name="label" label="label" defaultValue={topic.label} required />
                    <Field name="description" label="description" defaultValue={topic.description} />
                    <Field name="sort_order" label="sort_order" type="number" defaultValue={topic.sort_order} />
                    <ActiveSelect defaultValue={topic.is_active} />
                    <div className="md:col-span-3"><TextareaField name="response" label="response" defaultValue={topic.response} /></div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Btn type="submit">Save changes</Btn>
                    <Btn variant="danger" type="submit" formAction={deleteSupportTopicAction}>Delete</Btn>
                  </div>
                </form>
              ))}
            </div>
          </CrudSection>
        </main>
      </div>
    </div>
  );
}