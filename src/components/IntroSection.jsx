import { motion } from "framer-motion";

export default function IntroSection() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="section-shell grid gap-10 border-y border-white/10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="eyebrow">Intro</p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-none sm:text-6xl">
            Not just edits.
            <br />
            Experiences.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.08 }}
          className="max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg"
        >
          Every frame is shaped to pull attention instantly and hold it longer than expected.
        </motion.p>
      </div>
    </section>
  );
}
