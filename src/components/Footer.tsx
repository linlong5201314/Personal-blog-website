import { motion, useInView } from "framer-motion";
import {
  FaGithub,
  FaEnvelope,
  FaBrain,
  FaHeart,
  FaArrowUp,
  FaMapMarkerAlt,
  FaCode,
  FaRocket,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useRef } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { getInterpolatedColor } = useTheme();
  const primaryColor = getInterpolatedColor("primary");
  const primaryLightColor = getInterpolatedColor("primaryLight");
  const accentColor = getInterpolatedColor("accent");
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.2 });

  const navLinks = [
    { name: "首页", path: "/", icon: "🏠" },
    { name: "项目", path: "/projects", icon: "📁" },
    { name: "博客", path: "/blog", icon: "📝" },
    { name: "关于", path: "/about", icon: "👤" },
    { name: "联系", path: "/contact", icon: "✉️" },
  ];

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

  const techStack = [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Vite",
  ];

  // Convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-gray-200/50"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: primaryColor }}
        />
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: primaryLightColor }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(${primaryColor} 1px, transparent 1px),
              linear-gradient(90deg, ${primaryColor} 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative bg-gradient-to-b from-white/80 to-white/95 backdrop-blur-sm">
        {/* Top gradient line */}
        <div
          className="h-1"
          style={{
            background: `linear-gradient(90deg, ${primaryColor}, ${primaryLightColor}, ${accentColor}, ${primaryLightColor}, ${primaryColor})`,
            backgroundSize: "200% 100%",
            animation: "gradient-shift 5s ease infinite",
          }}
        />

        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Main footer content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
              {/* Brand section */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <Link
                  to="/"
                  className="flex items-center space-x-2.5 mb-4 group"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-500 shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}, ${primaryLightColor})`,
                      boxShadow: `0 4px 20px ${hexToRgba(primaryColor, 0.3)}`,
                    }}
                  >
                    <FaBrain className="text-white text-lg md:text-xl" />
                  </motion.div>
                  <div>
                    <span
                      className="text-xl md:text-2xl font-bold transition-colors duration-500 block"
                      style={{ color: primaryColor }}
                    >
                      林龙
                    </span>
                    <span className="text-xs text-gray-400">AI Explorer</span>
                  </div>
                </Link>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                  AI技术应用学生，专注于深度学习、计算机视觉和数据标注，正在寻找实习机会。
                </p>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                  <FaMapMarkerAlt size={12} />
                  <span>中国</span>
                </div>

                {/* Social links */}
                <div className="flex gap-3">
                  {socialLinks.map((social, i) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="group w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-gray-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
                      style={
                        {
                          "--hover-bg": primaryColor,
                        } as React.CSSProperties
                      }
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = primaryColor;
                        e.currentTarget.style.borderColor = primaryColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "";
                        e.currentTarget.style.borderColor = "";
                      }}
                      aria-label={social.label}
                    >
                      <social.icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Quick links */}
              <motion.div variants={itemVariants}>
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaRocket size={14} style={{ color: primaryColor }} />
                  快速导航
                </h3>
                <ul className="space-y-2.5">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        className="group flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-all duration-300 text-sm"
                      >
                        <span className="text-xs">{link.icon}</span>
                        <span className="relative">
                          {link.name}
                          <span
                            className="absolute -bottom-0.5 left-0 w-0 h-0.5 rounded-full group-hover:w-full transition-all duration-300"
                            style={{ backgroundColor: primaryColor }}
                          />
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Tech stack */}
              <motion.div variants={itemVariants}>
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaCode size={14} style={{ color: primaryColor }} />
                  技术栈
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1.5 text-xs rounded-full border transition-all duration-300 cursor-default"
                      style={{
                        backgroundColor: hexToRgba(primaryColor, 0.08),
                        borderColor: hexToRgba(primaryColor, 0.2),
                        color: primaryColor,
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <FaStar className="text-yellow-400" size={14} />
                    <span className="text-sm font-medium text-gray-700">
                      开源项目
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    本站代码已开源，欢迎 Star ⭐
                  </p>
                </div>
              </motion.div>

              {/* Contact info */}
              <motion.div variants={itemVariants}>
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaEnvelope size={14} style={{ color: primaryColor }} />
                  联系方式
                </h3>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                    <p className="text-xs text-gray-400 mb-1">邮箱</p>
                    <a
                      href="mailto:m13136064359@163.com"
                      className="text-sm font-medium hover:opacity-80 transition-opacity break-all"
                      style={{ color: primaryColor }}
                    >
                      m13136064359@163.com
                    </a>
                  </div>

                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 px-4 rounded-xl font-medium text-sm text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${primaryLightColor})`,
                        boxShadow: `0 4px 20px ${hexToRgba(primaryColor, 0.3)}`,
                      }}
                    >
                      <FaEnvelope size={14} />
                      发送消息
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="h-px mb-8"
              style={{
                background: `linear-gradient(90deg, transparent, ${hexToRgba(primaryColor, 0.2)}, transparent)`,
              }}
            />

            {/* Bottom section */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col md:flex-row justify-between items-center gap-4"
            >
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-gray-500 text-sm">
                <p>© {currentYear} 林龙. All rights reserved.</p>
                <span className="hidden sm:inline text-gray-300">|</span>
                <p className="flex items-center gap-1.5">
                  用{" "}
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <FaHeart className="text-red-500" size={12} />
                  </motion.span>{" "}
                  和 AI 构建
                </p>
              </div>

              {/* Back to top button */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 text-sm"
                style={{
                  borderColor: hexToRgba(primaryColor, 0.3),
                  color: primaryColor,
                }}
              >
                <span>回到顶部</span>
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaArrowUp size={12} />
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Decorative text */}
            <motion.div variants={itemVariants} className="mt-8 text-center">
              <p className="text-xs text-gray-300 tracking-widest uppercase">
                🚀 Powered by React & TypeScript
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
