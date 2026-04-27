import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import { getEmbedUrl, getThumbnail } from "../lib/youtube.js";

export default function Hero({ video, loading }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 180]);
  const opacity = useTransform(scrollY, [0, 650], [1, 0.25]);
  const embedUrl = video ? getEmbedUrl(video.youtube_url, { autoplay: true }) : "";
  const thumbnail = getThumbnail(video);

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden px-5 pb-10 pt-28 sm:px-8 lg:px-12">
      <motion.div className="absolute inset-0" style={{ y, opacity }}>
        {embedUrl ? (
          <iframe
            className="absolute left-1/2 top-1/2 h-[120vh] w-[213.33vh] min-w-[120vw] -translate-x-1/2 -translate-y-1/2"
            src={embedUrl}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            loading="eager"
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: thumbnail
                ? `url(${thumbnail})`
                : "radial-gradient(circle at 50% 30%, rgba(199,160,92,0.22), transparent 32%), linear-gradient(135deg, #191919, #050505)"
            }}
          />
        )}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/72 to-night/20" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.82),rgba(0,0,0,.12),rgba(0,0,0,.72))]" />
      <div className="film-grain" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1fr_360px] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 34, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
        >
          <p className="eyebrow">AKI Films / Cinematic Visuals</p>
          <h1 className="mt-5 max-w-5xl font-serif text-[clamp(4.2rem,12vw,11rem)] font-bold leading-[0.82] tracking-tight">
            Crafting Stories That Feel Like Cinema
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
            Direction, editing, social-first storytelling, and films shaped with the mood of a trailer and the restraint of a luxury brand.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a className="cinema-button" href="#work">
              <Play size={18} fill="currentColor" />
              Watch work
            </a>
            <a className="cinema-button cinema-button--ghost" href="#contact">
              Start a project
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="hidden rounded-lg border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl lg:block"
        >
          <p className="text-xs uppercase tracking-[0.26em] text-gold">Now presenting</p>
          <h2 className="mt-4 font-serif text-3xl leading-none">{loading ? "Loading reel" : video?.title || "Director's reel"}</h2>
          <p className="mt-5 text-sm leading-6 text-zinc-400">
            YouTube-hosted motion, Supabase-curated metadata, and a front-end built to keep the first frame fast.
          </p>
        </motion.div>
      </div>

      <a
        href="#work"
        className="absolute bottom-7 right-5 z-20 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-zinc-200 backdrop-blur-md transition hover:border-gold hover:text-gold sm:right-8"
        aria-label="Scroll to work"
      >
        <ArrowDown size={18} />
      </a>
    </section>
  );
}
