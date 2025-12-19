import { motion } from 'framer-motion'
import { SiPython, SiPytorch, SiTensorflow, SiOpenai, SiReact, SiDocker } from 'react-icons/si'

const icons = [
  { Icon: SiPython, color: '#3776AB', x: '10%', y: '20%', delay: 0 },
  { Icon: SiPytorch, color: '#EE4C2C', x: '85%', y: '15%', delay: 0.5 },
  { Icon: SiTensorflow, color: '#FF6F00', x: '15%', y: '70%', delay: 1 },
  { Icon: SiOpenai, color: '#412991', x: '80%', y: '75%', delay: 1.5 },
  { Icon: SiReact, color: '#61DAFB', x: '5%', y: '45%', delay: 2 },
  { Icon: SiDocker, color: '#2496ED', x: '90%', y: '45%', delay: 2.5 },
]

const FloatingIcons = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden lg:block">
      {icons.map(({ Icon, color, x, y, delay }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 0.15, 
            scale: 1,
            y: [0, -20, 0],
          }}
          transition={{
            opacity: { delay, duration: 1 },
            scale: { delay, duration: 1 },
            y: { delay, duration: 4, repeat: Infinity, ease: 'easeInOut' }
          }}
          style={{ left: x, top: y }}
          className="absolute"
        >
          <Icon size={48} style={{ color }} />
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingIcons
