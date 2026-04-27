import { motion } from "framer-motion";
import VideoCard from "./VideoCard.jsx";

export default function VideoSection({ videos, loading }) {
  return (
    <section id="work" className="relative z-10 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-8 sm:mb-12"
        >
          <p className="eyebrow">Watch</p>
          <h2 className="mt-4 max-w-xl font-serif text-4xl leading-none text-ivory sm:text-6xl">
            Frames that
            <br />
            move first.
          </h2>
        </motion.div>

        {loading ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {[0, 1].map(item => (
              <div
                key={item}
                className="aspect-video animate-pulse rounded-lg border border-white/10 bg-white/[0.06]"
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-5 lg:grid-cols-2"
          >
            {videos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
