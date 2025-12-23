import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  FaGithub,
  FaEnvelope,
  FaBriefcase,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import ThemedButton from "./ThemedButton";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const { getInterpolatedColor } = useTheme();
  const primaryColor = getInterpolatedColor("primary");
  const primaryLightColor = getInterpolatedColor("primaryLight");
  const accentColor = getInterpolatedColor("accent");

  const containerRef = useRef<HTMLElement>(null);

  // Mouse tracking for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const parallaxX = useSpring(
    useTransform(mouseX, [-500, 500], [-20, 20]),
    springConfig,
  );
  const parallaxY = useSpring(
    useTransform(mouseY, [-500, 500], [-20, 20]),
    springConfig,
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/linlong5201314",
      label: "GitHub",
      color: "#333",
    },
    {
      icon: FaEnvelope,
      href: "mailto:m13136064359@163.com",
      label: "Email",
      color: "#EA4335",
    },
  ];

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  // Tech badges
  const techBadges = ["Python", "PyTorch", "YOLO", "Flask", "AI"];

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10 relative overflow-hidden"
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary orb */}
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -60, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ x: parallaxX, y: parallaxY }}
          className="absolute top-1/4 left-0 w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full blur-[100px] transition-colors duration-700"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${primaryColor}40, ${primaryColor}10)`,
            }}
          />
        </motion.div>

        {/* Secondary orb */}
        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-0 w-[400px] h-[400px] md:w-[700px] md:h-[700px] rounded-full blur-[80px] transition-colors duration-700"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle at 70% 70%, ${primaryLightColor}35, ${primaryLightColor}05)`,
            }}
          />
        </motion.div>

        {/* Accent orb */}
        <motion.div
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -40, 40, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full blur-[60px] transition-colors duration-700"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle, ${accentColor}25, transparent 70%)`,
            }}
          />
        </motion.div>

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full transition-colors duration-500"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              backgroundColor: primaryColor,
              opacity: 0.3,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(${primaryColor} 1px, transparent 1px),
              linear-gradient(90deg, ${primaryColor} 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 w-full">
        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-2"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
              className="w-2 h-2 rounded-full transition-colors duration-500"
              style={{
                backgroundColor: i === 1 ? primaryColor : `${primaryColor}40`,
              }}
            />
          ))}
        </motion.div>

        {/* Avatar with enhanced effects */}
        <motion.div
          initial={{ scale: 0, rotateY: 180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ type: "spring", duration: 1.5 }}
          className="relative w-32 h-32 md:w-44 md:h-44 mx-auto mb-6"
        >
          {/* Rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-8px] rounded-full"
            style={{
              background: `conic-gradient(from 0deg, ${primaryColor}, ${primaryLightColor}, ${accentColor}, ${primaryColor})`,
              padding: "2px",
            }}
          >
            <div className="w-full h-full rounded-full bg-white/90" />
          </motion.div>

          {/* Avatar container */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-full h-full rounded-full p-1 z-10"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${primaryLightColor})`,
              boxShadow: `0 0 60px ${primaryColor}50, 0 0 100px ${primaryColor}30`,
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-white to-gray-50 flex items-center justify-center overflow-hidden shadow-inner">
              <motion.span
                className="text-5xl md:text-7xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                👨‍💻
              </motion.span>
            </div>
          </motion.div>

          {/* Orbiting stars */}
          {[0, 120, 240].map((angle, i) => (
            <motion.div
              key={i}
              animate={{ rotate: [angle, angle + 360] }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0"
              style={{ transformOrigin: "center center" }}
            >
              <FaStar
                className="absolute -top-3 left-1/2 -translate-x-1/2 text-yellow-400"
                size={10 + i * 2}
              />
            </motion.div>
          ))}

          {/* Status badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white shadow-lg shadow-green-500/30 flex items-center gap-1.5"
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 bg-white rounded-full"
              />
              <FaBriefcase size={10} />
              <span className="text-[11px] md:text-xs font-medium whitespace-nowrap">
                求职中
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Greeting badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-xs md:text-sm border border-gray-200 shadow-lg shadow-gray-200/50 transition-all duration-300"
            style={{ color: primaryColor }}
          >
            <motion.span
              animate={{ rotate: [0, 20, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              👋
            </motion.span>
            嘿，你来啦！欢迎访问我的博客
          </motion.span>
        </motion.div>

        {/* Main title with enhanced styling */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
        >
          <span className="block text-gray-800 mb-2">我是</span>
          <motion.span
            className="relative inline-block"
            whileHover={{ scale: 1.02 }}
          >
            <span
              className="relative z-10 transition-colors duration-500"
              style={{
                color: primaryColor,
                textShadow: `0 0 40px ${primaryColor}30`,
              }}
            >
              林龙
            </span>
            <motion.span
              className="absolute bottom-0 left-0 right-0 h-3 md:h-4 -z-0 rounded-sm transition-colors duration-500"
              style={{ backgroundColor: `${primaryColor}20` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />
          </motion.span>
        </motion.h1>

        {/* Typing animation with enhanced container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50 shadow-sm">
            <span className="text-gray-400">{">"}</span>
            <div className="text-base sm:text-lg md:text-xl text-gray-600 font-mono h-7 md:h-8">
              <TypeAnimation
                sequence={[
                  "🎓 AI技术应用学生",
                  2500,
                  "👁️ 计算机视觉学习者",
                  2500,
                  "🏷️ 数据标注工程师",
                  2500,
                  "🐍 Python开发者",
                  2500,
                  "🤖 AI工具探索者",
                  2500,
                ]}
                repeat={Infinity}
                wrapper="span"
                cursor={true}
              />
            </div>
          </div>
        </motion.div>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-2 mb-6"
        >
          {techBadges.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="px-3 py-1 text-xs font-medium rounded-full border transition-all duration-300"
              style={{
                backgroundColor: `${primaryColor}10`,
                borderColor: `${primaryColor}30`,
                color: primaryColor,
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-600 max-w-xl mx-auto mb-8 text-sm md:text-base lg:text-lg leading-relaxed px-2"
        >
          专注于
          <motion.span
            whileHover={{ scale: 1.1 }}
            className="inline-block mx-1 font-medium transition-colors duration-500"
            style={{ color: primaryColor }}
          >
            深度学习
          </motion.span>
          、
          <motion.span
            whileHover={{ scale: 1.1 }}
            className="inline-block mx-1 font-medium transition-colors duration-500"
            style={{ color: primaryLightColor }}
          >
            计算机视觉
          </motion.span>
          和
          <motion.span
            whileHover={{ scale: 1.1 }}
            className="inline-block mx-1 font-medium transition-colors duration-500"
            style={{ color: primaryColor }}
          >
            数据标注
          </motion.span>
          ，
          <br className="hidden sm:block" />
          正在寻找AI相关实习机会 🚀
        </motion.p>

        {/* CTA Buttons with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mb-10 px-4"
        >
          <Link to="/projects" className="w-full sm:w-auto">
            <ThemedButton variant="primary" size="lg" fullWidth>
              <span className="flex items-center gap-2">🚀 查看项目</span>
            </ThemedButton>
          </Link>
          <Link to="/contact" className="w-full sm:w-auto">
            <ThemedButton variant="outline" size="lg" fullWidth>
              <span className="flex items-center gap-2">💬 联系我</span>
            </ThemedButton>
          </Link>
          <Link to="/about" className="w-full sm:w-auto">
            <ThemedButton variant="ghost" size="lg" fullWidth>
              <span className="flex items-center gap-2">📄 了解更多</span>
            </ThemedButton>
          </Link>
        </motion.div>

        {/* Social Links with enhanced effects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center gap-4"
        >
          {socialLinks.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              whileHover={{
                scale: 1.15,
                y: -5,
                boxShadow: `0 15px 30px ${primaryColor}30`,
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-gray-500 transition-all duration-300 overflow-hidden shadow-lg shadow-gray-200/50"
              aria-label={social.label}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}20, ${primaryLightColor}20)`,
                }}
              />
              <social.icon
                size={22}
                className="relative z-10 group-hover:text-gray-800 transition-colors"
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Location tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-8 flex justify-center"
        >
          <span className="inline-flex items-center gap-1.5 text-gray-400 text-sm">
            <FaMapMarkerAlt size={12} />
            中国
          </span>
        </motion.div>

        {/* Scroll indicator with enhanced animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 cursor-pointer group"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">
              向下滚动
            </span>
            <motion.div className="w-6 h-10 rounded-full border-2 border-gray-300 group-hover:border-gray-400 flex justify-center pt-2 transition-colors">
              <motion.div
                animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1.5 h-1.5 rounded-full transition-colors duration-500"
                style={{ backgroundColor: primaryColor }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
