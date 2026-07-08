"use client";

import Link from "next/link";
import { type CSSProperties, useEffect, useState } from "react";
import type { StorefrontGame } from "../types";
import { ProductArtwork } from "./product-artwork";

type GameCarouselProps = {
  games: StorefrontGame[];
};

export function GameCarousel({ games }: GameCarouselProps) {
  const [index, setIndex] = useState(0);
  const total = games.length;

  useEffect(() => {
    if (total <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, 3800);

    return () => window.clearInterval(interval);
  }, [total]);

  function goNext() {
    setIndex((current) => (current + 1) % total);
  }

  function goPrev() {
    setIndex((current) => (current - 1 + total) % total);
  }

  const activeGame = games[index];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-center">
      <div className="relative mx-auto h-[300px] w-full max-w-[340px]">
        {games.map((game, gameIndex) => {
          const position = (gameIndex - index + total) % total;
          const isFront = position === 0;
          const isVisible = position < 3;

          const cardStyle: CSSProperties = {
            transform: `translateY(${position * 16}px) scale(${1 - position * 0.06})`,
            opacity: isVisible ? 1 - position * 0.25 : 0,
            zIndex: total - position,
            pointerEvents: isVisible ? "auto" : "none",
          };

          const content = (
            <>
              <ProductArtwork
                image={game.image}
                label={game.name}
                size="detail"
              />
              {isFront ? (
                <div className="mt-4">
                  <p className="font-strong text-xs uppercase tracking-[0.18em] text-cyan-200">
                    {game.tagline}
                  </p>
                  <h3 className="font-heading mt-1 text-xl font-semibold text-white">
                    {game.name}
                  </h3>
                </div>
              ) : null}
            </>
          );

          return (
            <div
              className="absolute inset-0 rounded-[22px] border border-purple-400/22 bg-[var(--surface-elevated)] p-4 shadow-[0_22px_60px_rgba(0,0,0,0.45)] transition-all duration-500 motion-reduce:transition-none"
              style={cardStyle}
              key={game.slug}
              aria-hidden={!isFront}
            >
              {isFront ? (
                <Link
                  className="block h-full focus:outline-none focus-visible:ring-4 focus-visible:ring-fuchsia-500/25"
                  href={`/games/${game.slug}`}
                >
                  {content}
                </Link>
              ) : (
                <button
                  className="block h-full w-full text-left"
                  type="button"
                  onClick={() => setIndex(gameIndex)}
                  tabIndex={-1}
                >
                  {content}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div>
        <p className="font-strong text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-300">
          Pick your game
        </p>
        <h2 className="font-heading mt-2 text-2xl font-semibold text-white sm:text-3xl">
          {total} game stores, one checkout experience.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
          Swipe through the game cards or let them auto-rotate. Open{" "}
          <span className="font-strong text-[#14f1c9]">{activeGame?.name}</span>{" "}
          to browse the items available for that game.
        </p>

        <div className="mt-5 flex items-center gap-3">
          <button
            className="btn-secondary min-h-11 px-4"
            type="button"
            onClick={goPrev}
            aria-label="Previous game"
          >
            ‹
          </button>
          <div className="flex gap-2" aria-hidden="true">
            {games.map((game, gameIndex) => (
              <span
                className={`h-2 w-2 rounded-full transition ${gameIndex === index ? "bg-[#14f1c9]" : "bg-slate-700"}`}
                key={game.slug}
              />
            ))}
          </div>
          <button
            className="btn-secondary min-h-11 px-4"
            type="button"
            onClick={goNext}
            aria-label="Next game"
          >
            ›
          </button>
          {activeGame ? (
            <Link
              className="btn-primary ml-auto min-h-11 px-5"
              href={`/games/${activeGame.slug}`}
            >
              Open store
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
