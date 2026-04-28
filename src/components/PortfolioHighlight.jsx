import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { visuals } from "../lib/visuals.js";

export default function PortfolioHighlight() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="section-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="eyebrow">What the work should feel like</p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-none sm:text-6xl">
            Stronger hooks.
            <br />
            Cleaner emotion.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-zinc-300">
            The goal is not just a polished timeline. It is a piece that opens fast, carries weight,
            and keeps the audience inside the feeling long enough to care.
          </p>
          <div className="mt-10 grid gap-6 border-t border-white/10 pt-7 text-sm uppercase tracking-[0.24em] text-zinc-400 sm:grid-cols-3">
            <p>Sharper openings</p>
            <p>More watch time</p>
            <p>Cinematic finish</p>
          </div>
        </motion.div>

        <motion.div
          style={{ y }}
          className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/40"
        >
          <img src={visuals.highlight} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Featured direction</p>
            <p className="mt-3 max-w-xs font-serif text-3xl leading-none sm:text-4xl">
              Image-led edits with space to breathe.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
