import { motion } from 'framer-motion'
import { FaQuoteLeft, FaLightbulb } from 'react-icons/fa'
import GlowingCard from './GlowingCard'

const learningHighlights = [
  {
    title: '持续学习',
    icon: '📚',
    content: '每天关注 AI 前沿动态，保持对新技术的敏感度。',
  },
  {
    title: '动手实践',
    icon: '💻',
    content: '通过实际项目巩固理论，完整参与 AI 开发流程。',
  },
  {
    title: '工具探索',
    icon: '🛠️',
    content: '熟练使用 AI 编程工具，拥抱 AI 辅助编程。',
  },
]

const selfEvaluation = [
  { label: '学习能力', value: '快速掌握新技术' },
  { label: '动手能力', value: '多个实战项目' },
  { label: '工具使用', value: '熟练AI工具' },
  { label: '团队协作', value: '良好沟通能力' },
]

const Testimonials = () => {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="inline-block px-3 py-1.5 rounded-full glass text-xs md:text-sm text-indigo-400 mb-3">
            <FaLightbulb className="inline mr-1" />
            学习态度
          </span>
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
            我的 <span className="gradient-text">学习理念</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto px-4">
            保持积极的学习态度和实践精神
          </p>
        </motion.div>

        {/* Learning Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {learningHighlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlowingCard className="h-full">
                <div className="p-4 md:p-6 relative">
                  <FaQuoteLeft className="absolute top-4 right-4 text-indigo-500/10 text-2xl md:text-3xl" />
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4">{item.icon}</div>
                  <h3 className="font-semibold text-base md:text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </GlowingCard>
            </motion.div>
          ))}
        </div>

        {/* Self Evaluation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlowingCard>
            <div className="p-4 md:p-8">
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-center">自我评价</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {selfEvaluation.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center p-3 md:p-4 bg-dark-300 rounded-xl"
                  >
                    <p className="text-indigo-400 font-medium text-xs md:text-sm mb-1">
                      {item.label}
                    </p>
                    <p className="text-gray-400 text-[10px] md:text-xs">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlowingCard>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
