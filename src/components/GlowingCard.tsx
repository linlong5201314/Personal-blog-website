import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  glowIntensity?: "low" | "medium" | "high";
  enableTilt?: boolean;
  enableSpotlight?: boolean;
  borderGlow?: boolean;
}

const GlowingCard = ({
  children,
  className = "",
  glowIntensity = "medium",
  enableTilt = true,
  enableSpotlight = true,
  borderGlow = true,
}: GlowingCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { getInterpolatedColor } = useTheme();

  const primaryColor = getInterpolatedColor("primary");
  const primaryLightColor = getInterpolatedColor("primaryLight");

  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring config for smooth animations
  const springConfig = { damping: 30, stiffness: 200 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D tilt transforms
  const rotateX = useTransform(smoothMouseY, [0, dimensions.height], [8, -8]);
  const rotateY = useTransform(smoothMouseX, [0, dimensions.width], [-8, 8]);

  // Glow intensity multipliers
  const intensityMap = {
    low: { glow: 0.1, border: 0.2, spotlight: 0.12 },
    medium: { glow: 0.18, border: 0.35, spotlight: 0.18 },
    high: { glow: 0.25, border: 0.5, spotlight: 0.25 },
  };

  const intensity = intensityMap[glowIntensity];

  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(dimensions.width / 2);
    mouseY.set(dimensions.height / 2);
  };

  // Convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* 3D Tilt Container */}
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX: enableTilt ? rotateX : 0,
          rotateY: enableTilt ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated gradient background glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `
              radial-gradient(
                800px circle at ${smoothMouseX.get()}px ${smoothMouseY.get()}px,
                ${hexToRgba(primaryColor, intensity.glow)},
                ${hexToRgba(primaryLightColor, intensity.glow * 0.5)},
                transparent 50%
              )
            `,
          }}
        />

        {/* Spotlight effect */}
        {enableSpotlight && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none z-10"
            style={
              {
                opacity: isHovered ? 1 : 0,
                background: `radial-gradient(
                350px circle at var(--mouse-x) var(--mouse-y),
                ${hexToRgba(primaryColor, intensity.spotlight)},
                transparent 60%
              )`,
                "--mouse-x": `${smoothMouseX.get()}px`,
                "--mouse-y": `${smoothMouseY.get()}px`,
              } as React.CSSProperties
            }
          />
        )}

        {/* Animated border glow */}
        {borderGlow && (
          <>
            {/* Outer glow border */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 transition-all duration-500"
              style={{
                opacity: isHovered ? 1 : 0,
                background: `
                  radial-gradient(
                    500px circle at ${smoothMouseX.get()}px ${smoothMouseY.get()}px,
                    ${hexToRgba(primaryColor, intensity.border)},
                    ${hexToRgba(primaryLightColor, intensity.border * 0.5)},
                    transparent 45%
                  )
                `,
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "xor",
                WebkitMaskComposite: "xor",
                padding: "1.5px",
              }}
            />

            {/* Inner highlight */}
            <motion.div
              className="absolute inset-[1px] rounded-2xl opacity-0 transition-all duration-300 pointer-events-none"
              style={{
                opacity: isHovered ? 0.5 : 0,
                background: `linear-gradient(
                  135deg,
                  ${hexToRgba("#ffffff", 0.1)} 0%,
                  transparent 50%,
                  ${hexToRgba(primaryColor, 0.05)} 100%
                )`,
              }}
            />
          </>
        )}

        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ x: "-100%", opacity: 0 }}
            animate={
              isHovered
                ? { x: "200%", opacity: [0, 0.3, 0] }
                : { x: "-100%", opacity: 0 }
            }
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{
              background: `linear-gradient(
                90deg,
                transparent,
                ${hexToRgba("#ffffff", 0.15)},
                transparent
              )`,
              width: "50%",
            }}
          />
        </motion.div>

        {/* Main content container */}
        <motion.div
          className="relative z-10 h-full rounded-2xl border transition-all duration-300"
          style={{
            background: isHovered
              ? "rgba(255, 255, 255, 0.9)"
              : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            borderColor: isHovered
              ? hexToRgba(primaryColor, 0.3)
              : "rgba(229, 231, 235, 0.6)",
            boxShadow: isHovered
              ? `
                  0 20px 40px ${hexToRgba(primaryColor, 0.12)},
                  0 8px 16px rgba(0, 0, 0, 0.06),
                  inset 0 1px 0 rgba(255, 255, 255, 0.8)
                `
              : `
                  0 4px 12px rgba(0, 0, 0, 0.05),
                  0 2px 4px rgba(0, 0, 0, 0.03),
                  inset 0 1px 0 rgba(255, 255, 255, 0.6)
                `,
          }}
        >
          {children}
        </motion.div>

        {/* Corner accents */}
        {isHovered && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-20"
              style={{
                background: `linear-gradient(135deg, ${hexToRgba(primaryColor, 0.15)}, transparent 70%)`,
                borderTopLeftRadius: "1rem",
              }}
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-20"
              style={{
                background: `linear-gradient(315deg, ${hexToRgba(primaryLightColor, 0.15)}, transparent 70%)`,
                borderBottomRightRadius: "1rem",
              }}
            />
          </>
        )}
      </motion.div>

      {/* Motion update effect - updates gradient positions */}
      <motion.div
        className="hidden"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
        }}
        onUpdate={() => {
          if (cardRef.current && isHovered) {
            cardRef.current.style.setProperty(
              "--mouse-x",
              `${smoothMouseX.get()}px`,
            );
            cardRef.current.style.setProperty(
              "--mouse-y",
              `${smoothMouseY.get()}px`,
            );
          }
        }}
      />
    </motion.div>
  );
};

export default GlowingCard;
