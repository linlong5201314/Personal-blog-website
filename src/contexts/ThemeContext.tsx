import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';

// 12+ 颜色定义 - Indigo到Blue的完整循环
export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
}

export const COLOR_PALETTE: ThemeColors[] = [
  { primary: '#6366f1', primaryLight: '#818cf8', primaryDark: '#4f46e5', accent: '#c7d2fe' }, // Indigo
  { primary: '#8b5cf6', primaryLight: '#a78bfa', primaryDark: '#7c3aed', accent: '#ddd6fe' }, // Violet
  { primary: '#ec4899', primaryLight: '#f472b6', primaryDark: '#db2777', accent: '#fbcfe8' }, // Pink
  { primary: '#f43f5e', primaryLight: '#fb7185', primaryDark: '#e11d48', accent: '#fecdd3' }, // Rose
  { primary: '#f97316', primaryLight: '#fb923c', primaryDark: '#ea580c', accent: '#fed7aa' }, // Orange
  { primary: '#eab308', primaryLight: '#facc15', primaryDark: '#ca8a04', accent: '#fef08a' }, // Yellow
  { primary: '#84cc16', primaryLight: '#a3e635', primaryDark: '#65a30d', accent: '#d9f99d' }, // Lime
  { primary: '#22c55e', primaryLight: '#4ade80', primaryDark: '#16a34a', accent: '#bbf7d0' }, // Green
  { primary: '#14b8a6', primaryLight: '#2dd4bf', primaryDark: '#0d9488', accent: '#99f6e4' }, // Teal
  { primary: '#06b6d4', primaryLight: '#22d3ee', primaryDark: '#0891b2', accent: '#a5f3fc' }, // Cyan
  { primary: '#0ea5e9', primaryLight: '#38bdf8', primaryDark: '#0284c7', accent: '#bae6fd' }, // Sky
  { primary: '#3b82f6', primaryLight: '#60a5fa', primaryDark: '#2563eb', accent: '#bfdbfe' }, // Blue
];

// 颜色循环配置
const COLOR_CYCLE_INTERVAL = 3000; // 3000ms 颜色循环
const TRANSITION_DURATION = 1200; // 1000-1500ms 平滑过渡

export interface ThemeContextValue {
  currentColor: ThemeColors;
  colorIndex: number;
  transitionProgress: number;
  isTransitioning: boolean;
  previousColor: ThemeColors;
  nextColor: ThemeColors;
  // 工具函数
  getInterpolatedColor: (property: keyof ThemeColors) => string;
  setColorIndex: (index: number) => void;
  pauseCycling: () => void;
  resumeCycling: () => void;
  isPaused: boolean;
}

const defaultThemeValue: ThemeContextValue = {
  currentColor: COLOR_PALETTE[0],
  colorIndex: 0,
  transitionProgress: 0,
  isTransitioning: false,
  previousColor: COLOR_PALETTE[0],
  nextColor: COLOR_PALETTE[1],
  getInterpolatedColor: () => COLOR_PALETTE[0].primary,
  setColorIndex: () => {},
  pauseCycling: () => {},
  resumeCycling: () => {},
  isPaused: false,
};

const ThemeContext = createContext<ThemeContextValue>(defaultThemeValue);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// 颜色插值工具函数
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

const interpolateColor = (color1: string, color2: string, progress: number): string => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  const r = rgb1.r + (rgb2.r - rgb1.r) * progress;
  const g = rgb1.g + (rgb2.g - rgb1.g) * progress;
  const b = rgb1.b + (rgb2.b - rgb1.b) * progress;
  
  return rgbToHex(r, g, b);
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [colorIndex, setColorIndexState] = useState(0);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentColor = COLOR_PALETTE[colorIndex];
  const nextColorIndex = (colorIndex + 1) % COLOR_PALETTE.length;
  const previousColorIndex = (colorIndex - 1 + COLOR_PALETTE.length) % COLOR_PALETTE.length;
  const nextColor = COLOR_PALETTE[nextColorIndex];
  const previousColor = COLOR_PALETTE[previousColorIndex];

  // 颜色插值函数
  const getInterpolatedColor = useCallback((property: keyof ThemeColors): string => {
    if (!isTransitioning || transitionProgress === 0) {
      return currentColor[property];
    }
    return interpolateColor(currentColor[property], nextColor[property], transitionProgress);
  }, [currentColor, nextColor, isTransitioning, transitionProgress]);

  // 手动设置颜色索引
  const setColorIndex = useCallback((index: number) => {
    const normalizedIndex = ((index % COLOR_PALETTE.length) + COLOR_PALETTE.length) % COLOR_PALETTE.length;
    setColorIndexState(normalizedIndex);
    setTransitionProgress(0);
    setIsTransitioning(false);
  }, []);

  // 暂停/恢复颜色循环
  const pauseCycling = useCallback(() => setIsPaused(true), []);
  const resumeCycling = useCallback(() => setIsPaused(false), []);

  // 颜色循环逻辑
  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let startTime: number | null = null;
    let cycleStartTime = Date.now();

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      
      const elapsed = Date.now() - cycleStartTime;
      
      if (elapsed >= COLOR_CYCLE_INTERVAL) {
        // 开始过渡到下一个颜色
        cycleStartTime = Date.now();
        setColorIndexState(prev => (prev + 1) % COLOR_PALETTE.length);
        setTransitionProgress(0);
        setIsTransitioning(false);
      } else if (elapsed >= COLOR_CYCLE_INTERVAL - TRANSITION_DURATION) {
        // 在过渡期间
        const transitionElapsed = elapsed - (COLOR_CYCLE_INTERVAL - TRANSITION_DURATION);
        const progress = Math.min(transitionElapsed / TRANSITION_DURATION, 1);
        setTransitionProgress(progress);
        setIsTransitioning(true);
      } else {
        setIsTransitioning(false);
        setTransitionProgress(0);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPaused]);

  // 更新CSS变量
  useEffect(() => {
    const root = document.documentElement;
    const interpolatedPrimary = getInterpolatedColor('primary');
    const interpolatedPrimaryLight = getInterpolatedColor('primaryLight');
    const interpolatedPrimaryDark = getInterpolatedColor('primaryDark');
    const interpolatedAccent = getInterpolatedColor('accent');

    root.style.setProperty('--theme-primary', interpolatedPrimary);
    root.style.setProperty('--theme-primary-light', interpolatedPrimaryLight);
    root.style.setProperty('--theme-primary-dark', interpolatedPrimaryDark);
    root.style.setProperty('--theme-accent', interpolatedAccent);
    root.style.setProperty('--theme-transition-duration', `${TRANSITION_DURATION}ms`);
  }, [getInterpolatedColor]);

  const value = useMemo<ThemeContextValue>(() => ({
    currentColor,
    colorIndex,
    transitionProgress,
    isTransitioning,
    previousColor,
    nextColor,
    getInterpolatedColor,
    setColorIndex,
    pauseCycling,
    resumeCycling,
    isPaused,
  }), [
    currentColor,
    colorIndex,
    transitionProgress,
    isTransitioning,
    previousColor,
    nextColor,
    getInterpolatedColor,
    setColorIndex,
    pauseCycling,
    resumeCycling,
    isPaused,
  ]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
