"use client";

import { useState } from "react";
import type { AdminGame } from "@/services/admin/admin-dashboard-service";
import { upsertGameAction, deleteGameAction } from "./admin-actions";

const C = {
  accent: "#3b82f6",
  accentLight: "#eff6ff",
  error: "#ef4444",
  cardBorder: "#e2e8f0",
  textPrimary: "#0f172a",
  textSecondary: "#64748b",
};

export function AdminGamesClient({ games: initial }: { games: AdminGame[] }) {
  const [games, setGames] = useState(initial);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const editGame = games.find((g) => g.id === editingId) ?? null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: C.textPrimary }}>
            Games
          </h1>
          <p className="text-sm" style={{ color: C.textSecondary }}>
            {games.length} games
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
          Add game
        </button>
      </div>

      {/* Create modal */}
      {showCreate ? (
        <Modal onClose={() => setShowCreate(false)} title="New game">
          <GameForm
            action={upsertGameAction}
            onDone={() => setShowCreate(false)}
          />
        </Modal>
      ) : null}

      {/* Edit modal */}
      {editGame ? (
        <Modal onClose={() => setEditingId(null)} title="Edit game">
          <GameForm
            action={upsertGameAction}
            game={editGame}
            onDone={() => setEditingId(null)}
          />
          <form action={deleteGameAction} className="mt-3">
            <input name="id" type="hidden" value={editGame.id} />
            <button
              type="submit"
              className="min-h-10 w-full rounded-lg px-4 text-sm font-medium text-white transition-all hover:opacity-90"
              style={{ backgroundColor: C.error }}
            >
              Delete game
            </button>
          </form>
        </Modal>
      ) : null}

      {/* Table */}
      <div
        className="overflow-hidden rounded-xl border"
        style={{ borderColor: C.cardBorder }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "#f8fafc" }}>
              <th
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: C.textSecondary }}
              >
                Name
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: C.textSecondary }}
              >
                Slug
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: C.textSecondary }}
              >
                Image
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: C.textSecondary }}
              >
                Status
              </th>
              <th
                className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider"
                style={{ color: C.textSecondary }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: C.cardBorder }}>
            {games.map((g) => (
              <tr key={g.id} className="transition-colors hover:bg-[#f8fafc]">
                <td
                  className="px-4 py-3 font-medium"
                  style={{ color: C.textPrimary }}
                >
                  {g.name}
                </td>
                <td className="px-4 py-3" style={{ color: C.textSecondary }}>
                  {g.slug}
                </td>
                <td className="px-4 py-3">
                  {g.image_src ? (
                    <img
                      src={g.image_src}
                      alt={g.image_alt ?? g.name}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                  ) : (
                    <span
                      className="text-xs"
                      style={{ color: C.textSecondary }}
                    >
                      —
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Badge active={g.is_active} />
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => setEditingId(g.id)}
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium"
                    style={{ color: C.accent, backgroundColor: C.accentLight }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GameForm({
  action,
  game,
  onDone,
}: {
  action: (d: FormData) => void;
  game?: AdminGame;
  onDone: () => void;
}) {
  const [imgPreview, setImgPreview] = useState(game?.image_src ?? "");
  const [uploading, setUploading] = useState(false);

  async function handleFileUpload(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.set("imageFile", file);
      const res = await fetch("/admin/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      if (url) setImgPreview(url);
    } catch (err) {
      console.error("[upload]", err);
    } finally {
      setUploading(false);
    }
  }

  return (
    <form
      action={action}
      onSubmit={() => setTimeout(onDone, 100)}
      className="grid gap-4"
    >
      {game ? <input name="id" type="hidden" value={game.id} /> : null}
      <input name="id" type="hidden" value={game?.id ?? ""} />
      <input name="slug" type="hidden" value={game?.slug ?? ""} />

      <Field name="name" label="Game name" defaultValue={game?.name} required />
      <Field name="tagline" label="Tagline" defaultValue={game?.tagline} />

      <label className="grid gap-1">
        <span
          className="text-xs font-medium"
          style={{ color: C.textSecondary }}
        >
          Image URL
        </span>
        <input
          name="image_src"
          value={imgPreview}
          onChange={(e) => setImgPreview(e.target.value)}
          placeholder="https://example.com/image.png"
          className="min-h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
          style={{ borderColor: C.cardBorder, color: C.textPrimary }}
        />
        {imgPreview ? (
          <img
            src={imgPreview}
            alt="Preview"
            className="mt-1 h-16 w-16 rounded-lg object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        ) : null}
        <div className="mt-2">
          <label
            className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border px-4 text-sm font-medium transition-all hover:opacity-80"
            style={{ borderColor: C.cardBorder, color: C.textPrimary, backgroundColor: "#fff" }}
          >
            {uploading ? "Uploading..." : "Upload file"}
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="sr-only"
              disabled={uploading}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) await handleFileUpload(file);
              }}
            />
          </label>
        </div>
      </label>

      <Field
        name="image_alt"
        label="Image alt text"
        defaultValue={game?.image_alt}
      />
      <div className="grid grid-cols-2 gap-3">
        <Field
          name="sort_order"
          label="Sort order"
          type="number"
          defaultValue={game?.sort_order ?? 0}
        />
        <label className="grid gap-1">
          <span
            className="text-xs font-medium"
            style={{ color: C.textSecondary }}
          >
            Status
          </span>
          <select
            name="is_active"
            defaultValue={String(game?.is_active ?? true)}
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
          onClick={onDone}
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
          {game ? "Save changes" : "Create game"}
        </button>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  defaultValue,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-medium" style={{ color: C.textSecondary }}>
        {label}
      </span>
      <input
        name={name}
        defaultValue={defaultValue ?? ""}
        type={type}
        required={required}
        className="min-h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
        style={{ borderColor: C.cardBorder, color: C.textPrimary }}
      />
    </label>
  );
}

function Badge({ active }: { active: boolean }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{
        backgroundColor: active ? "#dcfce7" : "#f1f5f9",
        color: active ? "#166534" : "#64748b",
      }}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}

function Modal({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div
        className="w-full max-w-lg rounded-xl border bg-white p-6 shadow-lg max-h-[90vh] overflow-y-auto"
        style={{ borderColor: C.cardBorder }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2
            className="text-lg font-semibold"
            style={{ color: C.textPrimary }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-sm"
            style={{ color: C.textSecondary }}
          >
            Cancel
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
