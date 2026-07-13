import Link from "next/link";
import type { AdminDashboardData } from "@/services/admin/admin-dashboard-service";

const C = {
  accent: "#3b82f6",
  accentLight: "#eff6ff",
  textPrimary: "#0f172a",
  textSecondary: "#64748b",
  cardBg: "#ffffff",
  cardBorder: "#e2e8f0",
};

function MetricCard({
  label,
  value,
  sublabel,
  color,
}: {
  label: string;
  value: number | string;
  sublabel?: string;
  color?: string;
}) {
  return (
    <div
      className="rounded-xl border p-5 transition-shadow hover:shadow-md"
      style={{ backgroundColor: C.cardBg, borderColor: C.cardBorder }}
    >
      <p
        className="text-xs font-medium uppercase tracking-wider"
        style={{ color: C.textSecondary }}
      >
        {label}
      </p>
      <p
        className="mt-2 text-3xl font-bold tracking-tight"
        style={{ color: color ?? C.textPrimary }}
      >
        {value}
      </p>
      {sublabel ? (
        <p className="mt-1 text-xs" style={{ color: C.textSecondary }}>
          {sublabel}
        </p>
      ) : null}
    </div>
  );
}

export function AdminDashboardPage({
  data,
}: {
  data: AdminDashboardData;
}) {
  const links = [
    { href: "/admin/categories", label: "Categories", desc: `${data.categories.length} entries` },
    { href: "/admin/games", label: "Games", desc: `${data.games.length} entries` },
    { href: "/admin/products", label: "Products", desc: `${data.products.length} entries` },
    { href: "/admin/faqs", label: "FAQs", desc: `${data.faqs.length} entries` },
    { href: "/admin/support-topics", label: "Support topics", desc: `${data.supportTopics.length} entries` },
    { href: "/admin/images", label: "Image tools", desc: "Upload images" },
  ];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold" style={{ color: C.textPrimary }}>
          Dashboard
        </h1>
        <p className="text-sm" style={{ color: C.textSecondary }}>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Metric cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Games" value={data.summary.totalGames} sublabel={`${data.games.length} entries`} />
        <MetricCard label="Categories" value={data.summary.totalCategories} />
        <MetricCard label="Products" value={data.summary.totalProducts}
          sublabel={`${data.summary.activeProducts} active, ${data.summary.inactiveProducts} inactive`} color={C.accent} />
        <MetricCard label="Content" value={data.summary.totalFaqs + data.summary.totalSupportTopics}
          sublabel={`${data.summary.totalFaqs} FAQs · ${data.summary.totalSupportTopics} topics`} />
      </div>

      {/* Quick links to each section */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center justify-between rounded-lg border px-5 py-4 transition-all hover:shadow-sm"
            style={{
              backgroundColor: C.cardBg,
              borderColor: C.cardBorder,
              color: C.textPrimary,
            }}
          >
            <span className="font-medium">{link.label}</span>
            <span className="text-sm" style={{ color: C.textSecondary }}>
              {link.desc} &rarr;
            </span>
          </Link>
        ))}
      </div>

      {data.loadError ? (
        <div className="mt-6 rounded-lg border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm text-[#991b1b]">
          Dashboard loaded with partial data. {data.loadError}
        </div>
      ) : null}
    </div>
  );
}
