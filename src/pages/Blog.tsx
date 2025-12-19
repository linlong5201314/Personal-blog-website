import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaClock, FaArrowRight, FaEye, FaHeart, FaSearch } from 'react-icons/fa'
import Modal from '../components/Modal'
import GlowingCard from '../components/GlowingCard'
import { posts, getCategories, BlogPost } from '../data/posts'

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['全部', ...getCategories()]

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === '全部' || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPost = filteredPosts.find((p) => p.featured) || filteredPosts[0]
  const otherPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id)

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            技术 <span className="gradient-text">博客</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto px-2">
            分享 AI 学习心得与技术实践
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6 md:mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <FaSearch className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索文章..."
              className="w-full pl-9 md:pl-12 pr-4 py-2.5 md:py-3 rounded-xl bg-dark-300 border border-gray-700 focus:border-indigo-500 focus:outline-none transition-colors text-sm md:text-base"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                  : 'glass text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Results Count */}
        <p className="text-gray-500 text-xs md:text-sm mb-6 md:mb-8 text-center">
          找到 {filteredPosts.length} 篇文章
        </p>

        {/* Featured Post */}
        {featuredPost && (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => setSelectedPost(featuredPost)}
            className="mb-8 md:mb-12"
          >
            <GlowingCard className="cursor-pointer">
              <div className="p-4 md:p-6 lg:p-8">
                <div className="lg:flex gap-6">
                  <div className="lg:w-2/5 h-40 md:h-48 lg:h-auto bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-xl flex items-center justify-center text-6xl md:text-8xl mb-4 lg:mb-0">
                    {featuredPost.emoji}
                  </div>
                  <div className="lg:w-3/5">
                    <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-4">
                      <span className="px-2 md:px-3 py-1 text-[10px] md:text-xs rounded-full bg-indigo-500/20 text-indigo-300">
                        {featuredPost.category}
                      </span>
                      <span className="text-gray-500 text-xs md:text-sm flex items-center gap-1">
                        <FaClock size={10} /> {featuredPost.readTime}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 hover:text-indigo-400 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-6 line-clamp-2 md:line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {featuredPost.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[10px] md:text-xs text-gray-500">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-indigo-400 flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                        阅读全文 <FaArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </GlowingCard>
          </motion.article>
        )}

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {otherPosts.map((post, i) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedPost(post)}
              >
                <GlowingCard className="cursor-pointer h-full">
                  <div className="h-28 md:h-40 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-t-xl flex items-center justify-center text-4xl md:text-5xl">
                    {post.emoji}
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                      <span className="px-2 py-0.5 text-[10px] md:text-xs rounded-full bg-indigo-500/20 text-indigo-300">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-[10px] md:text-xs">{post.date}</span>
                    </div>
                    <h3 className="text-base md:text-lg font-semibold mb-2 hover:text-indigo-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaClock size={10} /> {post.readTime}
                        </span>
                        {post.likes && (
                          <span className="flex items-center gap-1">
                            <FaHeart size={10} className="text-red-400" /> {post.likes}
                          </span>
                        )}
                      </div>
                      <span className="text-indigo-400 text-xs flex items-center gap-1">
                        阅读 <FaArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                </GlowingCard>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 md:py-20">
            <p className="text-gray-500 text-base md:text-lg">没有找到匹配的文章</p>
            <button
              onClick={() => {
                setSelectedCategory('全部')
                setSearchQuery('')
              }}
              className="mt-4 text-indigo-400 hover:text-indigo-300 text-sm"
            >
              清除筛选
            </button>
          </div>
        )}
      </div>

      {/* Post Detail Modal */}
      <Modal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        title={selectedPost?.title}
      >
        {selectedPost && (
          <div>
            <div className="h-32 md:h-48 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center text-6xl md:text-8xl mb-4 md:mb-6">
              {selectedPost.emoji}
            </div>

            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <span className="px-2 md:px-3 py-1 text-xs md:text-sm rounded-full bg-indigo-500/20 text-indigo-300">
                {selectedPost.category}
              </span>
              <span className="text-gray-500 text-xs md:text-sm">{selectedPost.date}</span>
              <span className="text-gray-500 text-xs md:text-sm flex items-center gap-1">
                <FaClock size={12} /> {selectedPost.readTime}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
              {selectedPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 md:px-3 py-1 text-xs md:text-sm rounded-full bg-dark-300 text-gray-400"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-sm md:text-lg leading-relaxed mb-4 md:mb-6">
                {selectedPost.excerpt}
              </p>
              {selectedPost.content && (
                <div className="text-gray-400 text-sm md:text-base whitespace-pre-line">
                  {selectedPost.content}
                </div>
              )}
              <div className="mt-6 md:mt-8 p-4 md:p-6 bg-dark-300 rounded-xl">
                <p className="text-gray-500 text-center text-sm">
                  📝 完整文章内容正在编写中...
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 md:pt-6 mt-4 md:mt-6 border-t border-gray-700">
              <div className="flex items-center gap-3 md:gap-4">
                {selectedPost.views && (
                  <span className="text-gray-500 flex items-center gap-1 text-xs md:text-sm">
                    <FaEye size={12} /> {selectedPost.views}
                  </span>
                )}
                {selectedPost.likes && (
                  <span className="text-gray-500 flex items-center gap-1 text-xs md:text-sm">
                    <FaHeart className="text-red-400" size={12} /> {selectedPost.likes}
                  </span>
                )}
              </div>
              <button className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-xs md:text-sm">
                <FaHeart size={12} /> 喜欢
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Blog
