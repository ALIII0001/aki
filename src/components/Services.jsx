import { motion } from "framer-motion";
import { Clapperboard, Film, Megaphone, Scissors } from "lucide-react";
import { useSiteData } from "../contexts/SiteDataContext.jsx";

export default function Services() {
  const { content } = useSiteData();
  const services = [
    { title: content.service_1_title, icon: Film, description: content.service_1_text },
    { title: content.service_2_title, icon: Scissors, description: content.service_2_text },
    { title: content.service_3_title, icon: Megaphone, description: content.service_3_text },
    { title: content.service_4_title, icon: Clapperboard, description: content.service_4_text }
  ];

  return (
    <section id="services" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(199,160,92,0.14),transparent_28%)]" />
      <div className="section-shell relative">
        <p className="eyebrow">Services detail</p>
        <div className="mt-5 grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <h2 className="font-serif text-4xl leading-none sm:text-6xl">{content.services_detail_heading}</h2>
            <p className="mt-6 max-w-md text-base leading-8 text-zinc-300">{content.services_detail_intro}</p>
          </div>
          <div className="space-y-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.06 }}
                  className="grid gap-5 border-t border-white/10 py-5 sm:grid-cols-[72px_1fr]"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/20 bg-gold/10 text-gold">
                    <Icon size={24} />
                  </div>
                  <div className="max-w-2xl">
                    <h3 className="font-serif text-3xl leading-none sm:text-4xl">{service.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">{service.description}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
