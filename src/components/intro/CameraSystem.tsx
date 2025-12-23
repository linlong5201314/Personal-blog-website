import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, Variants } from 'framer-motion';

// Camera state interface
export interface CameraState {
  y: number;      // Vertical position (0 = ground, 100 = eye level)
  scale: number;  // Zoom level
  blur: number;   // Blur amount in pixels
}

// Camera keyframes for different phases
export const CAMERA_KEYFRAMES: Record<string, CameraState> = {
  ground: { y: 0, scale: 1.2, blur: 2 },
  rising: { y: 50, scale: 1.1, blur: 1 },
  eyeLevel: { y: 100, scale: 1, blur: 0 },
  smokeZoom: { y: 100, scale: 2, blur: 0 },
};

// Phase types
export type CameraPhase = 
  | 'idle'
  | 'ink-rain' 
  | 'camera-rise' 
  | 'silhouette-smoke' 
  | 'smoke-inhale' 
  | 'smoke-exhale' 
  | 'smoke-zoom' 
  | 'smoke-disperse' 
  | 'transition';

interface CameraSystemProps {
  phase: CameraPhase;
  onPhaseComplete?: (phase: CameraPhase) => void;
  children: React.ReactNode;
  duration?: number;        // Camera rise duration in ms (default 4000)
  className?: string;
}

// Easing function for cinematic movement
const cinematicEasing = [0.25, 0.1, 0.25, 1.0]; // cubic-bezier for smooth cinematic feel

// Calculate camera state based on progress (0-1)
export const interpolateCameraState = (progress: number): CameraState => {
  // Clamp progress between 0 and 1
  const p = Math.max(0, Math.min(1, progress));
  
  // Use eased progress for smoother interpolation
  const easedProgress = easeInOutCubic(p);
  
  const start = CAMERA_KEYFRAMES.ground;
  const end = CAMERA_KEYFRAMES.eyeLevel;
  
  return {
    y: start.y + (end.y - start.y) * easedProgress,
    scale: start.scale + (end.scale - start.scale) * easedProgress,
    blur: start.blur + (end.blur - start.blur) * easedProgress,
  };
};

// Cubic easing function
const easeInOutCubic = (t: number): number => {
  return t < 0.5 
    ? 4 * t * t * t 
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// Convert camera Y position to CSS transform
export const cameraYToTransform = (cameraY: number): number => {
  // Camera Y: 0 = ground (looking up), 100 = eye level (normal view)
  // Transform: positive = shift content down, negative = shift content up
  // At ground level (y=0), we want to see the ground, so shift content up
  // At eye level (y=100), normal view, no shift
  const maxShift = 30; // Maximum percentage shift
  return ((100 - cameraY) / 100) * maxShift;
};

const CameraSystem: React.FC<CameraSystemProps> = ({
  phase,
  onPhaseComplete,
  children,
  duration = 4000,
  className = '',
}) => {
  const [cameraState, setCameraState] = useState<CameraState>(CAMERA_KEYFRAMES.ground);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Animate camera rise
  const animateCameraRise = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    startTimeRef.current = performance.now();
    setIsAnimating(true);

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) return;
      
      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      const newState = interpolateCameraState(progress);
      setCameraState(newState);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        onPhaseComplete?.('camera-rise');
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [duration, onPhaseComplete]);

  // Handle phase changes
  useEffect(() => {
    if (phase === 'camera-rise') {
      animateCameraRise();
    } else if (phase === 'idle' || phase === 'ink-rain') {
      // Reset to ground level
      setCameraState(CAMERA_KEYFRAMES.ground);
    } else if (phase === 'smoke-zoom') {
      // Zoom into smoke
      setCameraState(CAMERA_KEYFRAMES.smokeZoom);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [phase, animateCameraRise]);

  // Calculate transform values
  const translateY = cameraYToTransform(cameraState.y);
  const scale = cameraState.scale;
  const blur = cameraState.blur;

  // Framer Motion variants for smooth transitions
  const containerVariants: Variants = {
    initial: {
      transform: `translateY(${translateY}%) scale(${scale})`,
      filter: `blur(${blur}px)`,
    },
    animate: {
      transform: `translateY(${translateY}%) scale(${scale})`,
      filter: `blur(${blur}px)`,
      transition: {
        duration: 0.1,
        ease: cinematicEasing,
      },
    },
  };

  return (
    <motion.div
      className={`camera-system relative w-full h-full overflow-hidden ${className}`}
      initial="initial"
      animate="animate"
      variants={containerVariants}
      style={{
        transformOrigin: 'center center',
        willChange: 'transform, filter',
      }}
    >
      {children}
      
      {/* Debug overlay - remove in production */}
      {process.env.NODE_ENV === 'development' && false && (
        <div className="absolute top-4 left-4 bg-black/50 text-white p-2 text-xs font-mono z-50">
          <div>Phase: {phase}</div>
          <div>Camera Y: {cameraState.y.toFixed(1)}</div>
          <div>Scale: {cameraState.scale.toFixed(2)}</div>
          <div>Blur: {cameraState.blur.toFixed(1)}px</div>
          <div>Animating: {isAnimating ? 'Yes' : 'No'}</div>
        </div>
      )}
    </motion.div>
  );
};

export default CameraSystem;

// Export utilities for testing
export { easeInOutCubic, cinematicEasing };
