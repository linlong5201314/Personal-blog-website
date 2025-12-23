import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaStar, FaFilter } from 'react-icons/fa'
import Modal from '../components/Modal'
import GlowingCard from '../components/GlowingCard'
import { projects, Project } from '../data/projects'
import { useTheme } from '../contexts/ThemeContext'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState<'all' | 'completed' | 'in-progress'>('all')
  const { getInterpolatedColor } = useTheme()
  const primaryColor = getInterpolatedColor('primary')
  const primaryLightColor = getInterpolatedColor('primaryLight')

  const filteredProjects = projects.filter((p) => {
    if (filter !== 'all' && p.status !== filter) return false
    return true
  })

  const featuredProjects = filteredProjects.filter((p) => p.featured)
  const otherProjects = filteredProjects.filter((p) => !p.featured)

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-gray-800">
            我的 <span style={{ color: primaryColor }} className="transition-colors duration-500">AI 项目</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto px-2">
            在校期间完成的 AI 实践项目
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 md:mb-8"
        >
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <FaFilter className="text-gray-500 text-sm" />
            <span className="text-gray-400 text-sm">筛选</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: '全部' },
              { value: 'completed', label: '已完成' },
              { value: 'in-progress', label: '进行中' },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setFilter(item.value as typeof filter)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                  filter === item.value
                    ? 'text-white'
                    : 'bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-600 hover:text-gray-800'
                }`}
                style={filter === item.value ? {
                  background: `linear-gradient(to right, ${primaryColor}, ${primaryLightColor})`
                } : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <p className="text-gray-500 text-xs md:text-sm mb-6 md:mb-8">
          显示 {filteredProjects.length} 个项目
        </p>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-10 md:mb-16">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-8 flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              精选项目
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <AnimatePresence mode="popLayout">
                {featuredProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setSelectedProject(project)}
                  >
                    <GlowingCard className="cursor-pointer h-full">
                      <div className="p-4 md:p-6">
                        <div 
                          className="h-32 md:h-48 rounded-xl flex items-center justify-center text-5xl md:text-7xl mb-4 relative transition-colors duration-500"
                          style={{ background: `linear-gradient(to bottom right, ${primaryColor}15, ${primaryLightColor}15)` }}
                        >
                          {project.image}
                          {project.status && (
                            <span
                              className={`absolute top-2 right-2 px-2 py-1 text-[10px] md:text-xs rounded-full ${
                                project.status === 'completed'
                                  ? 'bg-green-500/20 text-green-600'
                                  : 'bg-yellow-500/20 text-yellow-600'
                              }`}
                            >
                              {project.status === 'completed' ? '已完成' : '进行中'}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                          {project.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-[10px] md:text-xs rounded-full transition-colors duration-500"
                              style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs md:text-sm text-gray-500">
                            {project.date}
                          </span>
                          <div className="flex gap-2">
                            {project.github && (
                              <span className="text-gray-500">
                                <FaGithub size={16} />
                              </span>
                            )}
                            {project.demo && (
                              <span className="text-gray-500">
                                <FaExternalLinkAlt size={14} />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </GlowingCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-8 text-gray-800">其他项目</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <AnimatePresence mode="popLayout">
                {otherProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedProject(project)}
                  >
                    <GlowingCard className="cursor-pointer h-full">
                      <div className="p-4 md:p-6">
                        <div className="flex items-start gap-3 md:gap-4">
                          <div className="text-3xl md:text-4xl">{project.image}</div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-gray-800">
                              {project.title}
                            </h3>
                            <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {project.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 text-[10px] md:text-xs rounded-full transition-colors duration-500"
                                  style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </GlowingCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 md:py-20">
            <p className="text-gray-500 text-base md:text-lg">没有找到匹配的项目</p>
            <button
              onClick={() => setFilter('all')}
              className="mt-4 text-sm transition-colors duration-300 hover:opacity-80"
              style={{ color: primaryColor }}
            >
              清除筛选
            </button>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
      >
        {selectedProject && (
          <div>
            <div 
              className="h-32 md:h-48 rounded-xl flex items-center justify-center text-6xl md:text-8xl mb-4 md:mb-6 transition-colors duration-500"
              style={{ background: `linear-gradient(to bottom right, ${primaryColor}15, ${primaryLightColor}15)` }}
            >
              {selectedProject.image}
            </div>

            <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 md:px-3 py-1 text-xs md:text-sm rounded-full transition-colors duration-500"
                  style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">
              {selectedProject.description}
            </p>

            {selectedProject.longDescription && (
              <div className="prose max-w-none mb-4 md:mb-6">
                <div className="text-gray-700 text-sm md:text-base whitespace-pre-line">
                  {selectedProject.longDescription}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-gray-200">
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors text-sm md:text-base text-gray-700"
                >
                  <FaGithub /> GitHub
                </a>
              )}
              {selectedProject.demo && (
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl text-sm md:text-base text-white transition-colors duration-500"
                  style={{ background: `linear-gradient(to right, ${primaryColor}, ${primaryLightColor})` }}
                >
                  <FaExternalLinkAlt /> 在线演示
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Projects
