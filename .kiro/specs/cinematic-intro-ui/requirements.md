# Requirements Document

## Introduction

本功能旨在为个人作品集网站创建一个电影级的开场动画体验，以及一套清新淡雅的日间主题UI系统。开场动画将展示一个独特的墨色雨水场景，视角从地底逐渐上升到一个背光吸烟人物的平视角度，烟雾缭绕后过渡到主网页。主网页采用白天效果，具有12种以上颜色的渐变系统，每3000ms平滑切换颜色，同时保持烟雾灰黑白色的背景主题。

## Glossary

- **Cinematic_Intro**: 电影级开场动画组件，包含墨色雨水、人物剪影和烟雾效果
- **Ink_Rain**: 墨色雨水效果，黑白灰色调的雨滴从上方落下
- **Silhouette_Figure**: 背光人物剪影，叼着烟的角色形象
- **Smoke_Effect**: 烟雾效果，从人物香烟处飘出的缭绕烟雾
- **Camera_System**: 视角控制系统，管理从地底到平视的视角过渡
- **Color_Gradient_System**: 颜色渐变系统，管理12种以上颜色的循环渐变
- **Theme_Accent_Color**: 主题强调色，影响字体、按钮、卡片、导航栏和背景粒子的颜色
- **Smoke_Particle_Background**: 烟雾粒子背景，灰黑白色调的烟雾粒子效果

## Requirements

### Requirement 1: 墨色雨水开场效果

**User Story:** As a visitor, I want to see an artistic ink rain effect when the page loads, so that I experience a unique and memorable first impression.

#### Acceptance Criteria

1. WHEN the page first loads, THE Cinematic_Intro SHALL display ink-colored raindrops falling from the top of the screen
2. THE Ink_Rain SHALL use only black, white, and gray color tones for the raindrops
3. WHEN raindrops fall, THE Ink_Rain SHALL create subtle splash effects with 6-10 particles and 1-3 ripple effects upon reaching the ground
4. THE Ink_Rain SHALL vary raindrop sizes (10-40px), speeds (8-20px/frame), and opacity (0.3-0.9) to create a natural, organic appearance
5. WHILE the intro animation plays, THE Ink_Rain SHALL maintain a minimum of 200 visible raindrops on screen for maximum visual density
6. THE Ink_Rain SHALL render ground-level mirror reflections of raindrops with 0.3-0.5 opacity and subtle water distortion effect
7. THE Ink_Rain effect SHALL continue for 4.5 seconds during the camera rise phase

### Requirement 2: 视角过渡动画

**User Story:** As a visitor, I want to experience a cinematic camera movement from ground level to eye level, so that I feel immersed in the artistic introduction.

#### Acceptance Criteria

1. WHEN the ink rain effect begins, THE Camera_System SHALL start the view from a low ground-level perspective
2. THE Camera_System SHALL smoothly transition the view upward over a duration of 4 seconds (increased from 3 seconds)
3. WHEN the camera reaches eye level, THE Camera_System SHALL reveal the Silhouette_Figure in the center of the screen
4. THE Camera_System SHALL use easing functions to create smooth, cinematic movement
5. WHILE transitioning, THE Camera_System SHALL maintain visual continuity without jarring cuts
6. THE Camera_System SHALL keep the ink rain visible throughout the camera rise, with raindrops appearing to fall past the rising viewpoint

### Requirement 3: 背光人物剪影

**User Story:** As a visitor, I want to see an artistic silhouette figure with backlighting, so that the introduction has a mysterious and stylish atmosphere.

#### Acceptance Criteria

