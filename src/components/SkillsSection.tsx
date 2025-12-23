import { motion } from 'framer-motion'
import {
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiFlask,
  SiMysql,
  SiHtml5,
  SiCss3,
  SiOpenai,
} from 'react-icons/si'
import { FaRobot, FaCode, FaEye, FaBrain, FaTags } from 'react-icons/fa'
import GlowingCard from './GlowingCard'
import { useTheme } from '../contexts/ThemeContext'

const skillCategories = [
  {
    title: 'AI / 深度学习',
    icon: FaBrain,
    color: 'from-purple-500 to-indigo-500',
    skills: [
      { icon: SiPython, name: 'Python', level: 85, color: '#3776AB' },
      { icon: SiPytorch, name: 'PyTorch', level: 75, color: '#EE4C2C' },
      { icon: SiTensorflow, name: 'TensorFlow', level: 70, color: '#FF6F00' },
      { icon: FaEye, name: 'YOLO', level: 80, color: '#00D4FF' },
    ],
  },
  {
    title: '数据标注',
    icon: FaTags,
    color: 'from-green-500 to-emerald-500',
    skills: [
      { icon: FaTags, name: '图像标注', level: 90, color: '#10B981' },
      { icon: FaTags, name: '语音标注', level: 85, color: '#06B6D4' },
      { icon: FaTags, name: '文本标注', level: 88, color: '#8B5CF6' },
      { icon: FaTags, name: 'NER标注', level: 82, color: '#F59E0B' },
    ],
  },
  {
    title: 'Web 开发',
    icon: FaCode,
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { icon: SiFlask, name: 'Flask', level: 80, color: '#000000' },
      { icon: SiMysql, name: 'MySQL', level: 75, color: '#4479A1' },
      { icon: SiHtml5, name: 'HTML', level: 75, color: '#E34F26' },
      { icon: SiCss3, name: 'CSS', level: 70, color: '#1572B6' },
    ],
  },
  {
    title: 'AI 工具',
    icon: FaRobot,
    color: 'from-pink-500 to-rose-500',
    skills: [
      { icon: SiOpenai, name: 'ChatGPT', level: 90, color: '#412991' },
      { icon: FaRobot, name: 'Claude', level: 85, color: '#D97706' },
      { icon: FaCode, name: 'Cursor', level: 85, color: '#00A67E' },
      { icon: FaCode, name: 'Kiro', level: 80, color: '#6366F1' },
    ],
  },
]

const courses = [
  '深度学习基础',
  '计算机视觉',
  '数据标注技术',
  'Python Web开发',
  '数据库技术',
  '机器学习技术',
]

const SkillsSection = () => {
  const { getInterpolatedColor } = useTheme()
  const primaryColor = getInterpolatedColor('primary')

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <span 
            className="inline-block px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-xs md:text-sm mb-3 transition-colors duration-500"
            style={{ color: primaryColor }}
          >
            💪 技术能力
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 text-gray-800">
            技能 <span className="gradient-text">矩阵</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto px-4">
            在校期间系统学习的技术栈
          </p>
        </motion.div>

        {/* Skills Grid - 移动端单列 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {skillCategories.map((category, ci) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1 }}
            >
              <GlowingCard className="h-full">
                <div className="p-4 md:p-6">
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}
                    >
                      <category.icon className="text-white text-sm md:text-base" />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-800">{category.title}</h3>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    {category.skills.map((skill, si) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: ci * 0.1 + si * 0.05 }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <skill.icon size={14} style={{ color: skill.color }} />
                            <span className="text-xs md:text-sm text-gray-700">{skill.name}</span>
                          </div>
                          <span className="text-xs text-gray-500">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 md:h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: ci * 0.1 + si * 0.05 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: skill.color }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </GlowingCard>
            </motion.div>
          ))}
        </div>

        {/* 课程学习 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 md:mt-12"
        >
          <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-center text-gray-800">
            📚 专业课程
          </h3>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-2">
            {courses.map((course, i) => (
              <motion.span
                key={course}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-3 py-1.5 md:px-4 md:py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-xs md:text-sm text-gray-700"
              >
                {course}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsSection
