import { motion } from 'framer-motion'
import { FaClock, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import GlowingCard from './GlowingCard'
import { posts } from '../data/posts'
import { useTheme } from '../contexts/ThemeContext'

const BlogPreview = () => {
  const recentPosts = posts.slice(0, 4)
  const featuredPost = recentPosts[0]
  const otherPosts = recentPosts.slice(1)
  const { getInterpolatedColor } = useTheme()
  const primaryColor = getInterpolatedColor('primary')
  const primaryLightColor = getInterpolatedColor('primaryLight')

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 md:mb-12 gap-4"
        >
          <div className="text-center sm:text-left">
            <span 
              className="inline-block px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-xs md:text-sm mb-3 transition-colors duration-500"
              style={{ color: primaryColor }}
            >
              📝 技术博客
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 text-gray-800">
              最新 <span className="gradient-text">文章</span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base">分享学习心得与技术实践</p>
          </div>
          <Link
            to="/blog"
            className="flex items-center justify-center sm:justify-start gap-2 hover:gap-3 transition-all text-sm md:text-base"
            style={{ color: primaryColor }}
          >
            查看全部
            <FaArrowRight className="text-xs" />
          </Link>
        </motion.div>

        {/* Mobile: Stack layout, Desktop: Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlowingCard className="h-full">
              <Link to="/blog" className="block p-4 md:p-6 h-full">
                <div 
                  className="h-32 md:h-48 rounded-xl flex items-center justify-center text-5xl md:text-7xl mb-4 md:mb-6 transition-colors duration-500"
                  style={{ background: `linear-gradient(to bottom right, ${primaryColor}15, ${primaryLightColor}15)` }}
                >
                  {featuredPost.emoji}
                </div>
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <span 
                    className="px-2 py-1 text-[10px] md:text-xs rounded-full transition-colors duration-500"
                    style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                  >
                    {featuredPost.category}
                  </span>
                  <span className="text-gray-500 text-xs flex items-center gap-1">
                    <FaClock size={10} /> {featuredPost.readTime}
                  </span>
                </div>
                <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 text-gray-800 hover:opacity-80 transition-colors line-clamp-2">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm line-clamp-2">
                  {featuredPost.excerpt}
                </p>
              </Link>
            </GlowingCard>
          </motion.div>

          {/* Other Posts */}
          <div className="space-y-3 md:space-y-4">
            {otherPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlowingCard>
                  <Link to="/blog" className="flex items-center gap-3 md:gap-4 p-3 md:p-4">
                    <div className="text-3xl md:text-4xl flex-shrink-0">{post.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span 
                          className="px-2 py-0.5 text-[10px] md:text-xs rounded-full transition-colors duration-500"
                          style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                        >
                          {post.category}
                        </span>
                        <span className="text-[10px] md:text-xs text-gray-500">{post.date}</span>
                      </div>
                      <h4 className="font-semibold text-sm md:text-base truncate text-gray-800 hover:opacity-80 transition-colors">
                        {post.title}
                      </h4>
                    </div>
                    <FaArrowRight className="text-gray-400 flex-shrink-0 text-xs" />
                  </Link>
                </GlowingCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogPreview
