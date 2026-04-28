create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  is_admin boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and is_admin = true
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text default '',
  description text default '',
  video_url text default '',
  thumbnail_url text default '',
  featured boolean not null default false,
  published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  file_path text not null unique,
  public_url text not null,
  mime_type text default '',
  size_bytes bigint default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.site_content (
  id text primary key default 'default',
  brand_name text not null default 'Ali Khan Films',
  hero_title text not null default 'Turning raw clips into engaging stories',
  hero_subtitle text not null default 'Raw footage is just noise until it''s cut right.
We craft edits that hook fast, hit harder, and stay with the viewer.',
  hero_primary_button text not null default 'Watch Work',
  hero_secondary_button text not null default 'Start a Project',
  intro_heading text not null default 'Not just edits. Experiences.',
  intro_text text not null default 'Every frame is shaped to pull attention instantly and hold it longer than expected.',
  impact_heading text not null default 'Hook faster. Feel deeper. Stay longer.',
  impact_text text not null default 'Not just clean edits - cuts that make people stop, watch, and remember.',
  capability_1 text not null default 'Brand films that feel premium',
  capability_2 text not null default 'Music videos with rhythm',
  capability_3 text not null default 'Launch edits that create hype',
  capability_4 text not null default 'Reels that don''t get skipped',
  capability_5 text not null default 'Story-driven cinematic cuts',
  process_heading text not null default 'Rhythm built on purpose.',
  process_step_1_title text not null default 'Find the story',
  process_step_1_text text not null default 'We go beyond clips. We find the moment that matters.',
  process_step_2_title text not null default 'Build the flow',
  process_step_2_text text not null default 'Timing, sound, silence - shaped to hold attention.',
  process_step_3_title text not null default 'Deliver for impact',
  process_step_3_text text not null default 'Every format optimized for where it lives.',
  work_heading text not null default 'Edits that don''t just play - they land.',
  work_subtext text not null default 'Built for impact, not just views.',
  services_detail_heading text not null default 'Precision in every cut.',
  services_detail_intro text not null default 'Premium by feel. Focused by design. Every format built to land harder.',
  service_1_title text not null default 'Direction & Cinematography',
  service_1_text text not null default 'Visuals designed to cut better',
  service_2_title text not null default 'Video Editing',
  service_2_text text not null default 'Where raw footage becomes emotion',
  service_3_title text not null default 'Campaign & Social Cuts',
  service_3_text text not null default 'Built for retention and replay',
  service_4_title text not null default 'Content Packages',
  service_4_text text not null default 'One story. Multiple formats.',
  statement_text text not null default 'If it doesn''t hold attention, it doesn''t work.',
  studio_note_heading text not null default 'Less noise. More impact.',
  studio_note_text text not null default 'Timing. Emotion. The right cut at the right second.',
  final_cta_heading text not null default 'Bring the footage. We''ll build the story.',
  final_cta_text text not null default 'From raw clips to finished films - built to be watched, not skipped.',
  footer_text text not null default 'Ali Khan Films. Built for attention.',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.theme_settings (
  id text primary key default 'default',
  primary_color text not null default '#f4efe7',
  accent_color text not null default '#c7a05c',
  background_style text not null default 'cinematic',
  font_style text not null default 'editorial',
  button_style text not null default 'pill',
  hero_image_url text default '',
  craft_image_url text default '',
  impact_image_url text default '',
  grain_enabled boolean not null default true,
  animations_enabled boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.site_settings (
  id text primary key default 'default',
  whatsapp_number text default '',
  instagram_url text default '',
  youtube_url text default '',
  email text default '',
  location text default '',
  booking_link text default '#contact',
  booking_button_text text default 'Start a Project',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists set_updated_at_profiles on public.profiles;
create trigger set_updated_at_profiles before update on public.profiles for each row execute procedure public.set_updated_at();
drop trigger if exists set_updated_at_projects on public.projects;
create trigger set_updated_at_projects before update on public.projects for each row execute procedure public.set_updated_at();
drop trigger if exists set_updated_at_media_assets on public.media_assets;
create trigger set_updated_at_media_assets before update on public.media_assets for each row execute procedure public.set_updated_at();
drop trigger if exists set_updated_at_site_content on public.site_content;
create trigger set_updated_at_site_content before update on public.site_content for each row execute procedure public.set_updated_at();
drop trigger if exists set_updated_at_theme_settings on public.theme_settings;
create trigger set_updated_at_theme_settings before update on public.theme_settings for each row execute procedure public.set_updated_at();
drop trigger if exists set_updated_at_site_settings on public.site_settings;
create trigger set_updated_at_site_settings before update on public.site_settings for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.media_assets enable row level security;
alter table public.site_content enable row level security;
alter table public.theme_settings enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "Profiles can read own record" on public.profiles;
create policy "Profiles can read own record"
on public.profiles
for select
to authenticated
using (id = auth.uid());

drop policy if exists "Admins can update profiles" on public.profiles;
create policy "Admins can update profiles"
on public.profiles
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read published projects" on public.projects;
create policy "Public can read published projects"
on public.projects
for select
to anon, authenticated
using (published = true or public.is_admin());

drop policy if exists "Admins can manage projects" on public.projects;
create policy "Admins can manage projects"
on public.projects
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read media assets" on public.media_assets;
create policy "Public can read media assets"
on public.media_assets
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage media assets" on public.media_assets;
create policy "Admins can manage media assets"
on public.media_assets
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
on public.site_content
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage site content" on public.site_content;
create policy "Admins can manage site content"
on public.site_content
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read theme settings" on public.theme_settings;
create policy "Public can read theme settings"
on public.theme_settings
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage theme settings" on public.theme_settings;
create policy "Admins can manage theme settings"
on public.theme_settings
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
on public.site_settings
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage site settings" on public.site_settings;
create policy "Admins can manage site settings"
on public.site_settings
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "Public can read media bucket" on storage.objects;
create policy "Public can read media bucket"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'media');

drop policy if exists "Admins can upload media bucket" on storage.objects;
create policy "Admins can upload media bucket"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "Admins can update media bucket" on storage.objects;
create policy "Admins can update media bucket"
on storage.objects
for update
to authenticated
using (bucket_id = 'media' and public.is_admin())
with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "Admins can delete media bucket" on storage.objects;
create policy "Admins can delete media bucket"
on storage.objects
for delete
to authenticated
using (bucket_id = 'media' and public.is_admin());

insert into public.site_content (id) values ('default')
on conflict (id) do nothing;

insert into public.theme_settings (id) values ('default')
on conflict (id) do nothing;

insert into public.site_settings (id) values ('default')
on conflict (id) do nothing;

insert into public.projects (title, category, description, video_url, thumbnail_url, featured, published, display_order)
values
  (
    'Cut One',
    'Brand Film',
    'A cinematic showcase cut for mood and retention.',
    'https://youtu.be/b29Kepe4tms',
    'https://img.youtube.com/vi/b29Kepe4tms/maxresdefault.jpg',
    true,
    true,
    1
  ),
  (
    'Cut Two',
    'Music Visual',
    'A rhythm-first edit built to land fast.',
    'https://youtu.be/XqCPoUJ8754',
    'https://img.youtube.com/vi/XqCPoUJ8754/maxresdefault.jpg',
    false,
    true,
    2
  )
on conflict do nothing;
