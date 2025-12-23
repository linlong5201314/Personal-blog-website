import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CursorEffect from "./components/CursorEffect";
import SmokeParticleBackground from "./components/SmokeParticleBackground";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();
  const [reduceEffects, setReduceEffects] = useState(false);

  useEffect(() => {
    const compute = () => {
      const shouldReduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
      const isCoarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches;
      const isSmallScreen = window.matchMedia?.("(max-width: 768px)")?.matches;
      return Boolean(shouldReduceMotion || isCoarsePointer || isSmallScreen);
    };

    setReduceEffects(compute());

    const mqReduce = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const mqCoarse = window.matchMedia?.("(pointer: coarse)");
    const mqSmall = window.matchMedia?.("(max-width: 768px)");

    const onChange = () => setReduceEffects(compute());

    mqReduce?.addEventListener?.("change", onChange);
    mqCoarse?.addEventListener?.("change", onChange);
    mqSmall?.addEventListener?.("change", onChange);

    mqReduce?.addListener?.(onChange);
    mqCoarse?.addListener?.(onChange);
    mqSmall?.addListener?.(onChange);

    return () => {
      mqReduce?.removeEventListener?.("change", onChange);
      mqCoarse?.removeEventListener?.("change", onChange);
      mqSmall?.removeEventListener?.("change", onChange);

      mqReduce?.removeListener?.(onChange);
      mqCoarse?.removeListener?.(onChange);
      mqSmall?.removeListener?.(onChange);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen neural-bg relative flex flex-col">
      <CursorEffect />
      {/* Smoke Particle Background */}
      <SmokeParticleBackground
        particleCount={reduceEffects ? 24 : 80}
        parallaxFactor={reduceEffects ? 0 : 0.3}
        interactive={!reduceEffects}
      />
      <Navbar />

      <main className="relative z-10 flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
