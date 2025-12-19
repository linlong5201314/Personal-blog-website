import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPaperPlane, FaCheck, FaSpinner } from 'react-icons/fa'
import GlowingCard from './GlowingCard'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'linlongxiansheng@163.com',
          from: formData.email,
          name: formData.name,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setStatus('success')
        setTimeout(() => {
          setStatus('idle')
          setFormData({ name: '', email: '', subject: '', message: '' })
        }, 3000)
      } else {
        throw new Error('发送失败')
      }
    } catch {
      // 本地开发环境没有 API，打开邮件客户端作为备选方案
      const mailtoLink = `mailto:linlongxiansheng@163.com?subject=[网站留言] ${formData.subject} - 来自 ${formData.name}&body=${encodeURIComponent(`发送者：${formData.name}\n邮箱：${formData.email}\n\n${formData.message}`)}`
      window.open(mailtoLink, '_blank')
      setStatus('success')
      setTimeout(() => {
        setStatus('idle')
        setFormData({ name: '', email: '', subject: '', message: '' })
      }, 3000)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <GlowingCard>
        <form onSubmit={handleSubmit} className="p-4 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">发送消息</h3>

          <div className="grid md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
            <div>
              <label className="block text-xs md:text-sm text-gray-400 mb-1.5 md:mb-2">
                姓名
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-dark-300 border border-gray-700 focus:border-indigo-500 focus:outline-none transition-colors text-sm md:text-base"
                placeholder="你的名字"
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm text-gray-400 mb-1.5 md:mb-2">
                邮箱
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-dark-300 border border-gray-700 focus:border-indigo-500 focus:outline-none transition-colors text-sm md:text-base"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="mb-3 md:mb-4">
            <label className="block text-xs md:text-sm text-gray-400 mb-1.5 md:mb-2">
              主题
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-dark-300 border border-gray-700 focus:border-indigo-500 focus:outline-none transition-colors text-sm md:text-base"
            >
              <option value="">选择主题</option>
              <option value="实习机会">实习机会</option>
              <option value="项目合作">项目合作</option>
              <option value="技术咨询">技术咨询</option>
              <option value="其他">其他</option>
            </select>
          </div>

          <div className="mb-4 md:mb-6">
            <label className="block text-xs md:text-sm text-gray-400 mb-1.5 md:mb-2">
              消息
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-dark-300 border border-gray-700 focus:border-indigo-500 focus:outline-none transition-colors resize-none text-sm md:text-base"
              placeholder="写下你想说的..."
            />
          </div>

          {status === 'error' && (
            <p className="text-red-400 text-sm mb-4">{errorMsg}</p>
          )}

          <motion.button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl font-medium flex items-center justify-center gap-2 transition-all text-sm md:text-base ${
              status === 'success'
                ? 'bg-green-500 text-white'
                : status === 'error'
                  ? 'bg-red-500 text-white'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30'
            }`}
          >
            {status === 'loading' && <FaSpinner className="animate-spin" size={14} />}
            {status === 'success' && <FaCheck size={14} />}
            {status === 'idle' && <FaPaperPlane size={14} />}
            {status === 'loading'
              ? '发送中...'
              : status === 'success'
                ? '发送成功！'
                : status === 'error'
                  ? '发送失败'
                  : '发送消息'}
          </motion.button>
        </form>
      </GlowingCard>
    </motion.div>
  )
}

export default ContactForm
