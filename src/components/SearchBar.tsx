import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaTimes, FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface SearchResult {
  type: 'project' | 'blog' | 'page'
  title: string
  description: string
  path: string
  emoji?: string
}

const mockResults: SearchResult[] = [
  {
    type: 'project',
    title: 'YOLO 水果动物识别',
    description: 'PyTorch, YOLO, 目标检测',
    path: '/projects',
    emoji: '🍎',
  },
  {
    type: 'project',
    title: '垃圾分类识别系统',
    description: 'CNN, 图像分类, 深度学习',
    path: '/projects',
    emoji: '♻️',
  },
  {
    type: 'project',
    title: '旅游分享网站',
    description: 'Flask, MySQL, Web开发',
    path: '/projects',
    emoji: '✈️',
  },
  {
    type: 'blog',
    title: 'YOLO 目标检测入门',
    description: '技术学习 · 10 分钟',
    path: '/blog',
    emoji: '🎯',
  },
  {
    type: 'blog',
    title: 'AI 编程工具对比',
    description: '工具分享 · 8 分钟',
    path: '/blog',
    emoji: '🛠️',
  },
  {
    type: 'page',
    title: '关于我',
    description: '了解林龙的更多信息',
    path: '/about',
    emoji: '👨‍💻',
  },
  {
    type: 'page',
    title: '联系我',
    description: '实习机会、项目合作',
    path: '/contact',
    emoji: '📧',
  },
]

interface SearchBarProps {
  isOpen: boolean
  onClose: () => void
}

const SearchBar = ({ isOpen, onClose }: SearchBarProps) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (query.trim()) {
      const filtered = mockResults.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.description.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query])

  const handleSelect = (result: SearchResult) => {
    navigate(result.path)
    onClose()
    setQuery('')
  }

  const typeLabels = {
    project: '项目',
    blog: '博客',
    page: '页面',
  }

  const typeColors = {
    project: 'bg-purple-500/20 text-purple-400',
    blog: 'bg-green-500/20 text-green-400',
    page: 'bg-blue-500/20 text-blue-400',
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-50"
          >
            <div className="glass rounded-2xl overflow-hidden">
              <div className="flex items-center gap-4 p-4 border-b border-gray-700">
                <FaSearch className="text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="搜索项目、博客、页面..."
                  className="flex-1 bg-transparent outline-none text-lg"
                />
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              {results.length > 0 && (
                <div className="max-h-96 overflow-y-auto">
                  {results.map((result, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleSelect(result)}
                      className="w-full flex items-center gap-4 p-4 hover:bg-indigo-500/10 transition-colors text-left"
                    >
                      <span className="text-2xl">{result.emoji}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{result.title}</span>
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full ${typeColors[result.type]}`}
                          >
                            {typeLabels[result.type]}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{result.description}</p>
                      </div>
                      <FaArrowRight className="text-gray-500" />
                    </motion.button>
                  ))}
                </div>
              )}

              {query && results.length === 0 && (
                <div className="p-8 text-center text-gray-500">没有找到相关结果</div>
              )}

              {!query && (
                <div className="p-4 text-center text-gray-500 text-sm">
                  输入关键词开始搜索
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SearchBar
