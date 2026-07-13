"use client";

import { useState } from "react";
import type { AdminSession } from "@/services/admin/admin-auth-service";
import type { AdminCategory } from "@/services/admin/admin-dashboard-service";
import { upsertCategoryAction, deleteCategoryAction } from "./admin-actions";

const C = {
  cardBg: "#ffffff",
  cardBorder: "#e2e8f0",
  textPrimary: "#0f172a",
  textSecondary: "#64748b",
  accent: "#3b82f6",
  accentLight: "#eff6ff",
  error: "#ef4444",
  bodyBg: "#f8fafc",
};

export function AdminCategoriesClient({
  session: _session,
  categories: initialCategories,
}: {
  session: AdminSession;
  categories: AdminCategory[];
}) {
  const [categories] = useState(initialCategories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const editingCategory = categories.find((c) => c.id === editingId) ?? null;

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: C.textPrimary }}>
            Categories
          </h1>
          <p className="text-sm" style={{ color: C.textSecondary }}>
            {categories.length} categories
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex min-h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium text-white transition-all hover:opacity-90"
          style={{ backgroundColor: C.accent }}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add category
        </button>
      </div>

      {/* Create Form Modal */}
      {showCreate ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div
            className="w-full max-w-lg rounded-xl border bg-white p-6 shadow-lg"
            style={{ borderColor: C.cardBorder }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2
                className="text-lg font-semibold"
                style={{ color: C.textPrimary }}
              >
                New category
              </h2>
              <button
                onClick={() => setShowCreate(false)}
                className="text-sm"
                style={{ color: C.textSecondary }}
              >
                Cancel
              </button>
            </div>
            <form
              action={upsertCategoryAction}
              onSubmit={() => setTimeout(() => setShowCreate(false), 100)}
              className="grid gap-4"
            >
              <label className="grid gap-1">
                <span
                  className="text-xs font-medium"
                  style={{ color: C.textSecondary }}
                >
                  Label
                </span>
                <input
                  name="label"
                  required
                  className="min-h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
                  style={{ borderColor: C.cardBorder, color: C.textPrimary }}
                />
              </label>
              <label className="grid gap-1">
                <span
                  className="text-xs font-medium"
                  style={{ color: C.textSecondary }}
                >
                  Description
                </span>
                <textarea
                  name="description"
                  rows={3}
                  className="rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
                  style={{ borderColor: C.cardBorder, color: C.textPrimary }}
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="grid gap-1">
                  <span
                    className="text-xs font-medium"
                    style={{ color: C.textSecondary }}
                  >
                    Sort order
                  </span>
                  <input
                    name="sort_order"
                    type="number"
                    defaultValue={0}
                    className="min-h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
                    style={{ borderColor: C.cardBorder, color: C.textPrimary }}
                  />
                </label>
                <label className="grid gap-1">
                  <span
                    className="text-xs font-medium"
                    style={{ color: C.textSecondary }}
                  >
                    Status
                  </span>
                  <select
                    name="is_active"
                    defaultValue="true"
                    className="min-h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
                    style={{ borderColor: C.cardBorder, color: C.textPrimary }}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </label>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="min-h-10 rounded-lg border px-4 text-sm font-medium"
                  style={{ borderColor: C.cardBorder, color: C.textPrimary }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-10 rounded-lg px-4 text-sm font-medium text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: C.accent }}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {/* Edit Form Modal */}
      {editingCategory ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div
            className="w-full max-w-lg rounded-xl border bg-white p-6 shadow-lg"
            style={{ borderColor: C.cardBorder }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2
                className="text-lg font-semibold"
                style={{ color: C.textPrimary }}
              >
                Edit category
              </h2>
              <button
                onClick={() => setEditingId(null)}
                className="text-sm"
                style={{ color: C.textSecondary }}
              >
                Cancel
              </button>
            </div>
            <form
              action={upsertCategoryAction}
              onSubmit={() => setTimeout(() => setEditingId(null), 100)}
              className="grid gap-4"
            >
              <input name="id" type="hidden" value={editingCategory.id} />
              <label className="grid gap-1">
                <span
                  className="text-xs font-medium"
                  style={{ color: C.textSecondary }}
                >
                  Label
                </span>
                <input
                  name="label"
                  defaultValue={editingCategory.label}
                  required
                  className="min-h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
                  style={{ borderColor: C.cardBorder, color: C.textPrimary }}
                />
              </label>
              <label className="grid gap-1">
                <span
                  className="text-xs font-medium"
                  style={{ color: C.textSecondary }}
                >
                  Description
                </span>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={editingCategory.description ?? ""}
                  className="rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
                  style={{ borderColor: C.cardBorder, color: C.textPrimary }}
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="grid gap-1">
                  <span
                    className="text-xs font-medium"
                    style={{ color: C.textSecondary }}
                  >
                    Sort order
                  </span>
                  <input
                    name="sort_order"
                    type="number"
                    defaultValue={editingCategory.sort_order}
                    className="min-h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
                    style={{ borderColor: C.cardBorder, color: C.textPrimary }}
                  />
                </label>
                <label className="grid gap-1">
                  <span
                    className="text-xs font-medium"
                    style={{ color: C.textSecondary }}
                  >
                    Status
                  </span>
                  <select
                    name="is_active"
                    defaultValue={String(editingCategory.is_active)}
                    className="min-h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
                    style={{ borderColor: C.cardBorder, color: C.textPrimary }}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </label>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="min-h-10 rounded-lg border px-4 text-sm font-medium"
                  style={{ borderColor: C.cardBorder, color: C.textPrimary }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-10 rounded-lg px-4 text-sm font-medium text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: C.accent }}
                >
                  Save changes
                </button>
              </div>
            </form>
            <form action={deleteCategoryAction} className="mt-3">
              <input name="id" type="hidden" value={editingCategory.id} />
              <button
                type="submit"
                className="min-h-10 w-full rounded-lg px-4 text-sm font-medium text-white transition-all hover:opacity-90"
                style={{ backgroundColor: C.error }}
              >
                Delete category
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {/* Table */}
      <div
        className="overflow-hidden rounded-xl border"
        style={{ borderColor: C.cardBorder }}
      >
        <table className="w-full text-sm" style={{ color: C.textPrimary }}>
          <thead>
            <tr style={{ backgroundColor: "#f8fafc" }}>
              <th
                className="px-4 py-3 text-left font-medium text-xs uppercase tracking-wider"
                style={{ color: C.textSecondary }}
              >
                ID
              </th>
              <th
                className="px-4 py-3 text-left font-medium text-xs uppercase tracking-wider"
                style={{ color: C.textSecondary }}
              >
                Label
              </th>
              <th
                className="px-4 py-3 text-left font-medium text-xs uppercase tracking-wider"
                style={{ color: C.textSecondary }}
              >
                Status
              </th>
              <th
                className="px-4 py-3 text-right font-medium text-xs uppercase tracking-wider"
                style={{ color: C.textSecondary }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: C.cardBorder }}>
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-sm"
                  style={{ color: C.textSecondary }}
                >
                  No categories yet. Click &quot;Add category&quot; to create
                  one.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr
                  key={cat.id}
                  className="transition-colors hover:bg-[#f8fafc]"
                >
                  <td
                    className="px-4 py-3 font-mono text-xs"
                    style={{ color: C.textSecondary }}
                  >
                    {cat.id}
                  </td>
                  <td className="px-4 py-3 font-medium">{cat.label}</td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor: cat.is_active ? "#dcfce7" : "#f1f5f9",
                        color: cat.is_active ? "#166534" : "#64748b",
                      }}
                    >
                      {cat.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setEditingId(cat.id)}
                      className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-all hover:opacity-80"
                      style={{
                        color: C.accent,
                        backgroundColor: C.accentLight,
                      }}
                    >
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
