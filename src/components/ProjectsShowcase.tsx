import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import GlowingCard from './GlowingCard'
import { projects } from '../data/projects'
import { useTheme } from '../contexts/ThemeContext'

const ProjectsShowcase = () => {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)
  const { getInterpolatedColor } = useTheme()
  const primaryColor = getInterpolatedColor('primary')

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
              🚀 精选作品
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 text-gray-800">
              项目 <span className="gradient-text">展示</span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base">探索我的 AI 实践项目</p>
          </div>
          <Link
            to="/projects"
            className="flex items-center justify-center sm:justify-start gap-2 hover:gap-3 transition-all text-sm md:text-base"
            style={{ color: primaryColor }}
          >
            查看全部
            <FaArrowRight className="text-xs" />
          </Link>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlowingCard className="h-full">
                <div className="p-4 md:p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <motion.div whileHover={{ scale: 1.1 }} className="text-4xl md:text-5xl">
                      {project.image}
                    </motion.div>
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
                        >
                          <FaGithub size={14} />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:opacity-80 transition-colors"
                          style={{ color: primaryColor }}
                        >
                          <FaExternalLinkAlt size={12} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-base md:text-xl font-semibold mb-2 text-gray-800">{project.title}</h3>
                  <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 flex-1 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-[10px] md:text-xs rounded-full border transition-colors duration-500"
                        style={{ 
                          backgroundColor: `${primaryColor}10`, 
                          color: primaryColor,
                          borderColor: `${primaryColor}20`
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </GlowingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsShowcase
