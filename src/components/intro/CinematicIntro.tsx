import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InkRain from './InkRain';
import CameraSystem, { CameraPhase, interpolateCameraState } from './CameraSystem';
import SilhouetteFigure, { SmokingPhase } from './SilhouetteFigure';
import SmokeEffect, { SmokePhase } from './SmokeEffect';
import { 
  PerformanceMonitor, 
  isMobileDevice, 
  isLowPerformanceDevice
} from '../../utils/performanceMonitor';

// Animation phase types
export type IntroPhase = 
  | 'ink-rain'
  | 'camera-rise'
  | 'silhouette-smoke'
  | 'smoke-inhale'
  | 'smoke-exhale'
  | 'smoke-zoom'
  | 'smoke-disperse'
  | 'transition'
  | 'completed';

// Phase timeline configuration (total ~10 seconds)
export interface PhaseConfig {
  phase: IntroPhase;
  startTime: number;
  duration: number;
}

export const INTRO_TIMELINE: PhaseConfig[] = [
  { phase: 'ink-rain', startTime: 0, duration: 4500 },
  { phase: 'camera-rise', startTime: 500, duration: 4000 },
  { phase: 'silhouette-smoke', startTime: 4000, duration: 1500 },
  { phase: 'smoke-inhale', startTime: 4500, duration: 800 },
  { phase: 'smoke-exhale', startTime: 5300, duration: 1500 },
  { phase: 'smoke-zoom', startTime: 6500, duration: 1500 },
  { phase: 'smoke-disperse', startTime: 8000, duration: 1000 },
  { phase: 'transition', startTime: 9000, duration: 1000 },
];

// Base performance configuration
export const PERFORMANCE_CONFIG = {
  targetFPS: 120,
  maxRaindrops: 300,
  maxSmokeParticles: 500,
  maxSplashParticles: 100,
  enableReflection: true,
  enableMouseInteraction: true,
};

// Get adaptive performance config based on device capabilities
export const getAdaptivePerformanceConfig = () => {
  const mobile = isMobileDevice();
  const lowPerf = isLowPerformanceDevice();
  
  if (mobile) {
    return {
      ...PERFORMANCE_CONFIG,
      maxRaindrops: 100,
      maxSmokeParticles: 150,
      maxSplashParticles: 30,
      enableReflection: false,
      enableMouseInteraction: false,
    };
  }
  
  if (lowPerf) {
    return {
      ...PERFORMANCE_CONFIG,
      maxRaindrops: 150,
      maxSmokeParticles: 250,
      maxSplashParticles: 50,
      enableReflection: true,
      enableMouseInteraction: true,
    };
  }
  
  return PERFORMANCE_CONFIG;
};

// Session storage key
const SESSION_KEY = 'cinematic-intro-played';

// Component props
export interface CinematicIntroProps {
  onComplete: () => void;
  duration?: number;
  skipOnRevisit?: boolean;
  className?: string;
}

// Calculate total intro duration
export const calculateTotalDuration = (timeline: PhaseConfig[]): number => {
  return timeline.reduce((max, phase) => {
    return Math.max(max, phase.startTime + phase.duration);
  }, 0);
};

// Get current phase based on elapsed time
export const getCurrentPhase = (elapsed: number, timeline: PhaseConfig[]): IntroPhase => {
  // Find the latest phase that has started
  let currentPhase: IntroPhase = 'ink-rain';
  
  for (const config of timeline) {
    if (elapsed >= config.startTime) {
      currentPhase = config.phase;
    }
  }
  
  return currentPhase;
};

// Check if intro has been played this session
export const hasPlayedThisSession = (): boolean => {
  try {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  } catch {
    return false;
  }
};

// Mark intro as played this session
export const markAsPlayed = (): void => {
  try {
    sessionStorage.setItem(SESSION_KEY, 'true');
  } catch {
    // Ignore storage errors
  }
};

// Clear played status (for testing)
export const clearPlayedStatus = (): void => {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // Ignore storage errors
  }
};


