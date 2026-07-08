import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-purple-400/20 bg-[var(--background-elevated)]">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-brand flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/35 bg-purple-500/12 text-sm font-bold text-cyan-100">
              DM
            </span>
            <span className="font-brand text-lg font-semibold text-white">
              DiaMart
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            DiaMart is a Roblox item marketplace for multiple games, with honest
            stock, and fast admin-assisted delivery.
          </p>
          <p className="mt-4 text-xs leading-5 text-slate-500">
            DiaMart is not affiliated with, endorsed by, or sponsored by Roblox
            Corporation.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Store</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>
              <Link className="transition hover:text-white" href="/#games">
                Games
              </Link>
            </li>
            <li>
              <Link
                className="transition hover:text-white"
                href="/#best-sellers"
              >
                Best sellers
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" href="/#trending">
                Trending
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white">Support</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>
              <a
                className="transition hover:text-white"
                href={siteConfig.discordSupportUrl}
                target="_blank"
                rel="noreferrer"
              >
                Discord
              </a>
            </li>
            <li>
              <a
                className="transition hover:text-white"
                href={siteConfig.telegramSupportUrl}
                target="_blank"
                rel="noreferrer"
              >
                Telegram
              </a>
            </li>
            <li>
              <Link className="transition hover:text-white" href="/#faq">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
