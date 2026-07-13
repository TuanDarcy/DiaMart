import Link from "next/link";

type AuthPromptProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AuthPrompt({ isOpen, onClose }: AuthPromptProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-required-title"
    >
      <div className="entrance-rise surface-panel-strong w-full max-w-md rounded-[24px] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-strong text-xs uppercase tracking-[0.2em] text-fuchsia-300">
              Account required
            </p>
            <h2
              className="font-heading mt-2 text-2xl font-semibold text-white"
              id="auth-required-title"
            >
              Login to continue
            </h2>
          </div>
          <button
            className="btn-icon"
            type="button"
            onClick={onClose}
            aria-label="Close login prompt"
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
        <p className="mt-4 text-sm leading-6 text-slate-300">
          Browsing items is open to everyone. Adding items to your cart and
          placing an order requires a DiaMart account.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Link className="btn-primary min-h-11" href="/login">
            Login
          </Link>
          <Link className="btn-secondary min-h-11" href="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
