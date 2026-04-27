import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 border-y border-white/10 py-16 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="eyebrow">Creative identity</p>
          <p className="mt-6 text-sm uppercase tracking-[0.28em] text-zinc-500">
            Direction / Emotion / Edit
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          <h2 className="font-serif text-4xl leading-none sm:text-6xl">
            Less noise.
            <br />
            More feeling.
          </h2>
          <p className="max-w-lg text-sm uppercase leading-7 tracking-[0.22em] text-zinc-500">
            Visuals with rhythm.
            <br />
            Edits with pulse.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
