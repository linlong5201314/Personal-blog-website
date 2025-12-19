import { motion } from 'framer-motion'

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-dark-300 flex items-center justify-center"
    >
      <div className="text-center px-4">
        {/* Animated logo */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 md:mb-8">
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-500 border-r-purple-500"
          />
          
          {/* Middle ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 rounded-full border-2 border-transparent border-b-cyan-500 border-l-indigo-500"
          />
          
          {/* Inner ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-4 rounded-full border-2 border-transparent border-t-purple-500"
          />
          
          {/* Center icon */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-2xl md:text-3xl">🤖</span>
            </div>
          </motion.div>
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl md:text-2xl font-bold gradient-text mb-2">AI Explorer</h2>
          <p className="text-gray-500 text-xs md:text-sm mb-4 md:mb-6">正在加载精彩内容...</p>
        </motion.div>

        {/* Loading bar */}
        <div className="w-48 h-1 bg-dark-100 rounded-full overflow-hidden mx-auto">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full w-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full"
          />
        </div>

        {/* Loading dots */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 rounded-full bg-indigo-500"
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default LoadingScreen
