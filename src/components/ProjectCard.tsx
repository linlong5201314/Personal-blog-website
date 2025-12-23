import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa'
import { useTheme } from '../contexts/ThemeContext'

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  image: string
  tags: string[]
  github?: string
  demo?: string
  featured?: boolean
  stats?: {
    stars: number
    forks: number
  }
  date?: string
  status?: 'completed' | 'in-progress' | 'planned'
}

interface ProjectCardProps {
  project: Project
  index: number
  onClick?: () => void
  variant?: 'default' | 'featured' | 'compact'
}

const ProjectCard = ({ project, index, onClick, variant = 'default' }: ProjectCardProps) => {
  const { getInterpolatedColor } = useTheme()
  const primaryColor = getInterpolatedColor('primary')
  const primaryLightColor = getInterpolatedColor('primaryLight')
  
  const statusColors = {
    completed: 'bg-green-500/20 text-green-600',
    'in-progress': 'bg-yellow-500/20 text-yellow-600',
    planned: 'bg-blue-500/20 text-blue-600',
  }

  const statusLabels = {
    completed: '已完成',
    'in-progress': '进行中',
    planned: '计划中',
  }

  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        onClick={onClick}
        className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl overflow-hidden card-hover group cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div 
          className="h-48 flex items-center justify-center relative overflow-hidden transition-colors duration-500"
          style={{ 
            background: `linear-gradient(to bottom right, ${primaryColor}15, ${primaryLightColor}15)` 
          }}
        >
          {project.image.startsWith('http') ? (
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-7xl">{project.image}</span>
          )}
          {project.status && (
            <span className={`absolute top-4 right-4 px-2 py-1 text-xs rounded-full ${statusColors[project.status]}`}>
              {statusLabels[project.status]}
            </span>
          )}
        </div>
        <div className="p-6">
          <h3 
            className="text-xl font-semibold mb-2 text-gray-800 group-hover:transition-colors duration-300"
            style={{ color: undefined }}
          >
            <span className="group-hover:text-[var(--theme-primary)] transition-colors duration-300" style={{ '--theme-primary': primaryColor } as React.CSSProperties}>
              {project.title}
            </span>
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <span 
                key={tag} 
                className="px-3 py-1 text-xs rounded-full transition-colors duration-500"
                style={{ 
                  backgroundColor: `${primaryColor}15`,
                  color: primaryColor
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {project.stats && (
                <>
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" /> {project.stats.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCodeBranch /> {project.stats.forks}
                  </span>
                </>
              )}
            </div>
            <div className="flex gap-3">
              {project.github && (
                <a
                  href={project.github}
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-500 hover:text-gray-800 transition-colors"
                >
                  <FaGithub size={20} />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  onClick={(e) => e.stopPropagation()}
                  className="transition-colors duration-300"
                  style={{ color: primaryColor }}
                >
                  <FaExternalLinkAlt size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 card-hover group cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div 
          className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center transition-colors duration-500"
          style={{ 
            background: `linear-gradient(to bottom right, ${primaryColor}15, ${primaryLightColor}15)` 
          }}
        >
          {project.image.startsWith('http') ? (
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl">{project.image}</span>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 
              className="text-lg font-semibold text-gray-800 group-hover:transition-colors duration-300"
              style={{ '--theme-primary': primaryColor } as React.CSSProperties}
            >
              <span className="group-hover:text-[var(--theme-primary)] transition-colors duration-300">
                {project.title}
              </span>
            </h3>
            {project.status && (
              <span className={`px-2 py-0.5 text-xs rounded-full ${statusColors[project.status]}`}>
                {statusLabels[project.status]}
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.slice(0, 3).map(tag => (
              <span 
                key={tag} 
                className="px-2 py-1 text-xs rounded-full transition-colors duration-500"
                style={{ 
                  backgroundColor: `${primaryColor}15`,
                  color: primaryColor
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                onClick={(e) => e.stopPropagation()}
                className="text-gray-500 hover:text-gray-800 transition-colors"
              >
                <FaGithub size={18} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                onClick={(e) => e.stopPropagation()}
                className="transition-colors duration-300"
                style={{ color: primaryColor }}
              >
                <FaExternalLinkAlt size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
