import { useEffect, useId, useState } from "react";
import { siteConfig } from "@/config/site";
import type { SupportTopic } from "../types";

type SupportWidgetProps = {
  topics: SupportTopic[];
};

export function SupportWidget({ topics }: SupportWidgetProps) {
  const titleId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState(topics[0]?.id ?? "");
  const [showEscalation, setShowEscalation] = useState(false);
  const selectedTopic =
    topics.find((topic) => topic.id === selectedTopicId) ?? topics[0];
  const hasDiscordPlaceholder =
    siteConfig.discordSupportUrl.includes("example.com");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex max-w-[calc(100vw-2.5rem)] flex-col items-end gap-3">
      {isOpen ? (
        <section
          className="entrance-rise max-h-[min(72vh,620px)] w-[min(340px,calc(100vw-2.5rem))] overflow-y-auto rounded-[20px] border border-purple-400/22 bg-[var(--surface-elevated)] p-3 shadow-[0_18px_48px_rgba(0,0,0,0.44)] sm:w-[340px]"
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
        >
          <div className="flex items-start justify-between gap-3 border-b border-purple-400/18 pb-3">
            <div>
              <p className="font-strong text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
                Discord-first support
              </p>
              <h2
                className="mt-1 text-base font-semibold text-white"
                id={titleId}
              >
                DiaMart Support
              </h2>
            </div>
            <button
              className="btn-icon"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close support widget"
            >
              <svg
                className="icon-md icon-wrap"
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {!showEscalation ? (
            <div className="pt-4">
              <p className="text-sm leading-6 text-slate-300">
                Choose a topic and get routed toward the right support path.
              </p>
              <div className="mt-3 grid gap-2">
                {topics.map((topic) => (
                  <button
                    className={`rounded-[13px] border p-2.5 text-left transition ${
                      topic.id === selectedTopicId
                        ? "border-cyan-300/40 bg-cyan-400/10 text-white"
                        : "border-purple-400/20 bg-purple-500/8 text-slate-300 hover:border-cyan-300/30 hover:bg-cyan-400/10"
                    }`}
                    type="button"
                    key={topic.id}
                    onClick={() => setSelectedTopicId(topic.id)}
                  >
                    <span className="block text-sm font-semibold">
                      {topic.label}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-slate-400">
                      {topic.description}
                    </span>
                  </button>
                ))}
              </div>

              {selectedTopic ? (
                <div className="mt-3 rounded-[14px] border border-purple-400/20 bg-black/30 p-3 text-sm leading-6 text-slate-300">
                  {selectedTopic.response}
                </div>
              ) : null}

              <button
                className="btn-primary mt-3 min-h-11 w-full"
                type="button"
                onClick={() => setShowEscalation(true)}
              >
                Still need help
              </button>
            </div>
          ) : (
            <div className="pt-4">
              <h3 className="text-base font-semibold text-white">
                Continue with Discord support
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Discord is the preferred escalation channel for DiaMart support.
                Continue through Discord support for order questions, delivery
                timing, and issue escalation.
              </p>
              {hasDiscordPlaceholder ? (
                <p className="mt-3 rounded-[14px] border border-amber-300/25 bg-amber-300/10 p-3 text-sm leading-6 text-amber-50">
                  Placeholder Discord URL in use. Replace
                  `siteConfig.discordSupportUrl` before launch.
                </p>
              ) : null}
              <a
                className="btn-primary mt-3 flex min-h-11 items-center justify-center"
                href={siteConfig.discordSupportUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open Discord support
              </a>
              <a
                className="btn-secondary mt-2 flex min-h-11 items-center justify-center"
                href={siteConfig.telegramSupportUrl}
                target="_blank"
                rel="noreferrer"
              >
                Message @tuandarcy
              </a>
              <button
                className="btn-secondary mt-2 min-h-11 w-full"
                type="button"
                onClick={() => setShowEscalation(false)}
              >
                Back to topics
              </button>
            </div>
          )}
        </section>
      ) : null}

      <button
        className="btn-primary min-h-11 rounded-full px-4 shadow-[0_18px_40px_rgba(124,58,237,0.28)]"
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-label="Open support"
      >
        Support
      </button>
    </div>
  );
}
