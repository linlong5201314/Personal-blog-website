import { useRef, useState, useEffect } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import {
  FaCode,
  FaProjectDiagram,
  FaBook,
  FaRobot,
  FaBriefcase,
  FaGraduationCap,
} from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

interface StatItem {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  value: number;
  suffix: string;
  label: string;
  description: string;
  color: string;
  gradient: string;
}

const stats: StatItem[] = [
  {
    icon: FaProjectDiagram,
    value: 8,
    suffix: "+",
    label: "完成项目",
    description: "AI & Web 项目",
    color: "#3b82f6",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: FaBook,
    value: 9,
    suffix: "",
    label: "专业课程",
    description: "系统学习",
    color: "#22c55e",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: FaCode,
    value: 5,
    suffix: "+",
    label: "AI工具",
    description: "熟练掌握",
    color: "#a855f7",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: FaRobot,
    value: 100,
    suffix: "%",
    label: "学习热情",
    description: "持续成长",
    color: "#f97316",
    gradient: "from-orange-500 to-red-500",
  },
];

// Animated counter component with spring animation
const AnimatedNumber = ({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      const currentValue = Math.floor(
        startValue + (value - startValue) * easeOutExpo,
      );

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
};

// Circular progress indicator
const CircularProgress = ({
  value,
  maxValue,
  color,
  size = 80,
  strokeWidth = 6,
  isInView,
}: {
  value: number;
  maxValue: number;
  color: string;
  size?: number;
  strokeWidth?: number;
  isInView: boolean;
}) => {
  const progress = useSpring(0, { damping: 30, stiffness: 100 });
  const circumference = 2 * Math.PI * ((size - strokeWidth) / 2);

  useEffect(() => {
    if (isInView) {
      progress.set((value / maxValue) * 100);
    }
  }, [isInView, value, maxValue, progress]);

  const strokeDashoffset = useTransform(
    progress,
    (p) => circumference - (p / 100) * circumference,
  );

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-100"
        />
      </svg>

      {/* Progress circle */}
      <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
          }}
        />
      </svg>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl opacity-30"
        style={{ backgroundColor: color }}
        animate={
          isInView
            ? {
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
};

const StatsSection = () => {
  const { getInterpolatedColor } = useTheme();
  const primaryColor = getInterpolatedColor("primary");
  const primaryLightColor = getInterpolatedColor("primaryLight");

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 px-4 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              backgroundColor: hexToRgba(primaryColor, 0.3),
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Main card */}
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(20px)",
              boxShadow: `
                0 4px 6px -1px rgba(0, 0, 0, 0.05),
                0 10px 15px -3px rgba(0, 0, 0, 0.08),
                0 20px 25px -5px ${hexToRgba(primaryColor, 0.1)},
                inset 0 1px 0 rgba(255, 255, 255, 0.8)
              `,
              border: `1px solid ${hexToRgba(primaryColor, 0.1)}`,
            }}
          >
            {/* Top gradient line */}
            <div
              className="h-1"
              style={{
                background: `linear-gradient(90deg, ${primaryColor}, ${primaryLightColor}, ${primaryColor})`,
              }}
            />

            {/* Background orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-[80px] opacity-40"
                style={{ backgroundColor: primaryColor }}
              />
              <motion.div
                animate={{
                  x: [0, -20, 0],
                  y: [0, 30, 0],
                }}
                transition={{ duration: 18, repeat: Infinity }}
                className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full blur-[80px] opacity-30"
                style={{ backgroundColor: primaryLightColor }}
              />
            </div>

            <div className="relative z-10 p-6 md:p-12">
              {/* Header with badge */}
              <motion.div
                variants={itemVariants}
                className="text-center mb-10 md:mb-14"
              >
                {/* Seeking opportunities badge */}
                <motion.div
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${hexToRgba("#22c55e", 0.1)}, ${hexToRgba("#22c55e", 0.05)})`,
                    border: "1px solid rgba(34, 197, 94, 0.2)",
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-green-500"
                  />
                  <FaBriefcase className="text-green-600" size={14} />
                  <span className="text-green-700 text-sm font-medium">
                    正在寻找实习机会
                  </span>
                </motion.div>

                <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3">
                  个人{" "}
                  <span
                    className="relative inline-block"
                    style={{ color: primaryColor }}
                  >
                    数据
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-2 -z-10 rounded-sm"
                      style={{ backgroundColor: hexToRgba(primaryColor, 0.2) }}
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    />
                  </span>
                </h2>
                <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto">
                  在校学习期间的成长记录
                </p>
              </motion.div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      variants={itemVariants}
                      className="group relative"
                    >
                      <motion.div
                        whileHover={{ y: -5, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative h-full p-4 md:p-6 rounded-2xl transition-all duration-500 text-center overflow-hidden"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
                          border: "1px solid rgba(229, 231, 235, 0.6)",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
                        }}
                      >
                        {/* Hover gradient overlay */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: `linear-gradient(135deg, ${hexToRgba(stat.color, 0.08)}, ${hexToRgba(stat.color, 0.02)})`,
                          }}
                        />

                        {/* Icon with circular progress */}
                        <div className="relative flex justify-center mb-3 md:mb-4">
                          <CircularProgress
                            value={stat.value}
                            maxValue={stat.suffix === "%" ? 100 : 10}
                            color={stat.color}
                            size={60}
                            strokeWidth={4}
                            isInView={isInView}
                          />
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}
                            style={{
                              boxShadow: `0 4px 15px ${hexToRgba(stat.color, 0.4)}`,
                            }}
                          >
                            <Icon className="text-white text-base md:text-lg" />
                          </motion.div>
                        </div>

                        {/* Value */}
                        <motion.div
                          className="text-2xl md:text-4xl font-bold mb-1 md:mb-2"
                          style={{ color: stat.color }}
                        >
                          <AnimatedNumber
                            value={stat.value}
                            suffix={stat.suffix}
                            isInView={isInView}
                          />
                        </motion.div>

                        {/* Label */}
                        <div className="text-gray-700 font-medium text-sm md:text-base mb-1">
                          {stat.label}
                        </div>

                        {/* Description */}
                        <div className="text-gray-400 text-xs md:text-sm">
                          {stat.description}
                        </div>

                        {/* Decorative corner */}
                        <div
                          className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `linear-gradient(225deg, ${hexToRgba(stat.color, 0.15)}, transparent 60%)`,
                            borderTopRightRadius: "1rem",
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom info bar */}
              <motion.div
                variants={itemVariants}
                className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
              >
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <FaGraduationCap style={{ color: primaryColor }} />
                  <span>人工智能技术应用专业</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300" />
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-green-500"
                  />
                  <span>持续学习中</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
