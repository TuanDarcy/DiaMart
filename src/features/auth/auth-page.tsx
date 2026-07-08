import Link from "next/link";

type AuthPageProps = {
  mode: "login" | "register";
};

export function AuthPage({ mode }: AuthPageProps) {
  const isLogin = mode === "login";

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
            {isLogin ? "Customer login" : "Create account"}
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

          <form className="mt-6 grid gap-4">
            {!isLogin ? (
              <label className="text-sm font-medium text-slate-300">
                Name
                <input
                  className="mt-2 min-h-11 w-full rounded-[14px] border border-purple-400/20 bg-black/35 px-4 text-white outline-none focus:border-fuchsia-400/50 focus:ring-4 focus:ring-fuchsia-500/20"
                  placeholder="Your name"
                  type="text"
                />
              </label>
            ) : null}
            <label className="text-sm font-medium text-slate-300">
              Email
              <input
                className="mt-2 min-h-11 w-full rounded-[14px] border border-purple-400/20 bg-black/35 px-4 text-white outline-none focus:border-fuchsia-400/50 focus:ring-4 focus:ring-fuchsia-500/20"
                placeholder="you@example.com"
                type="email"
              />
            </label>
            <label className="text-sm font-medium text-slate-300">
              Password
              <input
                className="mt-2 min-h-11 w-full rounded-[14px] border border-purple-400/20 bg-black/35 px-4 text-white outline-none focus:border-fuchsia-400/50 focus:ring-4 focus:ring-fuchsia-500/20"
                placeholder={
                  isLogin ? "Enter your password" : "Create a password"
                }
                type="password"
              />
            </label>
            {!isLogin ? (
              <label className="text-sm font-medium text-slate-300">
                Confirm password
                <input
                  className="mt-2 min-h-11 w-full rounded-[14px] border border-purple-400/20 bg-black/35 px-4 text-white outline-none focus:border-fuchsia-400/50 focus:ring-4 focus:ring-fuchsia-500/20"
                  placeholder="Re-enter your password"
                  type="password"
                />
              </label>
            ) : null}

            <div className="rounded-[16px] border border-amber-300/25 bg-amber-300/10 p-3 text-sm leading-6 text-amber-50">
              Account access is being prepared. You can browse the storefront
              now; checkout will require login when accounts open.
            </div>

            <button
              className="btn-primary min-h-11 w-full cursor-not-allowed opacity-70"
              type="button"
              disabled
            >
              {isLogin ? "Login opening soon" : "Registration opening soon"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-400">
            {isLogin ? "Need an account?" : "Already have an account?"}{" "}
            <Link
              className="font-strong text-[#14f1c9]"
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
