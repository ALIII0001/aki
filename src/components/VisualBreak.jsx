import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function VisualBreak({ image, label, align = "left" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.16, 1.08]);

  return (
    <section ref={ref} className="relative h-[58vh] overflow-hidden sm:h-[70vh]">
      <motion.img
        src={image}
        alt=""
        style={{ y, scale }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night via-black/25 to-night" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.72),transparent,rgba(0,0,0,.72))]" />
      <motion.p
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        className={`absolute bottom-10 px-5 font-serif text-4xl leading-none text-ivory sm:px-8 sm:text-7xl ${
          align === "right" ? "right-0 text-right" : "left-0"
        }`}
      >
        {label}
      </motion.p>
    </section>
  );
}