const CinematicIntro: React.FC<CinematicIntroProps> = ({
  onComplete,
  duration = calculateTotalDuration(INTRO_TIMELINE),
  skipOnRevisit = true,
  className = '',
}) => {
  // Get adaptive performance config based on device
  const adaptiveConfig = useMemo(() => getAdaptivePerformanceConfig(), []);
  
  // State
  const [currentPhase, setCurrentPhase] = useState<IntroPhase>('ink-rain');
  const [isActive, setIsActive] = useState(true);
  const [isSkipping, setIsSkipping] = useState(false);
  const [cameraY, setCameraY] = useState(0);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [smokingPhase, setSmokingPhase] = useState<SmokingPhase>('idle');
  const [smokePhase, setSmokePhase] = useState<SmokePhase>('idle');
  const [showSilhouette, setShowSilhouette] = useState(false);
  const [cigaretteGlow, setCigaretteGlow] = useState(0.2);
  const [focusLevel, setFocusLevel] = useState(1);
  const [particleMultiplier, setParticleMultiplier] = useState(1.0);

  // Refs
  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);
  const performanceMonitorRef = useRef<PerformanceMonitor>(
    new PerformanceMonitor({
      targetFPS: adaptiveConfig.targetFPS,
      minFPS: 30,
      maxParticles: adaptiveConfig.maxRaindrops,
      minParticles: 50,
      adaptiveEnabled: true,
    })
  );

  // Calculate actual particle counts based on performance
  const actualRaindrops = useMemo(() => {
    return Math.round(adaptiveConfig.maxRaindrops * particleMultiplier);
  }, [adaptiveConfig.maxRaindrops, particleMultiplier]);

  // Check if should skip on mount
  useEffect(() => {
    if (skipOnRevisit && hasPlayedThisSession()) {
      handleComplete();
    }
  }, [skipOnRevisit]);

  // Handle completion
  const handleComplete = useCallback(() => {
    setIsActive(false);
    setCurrentPhase('completed');
    markAsPlayed();
    onComplete();
  }, [onComplete]);

  // Handle skip (click or keypress)
  const handleSkip = useCallback(() => {
    if (isSkipping || currentPhase === 'completed') return;
    
    setIsSkipping(true);
    
    // Quick fade out transition
    setTimeout(() => {
      handleComplete();
    }, 300);
  }, [isSkipping, currentPhase, handleComplete]);

  // Mouse tracking for smoke interaction
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current || !adaptiveConfig.enableMouseInteraction) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, [adaptiveConfig.enableMouseInteraction]);

  // Keyboard skip handler
  useEffect(() => {
    const handleKeyDown = () => {
      // Skip on any key press
      if (isActive && !isSkipping) {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, isSkipping, handleSkip]);

  // Main animation timeline
  useEffect(() => {
    if (!isActive || isSkipping) return;

    startTimeRef.current = performance.now();
    const perfMonitor = performanceMonitorRef.current;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current;
      
      // Record frame for performance monitoring
      perfMonitor.recordFrame(currentTime);
      
      // Update particle multiplier based on performance (every frame)
      const newMultiplier = perfMonitor.updateAndGetMultiplier(currentTime);
      if (Math.abs(newMultiplier - particleMultiplier) > 0.05) {
        setParticleMultiplier(newMultiplier);
      }
      
      // Get current phase based on elapsed time
      const phase = getCurrentPhase(elapsed, INTRO_TIMELINE);
      setCurrentPhase(phase);

      // Update camera position during camera-rise phase
      if (phase === 'camera-rise' || elapsed >= 500) {
        const cameraStartTime = 500;
        const cameraDuration = 4000;
        const cameraElapsed = Math.max(0, elapsed - cameraStartTime);
        const cameraProgress = Math.min(cameraElapsed / cameraDuration, 1);
        const cameraState = interpolateCameraState(cameraProgress);
        setCameraY(cameraState.y);
      }

      // Show silhouette when camera reaches eye level
      if (elapsed >= 4000) {
        setShowSilhouette(true);
      }

      // Handle smoking animation phases
      if (phase === 'smoke-inhale') {
        setSmokingPhase('inhale');
        setCigaretteGlow(Math.min(1, cigaretteGlow + 0.05));
      } else if (phase === 'smoke-exhale') {
        setSmokingPhase('exhale');
        setSmokePhase('exhale');
        setCigaretteGlow(Math.max(0.2, cigaretteGlow - 0.02));
      } else if (phase === 'smoke-zoom') {
        setSmokePhase('zoom');
        // Gradually decrease focus level for blur effect
        const zoomStartTime = 6500;
        const zoomProgress = Math.min((elapsed - zoomStartTime) / 1500, 1);
        setFocusLevel(1 - zoomProgress * 0.8);
      } else if (phase === 'smoke-disperse') {
        setSmokePhase('disperse');
        // Gradually restore focus
        const disperseStartTime = 8000;
        const disperseProgress = Math.min((elapsed - disperseStartTime) / 1000, 1);
        setFocusLevel(0.2 + disperseProgress * 0.8);
      } else if (phase === 'transition') {
        // Final transition to main content
        const transitionStartTime = 9000;
        const transitionProgress = Math.min((elapsed - transitionStartTime) / 1000, 1);
        setFocusLevel(transitionProgress);
        
        if (transitionProgress >= 1) {
          handleComplete();
          return;
        }
      }

      // Continue animation if not complete
      if (elapsed < duration) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        handleComplete();
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, isSkipping, duration, handleComplete]);

  // Get camera phase for CameraSystem
  const getCameraPhase = (): CameraPhase => {
    if (currentPhase === 'ink-rain') return 'ink-rain';
    if (currentPhase === 'camera-rise') return 'camera-rise';
    if (currentPhase === 'smoke-zoom') return 'smoke-zoom';
    return 'silhouette-smoke';
  };

  // Don't render if completed
  if (currentPhase === 'completed' && !isSkipping) {
    return null;
  }

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          ref={containerRef}
          className={`fixed inset-0 z-[100] overflow-hidden cursor-pointer ${className}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isSkipping ? 0.3 : 0.5 }}
          onClick={handleSkip}
          onMouseMove={handleMouseMove}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700" />

          {/* Camera system wrapper */}
          <CameraSystem
            phase={getCameraPhase()}
            duration={4000}
          >
            {/* Ink Rain Effect */}
            <InkRain
              isActive={currentPhase !== 'completed' && currentPhase !== 'transition'}
              intensity={1}
              groundLevel={85}
              maxDrops={actualRaindrops}
              cameraY={cameraY}
              enableReflection={adaptiveConfig.enableReflection}
            />

            {/* Silhouette Figure */}
            <SilhouetteFigure
              isVisible={showSilhouette}
              glowIntensity={0.6}
              smokingPhase={smokingPhase}
              cigaretteGlowIntensity={cigaretteGlow}
            />
          </CameraSystem>

          {/* Smoke Effect (rendered on top) */}
          <SmokeEffect
            isActive={smokePhase !== 'idle'}
            phase={smokePhase}
            emitterPosition={{ x: 0.55, y: 0.45 }}
            density={1}
            focusLevel={focusLevel}
            mousePosition={mousePosition}
            onDisperseComplete={() => {
              if (currentPhase === 'smoke-disperse') {
                setCurrentPhase('transition');
              }
            }}
          />

          {/* Skip hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            点击或按任意键跳过
          </motion.div>

          {/* Debug overlay (development only) */}
          {process.env.NODE_ENV === 'development' && false && (
            <div className="absolute top-4 left-4 bg-black/70 text-white p-3 text-xs font-mono z-50 rounded">
              <div>Phase: {currentPhase}</div>
              <div>Camera Y: {cameraY.toFixed(1)}</div>
              <div>Smoking: {smokingPhase}</div>
              <div>Smoke: {smokePhase}</div>
              <div>Focus: {focusLevel.toFixed(2)}</div>
              <div>Silhouette: {showSilhouette ? 'Yes' : 'No'}</div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicIntro;
