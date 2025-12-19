import { motion } from 'framer-motion'
import { 
  SiPython, SiPytorch, SiTensorflow, SiOpenai, SiDocker, SiGit, 
  SiLinux, SiJupyter, SiNumpy, SiPandas, SiScikitlearn, SiKeras,
  SiMongodb, SiPostgresql, SiFastapi, SiFlask, SiReact, SiTypescript
} from 'react-icons/si'

const techCategories = [
  {
    name: 'AI/ML 框架',
    techs: [
      { icon: SiPytorch, name: 'PyTorch', color: '#EE4C2C' },
      { icon: SiTensorflow, name: 'TensorFlow', color: '#FF6F00' },
      { icon: SiKeras, name: 'Keras', color: '#D00000' },
      { icon: SiScikitlearn, name: 'Scikit-learn', color: '#F7931E' },
    ]
  },
  {
    name: '编程语言',
    techs: [
      { icon: SiPython, name: 'Python', color: '#3776AB' },
      { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
    ]
  },
  {
    name: '数据科学',
    techs: [
      { icon: SiNumpy, name: 'NumPy', color: '#013243' },
      { icon: SiPandas, name: 'Pandas', color: '#150458' },
      { icon: SiJupyter, name: 'Jupyter', color: '#F37626' },
    ]
  },
  {
    name: 'LLM & API',
    techs: [
      { icon: SiOpenai, name: 'OpenAI', color: '#412991' },
    ]
  },
  {
    name: '后端开发',
    techs: [
      { icon: SiFastapi, name: 'FastAPI', color: '#009688' },
      { icon: SiFlask, name: 'Flask', color: '#000000' },
      { icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1' },
      { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
    ]
  },
  {
    name: '开发工具',
    techs: [
      { icon: SiGit, name: 'Git', color: '#F05032' },
      { icon: SiDocker, name: 'Docker', color: '#2496ED' },
      { icon: SiLinux, name: 'Linux', color: '#FCC624' },
      { icon: SiReact, name: 'React', color: '#61DAFB' },
    ]
  },
]

const TechStack = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          技术 <span className="gradient-text">栈</span>
        </motion.h2>
        <p className="text-gray-400 text-center mb-12">
          我日常使用的工具和技术
        </p>

        <div className="space-y-8">
          {techCategories.map((category, ci) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-indigo-400">{category.name}</h3>
              <div className="flex flex-wrap gap-4">
                {category.techs.map((tech, ti) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.1 + ti * 0.05 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="glass rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer"
                  >
                    <tech.icon size={24} style={{ color: tech.color }} />
                    <span className="text-sm font-medium">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack
