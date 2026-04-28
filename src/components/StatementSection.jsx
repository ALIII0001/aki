import { motion } from "framer-motion";

export default function StatementSection() {
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        className="section-shell border-y border-white/10 py-16 text-center"
      >
        <p className="mx-auto max-w-5xl font-serif text-4xl leading-none sm:text-6xl lg:text-7xl">
          If it doesn&apos;t hold attention, it doesn&apos;t work.
        </p>
      </motion.div>
    </section>
  );
}
