begin;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null default 'admin' check (role in ('admin', 'editor')),
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists admin_users_email_idx
  on public.admin_users (email);

create or replace function public.is_admin(check_user uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users au
    where au.user_id = check_user
      and au.is_active = true
      and au.role = 'admin'
  );
$$;

alter table public.admin_users enable row level security;

drop policy if exists "Users can read their own admin status" on public.admin_users;
create policy "Users can read their own admin status"
  on public.admin_users
  for select
  to authenticated
  using (user_id = auth.uid());

grant select on public.admin_users to authenticated;
grant execute on function public.is_admin(uuid) to anon, authenticated;

drop policy if exists "Admin can insert storefront games" on public.storefront_games;
create policy "Admin can insert storefront games"
  on public.storefront_games
  for insert
  to authenticated
  with check (public.is_admin(auth.uid()));

drop policy if exists "Admin can update storefront games" on public.storefront_games;
create policy "Admin can update storefront games"
  on public.storefront_games
  for update
  to authenticated
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

drop policy if exists "Admin can delete storefront games" on public.storefront_games;
create policy "Admin can delete storefront games"
  on public.storefront_games
  for delete
  to authenticated
  using (public.is_admin(auth.uid()));

drop policy if exists "Admin can insert storefront categories" on public.storefront_categories;
create policy "Admin can insert storefront categories"
  on public.storefront_categories
  for insert
  to authenticated
  with check (public.is_admin(auth.uid()));

drop policy if exists "Admin can update storefront categories" on public.storefront_categories;
create policy "Admin can update storefront categories"
  on public.storefront_categories
  for update
  to authenticated
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

drop policy if exists "Admin can delete storefront categories" on public.storefront_categories;
create policy "Admin can delete storefront categories"
  on public.storefront_categories
  for delete
  to authenticated
  using (public.is_admin(auth.uid()));

drop policy if exists "Admin can insert storefront products" on public.storefront_products;
create policy "Admin can insert storefront products"
  on public.storefront_products
  for insert
  to authenticated
  with check (public.is_admin(auth.uid()));

drop policy if exists "Admin can update storefront products" on public.storefront_products;
create policy "Admin can update storefront products"
  on public.storefront_products
  for update
  to authenticated
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

drop policy if exists "Admin can delete storefront products" on public.storefront_products;
create policy "Admin can delete storefront products"
  on public.storefront_products
  for delete
  to authenticated
  using (public.is_admin(auth.uid()));

drop policy if exists "Admin can insert storefront faqs" on public.storefront_faqs;
create policy "Admin can insert storefront faqs"
  on public.storefront_faqs
  for insert
  to authenticated
  with check (public.is_admin(auth.uid()));

drop policy if exists "Admin can update storefront faqs" on public.storefront_faqs;
create policy "Admin can update storefront faqs"
  on public.storefront_faqs
  for update
  to authenticated
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

drop policy if exists "Admin can delete storefront faqs" on public.storefront_faqs;
create policy "Admin can delete storefront faqs"
  on public.storefront_faqs
  for delete
  to authenticated
  using (public.is_admin(auth.uid()));

drop policy if exists "Admin can insert storefront support topics" on public.storefront_support_topics;
create policy "Admin can insert storefront support topics"
  on public.storefront_support_topics
  for insert
  to authenticated
  with check (public.is_admin(auth.uid()));

drop policy if exists "Admin can update storefront support topics" on public.storefront_support_topics;
create policy "Admin can update storefront support topics"
  on public.storefront_support_topics
  for update
  to authenticated
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

drop policy if exists "Admin can delete storefront support topics" on public.storefront_support_topics;
create policy "Admin can delete storefront support topics"
  on public.storefront_support_topics
  for delete
  to authenticated
  using (public.is_admin(auth.uid()));

grant insert, update, delete on public.storefront_games to authenticated;
grant insert, update, delete on public.storefront_categories to authenticated;
grant insert, update, delete on public.storefront_products to authenticated;
grant insert, update, delete on public.storefront_faqs to authenticated;
grant insert, update, delete on public.storefront_support_topics to authenticated;

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'storefront-images',
  'storefront-images',
  true,
  5242880,
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif']::text[]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read storefront images" on storage.objects;
create policy "Public can read storefront images"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'storefront-images');

drop policy if exists "Admin can upload storefront images" on storage.objects;
create policy "Admin can upload storefront images"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'storefront-images'
    and public.is_admin(auth.uid())
  );

drop policy if exists "Admin can update storefront images" on storage.objects;
create policy "Admin can update storefront images"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'storefront-images'
    and public.is_admin(auth.uid())
  )
  with check (
    bucket_id = 'storefront-images'
    and public.is_admin(auth.uid())
  );

drop policy if exists "Admin can delete storefront images" on storage.objects;
create policy "Admin can delete storefront images"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'storefront-images'
    and public.is_admin(auth.uid())
  );

commit;
