import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ImageSection({
  variant = "split",
  eyebrow,
  title,
  text,
  image,
  imageAlt,
  align = "right"
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bannerY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-6%", "6%"]);
  const bannerScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion ? [1, 1, 1] : [1.02, 1.08, 1.02]
  );

  if (variant === "banner") {
    return (
      <section ref={ref} className="relative h-[54vh] overflow-hidden sm:h-[70vh]">
        <motion.img
          src={image}
          alt={imageAlt}
          loading="lazy"
          style={{ y: bannerY, scale: bannerScale }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-night" />
        <div className="film-grain" />

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="section-shell relative z-10 flex h-full items-center justify-center px-5 text-center sm:px-8"
        >
          <div className="max-w-4xl">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <h2 className="mt-5 font-serif text-4xl leading-none text-ivory sm:text-6xl lg:text-7xl">
              {title}
            </h2>
            {text ? (
              <p className="mx-auto mt-5 max-w-2xl text-sm uppercase tracking-[0.22em] text-zinc-300 sm:text-base">
                {text}
              </p>
            ) : null}
          </div>
        </motion.div>
      </section>
    );
  }

  const isImageLeft = align === "left";

  return (
    <section ref={ref} className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className={isImageLeft ? "lg:order-2" : ""}
        >
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-none sm:text-6xl">{title}</h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-zinc-300 sm:text-lg">{text}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className={isImageLeft ? "lg:order-1" : ""}
        >
          <motion.div
            whileHover={reduceMotion ? {} : { scale: 1.03 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.38)]"
          >
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
