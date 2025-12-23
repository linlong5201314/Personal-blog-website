import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  FaBrain,
  FaBars,
  FaTimes,
  FaSearch,
  FaHome,
  FaFolder,
  FaBlog,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";
import SearchBar from "./SearchBar";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const { getInterpolatedColor } = useTheme();

  // Get current theme colors
  const primaryColor = getInterpolatedColor("primary");
  const primaryLightColor = getInterpolatedColor("primaryLight");
  const accentColor = getInterpolatedColor("accent");

  // Scroll progress for navbar effects
  const { scrollY } = useScroll();
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);
  const navbarBlur = useTransform(scrollY, [0, 100], [10, 20]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { path: "/", label: "首页", icon: FaHome },
    { path: "/projects", label: "项目", icon: FaFolder },
    { path: "/blog", label: "博客", icon: FaBlog },
    { path: "/about", label: "关于", icon: FaUser },
    { path: "/contact", label: "联系", icon: FaEnvelope },
  ];

  // Convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled || isMobileMenuOpen ? "shadow-lg" : ""
        }`}
        style={{
          background: isScrolled
            ? `rgba(255, 255, 255, ${navbarOpacity.get()})`
            : "transparent",
          backdropFilter: isScrolled
            ? `blur(${navbarBlur.get()}px) saturate(180%)`
            : "none",
          borderBottom: isScrolled
            ? `1px solid ${hexToRgba(primaryColor, 0.1)}`
            : "1px solid transparent",
        }}
      >
        {/* Gradient line at top when scrolled */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              className="absolute top-0 left-0 right-0 h-[2px] origin-left"
              style={{
                background: `linear-gradient(90deg, ${primaryColor}, ${primaryLightColor}, ${accentColor})`,
              }}
            />
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2.5 group relative z-10"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-500 shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${primaryLightColor})`,
                  boxShadow: `0 4px 20px ${hexToRgba(primaryColor, 0.4)}`,
                }}
              >
                <FaBrain className="text-white text-base md:text-lg" />
                {/* Glow effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.2, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${primaryLightColor})`,
                    filter: "blur(8px)",
                    zIndex: -1,
                  }}
                />
              </motion.div>
              <div className="flex flex-col">
                <motion.span
                  className="text-lg md:text-xl font-bold transition-colors duration-500"
                  style={{ color: primaryColor }}
                >
                  林龙
                </motion.span>
                <span className="text-[10px] text-gray-400 -mt-1 hidden sm:block">
                  AI Explorer
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center">
              <div className="relative flex items-center bg-white/60 backdrop-blur-sm rounded-full p-1.5 border border-gray-200/50 shadow-sm">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onMouseEnter={() => setActiveHover(item.path)}
                      onMouseLeave={() => setActiveHover(null)}
                      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                        isActive
                          ? "text-white"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      {/* Active/Hover background */}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-active-bg"
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: `linear-gradient(135deg, ${primaryColor}, ${primaryLightColor})`,
                            boxShadow: `0 4px 15px ${hexToRgba(primaryColor, 0.4)}`,
                          }}
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                      {!isActive && activeHover === item.path && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: hexToRgba(primaryColor, 0.1),
                          }}
                        />
                      )}
                      <Icon
                        size={14}
                        className={`relative z-10 transition-transform duration-300 ${
                          activeHover === item.path && !isActive
                            ? "scale-110"
                            : ""
                        }`}
                      />
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-500 hover:text-gray-800 transition-all duration-300 text-sm border border-gray-200/70 hover:border-gray-300 shadow-sm hover:shadow-md group"
              >
                <FaSearch
                  size={13}
                  className="transition-transform duration-300 group-hover:scale-110"
                  style={{
                    color: activeHover === "search" ? primaryColor : undefined,
                  }}
                />
                <span className="hidden lg:inline">搜索</span>
                <div className="flex items-center gap-0.5">
                  <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-gray-100 text-gray-500 font-mono border border-gray-200">
                    ⌘
                  </kbd>
                  <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-gray-100 text-gray-500 font-mono border border-gray-200">
                    K
                  </kbd>
                </div>
              </motion.button>
            </div>

            {/* Mobile buttons */}
            <div className="flex md:hidden items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 text-gray-500 hover:text-gray-800 transition-colors duration-300 rounded-xl hover:bg-gray-100/50"
              >
                <FaSearch size={18} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl transition-all duration-300"
                style={{
                  color: isMobileMenuOpen ? "white" : "rgb(55 65 81)",
                  backgroundColor: isMobileMenuOpen
                    ? primaryColor
                    : "transparent",
                }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaTimes size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaBars size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden"
                style={{ top: "64px" }}
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Menu panel */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t"
                style={{ borderColor: hexToRgba(primaryColor, 0.1) }}
              >
                <div className="px-4 py-5 space-y-1.5">
                  {navItems.map((item, i) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                      >
                        <Link
                          to={item.path}
                          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-300 ${
                            isActive
                              ? "text-white"
                              : "text-gray-600 hover:text-gray-800"
                          }`}
                          style={
                            isActive
                              ? {
                                  background: `linear-gradient(135deg, ${primaryColor}, ${primaryLightColor})`,
                                  boxShadow: `0 4px 15px ${hexToRgba(primaryColor, 0.3)}`,
                                }
                              : { backgroundColor: "rgba(249, 250, 251, 0.8)" }
                          }
                        >
                          <Icon size={18} />
                          {item.label}
                          {isActive && (
                            <motion.div
                              layoutId="mobile-active-dot"
                              className="ml-auto w-2 h-2 rounded-full bg-white"
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Mobile search button */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: navItems.length * 0.05,
                      duration: 0.3,
                    }}
                    className="pt-2"
                  >
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsSearchOpen(true);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-base font-medium text-gray-600 hover:text-gray-800 transition-all duration-300"
                      style={{ backgroundColor: "rgba(249, 250, 251, 0.8)" }}
                    >
                      <FaSearch size={18} />
                      搜索
                      <div className="ml-auto flex items-center gap-1">
                        <kbd className="px-2 py-1 text-xs rounded bg-gray-200 text-gray-500 font-mono">
                          ⌘K
                        </kbd>
                      </div>
                    </button>
                  </motion.div>
                </div>

                {/* Decorative gradient at bottom */}
                <div
                  className="h-1"
                  style={{
                    background: `linear-gradient(90deg, ${primaryColor}, ${primaryLightColor}, ${accentColor})`,
                  }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
