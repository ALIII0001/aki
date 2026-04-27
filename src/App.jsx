import { motion, useScroll, useSpring } from "framer-motion";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import PortfolioHighlight from "./components/PortfolioHighlight.jsx";
import Services from "./components/Services.jsx";
import VideoRow from "./components/VideoRow.jsx";
import VisualBreak from "./components/VisualBreak.jsx";
import { useVideos } from "./hooks/useVideos.js";
import { visuals } from "./lib/visuals.js";

const preferredOrder = ["films", "ads", "reels", "music", "documentary"];

export default function App() {
  const { videos, loading, error } = useVideos();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const groupedVideos = groupVideos(videos);
  const categories = Object.keys(groupedVideos).sort(sortCategories);

  return (
    <div className="min-h-screen overflow-hidden bg-night text-ivory">
      <motion.div
        className="fixed left-0 top-0 z-50 h-px origin-left bg-gold"
        style={{ scaleX }}
      />

      <Header />
      <Hero />

      <main>
        <PortfolioHighlight />

        <section id="work" className="relative z-10 space-y-14 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="eyebrow"
            >
              Watch
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.08 }}
              className="mt-4 max-w-2xl font-serif text-4xl leading-none text-ivory sm:text-6xl"
            >
              Select frames.
              <br />
              Pure impact.
            </motion.h2>
          </div>

          {error && (
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
                Reel loading soon.
              </div>
            </div>
          )}

          {loading && <ShowcaseSkeleton />}

          {!loading && !categories.length && !error && (
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-8 text-sm uppercase tracking-[0.2em] text-zinc-400">
                Reel loading soon.
              </div>
            </div>
          )}

          {!loading &&
            categories.map(category => (
              <VideoRow key={category} title={category} videos={groupedVideos[category]} />
            ))}
        </section>

        <VisualBreak image={visuals.transitionOne} label="Frame. Feeling." />
        <Services />
        <VisualBreak image={visuals.transitionTwo} label="No noise." align="right" />
        <About />
        <Contact />
      </main>
    </div>
  );
}

function groupVideos(videos) {
  return videos.reduce((groups, video) => {
    const category = (video.category || "films").toLowerCase();
    groups[category] ??= [];
    groups[category].push(video);
    return groups;
  }, {});
}

function sortCategories(a, b) {
  const aIndex = preferredOrder.indexOf(a);
  const bIndex = preferredOrder.indexOf(b);

  if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
  if (aIndex === -1) return 1;
  if (bIndex === -1) return -1;
  return aIndex - bIndex;
}

function ShowcaseSkeleton() {
  return (
    <div className="space-y-10">
      {[0, 1].map(row => (
        <div key={row} className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-5 h-7 w-40 animate-pulse rounded-full bg-white/10" />
          <div className="flex gap-5 overflow-hidden">
            {[0, 1, 2].map(item => (
              <div
                key={item}
                className="h-56 min-w-[78vw] animate-pulse rounded-lg bg-white/[0.06] sm:min-w-[420px]"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
