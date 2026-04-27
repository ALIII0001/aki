import { motion } from "framer-motion";
import { Clapperboard, Film, Megaphone, Scissors } from "lucide-react";

const services = [
  {
    title: "Directing & Cinematography",
    text: "Frames shaped for atmosphere, story, and brand recall.",
    icon: Film
  },
  {
    title: "Professional Video Editing",
    text: "Rhythm, pacing, sound, and color built for premium retention.",
    icon: Scissors
  },
  {
    title: "Social Media Growth",
    text: "Short-form hooks and platform-native edits made to travel.",
    icon: Megaphone
  },
  {
    title: "Long & Short Form Editing",
    text: "From cinematic reels to complete campaign films and episodes.",
    icon: Clapperboard
  }
];

export default function Services() {
  return (
    <section id="services" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(199,160,92,0.14),transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl">
        <p className="eyebrow">Production capabilities</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="font-serif text-4xl leading-none sm:text-6xl">
            Everything a visual brand needs before the first frame cuts.
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
                  whileHover={{ y: -8 }}
                  className="rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl transition hover:border-gold/50 hover:bg-white/[0.07]"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gold/12 text-gold">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-8 font-serif text-2xl leading-none">{service.title}</h3>
                  <p className="mt-4 leading-7 text-zinc-400">{service.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
