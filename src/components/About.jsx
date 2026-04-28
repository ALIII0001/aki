import { motion } from "framer-motion";
import { useSiteData } from "../contexts/SiteDataContext.jsx";

export default function About() {
  const { content } = useSiteData();

  return (
    <section id="about" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="section-shell grid gap-10 border-y border-white/10 py-16 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="eyebrow">Studio note</p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          <h2 className="font-serif text-4xl leading-none sm:text-6xl">{content.studio_note_heading}</h2>
          <p className="max-w-2xl text-base leading-8 text-zinc-300">{content.studio_note_text}</p>
        </motion.div>
      </div>
    </section>
  );
}
