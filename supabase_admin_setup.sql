-- Uchko‘prik Digital District — Supabase Admin / RLS setup
-- Idempotent: can be run again safely in Supabase SQL Editor.

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;
alter table public.mahallas enable row level security;
alter table public.organizations enable row level security;
alter table public.categories enable row level security;
alter table public.district enable row level security;

-- Admin can verify only their own admin record.
drop policy if exists "admin_self_read" on public.admins;
create policy "admin_self_read"
on public.admins for select
to authenticated
using (user_id = auth.uid() and active = true);

-- Public platform reads only published/active records.
drop policy if exists "public_read_mahallas" on public.mahallas;
create policy "public_read_mahallas"
on public.mahallas for select
to anon, authenticated
using (status = 'active');

drop policy if exists "public_read_organizations" on public.organizations;
create policy "public_read_organizations"
on public.organizations for select
to anon, authenticated
using (status = 'active');

drop policy if exists "public_read_categories" on public.categories;
create policy "public_read_categories"
on public.categories for select
to anon, authenticated
using (active = true);

drop policy if exists "public_read_district" on public.district;
create policy "public_read_district"
on public.district for select
to anon, authenticated
using (true);

-- Authenticated users listed in public.admins can manage content.
drop policy if exists "admins_manage_mahallas" on public.mahallas;
create policy "admins_manage_mahallas"
on public.mahallas for all
to authenticated
using (exists (select 1 from public.admins a where a.user_id = auth.uid() and a.active = true))
with check (exists (select 1 from public.admins a where a.user_id = auth.uid() and a.active = true));

drop policy if exists "admins_manage_organizations" on public.organizations;
create policy "admins_manage_organizations"
on public.organizations for all
to authenticated
using (exists (select 1 from public.admins a where a.user_id = auth.uid() and a.active = true))
with check (exists (select 1 from public.admins a where a.user_id = auth.uid() and a.active = true));

drop policy if exists "admins_manage_categories" on public.categories;
create policy "admins_manage_categories"
on public.categories for all
to authenticated
using (exists (select 1 from public.admins a where a.user_id = auth.uid() and a.active = true))
with check (exists (select 1 from public.admins a where a.user_id = auth.uid() and a.active = true));

drop policy if exists "admins_manage_district" on public.district;
create policy "admins_manage_district"
on public.district for all
to authenticated
using (exists (select 1 from public.admins a where a.user_id = auth.uid() and a.active = true))
with check (exists (select 1 from public.admins a where a.user_id = auth.uid() and a.active = true));

-- FIRST ADMIN:
-- 1) Supabase > Authentication > Users dan foydalanuvchi UUID sini oling.
-- 2) Quyidagi qatorni UUID bilan bir marta ishga tushiring:
-- insert into public.admins (user_id, role, active)
-- values ('YOUR_AUTH_USER_UUID'::uuid, 'superadmin', true)
-- on conflict (user_id) do update set role=excluded.role, active=excluded.active;
