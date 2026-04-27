import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { visuals } from "../lib/visuals.js";

export default function PortfolioHighlight() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="eyebrow">Highlight</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-none sm:text-6xl">
            Mood first.
            <br />
            Cut sharp.
          </h2>
        </motion.div>

        <motion.div style={{ y }} className="relative aspect-[4/5] overflow-hidden rounded-lg border border-white/10 shadow-2xl shadow-black/40">
          <img src={visuals.highlight} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
