# AKI Films Cinematic Portfolio

A premium React portfolio for filmmaker-style work: Vite, Framer Motion, Tailwind CSS, Supabase video metadata, and YouTube-hosted playback.

## Folder Structure

```txt
portfolio-vercel-supabase/
  public/
    assets/
      hero-cinematic.svg
      transition-one.svg
      transition-two.svg
      portfolio-highlight.svg
  src/
    components/
      About.jsx
      Contact.jsx
      Hero.jsx
      Header.jsx
      PortfolioHighlight.jsx
      Services.jsx
      VideoCard.jsx
      VideoRow.jsx
      VisualBreak.jsx
    hooks/
      useVideos.js
    lib/
      supabaseClient.js
      youtube.js
    App.jsx
    main.jsx
    styles.css
  .env.example
  index.html
  package.json
  postcss.config.js
  tailwind.config.js
  vercel.json
  vite.config.js
```

## Supabase Table

Create a table named `videos`:

```sql
create table public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  youtube_url text not null,
  thumbnail text,
  created_at timestamptz not null default now()
);
```

Enable read access for published portfolio videos:

```sql
alter table public.videos enable row level security;

create policy "Public can read videos"
on public.videos
for select
to anon
using (true);
```

Add rows like:

```txt
title: Brand Film 01
category: ads
youtube_url: https://www.youtube.com/watch?v=YOUR_VIDEO_ID
thumbnail: https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg
```

`thumbnail` is optional. If empty, the site derives a YouTube thumbnail from `youtube_url`.

## Environment Variables

Local `.env` and Vercel variables:

```txt
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

The anon key is public-safe when Row Level Security policies are correct. Never put a service role key or PostgreSQL connection string in this React app.

## Vercel Deployment

1. Push the code to GitHub.
2. In Vercel, import or open the connected project.
3. Set Framework Preset: `Vite`.
4. Set Build Command: `npm run build`.
5. Set Output Directory: `dist`.
6. Add `VITE_SUPABASE_URL`.
7. Add `VITE_SUPABASE_ANON_KEY`.
8. Redeploy after adding environment variables.

## YouTube Workflow

1. Upload each video to YouTube.
2. Use public, unlisted, or embeddable videos.
3. Copy the YouTube URL.
4. Add a row in Supabase `videos`.
5. Use categories like `films`, `ads`, `reels`, `music`, or `documentary`.

The frontend uses thumbnails first, then lazy-loads YouTube no-cookie embeds on hover or when a card enters the viewport.

## Image Placeholders

Replace these files with your four supplied images:

```txt
public/assets/hero-cinematic.svg
public/assets/transition-one.svg
public/assets/transition-two.svg
public/assets/portfolio-highlight.svg
```

If you use `.jpg` or `.png` names instead, update:

```txt
src/lib/visuals.js
```

## Performance Notes

- No local videos ship with the site.
- YouTube iframes are lazy-loaded.
- Thumbnails render first for fast initial paint.
- Video cards use fixed `aspect-video` sizing to prevent layout shift.
- Hero uses a visual background and can fall back to the newest video thumbnail.
- Framer Motion animations are viewport-triggered.

## Customization

Update contact links in:

```txt
src/components/Contact.jsx
```

WhatsApp is already wired to:

```txt
https://wa.me/918462091288?text=Hi%2C%20I%20want%20to%20start%20a%20project
```

Update copy, categories, and service cards in the component files under:

```txt
src/components/
```

## Troubleshooting

- Empty showcase: add rows to the `videos` table.
- Supabase error: verify `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and RLS select policy.
- YouTube not playing: confirm the video allows embedding.
- Thumbnail looks low quality: add a custom `thumbnail` URL in Supabase.
- Vercel still shows old content: redeploy after adding env vars.
