import { motion } from 'framer-motion'
import { FaEnvelope, FaBriefcase, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const CTASection = () => {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl md:rounded-3xl overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-cyan-600/20" />

          {/* Floating particles - 移动端减少 */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-indigo-400 rounded-full hidden sm:block"
              style={{
                left: `${20 + i * 25}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
            />
          ))}

          <div className="relative z-10 glass p-6 md:p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="w-14 h-14 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center"
            >
              <FaBriefcase className="text-white text-xl md:text-3xl" />
            </motion.div>

            <span className="inline-block px-3 py-1.5 rounded-full bg-green-500/20 text-green-400 text-xs md:text-sm mb-3 md:mb-4">
              🎯 正在寻找实习机会
            </span>

            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
              期待与你 <span className="gradient-text">合作</span>
            </h2>
            <p className="text-gray-400 mb-6 md:mb-8 max-w-xl mx-auto text-sm md:text-lg px-2">
              如果你有 AI 相关的实习机会，欢迎联系我！
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 mb-6 md:mb-8">
              <Link to="/contact" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full font-medium text-sm md:text-lg flex items-center justify-center gap-2"
                >
                  <FaEnvelope />
                  联系我
                  <FaArrowRight className="text-xs" />
                </motion.button>
              </Link>
              <Link to="/projects" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border-2 border-gray-600 rounded-full font-medium text-sm md:text-lg flex items-center justify-center gap-2 hover:border-indigo-500 transition-colors"
                >
                  查看项目
                </motion.button>
              </Link>
            </div>

            <p className="text-gray-500 text-xs md:text-sm">
              📧 m13136064359@163.com
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection
