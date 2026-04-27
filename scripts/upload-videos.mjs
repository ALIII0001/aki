import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_VIDEO_BUCKET || "portfolio-videos";
const SOURCE_DIR = process.env.VIDEO_SOURCE_DIR || "C:/users/ayazk/aki/content";
const PUBLIC_DIR = path.resolve("public");
const MANIFEST_PATH = path.join(PUBLIC_DIR, "video-manifest.json");
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm"]);

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  throw new Error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before uploading videos.");
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false }
});

await ensurePublicBucket();

const files = await readdir(SOURCE_DIR, { withFileTypes: true });
const videos = files
  .filter(file => file.isFile() && VIDEO_EXTENSIONS.has(path.extname(file.name).toLowerCase()))
  .map(file => file.name)
  .sort((a, b) => a.localeCompare(b));

const grouped = new Map();

for (const fileName of videos) {
  const ext = path.extname(fileName).toLowerCase();
  const baseName = path.basename(fileName, ext);
  const slug = slugify(baseName);
  const storagePath = `${slug}/${slug}${ext}`;
  const filePath = path.join(SOURCE_DIR, fileName);

  console.log(`Uploading ${fileName} -> ${storagePath}`);

  const { error } = await supabase.storage.from(BUCKET).upload(storagePath, createReadStream(filePath), {
    cacheControl: "31536000",
    contentType: ext === ".webm" ? "video/webm" : "video/mp4",
    duplex: "half",
    upsert: true
  });

  if (error) {
    throw error;
  }

  const record = grouped.get(slug) ?? {
    slug,
    title: titleCase(baseName),
    year: new Date().getFullYear().toString()
  };

  if (ext === ".mp4") record.mp4Path = storagePath;
  if (ext === ".webm") record.webmPath = storagePath;
  grouped.set(slug, record);
}

const manifest = {
  bucket: BUCKET,
  generatedAt: new Date().toISOString(),
  videos: [...grouped.values()].filter(video => video.mp4Path)
};

await mkdir(PUBLIC_DIR, { recursive: true });
await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Wrote ${MANIFEST_PATH}`);

async function ensurePublicBucket() {
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();

  if (listError) {
    throw listError;
  }

  const existing = buckets.find(bucket => bucket.name === BUCKET);

  if (!existing) {
    const { error } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: 2147483648,
      allowedMimeTypes: ["video/mp4", "video/webm"]
    });

    if (error) throw error;
    return;
  }

  if (!existing.public) {
    const { error } = await supabase.storage.updateBucket(BUCKET, { public: true });
    if (error) throw error;
  }
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function titleCase(value) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, character => character.toUpperCase());
}
