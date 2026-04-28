import { motion } from "framer-motion";
import { useSiteData } from "../contexts/SiteDataContext.jsx";

export default function StatementSection() {
  const { content } = useSiteData();

  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        className="section-shell border-y border-white/10 py-16 text-center"
      >
        <p className="mx-auto max-w-5xl font-serif text-4xl leading-none sm:text-6xl lg:text-7xl">
          {content.statement_text}
        </p>
      </motion.div>
    </section>
  );
}
