import { motion } from 'framer-motion'
import { FaClock, FaArrowRight, FaEye, FaHeart } from 'react-icons/fa'

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
  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        onClick={onClick}
        className="glass rounded-3xl overflow-hidden card-hover group cursor-pointer"
      >
        <div className="md:flex">
          <div className="md:w-2/5 h-64 md:h-auto bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center text-8xl">
            {post.emoji}
          </div>
          <div className="md:w-3/5 p-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300">
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-indigo-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-400 mb-6">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs text-gray-500">#{tag}</span>
                ))}
              </div>
              <span className="text-indigo-400 flex items-center gap-2 group-hover:gap-3 transition-all">
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
        className="flex items-center gap-4 p-4 glass rounded-xl card-hover group cursor-pointer"
      >
        <div className="text-3xl">{post.emoji}</div>
        <div className="flex-1">
          <h4 className="font-medium group-hover:text-indigo-400 transition-colors line-clamp-1">
            {post.title}
          </h4>
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
            <span>{post.date}</span>
            <span className="flex items-center gap-1">
              <FaClock size={10} /> {post.readTime}
            </span>
          </div>
        </div>
        <FaArrowRight className="text-gray-500 group-hover:text-indigo-400 transition-colors" />
      </motion.article>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="glass rounded-2xl overflow-hidden card-hover group cursor-pointer"
    >
      <div className="h-40 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-5xl">
        {post.emoji}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-2 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300">
            {post.category}
          </span>
          <span className="text-gray-500 text-xs">{post.date}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
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
          <span className="text-indigo-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            阅读 <FaArrowRight size={12} />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export default BlogCard
