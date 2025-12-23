import { motion } from 'framer-motion'
import {
  FaGraduationCap,
  FaHeart,
  FaDownload,
  FaEnvelope,
  FaRocket,
  FaBriefcase,
  FaLightbulb,
} from 'react-icons/fa'
import GlowingCard from '../components/GlowingCard'
import { downloadResume } from '../utils/generateResume'
import { useTheme } from '../contexts/ThemeContext'

const About = () => {
  const { getInterpolatedColor } = useTheme()
  const primaryColor = getInterpolatedColor('primary')
  const primaryLightColor = getInterpolatedColor('primaryLight')
  const timeline = [
    {
      year: '2024',
      title: '深入学习 AI Agent 开发',
      org: '自学探索',
      desc: '掌握 Cursor、Kiro 等 AI 编程工具',
      icon: FaRocket,
    },
    {
      year: '2024',
      title: '完成多个 AI 实战项目',
      org: '课程项目',
      desc: 'YOLO目标检测、垃圾分类等',
      icon: FaLightbulb,
    },
    {
      year: '2023',
      title: 'Python Web 项目开发',
      org: '课程项目',
      desc: 'Flask + MySQL 旅游分享网站',
      icon: FaLightbulb,
    },
    {
      year: '2022',
      title: '人工智能技术应用专业',
      org: '职业技术学院',
      desc: '系统学习 AI 专业课程',
      icon: FaGraduationCap,
    },
  ]

  const interests = [
    { emoji: '👁️', title: '计算机视觉', desc: '目标检测' },
    { emoji: '🏷️', title: '数据标注', desc: '多类型标注' },
    { emoji: '🤖', title: 'AI Agent', desc: '工具探索' },
    { emoji: '🐍', title: 'Python', desc: 'Web开发' },
  ]

  const highlights = [
    '熟悉 PyTorch/TensorFlow',
    '掌握 YOLO 目标检测',
    'Flask + MySQL 开发',
    '了解多款 AI 大模型',
    '会用 AI 编程工具',
    '数据标注实战经验',
  ]

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-12 mb-8 md:mb-12 shadow-lg shadow-gray-200/50 border border-gray-100"
        >
          <div className="md:flex items-start gap-8 md:gap-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-28 h-28 md:w-40 md:h-40 mx-auto md:mx-0 mb-6 md:mb-0 rounded-full p-1 flex-shrink-0 relative transition-all duration-500"
              style={{ background: `linear-gradient(to bottom right, ${primaryColor}, ${primaryLightColor})` }}
            >
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl md:text-6xl">
                👨‍💻
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-1 bg-green-500 rounded-full text-[10px] md:text-xs font-medium flex items-center gap-1 whitespace-nowrap text-white">
                <FaBriefcase size={8} />
                求职中
              </div>
            </motion.div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 text-gray-800">
                林龙 <span className="gradient-text text-xl md:text-2xl">Lin Long</span>
              </h1>
              <p className="text-sm md:text-base mb-4 transition-colors duration-500" style={{ color: primaryColor }}>
                人工智能技术应用 · 大专在读 · 求职实习
              </p>
              <p className="text-gray-600 text-sm md:text-base mb-4 leading-relaxed">
                热爱 AI 技术，专注于深度学习、计算机视觉和数据标注领域。
                在校期间完成多个 AI 项目，熟练使用多款 AI 编程工具。
              </p>
              <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
                <strong className="text-gray-800">正在寻找 AI 相关实习机会</strong>
                ，期待在实践中学习成长。
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3">
                <a
                  href="mailto:m13136064359@163.com"
                  className="inline-flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full font-medium text-sm md:text-base text-white transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  style={{ background: `linear-gradient(to right, ${primaryColor}, ${primaryLightColor})` }}
                >
                  <FaEnvelope size={14} /> 联系我
                </a>
                <button
                  onClick={downloadResume}
                  className="inline-flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full font-medium text-sm md:text-base text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FaDownload size={14} /> 下载简历
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 求职意向 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <GlowingCard>
            <div className="p-4 md:p-8">
              <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 text-gray-800">
                <FaBriefcase className="text-green-500" />
                求职意向
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                <div className="bg-gray-50 rounded-xl p-3 md:p-4 text-center border border-gray-100">
                  <p className="text-gray-500 text-xs md:text-sm mb-1">期望岗位</p>
                  <p className="font-medium text-sm md:text-base text-gray-800">AI开发实习生</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 md:p-4 text-center border border-gray-100">
                  <p className="text-gray-500 text-xs md:text-sm mb-1">工作类型</p>
                  <p className="font-medium text-sm md:text-base text-gray-800">实习</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 md:p-4 text-center border border-gray-100">
                  <p className="text-gray-500 text-xs md:text-sm mb-1">联系邮箱</p>
                  <p className="font-medium text-xs md:text-sm break-all transition-colors duration-500" style={{ color: primaryColor }}>
                    m13136064359@163.com
                  </p>
                </div>
              </div>
            </div>
          </GlowingCard>
        </motion.div>

        {/* 个人亮点 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center text-gray-800">
            个人 <span className="gradient-text">亮点</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm"
              >
                <span className="text-green-500 text-sm">✓</span>
                <span className="text-gray-700 text-xs md:text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 学习方向 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-16"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-8 text-center text-gray-800">
            学习 <span className="gradient-text">方向</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {interests.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlowingCard className="h-full">
                  <div className="p-4 md:p-6 text-center">
                    <div className="text-3xl md:text-4xl mb-2 md:mb-3">{item.emoji}</div>
                    <h3 className="font-semibold text-sm md:text-base mb-1 text-gray-800">{item.title}</h3>
                    <p className="text-gray-500 text-xs md:text-sm">{item.desc}</p>
                  </div>
                </GlowingCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 成长历程 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-16"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-8 text-center text-gray-800">
            成长 <span className="gradient-text">历程</span>
          </h2>
          <div className="relative">
            <div 
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 transition-all duration-500"
              style={{ background: `linear-gradient(to bottom, ${primaryColor}, ${primaryLightColor})` }}
            />

            {timeline.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={`${item.title}-${i}`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex items-center mb-6 md:mb-8"
                >
                  <div className="w-full md:w-1/2 pl-10 md:pl-0 md:pr-12 md:ml-auto">
                    <GlowingCard>
                      <div className="p-4 md:p-6">
                        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                          <div 
                            className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-500"
                            style={{ background: `linear-gradient(to bottom right, ${primaryColor}, ${primaryLightColor})` }}
                          >
                            <Icon className="text-white text-xs md:text-base" />
                          </div>
                          <span 
                            className="px-2 md:px-3 py-1 text-[10px] md:text-xs rounded-full transition-colors duration-500"
                            style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                          >
                            {item.year}
                          </span>
                        </div>
                        <h3 className="font-semibold text-sm md:text-lg mb-1 text-gray-800">{item.title}</h3>
                        <p className="text-xs md:text-sm mb-1 transition-colors duration-500" style={{ color: primaryColor }}>{item.org}</p>
                        <p className="text-gray-600 text-xs md:text-sm">{item.desc}</p>
                      </div>
                    </GlowingCard>
                  </div>
                  <div 
                    className="absolute left-4 md:left-1/2 w-3 h-3 md:w-4 md:h-4 -translate-x-1/2 rounded-full border-2 md:border-4 border-white z-10 transition-all duration-500"
                    style={{ background: `linear-gradient(to right, ${primaryColor}, ${primaryLightColor})` }}
                  />
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* 关于我 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 text-center shadow-lg shadow-gray-200/50 border border-gray-100"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">
            <FaHeart className="inline text-red-500 mr-2" size={18} />
            关于我
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {[
              { emoji: '🤖', label: '关注AI动态', value: '每天' },
              { emoji: '💻', label: '编程学习', value: '持续中' },
              { emoji: '📚', label: '技术博客', value: '爱阅读' },
              { emoji: '🎮', label: '劳逸结合', value: '游戏' },
            ].map((fact) => (
              <div key={fact.label}>
                <div className="text-2xl md:text-3xl mb-1 md:mb-2">{fact.emoji}</div>
                <div className="text-base md:text-lg font-bold gradient-text">{fact.value}</div>
                <div className="text-gray-500 text-xs md:text-sm">{fact.label}</div>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-xs md:text-sm max-w-2xl mx-auto">
            虽然还没有正式工作经验，但我一直通过项目实践提升自己。
            期待获得实习机会，在实际工作中学习成长！
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default About
