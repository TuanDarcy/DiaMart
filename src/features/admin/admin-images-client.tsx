"use client";

import { useState } from "react";
import { uploadStorefrontImageAction } from "./admin-actions";

export function AdminImagesClient(_props: { session: unknown }) {
  const [uploadedUrl] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold" style={{ color: "#0f172a" }}>Image tools</h1>
        <p className="mt-1 text-sm" style={{ color: "#64748b" }}>
          Upload images to Supabase Storage or paste a public URL directly into the image_src field.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6" style={{ borderColor: "#e2e8f0" }}>
        <form
          action={uploadStorefrontImageAction}
          onSubmit={() => setTimeout(() => location.reload(), 500)}
          className="flex flex-wrap gap-3"
        >
          <input
            className="min-h-10 flex-1 rounded-lg border px-3 text-sm"
            style={{ borderColor: "#e2e8f0" }}
            name="imageFile"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            required
          />
          <button
            type="submit"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "#3b82f6" }}
          >
            Upload image
          </button>
        </form>

        {uploadedUrl ? (
          <div className="mt-3 rounded-lg border p-3 text-sm" style={{ borderColor: "#e2e8f0", backgroundColor: "#eff6ff" }}>
            <p className="font-semibold" style={{ color: "#0f172a" }}>Uploaded URL</p>
            <p className="mt-1 break-all" style={{ color: "#3b82f6" }}>{uploadedUrl}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
