# Ali Khan Films

A cinematic React/Vite portfolio for Ali Khan Films with:

- public portfolio pages powered by Supabase
- secure admin dashboard with Supabase Auth
- media uploads through Supabase Storage
- theme, copy, and contact settings editable without code changes

## Stack

- React + Vite
- Supabase Auth, Database, Storage
- Tailwind CSS
- Framer Motion
- Vercel-friendly frontend only setup

## Environment variables

Create a local `.env` file:

```txt
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Only the anon key is used in the frontend. Never place the Supabase service role key in this app.

## Local development

```bash
npm install
npm run dev
```

Build check:

```bash
npm run build
```

## Supabase setup

Run the SQL in [supabase/schema.sql](/d:/aki/supabase/schema.sql:1) inside the Supabase SQL editor.

That schema creates:

- `profiles`
- `projects`
- `media_assets`
- `site_content`
- `theme_settings`
- `site_settings`
- public `media` storage bucket
- RLS policies for public read + admin-only writes

## Create the first admin

1. Open the app and go to `/admin/login`.
2. Create a user in Supabase Auth manually, or sign up through another internal flow if you add one later.
3. After the user exists, mark that user as admin in Supabase SQL:

```sql
update public.profiles
set is_admin = true
where email = 'your-admin@email.com';
```

4. Log in at `/admin/login`.

## Admin routes

- `/admin/login`
- `/admin/dashboard`
- `/admin/projects`
- `/admin/media`
- `/admin/content`
- `/admin/theme`
- `/admin/settings`

## What the admin panel manages

### Projects / Work

- add, edit, delete projects
- reorder projects
- title, category, description
- external video links
- thumbnail image URL
- featured toggle
- publish/unpublish toggle

### Media library

- upload images to Supabase Storage
- preview media
- delete media
- copy public image URLs

### Website text

- hero title and subtitle
- CTA labels
- intro, impact, process, work, services, statement, studio note
- final CTA and footer

### Theme

- primary color
- accent color
- background style
- font style
- button style
- hero image URL
- craft section image URL
- impact banner image URL
- grain on/off
- animations on/off

### Settings

- WhatsApp number
- Instagram URL
- YouTube URL
- email
- location
- booking link
- booking button text

## Public website behavior

The public portfolio reads from Supabase when configured:

- published projects from `projects`
- editable copy from `site_content`
- theme controls from `theme_settings`
- contact/social links from `site_settings`

If Supabase is missing or returns no data, the site falls back to built-in defaults so the portfolio still renders cleanly.

## Storage notes

- Upload images to Supabase Storage using the admin panel.
- Store heavy videos on YouTube, Vimeo, or Instagram and save only the link.
- Paste uploaded image URLs into projects or theme settings.

## Vercel deployment

1. Push the repo to GitHub.
2. Import into Vercel.
3. Set framework preset to `Vite`.
4. Add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy.

## Free-tier friendly choices

- frontend-only auth via Supabase Auth
- no paid APIs
- video hosting delegated to external platforms
- images stored in a single public bucket
- content/theme/settings stored as singleton rows
