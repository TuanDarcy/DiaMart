import { useEffect, useRef, useState } from "react";
import type { DeliveryProofEvent } from "../types";
import { sampleDeliveryProofs } from "../mock-data";
import { ProductArtwork } from "./product-artwork";

const POPUP_VISIBLE_MS = 6200;
const POPUP_EXIT_MS = 340;
const POPUP_INTERVAL_MS = 30000;
const POPUP_INITIAL_DELAY_MS = 9000;

export function DeliveryProofPopup() {
  const [event, setEvent] = useState<DeliveryProofEvent | null>(null);
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const proofIndexRef = useRef(0);

  useEffect(() => {
    if (sampleDeliveryProofs.length === 0) {
      return;
    }

    function showNextProof() {
      const index = proofIndexRef.current % sampleDeliveryProofs.length;
      proofIndexRef.current += 1;
      setPhase("enter");
      setEvent(sampleDeliveryProofs[index] ?? sampleDeliveryProofs[0]);
    }

    const initialTimeout = window.setTimeout(
      showNextProof,
      POPUP_INITIAL_DELAY_MS,
    );
    const interval = window.setInterval(showNextProof, POPUP_INTERVAL_MS);

    return () => {
      window.clearTimeout(initialTimeout);
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!event) {
      return;
    }

    let removeTimeout: number | undefined;
    const visibleTimeout = window.setTimeout(() => {
      setPhase("exit");
      removeTimeout = window.setTimeout(() => setEvent(null), POPUP_EXIT_MS);
    }, POPUP_VISIBLE_MS);

    return () => {
      window.clearTimeout(visibleTimeout);
      if (removeTimeout !== undefined) {
        window.clearTimeout(removeTimeout);
      }
    };
  }, [event]);

  if (!event) {
    return null;
  }

  function dismiss() {
    setPhase("exit");
    window.setTimeout(() => setEvent(null), POPUP_EXIT_MS);
  }

  return (
    <aside
      className={`${phase === "enter" ? "proof-popup-enter" : "proof-popup-exit"} fixed bottom-24 left-4 right-4 z-30 mx-auto max-w-sm overflow-hidden rounded-[20px] border border-fuchsia-300/25 bg-[var(--surface-elevated)] p-3 shadow-[0_18px_48px_rgba(0,0,0,0.42)] sm:left-auto sm:right-6 sm:mx-0`}
      role="status"
      aria-live="polite"
    >
      <div className="flex gap-3">
        {event.image ? (
          <ProductArtwork
            image={event.image}
            label={event.itemName}
            size="proof"
          />
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <span className="font-strong rounded-full border border-cyan-300/30 bg-cyan-400/10 px-2 py-0.5 text-[11px] font-semibold text-cyan-100">
              Live proof
            </span>
            <button
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition hover:text-white"
              type="button"
              onClick={dismiss}
              aria-label="Dismiss delivery proof"
            >
              <svg
                className="icon-sm"
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
              Dismiss
            </button>
          </div>
          <p className="font-strong mt-2 truncate text-sm font-semibold text-white">
            {event.itemName}
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-300">
            {event.gameName} · {event.itemCategory} ·{" "}
            {event.deliveryStatus === "sample-delivered"
              ? "Delivered"
              : "Coordinating"}{" "}
            · {event.relativeTime}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Proof secured for {event.anonymizedCustomer}
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 h-0.5 w-full bg-fuchsia-950/70"
        aria-hidden="true"
      >
        <div className="proof-progress h-full w-full bg-gradient-to-r from-[var(--primary)] to-[var(--magenta)]" />
      </div>
    </aside>
  );
}
