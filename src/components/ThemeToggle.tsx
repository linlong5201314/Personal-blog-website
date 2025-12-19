import { motion } from 'framer-motion'
import { FaSun, FaMoon } from 'react-icons/fa'

interface ThemeToggleProps {
  isDark: boolean
  toggle: () => void
}

const ThemeToggle = ({ isDark, toggle }: ThemeToggleProps) => {
  return (
    <motion.button
      onClick={toggle}
      className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-indigo-400 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? <FaMoon size={18} /> : <FaSun size={18} />}
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle
