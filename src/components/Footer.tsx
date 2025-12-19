import { motion } from 'framer-motion'
import { FaGithub, FaEnvelope, FaBrain, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { name: '首页', path: '/' },
    { name: '项目', path: '/projects' },
    { name: '博客', path: '/blog' },
    { name: '关于', path: '/about' },
    { name: '联系', path: '/contact' },
  ]

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/linlong5201314', label: 'GitHub' },
    { icon: FaEnvelope, href: 'mailto:m13136064359@163.com', label: 'Email' },
  ]

  return (
    <footer className="border-t border-gray-800 bg-dark-300/50">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Mobile: Simplified layout */}
        <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:justify-between gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <FaBrain className="text-white text-sm md:text-xl" />
              </div>
              <span className="text-lg md:text-xl font-bold gradient-text">林龙</span>
            </Link>
            <p className="text-gray-500 text-xs md:text-sm max-w-xs mb-3">
              AI技术应用学生，正在寻找实习机会
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 md:w-9 md:h-9 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-indigo-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav Links - 移动端横向排列 */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-x-6">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-500 hover:text-indigo-400 transition-colors text-xs md:text-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
          <p className="text-gray-500 text-xs md:text-sm">
            © {currentYear} 林龙. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs md:text-sm flex items-center gap-1">
            用 <FaHeart className="text-red-500" size={10} /> 和 AI 构建
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
