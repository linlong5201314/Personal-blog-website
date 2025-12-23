import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Smoking animation phases
export type SmokingPhase = 'idle' | 'inhale' | 'exhale';

// Component props interface
export interface SilhouetteFigureProps {
  isVisible: boolean;
  glowIntensity?: number;           // Backlight intensity 0-1
  smokingPhase?: SmokingPhase;      // Current smoking animation phase
  cigaretteGlowIntensity?: number;  // Cigarette tip glow intensity 0-1
  onExhaleStart?: () => void;       // Callback when exhale starts (to trigger smoke)
  onSmokingCycleComplete?: () => void; // Callback when full smoking cycle completes
  className?: string;
}

// Silhouette design configuration
export const SILHOUETTE_CONFIG = {
  backlight: {
    color: '#ffffff',
    blur: 20,
    spread: 10,
    opacity: 0.6,
  },
  cigarette: {
    glowColor: '#ff6b35',      // Orange-red glow color per requirements
    glowRadius: 8,
    idleColor: '#8b4513',
    maxGlowRadius: 12,         // Maximum glow radius during inhale
  },
  animation: {
    inhaleDuration: 800,       // Duration of inhale phase in ms
    exhaleDelay: 200,          // Delay before triggering smoke after exhale starts
    exhaleDuration: 1500,      // Duration of exhale phase in ms
    chestExpansion: 1.02,      // Scale factor for chest during inhale
    glowPulseDuration: 400,    // Duration of glow pulse animation
  },
};

