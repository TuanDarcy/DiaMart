import Link from "next/link";
import type { AdminSession } from "@/services/admin/admin-auth-service";
import type { AdminDashboardData } from "@/services/admin/admin-dashboard-service";
import {
  adminLogoutAction,
  deleteCategoryAction,
  deleteFaqAction,
  deleteGameAction,
  deleteProductAction,
  deleteSupportTopicAction,
  upsertCategoryAction,
  upsertFaqAction,
  upsertGameAction,
  upsertProductAction,
  upsertSupportTopicAction,
  uploadStorefrontImageAction,
} from "./admin-actions";

type AdminDashboardPageProps = {
  session: AdminSession;
  data: AdminDashboardData;
  status?: string;
  message?: string;
  uploadedUrl?: string;
};

function Field({
  name,
  label,
  defaultValue,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1 text-xs text-slate-300">
      <span>{label}</span>
      <input
        className="min-h-10 rounded-[12px] border border-purple-400/20 bg-black/30 px-3 text-sm text-white outline-none focus:border-cyan-300/40"
        name={name}
        defaultValue={defaultValue ?? ""}
        type={type}
        required={required}
      />
    </label>
  );
}

function TextareaField({
  name,
  label,
  defaultValue,
  rows = 3,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  rows?: number;
}) {
  return (
    <label className="grid gap-1 text-xs text-slate-300">
      <span>{label}</span>
      <textarea
        className="rounded-[12px] border border-purple-400/20 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/40"
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
      />
    </label>
  );
}

function ActiveSelect({ defaultValue = true }: { defaultValue?: boolean }) {
  return (
    <label className="grid gap-1 text-xs text-slate-300">
      <span>is_active</span>
      <select
        className="min-h-10 rounded-[12px] border border-purple-400/20 bg-black/30 px-3 text-sm text-white outline-none focus:border-cyan-300/40"
        name="is_active"
        defaultValue={defaultValue ? "true" : "false"}
      >
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
    </label>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="surface-panel rounded-[18px] p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </article>
  );
}

