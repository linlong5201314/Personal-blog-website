import { motion } from 'framer-motion'
import { FaEnvelope, FaGithub, FaMapMarkerAlt, FaCalendarAlt, FaBriefcase } from 'react-icons/fa'
import ContactForm from '../components/ContactForm'
import GlowingCard from '../components/GlowingCard'
import { useTheme } from '../contexts/ThemeContext'

const Contact = () => {
  const { getInterpolatedColor } = useTheme()
  const primaryColor = getInterpolatedColor('primary')
  const primaryLightColor = getInterpolatedColor('primaryLight')
  const contactInfo = [
    {
      icon: FaEnvelope,
      label: '邮箱',
      value: 'm13136064359@163.com',
      href: 'mailto:m13136064359@163.com',
      color: `linear-gradient(to bottom right, ${primaryColor}, ${primaryLightColor})`,
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      value: '查看我的代码',
      href: 'https://github.com',
      color: 'linear-gradient(to bottom right, #374151, #1f2937)',
    },
  ]

  const faqs = [
    {
      q: '你目前的求职状态是？',
      a: '正在寻找 AI 相关实习机会，包括 AI 开发、数据标注等岗位。',
    },
    {
      q: '你有哪些技术特长？',
      a: '熟悉 Python、PyTorch、YOLO，有数据标注经验，会用 AI 编程工具。',
    },
    {
      q: '可以远程实习吗？',
      a: '可以！远程或线下都可以，具体可协商。',
    },
    {
      q: '如何联系你？',
      a: '发邮件到 m13136064359@163.com，我会尽快回复！',
    },
  ]

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="inline-block px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-xs md:text-sm text-green-600 mb-3">
            <FaBriefcase className="inline mr-1" size={12} />
            正在寻找实习机会
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-gray-800">
            联系 <span className="gradient-text">我</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto px-2">
            如果你有实习机会或想技术交流，欢迎联系我！
          </p>
        </motion.div>

        {/* 求职意向卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 md:mb-12"
        >
          <GlowingCard>
            <div className="p-4 md:p-8">
              <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 text-gray-800">
                <FaBriefcase className="text-green-500" />
                求职意向
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <div className="bg-gray-50 rounded-xl p-3 md:p-4 text-center border border-gray-100">
                  <p className="text-gray-500 text-xs md:text-sm mb-1">期望岗位</p>
                  <p className="font-medium text-xs md:text-sm text-gray-800">AI开发实习生</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 md:p-4 text-center border border-gray-100">
                  <p className="text-gray-500 text-xs md:text-sm mb-1">其他意向</p>
                  <p className="font-medium text-xs md:text-sm text-gray-800">数据标注工程师</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 md:p-4 text-center border border-gray-100">
                  <p className="text-gray-500 text-xs md:text-sm mb-1">工作类型</p>
                  <p className="font-medium text-xs md:text-sm text-gray-800">实习</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 md:p-4 text-center border border-gray-100">
                  <p className="text-gray-500 text-xs md:text-sm mb-1">工作方式</p>
                  <p className="font-medium text-xs md:text-sm text-gray-800">远程/线下均可</p>
                </div>
              </div>
            </div>
          </GlowingCard>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 mb-10 md:mb-16">
          {/* Contact Form */}
          <ContactForm />

          {/* Contact Info */}
          <div className="space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <GlowingCard>
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-gray-800">联系方式</h3>
                  <div className="space-y-3 md:space-y-4">
                    {contactInfo.map((item, i) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group border border-gray-100"
                      >
                        <div
                          className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center"
                          style={{ background: item.color }}
                        >
                          <item.icon className="text-white text-base md:text-xl" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs md:text-sm text-gray-500">{item.label}</p>
                          <p className="font-medium text-sm md:text-base text-gray-800 group-hover:opacity-80 transition-colors truncate">
                            {item.value}
                          </p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </GlowingCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlowingCard>
                <div className="p-4 md:p-6">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <FaMapMarkerAlt className="transition-colors duration-500" style={{ color: primaryColor }} size={14} />
                    <span className="text-gray-600 text-sm md:text-base">中国</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <FaCalendarAlt className="transition-colors duration-500" style={{ color: primaryColor }} size={14} />
                    <span className="text-gray-600 text-sm md:text-base">通常 24 小时内回复</span>
                  </div>
                  <div className="p-3 md:p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-green-600 text-xs md:text-sm">
                      💼 正在积极寻找实习机会，欢迎联系！
                    </p>
                  </div>
                </div>
              </GlowingCard>
            </motion.div>
          </div>
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8 text-gray-800">
            常见 <span className="gradient-text">问题</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlowingCard>
                  <div className="p-4 md:p-6">
                    <h4 className="font-semibold text-sm md:text-base mb-2 transition-colors duration-500" style={{ color: primaryColor }}>
                      {faq.q}
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">{faq.a}</p>
                  </div>
                </GlowingCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact
