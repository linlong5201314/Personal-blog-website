import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaHome, FaArrowLeft } from 'react-icons/fa'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="mb-8"
        >
          <span className="text-9xl font-bold gradient-text">404</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl font-bold mb-4">页面未找到</h1>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            抱歉，你访问的页面不存在或已被移动。让我们回到正轨吧！
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full font-medium flex items-center gap-2"
              >
                <FaHome />
                返回首页
              </motion.button>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 border border-indigo-500/50 rounded-full font-medium flex items-center gap-2 hover:bg-indigo-500/10 transition-all"
            >
              <FaArrowLeft />
              返回上页
            </button>
          </div>
        </motion.div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="absolute text-4xl opacity-20"
              style={{
                left: `${10 + i * 20}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
            >
              {['🤖', '💻', '🧠', '⚡', '🚀'][i]}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotFound
