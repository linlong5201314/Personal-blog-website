# Implementation Plan: Cinematic Intro UI

## Overview

本实现计划将电影级开场动画和日间主题UI系统分解为可执行的编码任务。使用React + TypeScript + Framer Motion + Canvas API实现，目标帧率120Hz。

## Tasks

- [x] 1. 设置项目基础和主题系统
  - [x] 1.1 创建ThemeProvider上下文和颜色渐变系统
    - 创建 `src/contexts/ThemeContext.tsx`
    - 定义12+颜色调色板（Indigo到Blue的完整循环）
    - 实现3000ms颜色循环逻辑
    - 实现1000-1500ms平滑过渡
    - _Requirements: 6.1, 6.2, 6.3_

  - [ ]* 1.2 编写颜色系统属性测试
    - **Property 10: Color Palette Size** - 验证调色板至少12种颜色
    - **Property 12: WCAG Contrast Compliance** - 验证所有颜色对比度符合WCAG AA
    - **Property 18: Color Saturation Limit** - 验证饱和度不超过80%
    - **Validates: Requirements 6.1, 6.5, 9.4**

  - [x] 1.3 更新全局CSS为日间主题
    - 修改 `src/index.css` 背景为浅色
    - 添加CSS变量用于主题色
    - 更新滚动条、选中文本等样式
    - _Requirements: 9.1, 9.2_

- [x] 2. 实现墨色雨水效果
  - [x] 2.1 创建InkRain Canvas组件基础
    - 创建 `src/components/intro/InkRain.tsx`
    - 实现雨滴生成和下落逻辑
    - 实现雨滴大小、速度、透明度变化
    - 目标300个雨滴，120Hz帧率
    - _Requirements: 1.1, 1.2, 1.4, 1.5_

  - [ ]* 2.2 编写雨滴属性测试
    - **Property 1: Grayscale Particle Colors** - 验证雨滴颜色为灰度
    - **Property 3: Raindrop Variation** - 验证雨滴大小和速度有变化
    - **Property 4: Minimum Raindrop Count** - 验证至少200个雨滴
    - **Validates: Requirements 1.2, 1.4, 1.5**

  - [x] 2.3 实现地面镜像反射效果
    - 在地面线以下渲染雨滴的垂直翻转镜像
    - 镜像透明度0.3-0.5
    - 添加水波扭曲效果
    - _Requirements: 1.6_

  - [ ]* 2.4 编写镜像反射属性测试
    - **Property 19: Ground Reflection Rendering** - 验证镜像正确渲染
    - **Validates: Requirements 1.3**

  - [x] 2.5 实现溅射和水波纹效果
    - 雨滴触地时生成6-10个溅射粒子
    - 生成1-3个扩散水波纹
    - 溅射粒子有重力和生命周期
    - _Requirements: 1.3_

  - [ ]* 2.6 编写溅射效果属性测试
    - **Property 2: Raindrop Splash Generation** - 验证溅射粒子生成
    - **Property 20: Splash Particle Generation** - 验证溅射数量正确
    - **Validates: Requirements 1.3**

- [x] 3. Checkpoint - 确保墨色雨水效果正常工作
  - 确保所有测试通过，如有问题请询问用户

- [x] 4. 实现视角过渡系统
  - [x] 4.1 创建CameraSystem组件
    - 创建 `src/components/intro/CameraSystem.tsx`
    - 实现从地底到平视的视角过渡
    - 使用CSS transform和Framer Motion
    - 过渡时长4秒，使用缓动函数
    - _Requirements: 2.1, 2.2, 2.4, 2.5_

  - [x] 4.2 集成视角与雨水效果
    - 视角上升时雨水持续下落
    - 雨滴相对视角位置调整
    - _Requirements: 2.6_

