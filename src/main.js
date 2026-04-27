import { createClient } from "@supabase/supabase-js";
import "./styles.css";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const VIDEO_BUCKET = "portfolio-videos";

const grid = document.querySelector("#video-grid");
const heroVideo = document.querySelector("#hero-video");

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  renderError(
    "Missing Supabase environment variables. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
  );
} else {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  bootPortfolio(supabase);
}

async function bootPortfolio(supabase) {
  try {
    const response = await fetch("/video-manifest.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Video manifest was not found. Run npm run upload:videos first.");
    }

    const manifest = await response.json();
    const videos = manifest.videos ?? [];

    if (!videos.length) {
      renderError("No portfolio videos found in the manifest.");
      return;
    }

    hydrateHeroVideo(supabase, videos[0]);

    grid.innerHTML = "";
    videos.forEach((video, index) => {
      grid.appendChild(createVideoCard(supabase, video, index));
    });

    setupViewportPlayback();
  } catch (error) {
    renderError(error.message);
  }
}

function hydrateHeroVideo(supabase, item) {
  const mp4Url = publicUrl(supabase, item.mp4Path);
  const webmUrl = item.webmPath ? publicUrl(supabase, item.webmPath) : null;

  if (webmUrl) {
    heroVideo.appendChild(source(webmUrl, "video/webm"));
  }

  heroVideo.appendChild(source(mp4Url, "video/mp4"));
  heroVideo.play().catch(() => {
    heroVideo.controls = false;
  });
}

function createVideoCard(supabase, item, index) {
  const card = document.createElement("article");
  card.className = "video-card";

  const frame = document.createElement("div");
  frame.className = "video-frame";

  const status = document.createElement("div");
  status.className = "video-status";
  status.textContent = "Loading preview";

  const video = document.createElement("video");
  video.className = "portfolio-video";
  video.controls = true;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.preload = "metadata";
  video.poster = item.poster || "";
  video.setAttribute("aria-label", item.title || `Portfolio video ${index + 1}`);

  const mp4Url = publicUrl(supabase, item.mp4Path);
  const webmUrl = item.webmPath ? publicUrl(supabase, item.webmPath) : null;

  if (webmUrl) {
    video.appendChild(source(webmUrl, "video/webm"));
  }
  video.appendChild(source(mp4Url, "video/mp4"));

  video.addEventListener("loadedmetadata", () => {
    status.textContent = "Ready";
    card.classList.add("is-ready");
  });

  video.addEventListener("canplay", () => {
    card.classList.add("is-playable");
  });

  video.addEventListener("error", () => {
    card.classList.add("has-error");
    status.textContent = "Video unavailable";
  });

  frame.append(video, status);

  const meta = document.createElement("div");
  meta.className = "video-meta";
  meta.innerHTML = `
    <span>${item.year || "Portfolio"}</span>
    <strong>${item.title || readableTitle(item.mp4Path)}</strong>
  `;

  card.append(frame, meta);
  return card;
}

function setupViewportPlayback() {
  const videos = document.querySelectorAll(".portfolio-video");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const video = entry.target;

        if (entry.isIntersecting) {
          video.play().catch(() => {
            video.controls = true;
          });
        } else {
          video.pause();
        }
      });
    },
    { rootMargin: "160px 0px", threshold: 0.35 }
  );

  videos.forEach(video => observer.observe(video));
}

function publicUrl(supabase, path) {
  const { data } = supabase.storage.from(VIDEO_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

function source(src, type) {
  const element = document.createElement("source");
  element.src = src;
  element.type = type;
  return element;
}

function readableTitle(path = "") {
  const file = path.split("/").pop() || "Portfolio film";
  return file.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
}

function renderError(message) {
  grid.innerHTML = `
    <article class="video-card video-card--error">
      <div class="video-frame">
        <div class="video-status">${message}</div>
      </div>
    </article>
  `;
}
