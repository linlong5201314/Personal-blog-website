import React, { useState, useCallback, useEffect } from 'react';
import CameraSystem, { CameraPhase, interpolateCameraState } from './CameraSystem';
import InkRain from './InkRain';

interface CameraRainIntegrationProps {
  isActive: boolean;
  onComplete?: () => void;
  autoStart?: boolean;
  rainDuration?: number;      // Duration of rain-only phase (ms)
  cameraRiseDuration?: number; // Duration of camera rise (ms)
}

/**
 * Integration component that combines CameraSystem with InkRain effect.
 * 
 * Timeline:
 * 1. ink-rain phase: Rain falls while camera is at ground level
 * 2. camera-rise phase: Camera rises while rain continues to fall
 * 
 * The rain appears to fall past the rising viewpoint, creating
 * the cinematic effect of rising from ground level.
 */
const CameraRainIntegration: React.FC<CameraRainIntegrationProps> = ({
  isActive,
  onComplete,
  autoStart = true,
  rainDuration = 500,        // 0.5s of rain before camera starts rising
  cameraRiseDuration = 4000, // 4s camera rise
}) => {
  const [phase, setPhase] = useState<CameraPhase>('idle');
  const [cameraY, setCameraY] = useState(0);
  const [isRainActive, setIsRainActive] = useState(false);

  // Start the animation sequence
  const startSequence = useCallback(() => {
    setPhase('ink-rain');
    setIsRainActive(true);
    setCameraY(0);

    // After rain-only phase, start camera rise
    const cameraStartTimer = setTimeout(() => {
      setPhase('camera-rise');
    }, rainDuration);

    return () => clearTimeout(cameraStartTimer);
  }, [rainDuration]);

  // Handle phase completion
  const handlePhaseComplete = useCallback((completedPhase: CameraPhase) => {
    if (completedPhase === 'camera-rise') {
      // Camera has reached eye level
      setPhase('silhouette-smoke');
      onComplete?.();
    }
  }, [onComplete]);

  // Track camera position for InkRain integration
  useEffect(() => {
    if (phase !== 'camera-rise') return;

    const startTime = performance.now();
    let animationFrame: number;

    const updateCameraY = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / cameraRiseDuration, 1);
      const state = interpolateCameraState(progress);
      setCameraY(state.y);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCameraY);
      }
    };

    animationFrame = requestAnimationFrame(updateCameraY);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [phase, cameraRiseDuration]);

  // Auto-start when active
  useEffect(() => {
    if (isActive && autoStart && phase === 'idle') {
      startSequence();
    } else if (!isActive) {
      setPhase('idle');
      setIsRainActive(false);
      setCameraY(0);
    }
  }, [isActive, autoStart, phase, startSequence]);

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 overflow-hidden">
      <CameraSystem
        phase={phase}
        onPhaseComplete={handlePhaseComplete}
        duration={cameraRiseDuration}
      >
        {/* InkRain receives camera position to adjust raindrop rendering */}
        <InkRain
          isActive={isRainActive}
          intensity={1}
          groundLevel={85}
          maxDrops={300}
          cameraY={cameraY}
        />
        
        {/* Placeholder for silhouette - will be added in later tasks */}
        {phase === 'silhouette-smoke' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/30 text-sm">
              [Silhouette placeholder - Task 5]
            </div>
          </div>
        )}
      </CameraSystem>

      {/* Debug info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-4 left-4 bg-black/50 text-white p-2 text-xs font-mono z-50">
          <div>Phase: {phase}</div>
          <div>Camera Y: {cameraY.toFixed(1)}</div>
          <div>Rain Active: {isRainActive ? 'Yes' : 'No'}</div>
        </div>
      )}
    </div>
  );
};

export default CameraRainIntegration;

// Export type for testing
export type { CameraRainIntegrationProps };