- [x] 5. 实现人物剪影
  - [x] 5.1 创建SilhouetteFigure SVG组件
    - 创建 `src/components/intro/SilhouetteFigure.tsx`
    - 绘制男性侧脸轮廓SVG路径
    - 包含头发、下颌线、鼻子、嘴唇、香烟
    - 实现背光发光效果
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [x] 5.2 实现吸烟动画
    - 吸气时烟头变亮（#ff6b35）
    - 胸部微微扩张动画
    - 呼气延迟和烟雾触发
    - _Requirements: 3.6, 4.1_

  - [ ]* 5.3 编写人物剪影属性测试
    - **Property 5: Camera-Silhouette Visibility Sync** - 验证视角到位时人物可见
    - **Property 23: Cigarette Glow Sync** - 验证烟头发光与吸气同步
    - **Validates: Requirements 2.3, 4.1**

- [x] 6. 实现烟雾效果
  - [x] 6.1 创建SmokeEffect Canvas组件
    - 创建 `src/components/intro/SmokeEffect.tsx`
    - 实现烟雾粒子系统（最大500粒子）
    - 从嘴部位置发射锥形烟雾
    - 使用Perlin噪声增加自然感
    - _Requirements: 4.2, 4.3, 4.4_

  - [ ]* 6.2 编写烟雾粒子属性测试
    - **Property 1: Grayscale Particle Colors** - 验证烟雾颜色为灰度
    - **Property 6: Smoke Particle Upward Movement** - 验证烟雾向上飘动
    - **Validates: Requirements 4.3, 4.2**

  - [x] 6.3 实现烟雾充满屏幕效果
    - 视角拉近时烟雾放大
    - 烟雾逐渐充满整个屏幕
    - 模糊效果增强
    - _Requirements: 4.5_

  - [x] 6.4 实现烟雾从中间散开效果
    - 从屏幕中心向外径向散开
    - 散开半径逐渐增大
    - 露出下方的主网页
    - _Requirements: 4.6_

  - [ ]* 6.5 编写烟雾散开属性测试
    - **Property 22: Smoke Disperse Animation** - 验证烟雾从中心散开
    - **Validates: Requirements 4.5, 4.6**

  - [x] 6.6 实现鼠标与烟雾交互
    - 鼠标100px范围内推开烟雾粒子
    - 增加鼠标附近湍流效果
    - _Requirements: 4.8_

  - [ ]* 6.7 编写鼠标交互属性测试
    - **Property 21: Mouse-Smoke Interaction** - 验证鼠标推开烟雾
    - **Validates: Requirements 4.8**

- [x] 7. Checkpoint - 确保烟雾效果正常工作
  - 确保所有测试通过，如有问题请询问用户

- [x] 8. 实现开场动画主组件
  - [x] 8.1 创建CinematicIntro主组件
    - 创建 `src/components/intro/CinematicIntro.tsx`
    - 协调所有动画阶段时间线
    - 管理动画状态机
    - 总时长约10秒
    - _Requirements: 5.1, 5.2_

  - [ ]* 8.2 编写动画时间线属性测试
    - **Property 7: Intro Duration Bounds** - 验证总时长9-11秒
    - **Validates: Requirements 5.2**

  - [x] 8.3 实现跳过功能
    - 点击或按键跳过动画
    - 平滑过渡到主网页
    - _Requirements: 5.4_

  - [ ]* 8.4 编写跳过功能属性测试
    - **Property 8: Skip Interaction Handling** - 验证跳过功能
    - **Validates: Requirements 5.4**

  - [x] 8.5 实现会话状态管理
    - 使用sessionStorage记录已播放状态
    - 页面导航时不重复播放
    - _Requirements: 5.5_

  - [ ]* 8.6 编写会话状态属性测试
    - **Property 9: Session Replay Prevention** - 验证不重复播放
    - **Validates: Requirements 5.5**

