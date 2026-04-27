import { motion } from "framer-motion";
import VideoCard from "./VideoCard.jsx";

export default function VideoRow({ title, videos }) {
  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="mb-5 flex items-end justify-between gap-5">
        <div>
          <p className="eyebrow">Category</p>
          <h3 className="mt-2 font-serif text-3xl capitalize text-ivory sm:text-5xl">{title}</h3>
        </div>
        <span className="hidden text-sm uppercase tracking-[0.24em] text-zinc-500 sm:block">
          {videos.length} films
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7 }}
        className="scrollbar-hide flex snap-x gap-5 overflow-x-auto pb-5"
      >
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </motion.div>
    </section>
  );
}
