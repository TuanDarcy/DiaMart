"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import type {
  FAQItem,
  StorefrontGame,
  StorefrontProduct,
  SupportTopic,
} from "./types";
import { sampleDeliveryProofs } from "./mock-data";
import { AuthPrompt } from "./components/auth-prompt";
import { DeliveryProofPopup } from "./components/delivery-proof-popup";
import { GameCarousel } from "./components/game-carousel";
import { Product3DCarousel } from "./components/product-3d-carousel";
import { SectionHeader } from "./components/section-header";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { SupportWidget } from "./components/support-widget";

type HomePageProps = {
  games: StorefrontGame[];
  products: StorefrontProduct[];
  bestSellerProducts: StorefrontProduct[];
  trendingProducts: StorefrontProduct[];
  faqs: FAQItem[];
  supportTopics: SupportTopic[];
};

export function HomePage({
  games,
  products,
  bestSellerProducts,
  trendingProducts,
  faqs,
  supportTopics,
}: HomePageProps) {
  const [isAuthPromptOpen, setIsAuthPromptOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <div className="border-b border-purple-400/20 bg-[var(--background-elevated)] px-4 py-2 text-center text-xs font-medium text-slate-300 sm:text-sm">
        Fast admin-assisted delivery, secure transactions, and responsive
        support.
      </div>

      <SiteHeader
        cartItemCount={0}
        onCartClick={() => setIsAuthPromptOpen(true)}
      />

      <main>
        <section
          className="container-shell pt-6 sm:pt-8"
          aria-labelledby="hero-title"
        >
          <div className="entrance-rise grid gap-6 py-6 sm:py-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="font-strong inline-flex rounded-full border border-cyan-300/35 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
                DiaMart · Roblox item marketplace
              </p>
              <h1
                className="font-heading mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl"
                id="hero-title"
              >
                Buy <span className="text-[#14f1c9]">Roblox items</span> across
                your favorite games.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Shop trusted items for Grow a Garden 2, Blox Fruits, Adopt Me,
                Murder Mystery 2, and Grand Piece Online. Clear USD prices,
                honest stock, and fast admin-assisted delivery.
              </p>
              <div className="mt-5 grid max-w-xl grid-cols-3 gap-3">
                {[
                  [`${games.length}`, "games"],
                  [`${products.length}`, "items listed"],
                  ["4.8★", "buyer rating"],
                ].map(([value, label]) => (
                  <div
                    className="border-l border-purple-400/20 pl-3 first:border-l-0 first:pl-0"
                    key={label}
                  >
                    <p className="font-strong text-2xl font-bold text-white sm:text-3xl">
                      {value}
                    </p>
                    <p className="font-strong mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a className="btn-primary min-h-12 px-6" href="#games">
                  Choose a game
                </a>
                <a className="btn-secondary min-h-12 px-6" href="#best-sellers">
                  See best sellers
                </a>
              </div>
            </div>

            <div className="surface-panel-strong rounded-[24px] p-4">
              <HeroProofCard />
            </div>
          </div>
        </section>

        <section className="container-shell section-gap" id="games">
          <GameCarousel games={games} />
        </section>

        <section className="section-gap" id="best-sellers">
          <div className="container-shell">
            <SectionHeader
              eyebrow="Best sellers"
              title="Top-selling items across every game"
              description="Popular items with clear prices, discounts, and live stock, gliding through a slow loop."
            />
          </div>
          <Product3DCarousel products={bestSellerProducts} />
        </section>

        <section className="section-gap" id="trending">
          <div className="container-shell">
            <SectionHeader
              eyebrow="Trending"
              title="Trending item picks right now"
              description="Items buyers are watching across games — with live stock and clear pricing."
            />
          </div>
          <Product3DCarousel products={trendingProducts} showTrendingBadge />
        </section>

        <TrustSection />
        <HowItWorks />
        <DeliveryProofSection />
        <FAQSection faqs={faqs} />
        <SupportEntry />
      </main>

      <SiteFooter />
      <SupportWidget topics={supportTopics} />
      <DeliveryProofPopup />
      <AuthPrompt
        isOpen={isAuthPromptOpen}
        onClose={() => setIsAuthPromptOpen(false)}
      />
    </div>
  );
}

function HeroProofCard() {
  const proof = sampleDeliveryProofs[0];

  if (!proof) {
    return null;
  }

  return (
    <div className="rounded-[20px] border border-purple-400/20 bg-black/25 p-4">
      <div className="flex items-center justify-between gap-4 border-b border-purple-400/18 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-400/10 text-cyan-100">
            ✓
          </span>
          <div>
            <p className="font-heading text-lg font-semibold text-white">
              Order delivered
            </p>
            <p className="text-sm text-slate-400">
              Photo proof attached · verified
            </p>
          </div>
        </div>
        <span className="font-strong inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
          <span className="live-pulse h-2 w-2 rounded-full bg-[#14f1c9]" /> live
        </span>
      </div>

      {proof.image ? (
        <div className="mt-4 flex h-[120px] items-center justify-center overflow-hidden rounded-[14px] border border-purple-400/18 bg-black/30">
          {proof.image.src.startsWith("http") ||
          proof.image.src.startsWith("/") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={proof.image.src}
              alt={proof.image.alt}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-xs text-slate-500">
              Proof photo — image will appear here
            </span>
          )}
        </div>
      ) : (
        <div className="mt-4 flex h-[120px] items-center justify-center rounded-[14px] border border-dashed border-purple-400/30 bg-black/25">
          <span className="text-xs text-slate-500">
            Proof photo will appear here
          </span>
        </div>
      )}

      <div className="mt-4">
        <p className="font-strong text-base font-semibold text-white">
          {proof.itemName}
        </p>
        <p className="mt-1 text-sm text-slate-400">
          {proof.gameName} · {proof.itemCategory} · {proof.relativeTime}
        </p>
      </div>
      <div className="mt-3 border-t border-purple-400/18 pt-3 text-xs text-slate-500">
        Delivered for {proof.anonymizedCustomer}. Customer identity stays
        anonymized.
      </div>
    </div>
  );
}

function TrustSection() {
  const cards = [
    [
      "Clear, upfront pricing",
      "Every item shows a clear USD price, any discount, and current stock before you order.",
    ],
    [
      "Secure transactions",
      "Payments and customer data are handled with strong security and careful encryption.",
    ],
    [
      "Fast admin-assisted delivery",
      "Orders are created automatically in Discord and delivered from 5 minutes up to 1 hour.",
    ],
    [
      "Real support access",
      "Reach an admin through Discord tickets or Telegram whenever you need help.",
    ],
  ];

  return (
    <section
      className="container-shell section-gap"
      aria-labelledby="trust-title"
    >
      <SectionHeader
        eyebrow="Why DiaMart"
        title="Professional service built on clarity and trust."
        description="DiaMart focuses on transparent pricing, secure handling, and dependable delivery instead of pressure tactics."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(([title, copy]) => (
          <div
            className="surface-panel entrance-soft rounded-[20px] p-5"
            key={title}
          >
            <h3
              className="font-semibold text-white"
              id={title === cards[0][0] ? "trust-title" : undefined}
            >
              {title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ["Choose a game", "Pick from the supported Roblox games in the store."],
    [
      "Select items",
      "Browse that game's catalog and choose the items you want.",
    ],
    ["Login & order", "Sign in, then place your order to start delivery."],
    [
      "Get delivered",
      "Delivery is coordinated automatically in Discord, usually within the hour.",
    ],
  ];

  return (
    <section
      className="container-shell section-gap"
      aria-labelledby="how-title"
    >
      <SectionHeader
        eyebrow="Process"
        title="How DiaMart works"
        description="A simple flow for buying Roblox game items: choose a game, select items, login, and receive fast delivery."
      />
      <div className="grid gap-4 md:grid-cols-4">
        {steps.map(([title, copy], index) => (
          <div
            className="surface-panel entrance-soft rounded-[20px] p-5"
            key={title}
          >
            <span className="font-strong flex h-9 w-9 items-center justify-center rounded-full bg-[#14f1c9] text-sm font-bold text-slate-950">
              {index + 1}
            </span>
            <h3
              className="mt-4 font-semibold text-white"
              id={index === 0 ? "how-title" : undefined}
            >
              {title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function DeliveryProofSection() {
  const proof = sampleDeliveryProofs[0];

  return (
    <section
      className="container-shell section-gap"
      id="delivery"
      aria-labelledby="proof-title"
    >
      <div className="surface-panel-strong entrance-rise grid gap-5 rounded-[24px] p-5 md:grid-cols-[1fr_0.8fr] md:items-center">
        <div>
          <p className="font-strong text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-300">
            Delivery proof
          </p>
          <h2
            className="font-heading mt-2 text-2xl font-semibold text-white sm:text-3xl"
            id="proof-title"
          >
            Every delivery is logged with proof.
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
            Deliveries are documented so buyers can trust the handoff. Customer
            identities stay anonymized and proof stays tied to completed orders.
          </p>
        </div>
        {proof ? (
          <div className="rounded-[20px] border border-fuchsia-300/22 bg-fuchsia-500/10 p-4">
            <span className="font-strong rounded-full border border-fuchsia-300/30 bg-fuchsia-500/10 px-2.5 py-1 text-xs font-semibold text-fuchsia-100">
              Recent delivery
            </span>
            <p className="mt-4 font-semibold text-white">{proof.itemName}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {proof.gameName} · {proof.itemCategory} · {proof.relativeTime}
            </p>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Delivered for {proof.anonymizedCustomer}. No personal information
              is shown.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function FAQSection({ faqs }: { faqs: FAQItem[] }) {
  return (
    <section
      className="container-shell section-gap"
      id="faq"
      aria-labelledby="faq-title"
    >
      <SectionHeader
        eyebrow="FAQ"
        title="Answers about delivery, payment, and support"
        description="Clear guidance on how DiaMart delivers items, handles payments, and provides support."
      />
      <div className="grid gap-3">
        {faqs.map((faq) => (
          <article className="surface-panel rounded-[18px] p-5" key={faq.id}>
            <h3 className="font-strong text-base font-semibold text-white">
              {faq.question}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {faq.answer}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SupportEntry() {
  return (
    <section
      className="container-shell section-gap"
      id="support"
      aria-labelledby="support-title"
    >
      <div className="surface-panel rounded-[24px] p-5 sm:p-6">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="font-strong text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-300">
              Support
            </p>
            <h2
              className="font-heading mt-2 text-2xl font-semibold text-white sm:text-3xl"
              id="support-title"
            >
              Talk to an admin on Discord or Telegram.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Create a Discord ticket for order help, or message the admin
              directly on Telegram for quick questions.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary min-h-12 px-6"
              href={siteConfig.discordSupportUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open Discord
            </a>
            <a
              className="btn-secondary min-h-12 px-6"
              href={siteConfig.telegramSupportUrl}
              target="_blank"
              rel="noreferrer"
            >
              Message on Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