// Custom hook for managing smoking animation cycle
export const useSmokingAnimation = (
  isActive: boolean,
  onExhaleStart?: () => void,
  onCycleComplete?: () => void
) => {
  const [phase, setPhase] = useState<SmokingPhase>('idle');
  const [glowIntensity, setGlowIntensity] = useState(0.2);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const startSmokingCycle = useCallback(() => {
    if (!isActive) return;
    
    // Start inhale phase
    setPhase('inhale');
    startTimeRef.current = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current;
      
      if (elapsed < SILHOUETTE_CONFIG.animation.inhaleDuration) {
        // Inhale phase - glow increases
        const progress = elapsed / SILHOUETTE_CONFIG.animation.inhaleDuration;
        const easedProgress = easeInOutCubic(progress);
        setGlowIntensity(0.2 + easedProgress * 0.8); // 0.2 -> 1.0
        animationRef.current = requestAnimationFrame(animate);
      } else if (elapsed < SILHOUETTE_CONFIG.animation.inhaleDuration + SILHOUETTE_CONFIG.animation.exhaleDelay) {
        // Brief hold at peak
        setGlowIntensity(1);
        animationRef.current = requestAnimationFrame(animate);
      } else if (elapsed < SILHOUETTE_CONFIG.animation.inhaleDuration + SILHOUETTE_CONFIG.animation.exhaleDelay + 100) {
        // Transition to exhale
        setPhase('exhale');
        onExhaleStart?.();
        animationRef.current = requestAnimationFrame(animate);
      } else if (elapsed < SILHOUETTE_CONFIG.animation.inhaleDuration + SILHOUETTE_CONFIG.animation.exhaleDuration) {
        // Exhale phase - glow decreases
        const exhaleStart = SILHOUETTE_CONFIG.animation.inhaleDuration + SILHOUETTE_CONFIG.animation.exhaleDelay + 100;
        const exhaleProgress = (elapsed - exhaleStart) / (SILHOUETTE_CONFIG.animation.exhaleDuration - SILHOUETTE_CONFIG.animation.exhaleDelay - 100);
        const easedProgress = easeInOutCubic(Math.min(exhaleProgress, 1));
        setGlowIntensity(1 - easedProgress * 0.7); // 1.0 -> 0.3
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Cycle complete
        setPhase('idle');
        setGlowIntensity(0.2);
        onCycleComplete?.();
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  }, [isActive, onExhaleStart, onCycleComplete]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return { phase, glowIntensity, startSmokingCycle };
};

// Easing function for smooth animations
const easeInOutCubic = (t: number): number => {
  return t < 0.5 
    ? 4 * t * t * t 
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// SVG path for male side profile silhouette
// Includes: hair, forehead, brow, nose, lips, chin, neck, shoulder, cigarette
const SILHOUETTE_PATH = `
  M 180 50
  C 175 45, 165 40, 155 42
  C 145 44, 138 48, 132 55
  C 126 62, 122 72, 120 85
  C 118 95, 118 105, 120 115
  C 122 125, 126 132, 132 138
  L 135 142
  C 138 148, 142 155, 148 160
  L 155 165
  C 158 168, 160 172, 160 178
  C 160 182, 158 186, 154 190
  L 148 195
  C 144 198, 142 202, 142 208
  L 142 215
  C 142 222, 145 228, 150 232
  L 158 238
  C 165 242, 172 248, 178 258
  L 185 275
  C 190 288, 195 300, 200 320
  L 200 400
  L 100 400
  L 100 320
  C 105 300, 110 285, 118 270
  C 125 258, 132 250, 140 245
  L 142 215
  L 142 208
  C 142 202, 140 198, 136 195
  L 130 190
  C 126 186, 124 182, 124 178
  C 124 172, 126 168, 130 165
  L 138 160
  C 144 155, 148 148, 150 142
  L 152 138
  C 156 132, 158 125, 158 115
  C 158 105, 156 95, 152 85
  C 148 72, 142 62, 135 55
  C 128 48, 120 44, 112 42
  C 104 40, 95 42, 88 48
  C 82 54, 78 62, 76 72
  C 74 82, 75 92, 78 100
  C 82 110, 88 118, 95 125
  L 100 130
  C 105 135, 108 142, 110 150
  L 112 160
  C 114 170, 118 178, 125 185
  L 135 195
  C 142 200, 148 208, 152 218
  L 155 230
  C 158 242, 162 255, 168 268
  L 180 50
  Z
`;

// Simplified hair outline path
const HAIR_PATH = `
  M 180 50
  C 175 35, 160 25, 145 28
  C 130 31, 118 40, 112 55
  C 108 65, 106 78, 108 90
  L 120 85
  C 118 75, 120 65, 126 58
  C 132 51, 142 46, 155 44
  C 168 42, 178 46, 180 50
  Z
`;

// Cigarette path (positioned at mouth corner)
const CIGARETTE_PATH = `
  M 162 192
  L 210 180
  L 212 184
  L 164 196
  Z
`;

// Cigarette tip position for glow effect
const CIGARETTE_TIP = { x: 211, y: 182 };

const SilhouetteFigure: React.FC<SilhouetteFigureProps> = ({
  isVisible,
  glowIntensity = 0.6,
  smokingPhase = 'idle',
  cigaretteGlowIntensity = 0,
  onExhaleStart,
  onSmokingCycleComplete,
  className = '',
}) => {
  const [chestScale, setChestScale] = useState(1);
  const [internalGlowIntensity, setInternalGlowIntensity] = useState(cigaretteGlowIntensity);
  const exhaleTriggeredRef = useRef(false);

  // Handle smoking animation phases
  useEffect(() => {
    if (smokingPhase === 'inhale') {
      // Chest expansion during inhale
      setChestScale(SILHOUETTE_CONFIG.animation.chestExpansion);
      // Cigarette glows brighter with pulsing effect
      setInternalGlowIntensity(1);
      exhaleTriggeredRef.current = false;
    } else if (smokingPhase === 'exhale') {
      // Chest returns to normal
      setChestScale(1);
      // Cigarette dims
      setInternalGlowIntensity(0.3);
      // Trigger exhale callback after delay (only once)
      if (!exhaleTriggeredRef.current) {
        exhaleTriggeredRef.current = true;
        const timer = setTimeout(() => {
          onExhaleStart?.();
        }, SILHOUETTE_CONFIG.animation.exhaleDelay);
        return () => clearTimeout(timer);
      }
    } else {
      // Idle state
      setChestScale(1);
      setInternalGlowIntensity(0.2);
      // Notify cycle complete when returning to idle from exhale
      if (exhaleTriggeredRef.current) {
        exhaleTriggeredRef.current = false;
        onSmokingCycleComplete?.();
      }
    }
  }, [smokingPhase, onExhaleStart, onSmokingCycleComplete]);

  // Use external glow intensity if provided, otherwise use internal
  const effectiveGlowIntensity = cigaretteGlowIntensity > 0 ? cigaretteGlowIntensity : internalGlowIntensity;

  // Calculate backlight filter values
  const backlightBlur = SILHOUETTE_CONFIG.backlight.blur * glowIntensity;
  const backlightOpacity = SILHOUETTE_CONFIG.backlight.opacity * glowIntensity;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`silhouette-figure absolute inset-0 flex items-center justify-center ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <svg
            viewBox="0 0 300 450"
            className="w-full h-full max-w-md max-h-[80vh]"
            style={{ filter: `drop-shadow(0 0 ${backlightBlur}px rgba(255, 255, 255, ${backlightOpacity}))` }}
          >
            <defs>
              {/* Backlight glow filter */}
              <filter id="backlight-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation={backlightBlur} result="blur" />
                <feFlood floodColor={SILHOUETTE_CONFIG.backlight.color} floodOpacity={backlightOpacity} />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Cigarette glow filter */}
              <filter id="cigarette-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation={SILHOUETTE_CONFIG.cigarette.glowRadius * effectiveGlowIntensity} result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Radial gradient for backlight effect */}
              <radialGradient id="backlight-gradient" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
              </radialGradient>
            </defs>

            {/* Background glow */}
            <ellipse
              cx="150"
              cy="200"
              rx="120"
              ry="180"
              fill="url(#backlight-gradient)"
              opacity={glowIntensity}
            />

            {/* Main silhouette group with chest animation */}
            <motion.g
              animate={{ 
                scaleY: chestScale,
                originY: '60%',
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{ transformOrigin: '150px 270px' }}
            >
              {/* Backlight outline (white glow behind silhouette) */}
              <path
                d={SILHOUETTE_PATH}
                fill="none"
                stroke={SILHOUETTE_CONFIG.backlight.color}
                strokeWidth="3"
                opacity={backlightOpacity}
                filter="url(#backlight-glow)"
              />

              {/* Hair silhouette */}
              <path
                d={HAIR_PATH}
                fill="#0a0a0a"
                stroke="none"
              />

              {/* Main body silhouette */}
              <path
                d={SILHOUETTE_PATH}
                fill="#0a0a0a"
                stroke="none"
              />

              {/* Cigarette */}
              <path
                d={CIGARETTE_PATH}
                fill={SILHOUETTE_CONFIG.cigarette.idleColor}
                stroke="none"
              />

              {/* Cigarette tip glow */}
              <motion.circle
                cx={CIGARETTE_TIP.x}
                cy={CIGARETTE_TIP.y}
                r={4}
                fill={SILHOUETTE_CONFIG.cigarette.glowColor}
                filter="url(#cigarette-glow)"
                animate={{
                  opacity: effectiveGlowIntensity,
                  r: 3 + effectiveGlowIntensity * 3,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Cigarette ember core */}
              <motion.circle
                cx={CIGARETTE_TIP.x}
                cy={CIGARETTE_TIP.y}
                r={2}
                fill="#ffaa00"
                animate={{
                  opacity: 0.5 + effectiveGlowIntensity * 0.5,
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.g>

            {/* Edge highlight for depth */}
            <path
              d={SILHOUETTE_PATH}
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
              opacity={glowIntensity * 0.5}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SilhouetteFigure;

// Export mouth position for smoke emission
export const MOUTH_POSITION = { x: 160, y: 194 };

// Export configuration for testing
export { SILHOUETTE_PATH, HAIR_PATH, CIGARETTE_PATH, CIGARETTE_TIP };
