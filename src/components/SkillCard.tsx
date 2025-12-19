import { motion } from 'framer-motion'
import { IconType } from 'react-icons'

interface SkillCardProps {
  icon: IconType
  name: string
  color: string
  level: number
  description?: string
}

const SkillCard = ({ icon: Icon, name, color, level, description }: SkillCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass rounded-2xl p-6 text-center card-hover group relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
        style={{ backgroundColor: color }}
      />
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <Icon size={48} className="mx-auto mb-4" style={{ color }} />
      </motion.div>
      <p className="font-medium mb-2">{name}</p>
      {description && (
        <p className="text-gray-500 text-xs mb-3">{description}</p>
      )}
      <div className="h-1.5 bg-dark-300 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">{level}%</p>
    </motion.div>
  )
}

export default SkillCard
