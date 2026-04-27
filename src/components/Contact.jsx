import { motion } from "framer-motion";
import { Instagram, MessageCircle } from "lucide-react";

const whatsappNumber = "919999999999";
const instagramUrl = "https://www.instagram.com/";

export default function Contact() {
  return (
    <section id="contact" className="relative px-5 pb-28 pt-16 sm:px-8 sm:pb-36">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative overflow-hidden rounded-lg border border-white/10 bg-ivory p-8 text-night sm:p-12 lg:p-16"
        >
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_30%,rgba(199,160,92,.38),transparent_38%)]" />
          <div className="relative max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-zinc-600">Now booking</p>
            <h2 className="mt-5 font-serif text-4xl leading-none sm:text-7xl">
              Let's make the next frame impossible to ignore.
            </h2>
            <div className="mt-8 flex flex-wrap gap-4">
              <a className="cinema-button cinema-button--dark" href={`https://wa.me/${whatsappNumber}`}>
                <MessageCircle size={18} />
                WhatsApp
              </a>
              <a className="cinema-button cinema-button--outline-dark" href={instagramUrl}>
                <Instagram size={18} />
                Instagram
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href={`https://wa.me/${whatsappNumber}`}
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-gold text-night shadow-2xl shadow-gold/25 transition hover:scale-105"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </section>
  );
}
