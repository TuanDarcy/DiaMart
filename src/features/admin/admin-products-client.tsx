"use client";

import { useState } from "react";
import type { AdminProduct, AdminCategory, AdminGame } from "@/services/admin/admin-dashboard-service";
import { upsertProductAction, deleteProductAction, upsertCategoryAction } from "./admin-actions";

const C = {
  accent: "#3b82f6", accentLight: "#eff6ff", error: "#ef4444",
  cardBorder: "#e2e8f0", textPrimary: "#0f172a", textSecondary: "#64748b",
};

export function AdminProductsClient({ products: initial, categories, games }: {
  products: AdminProduct[];
  categories: AdminCategory[];
  games: AdminGame[];
}) {
  const [products, setProducts] = useState(initial);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showNewCat, setShowNewCat] = useState(false);
  const [cats, setCats] = useState(categories);
  const editProduct = products.find(p => p.id === editingId) ?? null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: C.textPrimary }}>Products</h1>
          <p className="text-sm" style={{ color: C.textSecondary }}>{products.length} products</p>
        </div>
        <button onClick={() => setShowCreate(true)}
          className="inline-flex min-h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium text-white transition-all hover:opacity-90"
          style={{ backgroundColor: C.accent }}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add product
        </button>
      </div>

      {/* Quick-create category modal */}
      {showNewCat ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border bg-white p-6 shadow-lg" style={{ borderColor: C.cardBorder }}>
            <h2 className="mb-4 text-lg font-semibold" style={{ color: C.textPrimary }}>New category</h2>
            <form action={upsertCategoryAction} onSubmit={() => { setTimeout(() => { setShowNewCat(false); window.location.reload(); }, 200); }}
              className="grid gap-3">
              <Field name="label" label="Category name" required />
              <Field name="description" label="Description" />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowNewCat(false)}
                  className="min-h-10 rounded-lg border px-4 text-sm font-medium"
                  style={{ borderColor: C.cardBorder, color: C.textPrimary }}>Cancel</button>
                <button type="submit" className="min-h-10 rounded-lg px-4 text-sm font-medium text-white"
                  style={{ backgroundColor: C.accent }}>Create</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {/* Create modal */}
      {showCreate ? (
        <Modal onClose={() => setShowCreate(false)} title="New product">
          <ProductForm action={upsertProductAction} onDone={() => setShowCreate(false)}
            categories={cats} games={games} onNewCategory={() => setShowNewCat(true)} />
        </Modal>
      ) : null}

      {/* Edit modal */}
      {editProduct ? (
        <Modal onClose={() => setEditingId(null)} title="Edit product">
          <ProductForm action={upsertProductAction} product={editProduct} onDone={() => setEditingId(null)}
            categories={cats} games={games} onNewCategory={() => setShowNewCat(true)} />
          <form action={deleteProductAction} className="mt-3">
            <input name="id" type="hidden" value={editProduct.id} />
            <button type="submit" className="min-h-10 w-full rounded-lg px-4 text-sm font-medium text-white"
              style={{ backgroundColor: C.error }}>Delete product</button>
          </form>
        </Modal>
      ) : null}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border" style={{ borderColor: C.cardBorder }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "#f8fafc" }}>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: C.textSecondary }}>Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: C.textSecondary }}>Game</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: C.textSecondary }}>Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: C.textSecondary }}>Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: C.textSecondary }}>Image</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: C.textSecondary }}>Status</th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase" style={{ color: C.textSecondary }}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: C.cardBorder }}>
            {products.map(p => (
              <tr key={p.id} className="transition-colors hover:bg-[#f8fafc]">
                <td className="px-4 py-3 font-medium" style={{ color: C.textPrimary }}>{p.name}</td>
                <td className="px-4 py-3" style={{ color: C.textSecondary }}>{p.game_id}</td>
                <td className="px-4 py-3" style={{ color: C.textSecondary }}>{p.category_id}</td>
                <td className="px-4 py-3 font-medium">${p.price_usd}</td>
                <td className="px-4 py-3">
                  {p.image_src ? (
                    <img src={p.image_src} alt={p.image_alt ?? p.name} className="h-10 w-10 rounded-lg object-cover" />
                  ) : <span className="text-xs" style={{ color: C.textSecondary }}>—</span>}
                </td>
                <td className="px-4 py-3"><Badge active={p.is_active} /></td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setEditingId(p.id)}
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium"
                    style={{ color: C.accent, backgroundColor: C.accentLight }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductForm({ action, product, onDone, categories, games, onNewCategory }: {
  action: (d: FormData) => void;
  product?: AdminProduct;
  onDone: () => void;
  categories: AdminCategory[];
  games: AdminGame[];
  onNewCategory: () => void;
}) {
  const [imgPreview, setImgPreview] = useState(product?.image_src ?? "");

  return (
    <form action={action} onSubmit={() => setTimeout(onDone, 100)} className="grid gap-4">
      {product ? <input name="id" type="hidden" value={product.id} /> : null}
      <input name="slug" type="hidden" value={product?.slug ?? ""} />

      <Field name="name" label="Product name" defaultValue={product?.name} required />
      <Field name="description" label="Description" defaultValue={product?.description} />

      <div className="grid grid-cols-2 gap-3">
        <label className="grid gap-1">
          <span className="text-xs font-medium" style={{ color: C.textSecondary }}>Game</span>
          <select name="game_id" defaultValue={product?.game_id ?? ""} required
            className="min-h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
            style={{ borderColor: C.cardBorder, color: C.textPrimary }}>
            <option value="">Select game</option>
            {games.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
        </label>

        <label className="grid gap-1">
          <span className="text-xs font-medium" style={{ color: C.textSecondary }}>
            Category
            <button type="button" onClick={onNewCategory}
              className="ml-2 text-xs underline" style={{ color: C.accent }}>+ new</button>
          </span>
          <select name="category_id" defaultValue={product?.category_id ?? ""} required
            className="min-h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
            style={{ borderColor: C.cardBorder, color: C.textPrimary }}>
            <option value="">Select category</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field name="price_usd" label="Price (USD)" type="number" defaultValue={product?.price_usd ?? 0} />
        <Field name="original_price_usd" label="Original price" type="number" defaultValue={product?.original_price_usd} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field name="stock_status" label="Stock status" defaultValue={product?.stock_status ?? "in-stock"} />
        <Field name="stock_quantity" label="Stock qty" type="number" defaultValue={product?.stock_quantity} />
      </div>

      <Field name="delivery_speed" label="Delivery speed" defaultValue={product?.delivery_speed ?? "~5-30 min"} />

      <label className="grid gap-1">
        <span className="text-xs font-medium" style={{ color: C.textSecondary }}>Image URL</span>
        <input name="image_src" value={imgPreview} onChange={e => setImgPreview(e.target.value)}
          placeholder="https://example.com/image.png"
          className="min-h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
          style={{ borderColor: C.cardBorder, color: C.textPrimary }} />
        {imgPreview ? (
          <img src={imgPreview} alt="Preview" className="mt-1 h-16 w-16 rounded-lg object-cover" />
        ) : null}
        <p className="text-xs" style={{ color: C.textSecondary }}>
          Paste .png or .jpg URL. Free hosts: imgur, postimages, or direct CDN.
        </p>
      </label>

      <Field name="image_alt" label="Image alt text" defaultValue={product?.image_alt} />
      <Field name="badge" label="Badge" defaultValue={product?.badge} />
      <Field name="sort_order" label="Sort order" type="number" defaultValue={product?.sort_order ?? 0} />

      <div className="grid grid-cols-2 gap-3">
        <label className="flex items-center gap-2 text-sm" style={{ color: C.textSecondary }}>
          <input type="checkbox" name="featured" defaultChecked={product?.featured} /> featured
        </label>
        <label className="flex items-center gap-2 text-sm" style={{ color: C.textSecondary }}>
          <input type="checkbox" name="popular" defaultChecked={product?.popular} /> popular
        </label>
        <label className="flex items-center gap-2 text-sm" style={{ color: C.textSecondary }}>
          <input type="checkbox" name="trending" defaultChecked={product?.trending} /> trending
        </label>
        <label className="flex items-center gap-2 text-sm" style={{ color: C.textSecondary }}>
          <input type="checkbox" name="best_seller" defaultChecked={product?.best_seller} /> best seller
        </label>
      </div>

      <label className="grid gap-1">
        <span className="text-xs font-medium" style={{ color: C.textSecondary }}>Status</span>
        <select name="is_active" defaultValue={String(product?.is_active ?? true)}
          className="min-h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
          style={{ borderColor: C.cardBorder, color: C.textPrimary }}>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </label>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onDone}
          className="min-h-10 rounded-lg border px-4 text-sm font-medium"
          style={{ borderColor: C.cardBorder, color: C.textPrimary }}>Cancel</button>
        <button type="submit" className="min-h-10 rounded-lg px-4 text-sm font-medium text-white"
          style={{ backgroundColor: C.accent }}>{product ? "Save changes" : "Create product"}</button>
      </div>
    </form>
  );
}

function Field({ name, label, defaultValue, type = "text", required = false }: {
  name: string; label: string; defaultValue?: string | number | null; type?: string; required?: boolean;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-medium" style={{ color: C.textSecondary }}>{label}</span>
      <input name={name} defaultValue={defaultValue ?? ""} type={type} required={required}
        className="min-h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
        style={{ borderColor: C.cardBorder, color: C.textPrimary }} />
    </label>
  );
}

function Badge({ active }: { active: boolean }) {
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{ backgroundColor: active ? "#dcfce7" : "#f1f5f9", color: active ? "#166534" : "#64748b" }}>
      {active ? "Active" : "Inactive"}
    </span>
  );
}

function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-xl border bg-white p-6 shadow-lg max-h-[90vh] overflow-y-auto"
        style={{ borderColor: C.cardBorder }}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold" style={{ color: C.textPrimary }}>{title}</h2>
          <button onClick={onClose} className="text-sm" style={{ color: C.textSecondary }}>Cancel</button>
        </div>
        {children}
      </div>
    </div>
  );
}
