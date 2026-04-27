create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
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

insert into public.videos (title, youtube_url, thumbnail)
values
  (
    'Cut One',
    'https://youtu.be/b29Kepe4tms',
    'https://img.youtube.com/vi/b29Kepe4tms/maxresdefault.jpg'
  ),
  (
    'Cut Two',
    'https://youtu.be/XqCPoUJ8754',
    'https://img.youtube.com/vi/XqCPoUJ8754/maxresdefault.jpg'
  )
on conflict do nothing;
