import { profile, skills, timeline } from '../data/profile'
import { projects } from '../data/projects'

export const generateResume = () => {
  const featuredProjects = projects.filter(p => p.featured)
  
  const resumeContent = `
林龙 - 个人简历
================================================================================

基本信息
--------
姓名：${profile.name}
邮箱：${profile.email}
GitHub：${profile.social.github}
状态：${profile.status}

求职意向
--------
期望岗位：${profile.jobStatus.expectedRole}
工作类型：${profile.jobStatus.type}

个人简介
--------
${profile.bio}

教育背景
--------
学校：${profile.education.school}
专业：${profile.education.major}
学历：${profile.education.degree}
状态：${profile.education.status}
毕业年份：${profile.education.graduationYear}

专业课程
--------
${profile.courses.join('、')}

技能特长
--------
AI/ML 技能：
${skills.ai.map(s => `  - ${s.name}: ${s.level}%`).join('\n')}

开发技能：
${skills.dev.map(s => `  - ${s.name}: ${s.level}%`).join('\n')}

AI 工具：
${skills.tools.map(s => `  - ${s.name}: ${s.level}%`).join('\n')}

个人亮点
--------
${profile.highlights.map(h => `• ${h}`).join('\n')}

项目经验
--------
${featuredProjects.map(p => `
【${p.title}】
时间：${p.date}
描述：${p.description}
技术栈：${p.tags.join('、')}
`).join('\n')}

成长历程
--------
${timeline.map(t => `
${t.year} - ${t.title}
${t.org}
${t.desc}
`).join('\n')}

================================================================================
联系方式：${profile.email}
GitHub：${profile.social.github}
`

  return resumeContent
}

export const downloadResume = () => {
  const content = generateResume()
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = '林龙_个人简历.txt'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
