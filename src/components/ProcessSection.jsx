import { motion } from "framer-motion";
import { useSiteData } from "../contexts/SiteDataContext.jsx";

export default function ProcessSection() {
  const { content } = useSiteData();
  const steps = [
    { number: "01", title: content.process_step_1_title, description: content.process_step_1_text },
    { number: "02", title: content.process_step_2_title, description: content.process_step_2_text },
    { number: "03", title: content.process_step_3_title, description: content.process_step_3_text }
  ];

  return (
    <section className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="absolute inset-0 divider-grid opacity-40" />
      <div className="section-shell relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl"
        >
          <p className="eyebrow">Process</p>
          <h2 className="mt-5 font-serif text-4xl leading-none sm:text-6xl">{content.process_heading}</h2>
        </motion.div>

        <div className="mt-14 space-y-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.08 }}
              className="grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-[160px_1fr]"
            >
              <p className="text-xs font-bold tracking-[0.3em] text-gold">{step.number}</p>
              <div>
                <h3 className="font-serif text-3xl leading-none sm:text-4xl">{step.title}</h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
