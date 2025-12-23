import { motion } from 'framer-motion'
import { FaClock, FaArrowRight, FaEye, FaHeart } from 'react-icons/fa'
import { useTheme } from '../contexts/ThemeContext'

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content?: string
  date: string
  readTime: string
  tags: string[]
  category: string
  emoji: string
  views?: number
  likes?: number
  featured?: boolean
}

interface BlogCardProps {
  post: BlogPost
  index: number
  onClick?: () => void
  variant?: 'default' | 'featured' | 'compact'
}

const BlogCard = ({ post, index, onClick, variant = 'default' }: BlogCardProps) => {
  const { getInterpolatedColor } = useTheme()
  const primaryColor = getInterpolatedColor('primary')
  const primaryLightColor = getInterpolatedColor('primaryLight')
  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        onClick={onClick}
        className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl overflow-hidden card-hover group cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="md:flex">
          <div 
            className="md:w-2/5 h-64 md:h-auto flex items-center justify-center text-8xl transition-colors duration-500"
            style={{ 
              background: `linear-gradient(to bottom right, ${primaryColor}20, ${primaryLightColor}20)` 
            }}
          >
            {post.emoji}
          </div>
          <div className="md:w-3/5 p-8">
            <div className="flex items-center gap-4 mb-4">
              <span 
                className="px-3 py-1 text-xs rounded-full transition-colors duration-500"
                style={{ 
                  backgroundColor: `${primaryColor}15`,
                  color: primaryColor
                }}
              >
                {post.category}
              </span>
              <span className="text-gray-500 text-sm flex items-center gap-1">
                <FaClock size={12} /> {post.readTime}
              </span>
              {post.views && (
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <FaEye size={12} /> {post.views}
                </span>
              )}
            </div>
            <h2 
              className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 transition-colors duration-300"
              style={{ '--theme-primary': primaryColor } as React.CSSProperties}
            >
              <span className="group-hover:text-[var(--theme-primary)] transition-colors duration-300">
                {post.title}
              </span>
            </h2>
            <p className="text-gray-600 mb-6">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs text-gray-500">#{tag}</span>
                ))}
              </div>
              <span 
                className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
                style={{ color: primaryColor }}
              >
                阅读全文 <FaArrowRight />
              </span>
            </div>
          </div>
        </div>
      </motion.article>
    )
  }

  if (variant === 'compact') {
    return (
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        onClick={onClick}
        className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl card-hover group cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="text-3xl">{post.emoji}</div>
        <div className="flex-1">
          <h4 
            className="font-medium text-gray-800 transition-colors duration-300 line-clamp-1"
            style={{ '--theme-primary': primaryColor } as React.CSSProperties}
          >
            <span className="group-hover:text-[var(--theme-primary)] transition-colors duration-300">
              {post.title}
            </span>
          </h4>
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
            <span>{post.date}</span>
            <span className="flex items-center gap-1">
              <FaClock size={10} /> {post.readTime}
            </span>
          </div>
        </div>
        <FaArrowRight 
          className="text-gray-400 group-hover:transition-colors duration-300"
          style={{ '--theme-primary': primaryColor } as React.CSSProperties}
        />
      </motion.article>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl overflow-hidden card-hover group cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div 
        className="h-40 flex items-center justify-center text-5xl transition-colors duration-500"
        style={{ 
          background: `linear-gradient(to bottom right, ${primaryColor}15, ${primaryLightColor}15)` 
        }}
      >
        {post.emoji}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span 
            className="px-2 py-1 text-xs rounded-full transition-colors duration-500"
            style={{ 
              backgroundColor: `${primaryColor}15`,
              color: primaryColor
            }}
          >
            {post.category}
          </span>
          <span className="text-gray-500 text-xs">{post.date}</span>
        </div>
        <h3 
          className="text-lg font-semibold mb-2 text-gray-800 transition-colors duration-300 line-clamp-2"
          style={{ '--theme-primary': primaryColor } as React.CSSProperties}
        >
          <span className="group-hover:text-[var(--theme-primary)] transition-colors duration-300">
            {post.title}
          </span>
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <FaClock size={10} /> {post.readTime}
            </span>
            {post.likes && (
              <span className="flex items-center gap-1">
                <FaHeart size={10} className="text-red-400" /> {post.likes}
              </span>
            )}
          </div>
          <span 
            className="text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-300"
            style={{ color: primaryColor }}
          >
            阅读 <FaArrowRight size={12} />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export default BlogCard
