import { useScroll, useSpring } from "framer-motion";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import PortfolioHighlight from "./components/PortfolioHighlight.jsx";
import Services from "./components/Services.jsx";
import VideoSection from "./components/VideoSection.jsx";
import VisualSection from "./components/VisualSection.jsx";
import { useVideos } from "./hooks/useVideos.js";
import { visuals } from "./lib/visuals.js";

export default function App() {
  const { videos, loading } = useVideos();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

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
        <VideoSection videos={videos} loading={loading} />
        <VisualSection image={visuals.transitionOne} label="Frame. Feeling." />
        <Services />
        <VisualSection image={visuals.transitionTwo} label="No noise." align="right" />
        <About />
        <Contact />
      </main>
    </div>
  );
}
