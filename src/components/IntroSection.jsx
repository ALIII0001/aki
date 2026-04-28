import { motion } from "framer-motion";
import { useSiteData } from "../contexts/SiteDataContext.jsx";

export default function IntroSection() {
  const { content } = useSiteData();

  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="section-shell grid gap-10 border-y border-white/10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="eyebrow">Intro</p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-none sm:text-6xl">{content.intro_heading}</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.08 }}
          className="max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg"
        >
          {content.intro_text}
        </motion.p>
      </div>
    </section>
  );
}
