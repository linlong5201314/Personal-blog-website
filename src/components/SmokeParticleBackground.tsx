import { useEffect, useRef, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
  layer: number;
  hue: number;
}

interface SmokeParticleBackgroundProps {
  particleCount?: number;
  parallaxFactor?: number;
  interactive?: boolean;
}

const SmokeParticleBackground = ({
  particleCount = 60,
  parallaxFactor = 0.3,
  interactive = true,
}: SmokeParticleBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { getInterpolatedColor } = useTheme();
  const primaryColor = getInterpolatedColor("primary");
  const primaryLightColor = getInterpolatedColor("primaryLight");
  const accentColor = getInterpolatedColor("accent");

  // Mouse position for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax transforms for different layers
  const layer1X = useTransform(smoothMouseX, (v) => v * parallaxFactor * 0.3);
  const layer1Y = useTransform(smoothMouseY, (v) => v * parallaxFactor * 0.3);
  const layer2X = useTransform(smoothMouseX, (v) => v * parallaxFactor * 0.6);
  const layer2Y = useTransform(smoothMouseY, (v) => v * parallaxFactor * 0.6);
  const layer3X = useTransform(smoothMouseX, (v) => v * parallaxFactor);
  const layer3Y = useTransform(smoothMouseY, (v) => v * parallaxFactor);

  // Convert hex to rgba
  const hexToRgba = useCallback((hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }, []);

  // Generate particles
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 80 + 20,
      opacity: Math.random() * 0.15 + 0.05,
      speedX: (Math.random() - 0.5) * 0.02,
      speedY: (Math.random() - 0.5) * 0.02,
      layer: Math.floor(Math.random() * 3) + 1,
      hue: Math.random() * 60 - 30,
    }));
  }, [particleCount]);

  // Handle mouse move
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX - innerWidth / 2) * 0.5);
      mouseY.set((e.clientY - innerHeight / 2) * 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive, mouseX, mouseY]);

  // Get layer transform
  const getLayerTransform = (layer: number) => {
    switch (layer) {
      case 1:
        return { x: layer1X, y: layer1Y };
      case 2:
        return { x: layer2X, y: layer2Y };
      case 3:
        return { x: layer3X, y: layer3Y };
      default:
        return { x: layer1X, y: layer1Y };
    }
  };

  // Get particle color based on layer
  const getParticleColor = useCallback(
    (layer: number, opacity: number) => {
      switch (layer) {
        case 1:
          return hexToRgba(primaryColor, opacity * 0.5);
        case 2:
          return hexToRgba(primaryLightColor, opacity * 0.6);
        case 3:
          return hexToRgba(accentColor, opacity * 0.4);
        default:
          return hexToRgba(primaryColor, opacity);
      }
    },
    [primaryColor, primaryLightColor, accentColor, hexToRgba],
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{ perspective: "1000px" }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, ${hexToRgba(primaryColor, 0.08)} 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, ${hexToRgba(primaryLightColor, 0.06)} 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, ${hexToRgba(accentColor, 0.04)} 0%, transparent 60%)
          `,
        }}
      />

      {/* Particle layers */}
      {[1, 2, 3].map((layer) => {
        const transform = getLayerTransform(layer);
        const layerParticles = particles.filter((p) => p.layer === layer);

        return (
          <motion.div
            key={layer}
            className="absolute inset-0"
            style={{
              x: transform.x,
              y: transform.y,
              zIndex: layer,
            }}
          >
            {layerParticles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: particle.size,
                  height: particle.size,
                  background: `radial-gradient(circle at 30% 30%, ${getParticleColor(layer, particle.opacity)}, transparent 70%)`,
                  filter: `blur(${particle.size * 0.3}px)`,
                  willChange: "transform",
                }}
                animate={{
                  x: [
                    0,
                    Math.sin(particle.id) * 30,
                    Math.cos(particle.id) * 20,
                    0,
                  ],
                  y: [
                    0,
                    Math.cos(particle.id) * 25,
                    Math.sin(particle.id) * 35,
                    0,
                  ],
                  scale: [1, 1.1, 0.95, 1],
                  opacity: [
                    particle.opacity,
                    particle.opacity * 1.3,
                    particle.opacity * 0.8,
                    particle.opacity,
                  ],
                }}
                transition={{
                  duration: 15 + particle.id * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: particle.id * 0.1,
                }}
              />
            ))}
          </motion.div>
        );
      })}

      {/* Floating orbs - larger accent elements */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          top: "10%",
          left: "-10%",
          background: `radial-gradient(circle at center, ${hexToRgba(primaryColor, 0.15)}, transparent 70%)`,
          filter: "blur(60px)",
          x: layer2X,
          y: layer2Y,
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          bottom: "5%",
          right: "-5%",
          background: `radial-gradient(circle at center, ${hexToRgba(primaryLightColor, 0.12)}, transparent 70%)`,
          filter: "blur(50px)",
          x: layer3X,
          y: layer3Y,
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -25, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle at center, ${hexToRgba(accentColor, 0.1)}, transparent 60%)`,
          filter: "blur(40px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(248, 250, 252, 0.4) 100%)",
        }}
      />
    </div>
  );
};

export default SmokeParticleBackground;
