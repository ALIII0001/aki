# Cinematic Portfolio: Vercel + Supabase Video Hosting

Production-ready static portfolio with Supabase Storage video delivery and Vercel deployment.

## Folder Structure

```txt
portfolio-vercel-supabase/
  public/
    assets/
    video-manifest.json
  scripts/
    upload-videos.mjs
  src/
    main.js
    styles.css
  .env.example
  index.html
  package.json
  vercel.json
```

## Supabase Setup

1. Create a Supabase project.
2. Go to Project Settings > API and copy:
   - Project URL
   - anon public key
   - service_role key
3. Create a local `.env` file from `.env.example`.
4. Keep `SUPABASE_SERVICE_ROLE_KEY` local only. Never add it to Vercel.

The upload script creates or updates a public bucket named `portfolio-videos`.

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

## Vercel Environment Variables

In Vercel, open Project > Settings > Environment Variables and add:

```txt
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Do not add `SUPABASE_SERVICE_ROLE_KEY` to Vercel.

## Deployment

1. Push this folder to GitHub.
2. Import the repository in Vercel.
3. Set the root directory to `portfolio-vercel-supabase` if this folder is inside a larger repo.
4. Add the Vercel environment variables above.
5. Deploy.

## Performance Notes

- Videos use `preload="metadata"`.
- The first manifest item powers the muted hero background video.
- Video playback starts only when the card is visible.
- Videos pause when they leave the viewport.
- Supabase public URLs are generated at runtime from the manifest.
- The fixed `aspect-ratio` prevents layout shift.
- Loading and failure states keep the page stable.

## Common Mistakes

- Do not use `C:/users/ayazk/aki/content` in HTML or JavaScript.
- Do not commit `.env`.
- Do not expose `SUPABASE_SERVICE_ROLE_KEY` in frontend code or Vercel.
- Do not upload only huge master files; encode web-ready MP4 and WebM versions.
- Do not set `preload="auto"` for a portfolio grid.
