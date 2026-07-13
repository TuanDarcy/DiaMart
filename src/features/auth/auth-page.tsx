import Link from "next/link";
import { loginAction, registerAction } from "./auth-actions";

type AuthPageProps = {
  mode: "login" | "register";
  status?: string;
  code?: string;
};

function resolveMessage(status?: string, code?: string) {
  if (status !== "error" && status !== "success") {
    return null;
  }

  const messages: Record<string, string> = {
    auth_required: "Please login first.",
    not_admin:
      "Your account is signed in, but it does not have admin permission.",
    logout_success: "You have been signed out.",
    missing_credentials: "Please enter your email and password.",
    invalid_credentials: "Invalid email or password.",
    missing_fields: "Please fill all required fields.",
    password_mismatch: "Passwords do not match.",
    weak_password: "Password must be at least 6 characters.",
    register_failed: "Could not create account. Please try again.",
    register_success:
      "Account created. You can login now (or confirm email if required).",
    auth_unavailable:
      "Authentication is unavailable in preview mode. Configure Supabase in .env.local to enable login.",
  };

  return {
    status,
    text: messages[code ?? ""] ?? "Action completed.",
  };
}

export function AuthPage({ mode, status, code }: AuthPageProps) {
  const isLogin = mode === "login";
  const notice = resolveMessage(status, code);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="border-b border-purple-400/20 bg-[rgba(7,7,10,0.9)] backdrop-blur-xl">
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
          <Link className="btn-secondary min-h-10 px-4" href="/">
            Back to shop
          </Link>
        </div>
      </header>

      <section className="container-shell flex min-h-[calc(100vh-5rem)] items-center justify-center py-10">
        <div className="surface-panel entrance-rise w-full max-w-md rounded-[26px] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.42)]">
          <p className="font-strong text-center text-xs uppercase tracking-[0.22em] text-fuchsia-300">
            {isLogin ? "Login" : "Create account"}
          </p>
          <h1 className="font-heading mt-3 text-center text-4xl font-semibold leading-tight text-white">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          {!isLogin ? (
            <p className="mt-3 text-center text-sm leading-6 text-slate-300">
              Register to prepare for faster checkout, order tracking, and
              support.
            </p>
          ) : null}

          {notice ? (
            <div
              className={`mt-5 rounded-[16px] border p-3 text-sm leading-6 ${
                notice.status === "error"
                  ? "border-red-400/35 bg-red-400/10 text-red-100"
                  : "border-cyan-300/35 bg-cyan-400/10 text-cyan-100"
              }`}
            >
              {notice.text}
            </div>
          ) : null}

          <form
            action={isLogin ? loginAction : registerAction}
            className="mt-6 grid gap-4"
          >
            {!isLogin ? (
              <label className="text-sm font-medium text-slate-300">
                Username
                <input
                  className="mt-2 min-h-11 w-full rounded-[14px] border border-[var(--border)] bg-black/35 px-4 text-white outline-none transition focus:border-[var(--magenta)]/50 focus:ring-4 focus:ring-[var(--magenta)]/20"
                  placeholder="your_username"
                  type="text"
                  name="username"
                />
              </label>
            ) : null}
            <label className="text-sm font-medium text-slate-300">
              Email
              <input
                className="mt-2 min-h-11 w-full rounded-[14px] border border-[var(--border)] bg-black/35 px-4 text-white outline-none transition focus:border-[var(--magenta)]/50 focus:ring-4 focus:ring-[var(--magenta)]/20"
                placeholder="you@example.com"
                type="email"
                name="email"
                required
              />
            </label>
            <label className="text-sm font-medium text-slate-300">
              Password
              <input
                className="mt-2 min-h-11 w-full rounded-[14px] border border-[var(--border)] bg-black/35 px-4 text-white outline-none transition focus:border-[var(--magenta)]/50 focus:ring-4 focus:ring-[var(--magenta)]/20"
                placeholder={
                  isLogin ? "Enter your password" : "Create a password"
                }
                type="password"
                name="password"
                required
              />
            </label>
            {!isLogin ? (
              <label className="text-sm font-medium text-slate-300">
                Confirm password
                <input
                  className="mt-2 min-h-11 w-full rounded-[14px] border border-[var(--border)] bg-black/35 px-4 text-white outline-none transition focus:border-[var(--magenta)]/50 focus:ring-4 focus:ring-[var(--magenta)]/20"
                  placeholder="Re-enter your password"
                  type="password"
                  name="confirmPassword"
                  required
                />
              </label>
            ) : null}

            <button className="btn-primary min-h-11 w-full" type="submit">
              {isLogin ? "Login" : "Create account"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-400">
            {isLogin ? "Need an account?" : "Already have an account?"}{" "}
            <Link
              className="font-strong text-[var(--mint)]"
              href={isLogin ? "/register" : "/login"}
            >
              {isLogin ? "Register" : "Login"}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
