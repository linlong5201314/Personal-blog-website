import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaCode, FaProjectDiagram, FaBook, FaRobot } from 'react-icons/fa'

const stats = [
  {
    icon: FaProjectDiagram,
    value: 8,
    suffix: '+',
    label: '完成项目',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FaBook,
    value: 9,
    suffix: '',
    label: '专业课程',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: FaCode,
    value: 5,
    suffix: '+',
    label: 'AI工具',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: FaRobot,
    value: 100,
    suffix: '%',
    label: '学习热情',
    color: 'from-orange-500 to-red-500',
  },
]

const AnimatedNumber = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.span ref={ref} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}>
      {isInView && (
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {value}
          {suffix}
        </motion.span>
      )}
    </motion.span>
  )
}

const StatsSection = () => {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl md:rounded-3xl p-6 md:p-12 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-32 md:w-64 h-32 md:h-64 bg-indigo-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-purple-500/20 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-6 md:mb-8"
            >
              <span className="inline-block px-3 py-1.5 rounded-full bg-green-500/20 text-green-400 text-xs md:text-sm">
                🎯 正在寻找实习机会
              </span>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <stat.icon className="text-white text-lg md:text-2xl" />
                  </motion.div>
                  <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-400 text-xs md:text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default StatsSection
