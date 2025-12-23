import { motion, useInView, useMotionValue } from "framer-motion";
import {
  FaEnvelope,
  FaBriefcase,
  FaArrowRight,
  FaRocket,
  FaStar,
  FaHeart,
  FaGithub,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import ThemedButton from "./ThemedButton";
import { useRef, useEffect, useState } from "react";

const CTASection = () => {
  const { getInterpolatedColor } = useTheme();
  const primaryColor = getInterpolatedColor("primary");
  const primaryLightColor = getInterpolatedColor("primaryLight");
  const accentColor = getInterpolatedColor("accent");

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      return () => section.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  // Convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  // Floating particles config
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 5 + 5,
    delay: Math.random() * 2,
  }));

  // Features/highlights
  const highlights = [
    { icon: "🎯", text: "目标明确" },
    { icon: "📚", text: "持续学习" },
    { icon: "💪", text: "踏实肯干" },
    { icon: "🤝", text: "团队协作" },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Main CTA Card */}
          <motion.div
            variants={itemVariants}
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              boxShadow: `
                0 4px 6px -1px rgba(0, 0, 0, 0.05),
                0 10px 15px -3px rgba(0, 0, 0, 0.08),
                0 25px 50px -12px ${hexToRgba(primaryColor, 0.15)},
                inset 0 1px 0 rgba(255, 255, 255, 0.9)
              `,
              border: `1px solid ${hexToRgba(primaryColor, 0.1)}`,
            }}
          >
            {/* Animated gradient border at top */}
            <motion.div
              className="h-1.5 w-full"
              style={{
                background: `linear-gradient(90deg, ${primaryColor}, ${primaryLightColor}, ${accentColor}, ${primaryLightColor}, ${primaryColor})`,
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />

            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Gradient orbs */}
              <motion.div
                animate={{
                  x: [0, 50, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute -top-32 -left-32 w-64 h-64 rounded-full blur-[80px] opacity-40"
                style={{ backgroundColor: primaryColor }}
              />
              <motion.div
                animate={{
                  x: [0, -40, 0],
                  y: [0, 40, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{ duration: 18, repeat: Infinity }}
                className="absolute -bottom-32 -right-32 w-72 h-72 rounded-full blur-[80px] opacity-30"
                style={{ backgroundColor: primaryLightColor }}
              />

              {/* Spotlight effect following mouse */}
              <motion.div
                className="absolute w-96 h-96 rounded-full blur-[100px] opacity-20 pointer-events-none"
                style={{
                  backgroundColor: primaryColor,
                  left: `${mousePosition.x * 100}%`,
                  top: `${mousePosition.y * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />

              {/* Floating particles */}
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute rounded-full"
                  style={{
                    width: particle.size,
                    height: particle.size,
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    backgroundColor: hexToRgba(primaryColor, 0.4),
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.random() * 20 - 10, 0],
                    opacity: [0.2, 0.6, 0.2],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    delay: particle.delay,
                  }}
                />
              ))}

              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `
                    linear-gradient(${primaryColor} 1px, transparent 1px),
                    linear-gradient(90deg, ${primaryColor} 1px, transparent 1px)
                  `,
                  backgroundSize: "30px 30px",
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-14">
              {/* Icon with animation */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center mb-6"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative"
                >
                  {/* Animated rings */}
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.1, 0.3],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}, ${primaryLightColor})`,
                      filter: "blur(15px)",
                    }}
                  />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-3 rounded-3xl border-2 border-dashed opacity-30"
                    style={{ borderColor: primaryColor }}
                  />
                  <div
                    className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}, ${primaryLightColor})`,
                      boxShadow: `0 10px 40px ${hexToRgba(primaryColor, 0.5)}`,
                    }}
                  >
                    <FaBriefcase className="text-white text-3xl md:text-4xl" />
                  </div>

                  {/* Orbiting icons */}
                  {[FaStar, FaRocket, FaHeart].map((Icon, i) => (
                    <motion.div
                      key={i}
                      animate={{ rotate: [i * 120, i * 120 + 360] }}
                      transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0"
                      style={{ transformOrigin: "center center" }}
                    >
                      <div
                        className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center"
                        style={{ color: primaryColor }}
                      >
                        <Icon size={12} />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Status badge */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center mb-6"
              >
                <motion.div
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${hexToRgba("#22c55e", 0.15)}, ${hexToRgba("#22c55e", 0.05)})`,
                    border: "1px solid rgba(34, 197, 94, 0.3)",
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2.5 h-2.5 rounded-full bg-green-500"
                  />
                  <span className="text-green-700 font-medium text-sm">
                    正在寻找实习机会
                  </span>
                </motion.div>
              </motion.div>

              {/* Main heading */}
              <motion.div variants={itemVariants} className="text-center mb-6">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
                  期待与你{" "}
                  <span className="relative inline-block">
                    <span
                      className="relative z-10"
                      style={{
                        color: primaryColor,
                        textShadow: `0 0 40px ${hexToRgba(primaryColor, 0.3)}`,
                      }}
                    >
                      合作
                    </span>
                    <motion.span
                      className="absolute bottom-1 left-0 right-0 h-3 md:h-4 -z-0 rounded-sm"
                      style={{ backgroundColor: hexToRgba(primaryColor, 0.2) }}
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    />
                  </span>
                </h2>
                <p className="text-gray-600 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                  如果你有 AI
                  相关的实习机会，或者想一起探讨技术，欢迎随时联系我！
                </p>
              </motion.div>

              {/* Highlights */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-3 mb-8"
              >
                {highlights.map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/70 shadow-sm"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-8"
              >
                <Link to="/contact" className="w-full sm:w-auto">
                  <ThemedButton variant="glow" size="lg" fullWidth>
                    <FaEnvelope className="mr-1" />
                    立即联系
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <FaArrowRight size={14} />
                    </motion.div>
                  </ThemedButton>
                </Link>
                <Link to="/projects" className="w-full sm:w-auto">
                  <ThemedButton variant="outline" size="lg" fullWidth>
                    <FaRocket className="mr-1" />
                    查看项目
                  </ThemedButton>
                </Link>
                <a
                  href="https://github.com/linlong5201314"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <ThemedButton variant="ghost" size="lg" fullWidth>
                    <FaGithub className="mr-1" />
                    GitHub
                  </ThemedButton>
                </a>
              </motion.div>

              {/* Contact info */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
              >
                <motion.a
                  href="mailto:m13136064359@163.com"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors text-sm"
                >
                  <FaEnvelope size={14} style={{ color: primaryColor }} />
                  <span>m13136064359@163.com</span>
                </motion.a>
                <span className="hidden sm:inline text-gray-300">|</span>
                <motion.a
                  href="https://github.com/linlong5201314"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors text-sm"
                >
                  <FaGithub size={14} style={{ color: primaryColor }} />
                  <span>linlong5201314</span>
                </motion.a>
              </motion.div>
            </div>

            {/* Bottom decorative wave */}
            <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 h-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)`,
                  width: "50%",
                }}
              />
            </div>
          </motion.div>

          {/* Decorative elements outside card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor:
                    i === 2 ? primaryColor : hexToRgba(primaryColor, 0.4),
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
