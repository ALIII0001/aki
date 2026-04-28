import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import { visuals } from "../lib/visuals.js";

const capabilityPills = [
  "Brand films that feel premium",
  "Music videos with rhythm",
  "Launch edits that create hype",
  "Reels that don't get skipped",
  "Story-driven cinematic cuts"
];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], reduceMotion ? [0, 0] : [0, 80]);
  const scale = useTransform(scrollY, [0, 800], reduceMotion ? [1, 1] : [1, 1.05]);
  const opacity = useTransform(scrollY, [0, 650], [1, 0.38]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 pb-10 pt-28 sm:px-8 lg:px-12">
      <motion.div className="absolute inset-0" style={{ y, scale, opacity }}>
        <img
          src={visuals.heroFilmShoot}
          alt="Cinematic film shoot with camera operator and director silhouette"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/45 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-black/35 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_36%,rgba(199,160,92,.16),transparent_24%)]" />
      <div className="film-grain" />

      <div className="section-shell relative z-10 grid w-full gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: reduceMotion ? 0 : 24, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
          className="max-w-5xl"
        >
          <p className="eyebrow">Ali Khan Films</p>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.34em] text-zinc-400">
            Turning vision into motion
          </p>
          <h1 className="mt-6 max-w-5xl font-serif text-[clamp(3.6rem,8vw,8.4rem)] font-semibold leading-[0.88] tracking-tight">
            Turning raw clips
            <br />
            into engaging
            <br />
            stories
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
            Raw footage is just noise until it&apos;s cut right.
            <br />
            We craft edits that hook fast, hit harder, and stay with the viewer.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a className="cinema-button shadow-[0_0_40px_rgba(199,160,92,0.25)]" href="#work">
              <Play size={18} fill="currentColor" />
              Watch Work
            </a>
            <a className="cinema-button cinema-button--ghost" href="#contact">
              Start a Project
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reduceMotion ? 0 : 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.18, duration: 0.9 }}
          className="justify-self-end lg:max-w-md"
        >
          <div className="border-l border-white/15 pl-6">
            <p className="text-xs uppercase tracking-[0.32em] text-gold">Capabilities</p>
            <div className="mt-5 space-y-4">
              {capabilityPills.map(item => (
                <p key={item} className="text-sm uppercase leading-6 tracking-[0.18em] text-zinc-300">
                  {item}
                </p>
              ))}
            </div>
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
