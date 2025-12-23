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
  const [effectsLevel, setEffectsLevel] = useState<"low" | "medium" | "high">(() => {
    const shouldReduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const isPhoneScreen = window.matchMedia?.("(max-width: 640px)")?.matches;
    const isTabletScreen = window.matchMedia?.("(min-width: 641px) and (max-width: 1024px)")?.matches;

    if (shouldReduceMotion || isPhoneScreen) return "low";
    if (isTabletScreen) return "medium";
    return "high";
  });

  useEffect(() => {
    const compute = () => {
      const shouldReduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
      const isPhoneScreen = window.matchMedia?.("(max-width: 640px)")?.matches;
      const isTabletScreen = window.matchMedia?.("(min-width: 641px) and (max-width: 1024px)")?.matches;

      if (shouldReduceMotion || isPhoneScreen) return "low";
      if (isTabletScreen) return "medium";
      return "high";
    };

    setEffectsLevel(compute());

    const mqReduce = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const mqSmall = window.matchMedia?.("(max-width: 640px)");
    const mqTablet = window.matchMedia?.("(min-width: 641px) and (max-width: 1024px)");

    const onChange = () => setEffectsLevel(compute());

    mqReduce?.addEventListener?.("change", onChange);
    mqSmall?.addEventListener?.("change", onChange);
    mqTablet?.addEventListener?.("change", onChange);

    mqReduce?.addListener?.(onChange);
    mqSmall?.addListener?.(onChange);
    mqTablet?.addListener?.(onChange);

    return () => {
      mqReduce?.removeEventListener?.("change", onChange);
      mqSmall?.removeEventListener?.("change", onChange);
      mqTablet?.removeEventListener?.("change", onChange);

      mqReduce?.removeListener?.(onChange);
      mqSmall?.removeListener?.(onChange);
      mqTablet?.removeListener?.(onChange);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen neural-bg relative flex flex-col">
      <CursorEffect />
      {/* Smoke Particle Background */}
      {effectsLevel === "low" ? (
        <div className="mobile-gradient-bg fixed inset-0 pointer-events-none z-0" />
      ) : effectsLevel === "medium" ? (
        <SmokeParticleBackground
          particleCount={40}
          parallaxFactor={0.08}
          interactive={false}
        />
      ) : (
        <SmokeParticleBackground
          particleCount={80}
          parallaxFactor={0.3}
          interactive={true}
        />
      )}
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
