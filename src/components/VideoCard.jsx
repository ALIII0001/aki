import { motion, useInView } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";
import { useRef, useState } from "react";
import { getEmbedUrl, getThumbnail } from "../lib/youtube.js";

export default function VideoCard({ video }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.65, margin: "120px" });
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);
  const thumbnail = getThumbnail(video);
  const shouldLoad = active || inView;
  const sourceUrl = video.video_url || video.youtube_url;
  const embedUrl = shouldLoad ? getEmbedUrl(sourceUrl, { autoplay: true, controls: false }) : "";
  const hasEmbed = Boolean(embedUrl);

  return (
    <motion.article
      ref={ref}
      whileHover={{ y: -8, scale: 1.025 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className="group relative w-full"
      tabIndex={0}
    >
      <div className="relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-zinc-950 shadow-2xl shadow-black/40">
        {thumbnail && (
          <img
            src={thumbnail}
            alt=""
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${
              shouldLoad && hasEmbed ? "scale-105 opacity-0" : "opacity-100"
            }`}
          />
        )}

        {!shouldLoad || !hasEmbed ? (
          <div className="absolute inset-0 grid place-items-center bg-black/20">
            <div className="grid h-16 w-16 place-items-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-md transition group-hover:scale-110 group-hover:border-gold group-hover:text-gold">
              {hasEmbed ? <Play size={22} fill="currentColor" /> : <ExternalLink size={20} />}
            </div>
          </div>
        ) : null}

        {embedUrl && !failed ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={embedUrl}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            loading="lazy"
            onError={() => setFailed(true)}
          />
        ) : null}

        {failed ? (
          <div className="absolute inset-0 grid place-items-center bg-black/80 p-6 text-center text-sm text-zinc-300">
            Unavailable.
          </div>
        ) : null}

        {!hasEmbed && sourceUrl ? (
          <a href={sourceUrl} target="_blank" rel="noreferrer" className="absolute inset-0 z-10" aria-label={`Open ${video.title}`} />
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-5 sm:p-7">
          <p className="text-xs uppercase tracking-[0.24em] text-gold">{video.category || "Now playing"}</p>
          <h4 className="mt-2 max-w-[90%] font-serif text-2xl leading-none sm:text-4xl">{video.title}</h4>
        </div>
      </div>
    </motion.article>
  );
}
