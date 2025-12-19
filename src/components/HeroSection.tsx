import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FaGithub, FaEnvelope, FaChevronDown, FaBriefcase } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/linlong5201314', label: 'GitHub' },
    { icon: FaEnvelope, href: 'mailto:m13136064359@163.com', label: 'Email' },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10 relative overflow-hidden">
      {/* Animated gradient orbs - 移动端缩小 */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-0 w-48 h-48 md:w-96 md:h-96 bg-indigo-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-0 w-48 h-48 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 w-full">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0, rotateY: 180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ type: 'spring', duration: 1.5 }}
          className="relative w-28 h-28 md:w-40 md:h-40 mx-auto mb-6"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 p-1 relative"
            style={{
              boxShadow: '0 0 40px rgba(99, 102, 241, 0.4)',
            }}
          >
            <div className="w-full h-full rounded-full bg-dark-200 flex items-center justify-center overflow-hidden">
              <span className="text-4xl md:text-6xl">👨‍💻</span>
            </div>
          </motion.div>

          {/* 求职状态 */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-1 bg-green-500 rounded-full text-xs font-medium flex items-center gap-1 whitespace-nowrap"
          >
            <FaBriefcase size={8} />
            <span className="text-[10px] md:text-xs">求职中</span>
          </motion.div>
        </motion.div>

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-3"
        >
          <span className="inline-block px-3 py-1.5 rounded-full glass text-xs md:text-sm text-indigo-400">
            👋 嘿，你来啦
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
        >
          <span className="block">我是</span>
          <span className="gradient-text inline-block mt-1">林龙</span>
        </motion.h1>

        {/* Typing animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-base sm:text-lg md:text-2xl text-gray-400 mb-6 h-8 md:h-10"
        >
          <TypeAnimation
            sequence={[
              '🎓 AI技术应用学生',
              2500,
              '👁️ 计算机视觉学习者',
              2500,
              '🏷️ 数据标注工程师',
              2500,
              '🐍 Python开发者',
              2500,
            ]}
            repeat={Infinity}
            wrapper="span"
            cursor={true}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-500 max-w-xl mx-auto mb-8 text-sm md:text-base lg:text-lg leading-relaxed px-2"
        >
          专注于<span className="text-indigo-400">深度学习</span>、
          <span className="text-purple-400">计算机视觉</span>和
          <span className="text-cyan-400">数据标注</span>，
          正在寻找AI相关实习机会
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mb-8 px-4"
        >
          <Link to="/projects" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full font-medium text-sm md:text-base"
            >
              查看项目
            </motion.button>
          </Link>
          <Link to="/contact" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 py-3 border-2 border-indigo-500/50 rounded-full font-medium text-sm md:text-base hover:bg-indigo-500/10 transition-all"
            >
              联系我
            </motion.button>
          </Link>
          <Link to="/about" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 py-3 glass rounded-full font-medium text-sm md:text-base hover:bg-white/5 transition-all"
            >
              📄 了解更多
            </motion.button>
          </Link>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center gap-3"
        >
          {socialLinks.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white transition-all"
              aria-label={social.label}
            >
              <social.icon size={20} />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator - 移动端隐藏 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-2 text-gray-500"
          >
            <span className="text-sm">向下滚动</span>
            <FaChevronDown className="text-indigo-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