- [x] 9. 实现烟雾粒子背景
  - [x] 9.1 创建SmokeParticleBackground组件
    - 创建 `src/components/SmokeParticleBackground.tsx`
    - 替换现有ParticleBackground
    - 灰黑白色调烟雾粒子
    - 最大100个粒子，缓慢漂浮
    - _Requirements: 7.1, 7.2, 7.4, 7.5_

  - [ ]* 9.2 编写背景粒子属性测试
    - **Property 1: Grayscale Particle Colors** - 验证粒子基础色为灰度
    - **Property 13: Background Particle Count Limit** - 验证粒子不超过100
    - **Property 15: Slow Particle Drift** - 验证粒子缓慢移动
    - **Validates: Requirements 7.2, 7.5, 7.4**

  - [x] 9.3 实现主题色粒子着色
    - 粒子随主题色微调颜色
    - 混合程度0-0.3
    - _Requirements: 7.3_

  - [ ]* 9.4 编写粒子着色属性测试
    - **Property 14: Background Particle Tinting** - 验证粒子着色
    - **Validates: Requirements 7.3**

  - [x] 9.5 实现滚动视差效果
    - 滚动时粒子位置偏移
    - 视差系数0.3
    - _Requirements: 7.6_

  - [ ]* 9.6 编写视差效果属性测试
    - **Property 16: Parallax Scroll Effect** - 验证视差效果
    - **Validates: Requirements 7.6**

- [x] 10. Checkpoint - 确保背景粒子效果正常工作
  - 确保所有测试通过，如有问题请询问用户

- [x] 11. 更新UI组件主题化
  - [x] 11.1 更新Navbar组件
    - 使用ThemeContext获取当前颜色
    - 更新活动链接指示器颜色
    - 更新悬停效果颜色
    - _Requirements: 8.1_

  - [x] 11.2 更新按钮样式
    - 创建主题化按钮组件或更新现有按钮
    - 背景和边框使用主题色
    - 平滑颜色过渡
    - _Requirements: 8.2_

  - [x] 11.3 更新卡片组件
    - 更新GlowingCard、ProjectCard、BlogCard等
    - 边框发光使用主题色
    - 悬停效果使用主题色
    - _Requirements: 8.3_

  - [x] 11.4 更新文字和链接样式
    - 更新gradient-text类使用主题色
    - 链接颜色使用主题色
    - _Requirements: 8.4_

  - [ ]* 11.5 编写主题传播属性测试
    - **Property 11: Theme Color Propagation** - 验证主题色传播到所有组件
    - **Validates: Requirements 8.1, 8.2, 8.3, 8.4**

- [x] 12. 更新整体页面样式
  - [x] 12.1 更新页面背景为日间主题
    - 浅色背景（白色、浅灰）
    - 柔和阴影和圆角
    - 充足的留白
    - _Requirements: 9.1, 9.3, 9.5_

  - [ ]* 12.2 编写背景颜色属性测试
    - **Property 17: Light Background Colors** - 验证背景为浅色
    - **Validates: Requirements 9.1**

  - [x] 12.3 更新Footer和其他组件
    - 统一日间主题风格
    - 使用主题色
    - _Requirements: 9.6_

- [x] 13. 集成和性能优化
  - [x] 13.1 集成CinematicIntro到App.tsx
    - 替换现有LoadingScreen
    - 确保动画完成后显示主内容
    - _Requirements: 5.1_

  - [x] 13.2 性能优化
    - 实现自适应粒子数量
    - 帧率低于30fps时减少粒子
    - 移动端检测和优化
    - _Requirements: 5.6_

  - [ ]* 13.3 编写性能属性测试
    - **Property 24: Frame Rate Target** - 验证帧率目标和自适应
    - **Validates: Requirements 1.5, 7.5**

- [x] 14. Final Checkpoint - 确保所有功能正常工作
  - 确保所有测试通过
  - 验证完整的开场动画流程
  - 验证颜色渐变系统
  - 验证所有UI组件主题化
  - 如有问题请询问用户

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- 使用fast-check库进行属性测试
- 目标帧率120Hz，粒子数量最大化
