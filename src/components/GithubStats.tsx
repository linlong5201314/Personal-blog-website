import { motion } from 'framer-motion'
import { FaGithub, FaStar, FaCodeBranch, FaCode, FaFire } from 'react-icons/fa'

const GithubStats = () => {
  const stats = [
    { icon: FaStar, label: '总 Stars', value: '1.2K+', color: 'text-yellow-500' },
    { icon: FaCodeBranch, label: '总 Forks', value: '350+', color: 'text-green-500' },
    { icon: FaCode, label: '代码提交', value: '2.5K+', color: 'text-blue-500' },
    { icon: FaFire, label: '连续贡献', value: '180 天', color: 'text-orange-500' },
  ]

  const contributions = Array.from({ length: 52 * 7 }, () => Math.random())

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <FaGithub size={32} />
            <h2 className="text-2xl font-bold">GitHub 活跃度</h2>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-dark-300 rounded-xl p-4 text-center"
              >
                <stat.icon className={`mx-auto mb-2 ${stat.color}`} size={24} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Contribution Graph */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="flex gap-1">
                {Array.from({ length: 52 }).map((_, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }).map((_, dayIndex) => {
                      const value = contributions[weekIndex * 7 + dayIndex]
                      let bgColor = 'bg-dark-300'
                      if (value > 0.8) bgColor = 'bg-green-400'
                      else if (value > 0.6) bgColor = 'bg-green-500'
                      else if (value > 0.4) bgColor = 'bg-green-600'
                      else if (value > 0.2) bgColor = 'bg-green-700'
                      else if (value > 0.1) bgColor = 'bg-green-900'
                      
                      return (
                        <motion.div
                          key={dayIndex}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                          className={`w-3 h-3 rounded-sm ${bgColor}`}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
              <div className="flex justify-end items-center gap-2 mt-4 text-xs text-gray-500">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-dark-300" />
                  <div className="w-3 h-3 rounded-sm bg-green-900" />
                  <div className="w-3 h-3 rounded-sm bg-green-700" />
                  <div className="w-3 h-3 rounded-sm bg-green-500" />
                  <div className="w-3 h-3 rounded-sm bg-green-400" />
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default GithubStats
