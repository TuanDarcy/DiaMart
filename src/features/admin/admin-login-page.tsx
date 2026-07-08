import Link from "next/link";
import { adminLoginAction } from "./admin-actions";

type AdminLoginPageProps = {
  status?: string;
  message?: string;
};

export function AdminLoginPage({ status, message }: AdminLoginPageProps) {
  const isError = status === "error";

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="border-b border-purple-400/20 bg-[rgba(7,7,10,0.9)] backdrop-blur-xl">
        <div className="container-shell flex min-h-16 items-center justify-between gap-4 py-3">
          <Link
            className="font-brand text-lg font-semibold text-white"
            href="/"
          >
            DiaMart
          </Link>
          <Link className="btn-secondary min-h-10 px-4" href="/">
            Back to storefront
          </Link>
        </div>
      </header>

      <section className="container-shell flex min-h-[calc(100vh-5rem)] items-center justify-center py-10">
        <div className="surface-panel w-full max-w-md rounded-[24px] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.42)]">
          <p className="font-strong text-xs uppercase tracking-[0.2em] text-cyan-200">
            Admin panel
          </p>
          <h1 className="font-heading mt-2 text-3xl font-semibold text-white">
            Login quản trị
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Đăng nhập bằng tài khoản Supabase Auth đã được thêm vào bảng
            admin_users.
          </p>

          {message ? (
            <div
              className={`mt-4 rounded-[14px] border p-3 text-sm ${
                isError
                  ? "border-red-400/40 bg-red-400/10 text-red-100"
                  : "border-cyan-300/35 bg-cyan-400/10 text-cyan-100"
              }`}
            >
              {message}
            </div>
          ) : null}

          <form action={adminLoginAction} className="mt-6 grid gap-4">
            <label className="text-sm text-slate-200">
              Email
              <input
                className="mt-2 min-h-11 w-full rounded-[14px] border border-purple-400/20 bg-black/35 px-4 text-white outline-none focus:border-fuchsia-400/50 focus:ring-4 focus:ring-fuchsia-500/20"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </label>
            <label className="text-sm text-slate-200">
              Password
              <input
                className="mt-2 min-h-11 w-full rounded-[14px] border border-purple-400/20 bg-black/35 px-4 text-white outline-none focus:border-fuchsia-400/50 focus:ring-4 focus:ring-fuchsia-500/20"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </label>

            <button className="btn-primary min-h-11 w-full" type="submit">
              Login admin
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
