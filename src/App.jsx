import { motion, useScroll, useSpring } from "framer-motion";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import ImageSection from "./components/ImageSection.jsx";
import IntroSection from "./components/IntroSection.jsx";
import ProcessSection from "./components/ProcessSection.jsx";
import Services from "./components/Services.jsx";
import StatementSection from "./components/StatementSection.jsx";
import VideoSection from "./components/VideoSection.jsx";
import { useVideos } from "./hooks/useVideos.js";
import { visuals } from "./lib/visuals.js";

export default function App() {
  const { videos, loading } = useVideos();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div className="min-h-screen overflow-hidden bg-night text-ivory">
      <motion.div
        className="fixed left-0 top-0 z-50 h-px origin-left bg-gold shadow-[0_0_24px_rgba(199,160,92,0.55)]"
        style={{ scaleX }}
      />

      <Header />
      <Hero />

      <main>
        <IntroSection />
        <ImageSection
          variant="split"
          eyebrow="The craft"
          title="Precision lives in the timeline."
          text="Every frame shaped, every cut intentional."
          image={visuals.editingSetup}
          imageAlt="Editing setup with monitor, timeline, and color tools"
        />
        <ProcessSection />
        <VideoSection videos={videos} loading={loading} />
        <Services />
        <StatementSection />
        <ImageSection
          variant="banner"
          eyebrow="Visual impact"
          title="Every frame earns its place."
          text="Luxury visuals pushed with restraint, depth, and atmosphere."
          image={visuals.watchProduct}
          imageAlt="Luxury watch product shot in a cinematic dark setting"
        />
        <About />
        <Contact />
      </main>
    </div>
  );
}