export function AdminDashboardPage({
  session,
  data,
  status,
  message,
  uploadedUrl,
}: AdminDashboardPageProps) {
  const navItems = [
    { id: "summary", label: "Summary" },
    { id: "images", label: "Image tools" },
    { id: "games", label: "Games" },
    { id: "categories", label: "Categories" },
    { id: "products", label: "Products" },
    { id: "faqs", label: "FAQs" },
    { id: "support-topics", label: "Support topics" },
  ];

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="border-b border-purple-400/20 bg-[rgba(7,7,10,0.9)] backdrop-blur-xl">
        <div className="container-shell flex flex-wrap items-center justify-between gap-3 py-3">
          <div>
            <p className="font-strong text-xs uppercase tracking-[0.2em] text-cyan-200">
              Admin dashboard
            </p>
            <h1 className="font-heading text-2xl text-white">
              Storefront control panel
            </h1>
            <p className="text-xs text-slate-400">
              {session.email} · role: {session.role}
            </p>
          </div>
          <div className="flex gap-2">
            <Link className="btn-secondary min-h-10 px-4" href="/">
              View storefront
            </Link>
            <form action={adminLogoutAction}>
              <button className="btn-secondary min-h-10 px-4" type="submit">
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <section className="container-shell section-gap grid gap-6 lg:grid-cols-[220px_1fr] lg:items-start">
        <aside className="surface-panel sticky top-20 rounded-[18px] p-4">
          <p className="font-strong text-xs uppercase tracking-[0.2em] text-cyan-200">
            Admin menu
          </p>
          <nav className="mt-3 grid gap-2" aria-label="Admin navigation">
            {navItems.map((item) => (
              <a
                className="rounded-[12px] border border-purple-400/20 bg-black/25 px-3 py-2 text-sm text-slate-200 transition hover:border-cyan-300/35 hover:text-white"
                href={`#${item.id}`}
                key={item.id}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="grid gap-4">
        {message ? (
          <div
            className={`rounded-[14px] border p-3 text-sm ${
              status === "error"
                ? "border-red-400/40 bg-red-400/10 text-red-100"
                : "border-cyan-300/35 bg-cyan-400/10 text-cyan-100"
            }`}
          >
            {message}
          </div>
        ) : null}

        {data.loadError ? (
          <div className="rounded-[14px] border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-100">
            Dashboard loaded with partial data. {data.loadError}
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" id="summary">
          <SummaryCard label="Games" value={data.summary.totalGames} />
          <SummaryCard
            label="Categories"
            value={data.summary.totalCategories}
          />
          <SummaryCard label="Products" value={data.summary.totalProducts} />
          <SummaryCard
            label="Active products"
            value={data.summary.activeProducts}
          />
          <SummaryCard
            label="Inactive products"
            value={data.summary.inactiveProducts}
          />
          <SummaryCard label="FAQs" value={data.summary.totalFaqs} />
          <SummaryCard
            label="Support topics"
            value={data.summary.totalSupportTopics}
          />
        </div>

        <article className="surface-panel rounded-[20px] p-5" id="images">
          <h2 className="font-heading text-xl text-white">Image tools</h2>
          <p className="mt-2 text-sm text-slate-300">
            You can upload images to Supabase Storage or paste a CDN/public URL
            directly into the image_src field for games and products.
          </p>
          <form
            action={uploadStorefrontImageAction}
            className="mt-4 flex flex-wrap gap-3"
          >
            <input
              className="min-h-10 flex-1 rounded-[12px] border border-purple-400/20 bg-black/30 px-3 text-sm text-white"
              name="imageFile"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              required
            />
            <button className="btn-primary min-h-10 px-4" type="submit">
              Upload image
            </button>
          </form>
          {uploadedUrl ? (
            <div className="mt-3 rounded-[12px] border border-purple-400/20 bg-black/25 p-3 text-sm">
              <p className="font-semibold text-white">Uploaded URL</p>
              <p className="mt-1 break-all text-cyan-200">{uploadedUrl}</p>
            </div>
          ) : null}
        </article>

        <section className="grid gap-6">
          <article className="surface-panel rounded-[20px] p-5" id="games">
            <h2 className="font-heading text-xl text-white">CRUD games</h2>
            <form
              action={upsertGameAction}
              className="mt-4 grid gap-3 md:grid-cols-3"
            >
              <Field name="id" label="id (optional)" />
              <Field name="slug" label="slug (optional)" />
              <Field name="name" label="name" required />
              <Field name="tagline" label="tagline" />
              <Field name="image_src" label="image_src" />
              <Field name="image_alt" label="image_alt" />
              <Field
                name="sort_order"
                label="sort_order"
                type="number"
                defaultValue={0}
              />
              <ActiveSelect defaultValue />
              <div className="md:col-span-3">
                <TextareaField name="description" label="description" />
              </div>
              <div className="md:col-span-3">
                <button className="btn-primary min-h-10 px-4" type="submit">
                  Create game
                </button>
              </div>
            </form>

            <div className="mt-6 grid gap-3">
              {data.games.map((game) => (
                <form
                  action={upsertGameAction}
                  key={game.id}
                  className="rounded-[16px] border border-purple-400/20 bg-black/20 p-4"
                >
                  <div className="grid gap-3 md:grid-cols-3">
                    <Field
                      name="id"
                      label="id"
                      defaultValue={game.id}
                      required
                    />
                    <Field
                      name="slug"
                      label="slug"
                      defaultValue={game.slug}
                      required
                    />
                    <Field
                      name="name"
                      label="name"
                      defaultValue={game.name}
                      required
                    />
                    <Field
                      name="tagline"
                      label="tagline"
                      defaultValue={game.tagline}
                    />
                    <Field
                      name="image_src"
                      label="image_src"
                      defaultValue={game.image_src}
                    />
                    <Field
                      name="image_alt"
                      label="image_alt"
                      defaultValue={game.image_alt}
                    />
                    <Field
                      name="sort_order"
                      label="sort_order"
                      type="number"
                      defaultValue={game.sort_order}
                    />
                    <ActiveSelect defaultValue={game.is_active} />
                    <div className="md:col-span-3">
                      <TextareaField
                        name="description"
                        label="description"
                        defaultValue={game.description}
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      className="btn-secondary min-h-10 px-4"
                      type="submit"
                    >
                      Save
                    </button>
                    <button
                      className="btn-secondary min-h-10 px-4"
                      type="submit"
                      formAction={deleteGameAction}
                    >
                      Delete
                    </button>
                  </div>
                </form>
              ))}
            </div>
          </article>

          <article className="surface-panel rounded-[20px] p-5" id="categories">
            <h2 className="font-heading text-xl text-white">CRUD categories</h2>
            <form
              action={upsertCategoryAction}
              className="mt-4 grid gap-3 md:grid-cols-3"
            >
              <Field name="id" label="id (optional)" />
              <Field name="label" label="label" required />
              <Field
                name="sort_order"
                label="sort_order"
                type="number"
                defaultValue={0}
              />
              <ActiveSelect defaultValue />
              <div className="md:col-span-3">
                <TextareaField name="description" label="description" />
              </div>
              <div className="md:col-span-3">
                <button className="btn-primary min-h-10 px-4" type="submit">
                  Create category
                </button>
              </div>
            </form>

            <div className="mt-6 grid gap-3">
              {data.categories.map((category) => (
                <form
                  action={upsertCategoryAction}
                  key={category.id}
                  className="rounded-[16px] border border-purple-400/20 bg-black/20 p-4"
                >
                  <div className="grid gap-3 md:grid-cols-3">
                    <Field
                      name="id"
                      label="id"
                      defaultValue={category.id}
                      required
                    />
                    <Field
                      name="label"
                      label="label"
                      defaultValue={category.label}
                      required
                    />
                    <Field
                      name="sort_order"
                      label="sort_order"
                      type="number"
                      defaultValue={category.sort_order}
                    />
                    <ActiveSelect defaultValue={category.is_active} />
                    <div className="md:col-span-3">
                      <TextareaField
                        name="description"
                        label="description"
                        defaultValue={category.description}
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      className="btn-secondary min-h-10 px-4"
                      type="submit"
                    >
                      Save
                    </button>
                    <button
                      className="btn-secondary min-h-10 px-4"
                      type="submit"
                      formAction={deleteCategoryAction}
                    >
                      Delete
                    </button>
                  </div>
                </form>
              ))}
            </div>
          </article>

          <article className="surface-panel rounded-[20px] p-5" id="products">
            <h2 className="font-heading text-xl text-white">CRUD products</h2>
            <form
              action={upsertProductAction}
              className="mt-4 grid gap-3 md:grid-cols-4"
            >
              <Field name="id" label="id (optional)" />
              <Field name="slug" label="slug (optional)" />
              <Field name="name" label="name" required />
              <label className="grid gap-1 text-xs text-slate-300">
                <span>game_id</span>
                <select
                  className="min-h-10 rounded-[12px] border border-purple-400/20 bg-black/30 px-3 text-sm text-white"
                  name="game_id"
                  required
                >
                  <option value="">Select game</option>
                  {data.games.map((game) => (
                    <option key={game.id} value={game.id}>
                      {game.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1 text-xs text-slate-300">
                <span>category_id</span>
                <select
                  className="min-h-10 rounded-[12px] border border-purple-400/20 bg-black/30 px-3 text-sm text-white"
                  name="category_id"
                  required
                >
                  <option value="">Select category</option>
                  {data.categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>
              <Field name="image_src" label="image_src" />
              <Field name="image_alt" label="image_alt" />
              <Field
                name="price_usd"
                label="price_usd"
                type="number"
                defaultValue={0}
              />
              <Field
                name="original_price_usd"
                label="original_price_usd"
                type="number"
              />
              <Field
                name="stock_status"
                label="stock_status"
                defaultValue="in-stock"
              />
              <Field
                name="stock_quantity"
                label="stock_quantity"
                type="number"
              />
              <Field
                name="delivery_speed"
                label="delivery_speed"
                defaultValue="Estimated 5-10 min"
              />
              <Field name="badge" label="badge" />
              <Field
                name="sort_order"
                label="sort_order"
                type="number"
                defaultValue={0}
              />
              <ActiveSelect defaultValue />
              <label className="flex items-center gap-2 text-xs text-slate-300">
                <input name="featured" type="checkbox" /> featured
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-300">
                <input name="popular" type="checkbox" /> popular
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-300">
                <input name="trending" type="checkbox" /> trending
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-300">
                <input name="best_seller" type="checkbox" /> best_seller
              </label>
              <div className="md:col-span-4">
                <TextareaField
                  name="description"
                  label="description"
                  rows={4}
                />
              </div>
              <div className="md:col-span-4">
                <button className="btn-primary min-h-10 px-4" type="submit">
                  Create product
                </button>
              </div>
            </form>

            <div className="mt-6 grid gap-3">
              {data.products.map((product) => (
                <form
                  action={upsertProductAction}
                  key={product.id}
                  className="rounded-[16px] border border-purple-400/20 bg-black/20 p-4"
                >
                  <div className="grid gap-3 md:grid-cols-4">
                    <Field
                      name="id"
                      label="id"
                      defaultValue={product.id}
                      required
                    />
                    <Field
                      name="slug"
                      label="slug"
                      defaultValue={product.slug}
                      required
                    />
                    <Field
                      name="name"
                      label="name"
                      defaultValue={product.name}
                      required
                    />
                    <label className="grid gap-1 text-xs text-slate-300">
                      <span>game_id</span>
                      <select
                        className="min-h-10 rounded-[12px] border border-purple-400/20 bg-black/30 px-3 text-sm text-white"
                        name="game_id"
                        defaultValue={product.game_id}
                        required
                      >
                        {data.games.map((game) => (
                          <option key={game.id} value={game.id}>
                            {game.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="grid gap-1 text-xs text-slate-300">
                      <span>category_id</span>
                      <select
                        className="min-h-10 rounded-[12px] border border-purple-400/20 bg-black/30 px-3 text-sm text-white"
                        name="category_id"
                        defaultValue={product.category_id}
                        required
                      >
                        {data.categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <Field
                      name="image_src"
                      label="image_src"
                      defaultValue={product.image_src}
                    />
                    <Field
                      name="image_alt"
                      label="image_alt"
                      defaultValue={product.image_alt}
                    />
                    <Field
                      name="price_usd"
                      label="price_usd"
                      type="number"
                      defaultValue={product.price_usd}
                    />
                    <Field
                      name="original_price_usd"
                      label="original_price_usd"
                      type="number"
                      defaultValue={product.original_price_usd}
                    />
                    <Field
                      name="stock_status"
                      label="stock_status"
                      defaultValue={product.stock_status}
                    />
                    <Field
                      name="stock_quantity"
                      label="stock_quantity"
                      type="number"
                      defaultValue={product.stock_quantity}
                    />
                    <Field
                      name="delivery_speed"
                      label="delivery_speed"
                      defaultValue={product.delivery_speed}
                    />
                    <Field
                      name="badge"
                      label="badge"
                      defaultValue={product.badge}
                    />
                    <Field
                      name="sort_order"
                      label="sort_order"
                      type="number"
                      defaultValue={product.sort_order}
                    />
                    <ActiveSelect defaultValue={product.is_active} />
                    <label className="flex items-center gap-2 text-xs text-slate-300">
                      <input
                        name="featured"
                        type="checkbox"
                        defaultChecked={product.featured}
                      />
                      featured
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-300">
                      <input
                        name="popular"
                        type="checkbox"
                        defaultChecked={product.popular}
                      />
                      popular
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-300">
                      <input
                        name="trending"
                        type="checkbox"
                        defaultChecked={product.trending}
                      />
                      trending
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-300">
                      <input
                        name="best_seller"
                        type="checkbox"
                        defaultChecked={product.best_seller}
                      />
                      best_seller
                    </label>
                    <div className="md:col-span-4">
                      <TextareaField
                        name="description"
                        label="description"
                        defaultValue={product.description}
                        rows={4}
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      className="btn-secondary min-h-10 px-4"
                      type="submit"
                    >
                      Save
                    </button>
                    <button
                      className="btn-secondary min-h-10 px-4"
                      type="submit"
                      formAction={deleteProductAction}
                    >
                      Delete
                    </button>
                  </div>
                </form>
              ))}
            </div>
          </article>

          <article className="surface-panel rounded-[20px] p-5" id="faqs">
            <h2 className="font-heading text-xl text-white">CRUD FAQs</h2>
            <form
              action={upsertFaqAction}
              className="mt-4 grid gap-3 md:grid-cols-3"
            >
              <Field name="id" label="id (optional)" />
              <Field
                name="sort_order"
                label="sort_order"
                type="number"
                defaultValue={0}
              />
              <ActiveSelect defaultValue />
              <div className="md:col-span-3">
                <TextareaField name="question" label="question" rows={2} />
              </div>
              <div className="md:col-span-3">
                <TextareaField name="answer" label="answer" rows={3} />
              </div>
              <div className="md:col-span-3">
                <button className="btn-primary min-h-10 px-4" type="submit">
                  Create FAQ
                </button>
              </div>
            </form>

            <div className="mt-6 grid gap-3">
              {data.faqs.map((faq) => (
                <form
                  action={upsertFaqAction}
                  key={faq.id}
                  className="rounded-[16px] border border-purple-400/20 bg-black/20 p-4"
                >
                  <div className="grid gap-3 md:grid-cols-3">
                    <Field
                      name="id"
                      label="id"
                      defaultValue={faq.id}
                      required
                    />
                    <Field
                      name="sort_order"
                      label="sort_order"
                      type="number"
                      defaultValue={faq.sort_order}
                    />
                    <ActiveSelect defaultValue={faq.is_active} />
                    <div className="md:col-span-3">
                      <TextareaField
                        name="question"
                        label="question"
                        defaultValue={faq.question}
                        rows={2}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <TextareaField
                        name="answer"
                        label="answer"
                        defaultValue={faq.answer}
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      className="btn-secondary min-h-10 px-4"
                      type="submit"
                    >
                      Save
                    </button>
                    <button
                      className="btn-secondary min-h-10 px-4"
                      type="submit"
                      formAction={deleteFaqAction}
                    >
                      Delete
                    </button>
                  </div>
                </form>
              ))}
            </div>
          </article>

          <article className="surface-panel rounded-[20px] p-5" id="support-topics">
            <h2 className="font-heading text-xl text-white">
              CRUD support topics
            </h2>
            <form
              action={upsertSupportTopicAction}
              className="mt-4 grid gap-3 md:grid-cols-3"
            >
              <Field name="id" label="id (optional)" />
              <Field name="label" label="label" required />
              <Field
                name="sort_order"
                label="sort_order"
                type="number"
                defaultValue={0}
              />
              <ActiveSelect defaultValue />
              <div className="md:col-span-3">
                <TextareaField
                  name="description"
                  label="description"
                  rows={2}
                />
              </div>
              <div className="md:col-span-3">
                <TextareaField name="response" label="response" rows={3} />
              </div>
              <div className="md:col-span-3">
                <button className="btn-primary min-h-10 px-4" type="submit">
                  Create support topic
                </button>
              </div>
            </form>

            <div className="mt-6 grid gap-3">
              {data.supportTopics.map((topic) => (
                <form
                  action={upsertSupportTopicAction}
                  key={topic.id}
                  className="rounded-[16px] border border-purple-400/20 bg-black/20 p-4"
                >
                  <div className="grid gap-3 md:grid-cols-3">
                    <Field
                      name="id"
                      label="id"
                      defaultValue={topic.id}
                      required
                    />
                    <Field
                      name="label"
                      label="label"
                      defaultValue={topic.label}
                      required
                    />
                    <Field
                      name="sort_order"
                      label="sort_order"
                      type="number"
                      defaultValue={topic.sort_order}
                    />
                    <ActiveSelect defaultValue={topic.is_active} />
                    <div className="md:col-span-3">
                      <TextareaField
                        name="description"
                        label="description"
                        defaultValue={topic.description}
                        rows={2}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <TextareaField
                        name="response"
                        label="response"
                        defaultValue={topic.response}
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      className="btn-secondary min-h-10 px-4"
                      type="submit"
                    >
                      Save
                    </button>
                    <button
                      className="btn-secondary min-h-10 px-4"
                      type="submit"
                      formAction={deleteSupportTopicAction}
                    >
                      Delete
                    </button>
                  </div>
                </form>
              ))}
            </div>
          </article>
        </section>
        </div>
      </section>
    </main>
  );
}
