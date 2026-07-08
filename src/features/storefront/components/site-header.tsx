"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

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
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [displayBalance, setDisplayBalance] = useState<string>("$0.00");
  const [dismissDiscordPopup, setDismissDiscordPopup] = useState(false);

  const canUseSupabase =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const urlParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;
  const flashLogin = urlParams?.get("flash");
  const discordStatus = urlParams?.get("discord");
  const discordLinked = discordStatus === "linked";
  const showDiscordPopup = flashLogin === "login_success" && !dismissDiscordPopup;

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      if (!canUseSupabase || typeof window === "undefined") {
        setIsLoadingSession(false);
        return;
      }

      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!isMounted) {
        return;
      }

      if (!user) {
        setDisplayName(null);
        setIsAdmin(false);
        setDisplayBalance("$0.00");
        setIsLoadingSession(false);
        return;
      }

      const metadata = user.user_metadata ?? {};
      const usernameFromMeta =
        typeof metadata.username === "string" ? metadata.username : null;
      const emailUsername = user.email?.split("@")[0] ?? "User";

      setDisplayName(usernameFromMeta || emailUsername);

      const balanceValue =
        typeof metadata.balanceUsd === "number"
          ? metadata.balanceUsd
          : Number(metadata.balanceUsd ?? 0);
      const normalizedBalance = Number.isFinite(balanceValue) ? balanceValue : 0;
      setDisplayBalance(
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(normalizedBalance),
      );

      const { data: adminRow, error } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .maybeSingle();

      if (!isMounted) {
        return;
      }

      if (error) {
        console.error("[site-header] Admin check failed", error);
      }

      setIsAdmin(Boolean(adminRow));
      setIsLoadingSession(false);
    }

    void loadSession();

    return () => {
      isMounted = false;
    };
  }, [canUseSupabase]);

  useEffect(() => {
    if (showDiscordPopup) {
      const timeout = window.setTimeout(() => {
        setDismissDiscordPopup(true);
      }, 6200);

      return () => window.clearTimeout(timeout);
    }

    return undefined;
  }, [showDiscordPopup]);

  async function signOut() {
    if (!canUseSupabase) {
      window.location.href = "/";
      return;
    }

    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

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
          {!isLoadingSession && displayName ? (
            <div className="hidden items-center gap-2 md:flex">
              <div className="rounded-[12px] border border-cyan-300/30 bg-cyan-400/8 px-3 py-1.5 text-right">
                <p className="flex items-center justify-end gap-1 text-xs text-cyan-100">
                  <span aria-hidden="true">👤</span>
                  <span className="font-semibold">{displayName}</span>
                </p>
                <p className="font-strong text-sm text-[#14f1c9]">{displayBalance}</p>
              </div>
              {isAdmin ? (
                <Link className="btn-secondary min-h-10 px-3" href="/admin">
                  <span aria-hidden="true">⚙</span>
                  <span className="ml-1">Admin</span>
                </Link>
              ) : null}
              <button className="btn-secondary min-h-10 px-3" type="button" onClick={signOut}>
                Logout
              </button>
            </div>
          ) : (
            <Link
              className="btn-secondary hidden min-h-10 px-4 md:flex"
              href="/login"
            >
              Login
            </Link>
          )}
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
            href={displayName ? "/" : "/login"}
            onClick={() => setIsMobileNavOpen(false)}
          >
            {displayName ? `Signed in: ${displayName}` : "Login"}
          </Link>
          {displayName ? (
            <button
              className="rounded-[14px] border border-purple-400/20 bg-purple-500/8 px-4 py-3 text-left text-sm font-medium text-slate-200"
              type="button"
              onClick={() => {
                setIsMobileNavOpen(false);
                void signOut();
              }}
            >
              Logout
            </button>
          ) : null}
        </nav>
      ) : null}

      {showDiscordPopup ? (
        <div className="pointer-events-none fixed bottom-4 right-4 z-50 max-w-sm rounded-[16px] border border-cyan-300/35 bg-[var(--surface-elevated)] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <p className="font-strong text-sm text-cyan-100">Account linked notification</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {discordLinked
              ? "Your Discord account is linked to your shop account. After checkout, our bot can create a ticket, invite you to the support server, and tag your Discord profile automatically."
              : "Login completed. Link your Discord account to sync web orders with our support bot and automatic ticket routing."}
          </p>
        </div>
      ) : null}
    </header>
  );
}
