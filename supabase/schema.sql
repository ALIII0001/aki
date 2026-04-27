create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  youtube_url text not null,
  thumbnail text,
  created_at timestamptz not null default now()
);

alter table public.videos enable row level security;

drop policy if exists "Public can read videos" on public.videos;

create policy "Public can read videos"
on public.videos
for select
to anon
using (true);
