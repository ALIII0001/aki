import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import { visuals } from "../lib/visuals.js";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 140]);
  const scale = useTransform(scrollY, [0, 800], [1.08, 1.18]);
  const opacity = useTransform(scrollY, [0, 650], [1, 0.35]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 pb-10 pt-28 sm:px-8 lg:px-12">
      <motion.div className="absolute inset-0" style={{ y, scale, opacity }}>
        <img src={visuals.hero} alt="" className="h-full w-full object-cover" />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-black/15" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.82),rgba(0,0,0,.18),rgba(0,0,0,.76))]" />
      <div className="film-grain" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
          className="max-w-3xl"
        >
          <p className="eyebrow">AKI Films</p>
          <h1 className="mt-6 font-serif text-[clamp(3.5rem,8vw,8rem)] font-bold leading-[0.88] tracking-tight">
            Stories.
            <br />
            Cut Like Cinema.
          </h1>
          <p className="mt-7 text-sm uppercase tracking-[0.32em] text-zinc-300">
            Film / Edit / Emotion
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <a className="cinema-button" href="#work">
              <Play size={18} fill="currentColor" />
              Watch Work
            </a>
            <a className="cinema-button cinema-button--ghost" href="#contact">
              Start Project
            </a>
          </div>
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
