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

export const posts: BlogPost[] = [
  {
    id: '1',
    title: 'YOLO 目标检测入门：从数据标注到模型训练',
    excerpt:
      '分享我学习 YOLO 目标检测的完整过程，包括数据集制作、标注技巧、模型训练和推理部署，适合初学者入门。',
    content: `
# YOLO 目标检测入门

作为一个 AI 专业的学生，YOLO 是我接触的第一个目标检测算法，这里分享一下我的学习心得。

## 1. 数据标注

使用 LabelImg 工具进行标注：
- 安装：pip install labelimg
- 标注格式选择 YOLO
- 注意标注框要紧贴目标边缘

## 2. 模型训练

使用 YOLOv5 进行训练：
\`\`\`python
python train.py --data data.yaml --weights yolov5s.pt --epochs 100
\`\`\`

## 3. 推理测试

训练完成后进行推理测试，查看检测效果。
    `,
    date: '2024-12-10',
    readTime: '10 分钟',
    tags: ['YOLO', '目标检测', '深度学习', '数据标注'],
    category: '技术学习',
    emoji: '🎯',
    views: 156,
    likes: 23,
    featured: true,
  },
  {
    id: '2',
    title: 'AI 编程工具对比：Cursor vs Kiro vs Windsurf',
    excerpt:
      '作为一个经常使用 AI 编程工具的学生，分享我对 Cursor、Kiro、Windsurf 等工具的使用体验和对比。',
    date: '2024-12-05',
    readTime: '8 分钟',
    tags: ['AI工具', 'Cursor', 'Kiro', 'Agent'],
    category: '工具分享',
    emoji: '🛠️',
    views: 234,
    likes: 45,
  },
  {
    id: '3',
    title: 'Flask + MySQL 全栈开发实战经验',
    excerpt:
      '记录我使用 Flask 和 MySQL 开发旅游分享网站的过程，包括项目架构、数据库设计、功能实现等。',
    date: '2024-11-20',
    readTime: '12 分钟',
    tags: ['Flask', 'MySQL', 'Python', 'Web开发'],
    category: '项目实战',
    emoji: '🌐',
    views: 189,
    likes: 34,
  },
  {
    id: '4',
    title: '数据标注工程师的日常：标注技巧与规范',
    excerpt:
      '分享我在数据标注项目中积累的经验，包括图像标注、语音标注、文本标注的技巧和注意事项。',
    date: '2024-11-15',
    readTime: '15 分钟',
    tags: ['数据标注', 'AI', '标注规范'],
    category: '技术学习',
    emoji: '🏷️',
    views: 145,
    likes: 28,
  },
  {
    id: '5',
    title: '大专生如何学习人工智能？我的学习路线分享',
    excerpt:
      '作为一名 AI 专业的大专生，分享我的学习方法和资源，希望能帮助到同样在学习 AI 的同学。',
    date: '2024-11-01',
    readTime: '10 分钟',
    tags: ['学习方法', 'AI', '经验分享'],
    category: '经验分享',
    emoji: '📚',
    views: 312,
    likes: 67,
  },
  {
    id: '6',
    title: 'PyTorch 深度学习入门笔记',
    excerpt:
      '整理我学习 PyTorch 的笔记，包括张量操作、神经网络构建、模型训练等基础知识。',
    date: '2024-10-20',
    readTime: '20 分钟',
    tags: ['PyTorch', '深度学习', '学习笔记'],
    category: '技术学习',
    emoji: '🔥',
    views: 267,
    likes: 52,
  },
  {
    id: '7',
    title: 'ChatGPT 和 Claude 使用技巧总结',
    excerpt:
      '分享我日常使用 ChatGPT、Claude 等大语言模型的技巧，如何写好 Prompt 获得更好的回答。',
    date: '2024-10-10',
    readTime: '8 分钟',
    tags: ['ChatGPT', 'Claude', 'LLM', 'Prompt'],
    category: '工具分享',
    emoji: '🤖',
    views: 423,
    likes: 89,
  },
  {
    id: '8',
    title: '计算机视觉课程学习总结',
    excerpt:
      '总结计算机视觉课程的核心知识点，包括图像处理、特征提取、目标检测、图像分割等内容。',
    date: '2024-09-25',
    readTime: '18 分钟',
    tags: ['计算机视觉', 'CV', '课程总结'],
    category: '技术学习',
    emoji: '👁️',
    views: 198,
    likes: 41,
  },
]

export const getPostById = (id: string) => posts.find((p) => p.id === id)
export const getFeaturedPosts = () => posts.filter((p) => p.featured)
export const getPostsByCategory = (category: string) =>
  posts.filter((p) => p.category === category)
export const getCategories = () => [...new Set(posts.map((p) => p.category))]
