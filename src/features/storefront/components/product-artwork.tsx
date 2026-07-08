/* eslint-disable @next/next/no-img-element */
import type { ImageRef, StorefrontProduct } from "../types";

type ProductArtworkProps = {
  image: ImageRef;
  label: string;
  category?: StorefrontProduct["category"];
  size?: "card" | "detail" | "proof";
};

const categoryAccent: Record<string, string> = {
  pets: "from-purple-400/26 via-fuchsia-700/18 to-cyan-500/12",
  seeds: "from-fuchsia-500/24 via-purple-700/18 to-black/30",
  gear: "from-cyan-400/20 via-purple-800/18 to-black/35",
};

export function ProductArtwork({
  image,
  label,
  category,
  size = "card",
}: ProductArtworkProps) {
  const isRemoteCompatible =
    image.src.startsWith("http") || image.src.startsWith("/");
  const initials = label
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  const sizeClass =
    size === "detail"
      ? "min-h-[260px]"
      : size === "proof"
        ? "h-16 w-16"
        : "h-44";
  const accentClass = category
    ? (categoryAccent[category.id] ?? categoryAccent.gear)
    : "from-purple-400/22 via-fuchsia-700/16 to-cyan-500/12";

  if (isRemoteCompatible) {
    return (
      <img
        src={image.src}
        alt={image.alt}
        className={`${sizeClass} w-full rounded-[18px] border border-white/10 object-cover`}
      />
    );
  }

  return (
    <div
      aria-label={image.alt}
      className={`${sizeClass} relative flex overflow-hidden rounded-[18px] border border-purple-400/20 bg-gradient-to-br ${accentClass}`}
      role="img"
    >
      <div className="absolute inset-4 rounded-[16px] border border-purple-300/12 bg-black/20" />
      <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-fuchsia-500/14 blur-2xl" />
      <div className="absolute -bottom-10 left-6 h-28 w-28 rounded-full bg-cyan-400/12 blur-2xl" />
      <div className="font-heading relative m-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-purple-300/20 bg-black/50 text-xl font-semibold text-white shadow-[0_18px_48px_rgba(0,0,0,0.3)]">
        {initials}
      </div>
    </div>
  );
}
