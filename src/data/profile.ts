// 个人信息配置
export const profile = {
  name: '林龙',
  englishName: 'Lin Long',
  title: 'AI技术应用学生',
  email: 'm13136064359@163.com',
  avatar: '👨‍💻',
  status: '求职中',
  location: '中国',
  
  // 社交链接
  social: {
    github: 'https://github.com/linlong5201314',
    email: 'mailto:m13136064359@163.com',
  },

  // 简介
  bio: `嘿，我是林龙！一个正在学AI的大专生。

说实话，刚开始选这个专业的时候还挺忐忑的——毕竟AI听起来好像很高大上。但真正学进去之后发现，哇，这东西是真的有意思。

现在主要在折腾深度学习、计算机视觉这些，标注数据的活儿也没少干（虽然有时候标到眼睛疼）。课余时间就是各种AI工具的重度用户，ChatGPT、Claude、Cursor...基本上能试的都试了一遍。

目前在找实习机会，想把学的这些东西用到真实项目里。如果你觉得我还行，欢迎聊聊~`,

  // 求职状态
  jobStatus: {
    available: true,
    type: '实习',
    expectedRole: 'AI开发实习生 / 数据标注工程师 / Python开发实习生',
  },

  // 教育背景
  education: {
    school: 'XX职业技术学院',
    major: '人工智能技术应用',
    degree: '大专',
    status: '在读',
    graduationYear: '2025',
  },

  // 课程学习
  courses: [
    '深度学习基础',
    '深度学习视觉技术',
    '计算机视觉',
    '数据标注技术',
    'Python Web应用开发',
    '数据库技术',
    '数据分析与可视化',
    '机器学习技术',
    '软件测试应用',
  ],

  // 技能标签
  highlights: [
    'PyTorch/TensorFlow 用得还算顺手',
    'YOLO 目标检测玩得比较熟',
    'Python + Flask + MySQL 能搞定',
    '各种AI大模型都有在用',
    'AI编程工具的重度用户',
    '标注数据标到眼睛疼的那种经验',
  ],
}

// 技能配置
export const skills = {
  // AI/ML 技能
  ai: [
    { name: 'Python', level: 85 },
    { name: 'PyTorch', level: 75 },
    { name: 'TensorFlow', level: 70 },
    { name: 'YOLO', level: 80 },
    { name: '深度学习', level: 75 },
    { name: '计算机视觉', level: 78 },
    { name: '机器学习', level: 72 },
    { name: '数据标注', level: 90 },
  ],
  
  // 开发技能
  dev: [
    { name: 'Flask', level: 80 },
    { name: 'MySQL', level: 75 },
    { name: 'HTML/CSS', level: 70 },
    { name: 'Git', level: 65 },
  ],

  // AI 工具
  tools: [
    { name: 'Cursor', level: 85 },
    { name: 'Kiro', level: 80 },
    { name: 'Trae', level: 75 },
    { name: 'Windsurf', level: 75 },
    { name: 'VS Code', level: 85 },
    { name: 'ChatGPT', level: 90 },
    { name: 'Claude', level: 85 },
  ],
}

// 时间线
export const timeline = [
  {
    year: '2024',
    title: '掉进 AI Agent 的坑',
    org: '自学探索',
    desc: 'Cursor、Kiro、Windsurf...能试的工具基本都试了一遍，真香',
    type: 'milestone' as const,
  },
  {
    year: '2024',
    title: '项目做到手软的一年',
    org: '课程项目',
    desc: 'YOLO检测、垃圾分类、语音识别...熬了不少夜，但学到了很多',
    type: 'project' as const,
  },
  {
    year: '2023',
    title: '第一次写完整的Web项目',
    org: '课程项目',
    desc: 'Flask + MySQL 旅游网站，虽然现在看代码有点青涩，但当时真的很有成就感',
    type: 'project' as const,
  },
  {
    year: '2022',
    title: '误打误撞进了AI专业',
    org: 'XX职业技术学院',
    desc: '当时选专业其实挺迷茫的，没想到越学越觉得有意思',
    type: 'education' as const,
  },
]
