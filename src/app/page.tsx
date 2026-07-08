import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-10 sm:px-10">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl flex-col justify-center gap-8">
        <div className="w-fit rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--muted)]">
          Project foundation initialized
        </div>

        <div className="space-y-5">
          <h1 className="text-4xl font-semibold tracking-normal sm:text-6xl">
            {siteConfig.name}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
            Hệ thống đang được xây dựng với Next.js, Tailwind CSS và Supabase
            foundation.
          </p>
        </div>
      </section>
    </main>
  );
}
