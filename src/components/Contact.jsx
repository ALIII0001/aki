import { motion } from "framer-motion";
import { Instagram, Mail, MessageCircle, Play, Youtube } from "lucide-react";
import { useSiteData } from "../contexts/SiteDataContext.jsx";

function buildWhatsappUrl(number) {
  if (!number) return "#contact";
  return `https://wa.me/${number}?text=Hi%20I%20want%20to%20start%20a%20project`;
}

export default function Contact() {
  const { content, settings } = useSiteData();
  const whatsappUrl = buildWhatsappUrl(settings.whatsapp_number);

  return (
    <section id="contact" className="relative px-5 pb-28 pt-16 sm:px-8 sm:pb-36">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ivory p-8 text-night sm:p-12 lg:p-16"
        >
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_30%,rgba(199,160,92,.38),transparent_38%)]" />
          <div className="relative max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-zinc-600">Final CTA</p>
            <h2 className="mt-5 font-serif text-4xl leading-none sm:text-6xl">{content.final_cta_heading}</h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-700">{content.final_cta_text}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a className="cinema-button cinema-button--dark" href={settings.booking_link || "#contact"}>
                <Play size={18} fill="currentColor" />
                {settings.booking_button_text || content.hero_secondary_button}
              </a>
              <a className="cinema-button cinema-button--outline-dark" href={whatsappUrl} target="_blank" rel="noreferrer">
                <MessageCircle size={18} />
                WhatsApp
              </a>
              {settings.instagram_url ? (
                <a className="cinema-button cinema-button--outline-dark" href={settings.instagram_url} target="_blank" rel="noreferrer">
                  <Instagram size={18} />
                  Instagram
                </a>
              ) : null}
              {settings.youtube_url ? (
                <a className="cinema-button cinema-button--outline-dark" href={settings.youtube_url} target="_blank" rel="noreferrer">
                  <Youtube size={18} />
                  YouTube
                </a>
              ) : null}
              {settings.email ? (
                <a className="cinema-button cinema-button--outline-dark" href={`mailto:${settings.email}`}>
                  <Mail size={18} />
                  Email
                </a>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-gold text-night shadow-2xl shadow-gold/25 transition hover:scale-105"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </section>
  );
}
