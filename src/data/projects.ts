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
  category?: string
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'YOLO 水果动物识别系统',
    description: '基于 YOLOv5/v8 的目标检测项目，实现水果和动物的实时识别与分类，包含数据标注、模型训练、推理部署全流程。',
    longDescription: `
## 项目概述
使用 YOLO 目标检测算法，完成水果和动物图像的识别与分类任务。

## 技术实现
- 使用 LabelImg 进行数据标注，制作 YOLO 格式数据集
- 基于 YOLOv5/v8 进行模型训练
- 实现实时视频流目标检测
- 支持多类别识别

## 我的收获
- 掌握了目标检测的完整流程
- 学会了数据标注的规范和技巧
- 理解了 YOLO 算法原理
    `,
    image: '🍎',
    tags: ['YOLO', 'PyTorch', '目标检测', '数据标注', 'OpenCV'],
    featured: true,
    status: 'completed',
    date: '2024-10',
    category: '计算机视觉',
    github: 'https://github.com/linlong5201314',
  },
  {
    id: '2',
    title: '垃圾分类识别系统',
    description: '基于深度学习的垃圾分类识别项目，使用 CNN 实现垃圾图像的自动分类，支持可回收物、有害垃圾等多类别识别。',
    longDescription: `
## 项目概述
针对垃圾分类需求，开发的图像分类系统。

## 技术实现
- 使用 PyTorch 构建 CNN 分类模型
- 数据增强提升模型泛化能力
- 实现 Web 端图片上传识别

## 项目成果
- 分类准确率达到 90%+
- 支持 4 大类垃圾识别
    `,
    image: '♻️',
    tags: ['CNN', 'PyTorch', '图像分类', '深度学习'],
    featured: true,
    status: 'completed',
    date: '2024-09',
    category: '计算机视觉',
    github: 'https://github.com/linlong5201314',
  },
  {
    id: '3',
    title: '旅游分享网站',
    description: '使用 Python Flask + MySQL 开发的全栈 Web 项目，实现用户注册登录、旅游攻略发布、评论互动等功能。',
    longDescription: `
## 项目概述
一个完整的旅游信息分享平台。

## 技术栈
- 后端：Python Flask
- 数据库：MySQL
- 前端：HTML/CSS/JavaScript

## 功能模块
- 用户注册/登录系统
- 旅游攻略发布与浏览
- 评论与点赞功能
- 图片上传与展示
    `,
    image: '✈️',
    tags: ['Flask', 'MySQL', 'Python', 'Web开发'],
    featured: true,
    status: 'completed',
    date: '2024-06',
    category: 'Web开发',
    github: 'https://github.com/linlong5201314',
  },
  {
    id: '4',
    title: '手写数字识别',
    description: '基于 MNIST 数据集的手写数字识别项目，使用 CNN 实现 0-9 数字的识别，是深度学习入门经典项目。',
    image: '🔢',
    tags: ['CNN', 'MNIST', 'PyTorch', '深度学习'],
    featured: false,
    status: 'completed',
    date: '2024-03',
    category: '计算机视觉',
    github: 'https://github.com/linlong5201314',
  },
  {
    id: '5',
    title: '语音识别项目',
    description: '语音信号处理与识别项目，包含语音数据的分割标注和识别模型训练。',
    image: '🎤',
    tags: ['语音识别', 'Python', '数据标注', '信号处理'],
    featured: false,
    status: 'completed',
    date: '2024-08',
    category: '语音处理',
    github: 'https://github.com/linlong5201314',
  },
  {
    id: '6',
    title: '文本情感分析标注',
    description: 'NLP 文本标注项目，对文本进行情感极性标注（正面/负面/中性），为情感分析模型提供训练数据。',
    image: '💬',
    tags: ['NLP', '数据标注', '情感分析', '文本处理'],
    featured: false,
    status: 'completed',
    date: '2024-07',
    category: 'NLP',
    github: 'https://github.com/linlong5201314',
  },
  {
    id: '7',
    title: '文本实体标注',
    description: 'NER 命名实体识别标注项目，标注文本中的人名、地名、组织名等实体信息。',
    image: '📝',
    tags: ['NLP', 'NER', '数据标注', '实体识别'],
    featured: false,
    status: 'completed',
    date: '2024-07',
    category: 'NLP',
    github: 'https://github.com/linlong5201314',
  },
  {
    id: '8',
    title: '软件测试实践',
    description: '软件测试课程项目，学习并实践功能测试、接口测试、自动化测试等测试方法。',
    image: '🧪',
    tags: ['软件测试', 'Python', '自动化测试'],
    featured: false,
    status: 'completed',
    date: '2024-05',
    category: '软件测试',
    github: 'https://github.com/linlong5201314',
  },
]

export const getProjectById = (id: string) => projects.find((p) => p.id === id)
export const getFeaturedProjects = () => projects.filter((p) => p.featured)
export const getProjectsByCategory = (category: string) =>
  projects.filter((p) => p.category === category)
export const getCategories = () => [...new Set(projects.map((p) => p.category))]
