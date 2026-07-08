"use client";

import Link from "next/link";
import { useState } from "react";

type SiteHeaderProps = {
  cartItemCount: number;
  onCartClick: () => void;
};

const navLinks = [
  { href: "/#games", label: "Games" },
  { href: "/#trending", label: "Trending", live: true },
  { href: "/#delivery", label: "Delivery proof", live: true },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader({ cartItemCount, onCartClick }: SiteHeaderProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-purple-400/20 bg-[rgba(7,7,10,0.9)] backdrop-blur-xl">
      <div className="container-shell flex min-h-16 items-center justify-between gap-4 py-3">
        <Link
          className="flex items-center gap-3"
          href="/"
          aria-label="DiaMart home"
        >
          <span className="font-brand flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/35 bg-purple-500/12 text-sm font-bold text-cyan-100">
            DM
          </span>
          <span className="font-brand text-lg font-semibold tracking-normal text-white">
            DiaMart
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-purple-500/10 hover:text-white"
              href={link.href}
              key={link.href}
            >
              {link.label}
              {"live" in link && link.live ? (
                <span className="font-strong ml-2 inline-flex items-center gap-1 rounded-full bg-[#14f1c9] px-2 py-0.5 text-[10px] uppercase text-slate-950">
                  <span className="live-pulse h-1.5 w-1.5 rounded-full bg-slate-950" />{" "}
                  live
                </span>
              ) : null}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            className="btn-secondary relative min-h-10 px-4"
            type="button"
            onClick={onCartClick}
            aria-label={`Open cart with ${cartItemCount} items`}
          >
            Cart
            {cartItemCount > 0 ? (
              <span className="font-strong ml-2 rounded-full bg-[#14f1c9] px-2 py-0.5 text-xs font-semibold text-slate-950">
                {cartItemCount}
              </span>
            ) : null}
          </button>
          <Link
            className="btn-secondary hidden min-h-10 px-4 md:flex"
            href="/login"
          >
            Login
          </Link>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-purple-500/8 text-slate-300 md:hidden"
            type="button"
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileNavOpen((value) => !value)}
            aria-label="Toggle navigation menu"
          >
            <span aria-hidden="true">☰</span>
          </button>
        </div>
      </div>

      {isMobileNavOpen ? (
        <nav
          className="container-shell grid gap-2 border-t border-purple-400/20 pb-4 md:hidden"
          id="mobile-navigation"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <a
              className="rounded-[14px] border border-purple-400/20 bg-purple-500/8 px-4 py-3 text-sm font-medium text-slate-200"
              href={link.href}
              key={link.href}
              onClick={() => setIsMobileNavOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link
            className="rounded-[14px] border border-purple-400/20 bg-purple-500/8 px-4 py-3 text-sm font-medium text-slate-200"
            href="/login"
            onClick={() => setIsMobileNavOpen(false)}
          >
            Login
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
