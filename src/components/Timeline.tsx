import { motion } from 'framer-motion'
import { FaGraduationCap, FaBriefcase, FaTrophy, FaRocket } from 'react-icons/fa'
import { IconType } from 'react-icons'

interface TimelineItem {
  year: string
  title: string
  org: string
  desc: string
  icon: IconType
  type: 'education' | 'work' | 'award' | 'milestone'
}

interface TimelineProps {
  items: TimelineItem[]
}

const iconMap = {
  education: FaGraduationCap,
  work: FaBriefcase,
  award: FaTrophy,
  milestone: FaRocket,
}

const colorMap = {
  education: 'from-blue-500 to-cyan-500',
  work: 'from-green-500 to-emerald-500',
  award: 'from-yellow-500 to-orange-500',
  milestone: 'from-purple-500 to-pink-500',
}

const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="relative">
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500" />
      
      {items.map((item, i) => {
        const Icon = iconMap[item.type]
        return (
          <motion.div
            key={`${item.title}-${i}`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative flex items-center mb-8 ${
              i % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12'} pl-20 md:pl-0`}>
              <div className="glass rounded-2xl p-6 card-hover">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorMap[item.type]} flex items-center justify-center`}>
                    <Icon className="text-white" />
                  </span>
                  <span className="px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300">
                    {item.year}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-indigo-400 text-sm mb-2">{item.org}</p>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            </div>
            <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 border-4 border-dark-200 z-10" />
          </motion.div>
        )
      })}
    </div>
  )
}

export default Timeline