1. WHEN the camera reaches eye level, THE Silhouette_Figure SHALL appear as a dark silhouette against a lighter background
2. THE Silhouette_Figure SHALL display a male character in side profile (侧脸) with a melancholic mood, holding a cigarette in their mouth
3. THE Silhouette_Figure SHALL have a subtle backlight glow effect around the edges with white color and 20px blur
4. THE Silhouette_Figure SHALL NOT show the front face, only the side profile silhouette
5. THE Silhouette_Figure SHALL include defined features: slightly messy hair, clear jawline, visible nose profile
6. WHILE the character inhales, THE cigarette tip SHALL glow brighter with orange-red color (#ff6b35)

### Requirement 4: 烟雾缭绕效果

**User Story:** As a visitor, I want to see realistic smoke rising from the cigarette, so that the scene feels alive and atmospheric.

#### Acceptance Criteria

1. WHEN the Silhouette_Figure is visible, THE character SHALL perform a smoking animation: inhale, then exhale smoke
2. THE Smoke_Effect SHALL emit smoke particles from the mouth position when exhaling, forming a natural cone shape
3. THE Smoke_Effect SHALL animate smoke rising and dispersing naturally upward with Perlin noise turbulence
4. THE Smoke_Effect SHALL use gray and white tones with varying opacity (0.1-0.8)
5. WHEN the camera zooms into the smoke, THE Smoke_Effect SHALL fill the entire screen
6. WHEN the screen is filled with smoke, THE smoke SHALL disperse from the center outward, revealing the main website
7. THE transition from blurry smoke to clear website SHALL create a smooth focus effect
8. THE Smoke_Effect SHALL support mouse interaction - particles SHALL be pushed away when the mouse moves near them

### Requirement 5: 开场到主页过渡

**User Story:** As a visitor, I want a smooth transition from the cinematic intro to the main website, so that the experience feels seamless and polished.

#### Acceptance Criteria

1. WHEN the smoke fills the screen, THE Cinematic_Intro SHALL begin the disperse animation from the center
2. THE Cinematic_Intro SHALL complete the entire intro sequence within 9-11 seconds (extended for more detailed effects)
3. WHEN transitioning to the main website, THE smoke SHALL disperse radially outward over 1 second, then fade completely
4. IF a user clicks or presses any key during the intro, THEN THE Cinematic_Intro SHALL skip to the main website immediately
5. THE Cinematic_Intro SHALL only play once per session (not on page navigation)
6. THE animation SHALL target 120Hz frame rate for maximum smoothness

### Requirement 6: 日间主题颜色系统

**User Story:** As a visitor, I want to see a fresh, elegant daytime theme with smoothly changing accent colors, so that the website feels dynamic and visually appealing.

#### Acceptance Criteria

1. THE Color_Gradient_System SHALL define a minimum of 12 distinct accent colors
2. THE Color_Gradient_System SHALL cycle through colors every 3000 milliseconds
3. WHEN changing colors, THE Color_Gradient_System SHALL use smooth CSS transitions lasting 1000-1500ms
4. THE Color_Gradient_System SHALL apply the current accent color to text highlights, buttons, cards, and navigation elements
5. THE Color_Gradient_System SHALL maintain sufficient contrast ratios for accessibility (WCAG AA standard)
6. WHILE cycling colors, THE Color_Gradient_System SHALL follow a harmonious color progression

### Requirement 7: 烟雾粒子背景

**User Story:** As a visitor, I want to see a subtle smoke particle background that responds to the color theme, so that the website maintains visual consistency with the intro.

#### Acceptance Criteria

1. THE Smoke_Particle_Background SHALL display floating smoke-like particles across the viewport
2. THE Smoke_Particle_Background SHALL use gray, black, and white tones as the base colors
3. WHEN the Theme_Accent_Color changes, THE Smoke_Particle_Background SHALL subtly tint particles with the new color
4. THE Smoke_Particle_Background SHALL animate particles with slow, drifting movements
5. THE Smoke_Particle_Background SHALL maintain performance with a maximum of 100 particles
6. WHILE scrolling, THE Smoke_Particle_Background SHALL create a parallax effect

### Requirement 8: 主题化UI组件

**User Story:** As a visitor, I want all UI components to reflect the current accent color, so that the website feels cohesive and unified.

#### Acceptance Criteria

1. WHEN the Theme_Accent_Color changes, THE Navbar SHALL update its active link indicators and hover effects
2. WHEN the Theme_Accent_Color changes, THE buttons SHALL update their background and border colors
3. WHEN the Theme_Accent_Color changes, THE cards SHALL update their border glow and hover effects
4. WHEN the Theme_Accent_Color changes, THE text highlights and links SHALL update their colors
5. THE UI components SHALL transition colors smoothly without flickering
6. WHILE in the daytime theme, THE background SHALL remain light with subtle gradients

### Requirement 9: 清新淡雅的整体风格

**User Story:** As a visitor, I want the website to have a clean, fresh, and elegant appearance, so that it feels modern and professional.

#### Acceptance Criteria

1. THE website background SHALL use light, neutral tones (whites, light grays)
2. THE typography SHALL use clean, readable fonts with appropriate weights
3. THE UI elements SHALL have subtle shadows and rounded corners for a soft appearance
4. THE color palette SHALL avoid harsh or overly saturated colors
5. WHILE displaying content, THE layout SHALL maintain generous whitespace
6. THE overall design SHALL balance the smoke background with clean content areas
