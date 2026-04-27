import { motion } from "framer-motion";
import { Clapperboard, Film, Megaphone, Scissors } from "lucide-react";

const services = [
  {
    title: "Directing & Cinematography",
    icon: Film
  },
  {
    title: "Video Editing",
    icon: Scissors
  },
  {
    title: "Social Growth",
    icon: Megaphone
  },
  {
    title: "Film & Content Editing",
    icon: Clapperboard
  }
];

export default function Services() {
  return (
    <section id="services" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(199,160,92,0.14),transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl">
        <p className="eyebrow">Services</p>
        <div className="mt-5 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <h2 className="font-serif text-4xl leading-none sm:text-6xl">
            Built for
            <br />
            attention.
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl transition hover:border-gold/50 hover:bg-white/[0.075] hover:shadow-glow"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gold/12 text-gold transition group-hover:scale-110">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-10 max-w-[12rem] font-serif text-2xl leading-none">{service.title}</h3>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
