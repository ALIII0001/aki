# Cinematic Portfolio: Vercel + Supabase

Production-ready Vite portfolio with Vercel deployment, Supabase Storage video delivery, and optional server-only database access.

## Folder Structure

```txt
portfolio-vercel-supabase/
  public/
    assets/
    video-manifest.json
  api/
    config.mjs
    data.mjs
  scripts/
    upload-videos.mjs
  src/
    main.js
    supabaseClient.js
    styles.css
  .env.example
  index.html
  package.json
  vercel.json
```

## Environment Variables

Use these names in Vercel:

```txt
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-public-anon-key
```

Optional server-only database variable for the example API route:

```txt
SUPABASE_DB_URL=postgresql://postgres:your-rotated-password@db.your-project-ref.supabase.co:5432/postgres
```

Local-only upload variable:

```txt
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

`SUPABASE_ANON_KEY` is public-safe for browser usage. `SUPABASE_DB_URL` and `SUPABASE_SERVICE_ROLE_KEY` are secret and must never be imported into frontend code.

## Supabase Setup

1. Create a Supabase project.
2. Go to Project Settings > API and copy:
   - Project URL
   - anon public key
   - service_role key
3. Create a local `.env` file from `.env.example`.
4. Keep `SUPABASE_SERVICE_ROLE_KEY` local only. Never add it to Vercel.
5. Rotate any database password that has been pasted into chat or committed anywhere.

The upload script creates or updates a public bucket named `portfolio-videos`.

### Storage Bucket

The portfolio expects a public bucket:

```txt
portfolio-videos
```

The upload script creates it automatically when `SUPABASE_SERVICE_ROLE_KEY` is present locally. You can also create it in the Supabase dashboard from Storage > New bucket > `portfolio-videos` > Public bucket.

## Upload Videos

The script reads from:

```txt
C:/users/ayazk/aki/content
```

Run:

```bash
npm install
npm run upload:videos
```

It uploads `.mp4` and `.webm` files, then writes `public/video-manifest.json`.

For best delivery, create WebM versions next to each MP4 using the same base filename:

```txt
film-name.mp4
film-name.webm
```

Recommended export targets:

```txt
MP4: H.264, 1080p or 1440p, fast start enabled
WebM: VP9 or AV1 where practical
Audio: AAC for MP4, Opus for WebM
```

## Vercel Environment Variables

In Vercel, open Project > Settings > Environment Variables and add:

```txt
SUPABASE_URL
SUPABASE_ANON_KEY
```

Optional server-only variable for `/api/data`:

```txt
SUPABASE_DB_URL
```

Do not add `SUPABASE_SERVICE_ROLE_KEY` to Vercel. Do not expose raw PostgreSQL URLs in browser code.

Exact dashboard flow:

1. Open Vercel Dashboard.
2. Select the `aki` project.
3. Go to Settings > Environment Variables.
4. Add `SUPABASE_URL` for Production, Preview, and Development.
5. Add `SUPABASE_ANON_KEY` for Production, Preview, and Development.
6. Add `SUPABASE_DB_URL` only if you want `/api/data` enabled.
7. Click Save.
8. Go to Deployments, open the latest deployment menu, and choose Redeploy.

## Deployment

1. Push this folder to GitHub.
2. Import the repository in Vercel.
3. Use build command `npm run build`.
4. Use output directory `dist`.
5. Set the root directory to `portfolio-vercel-supabase` if this folder is inside a larger repo.
4. Add the Vercel environment variables above.
5. Deploy.
6. If you add or change environment variables, redeploy the latest deployment.

## Performance Notes

- Videos use `preload="metadata"`.
- The first manifest item powers the muted hero background video.
- Video playback starts only when the card is visible.
- Videos pause when they leave the viewport.
- Supabase public URLs are generated at runtime from the manifest.
- `/api/config` exposes only the public Supabase URL and anon key to the browser.
- `/api/data` shows the safe pattern for server-only database access.
- The fixed `aspect-ratio` prevents layout shift.
- Loading and failure states keep the page stable.

## Common Mistakes

- Do not use `C:/users/ayazk/aki/content` in HTML or JavaScript.
- Do not commit `.env`.
- Do not expose `SUPABASE_SERVICE_ROLE_KEY` in frontend code or Vercel.
- Do not expose the PostgreSQL connection string in frontend code.
- Do not upload only huge master files; encode web-ready MP4 and WebM versions.
- Do not set `preload="auto"` for a portfolio grid.

## Troubleshooting

- Blank video grid: confirm `public/video-manifest.json` has uploaded video paths.
- `/api/config` returns 500: add `SUPABASE_URL` and `SUPABASE_ANON_KEY` in Vercel, then redeploy.
- `/api/data` returns 500: add `SUPABASE_DB_URL` in Vercel, then redeploy.
- Videos 404: confirm the bucket is public and the manifest paths match Supabase Storage object paths.
- Slow playback: re-encode large source files into web-ready MP4/WebM versions before uploading.
