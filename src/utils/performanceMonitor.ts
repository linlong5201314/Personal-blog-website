/**
 * Performance monitoring utility for adaptive particle systems
 * Monitors frame rate and provides recommendations for particle counts
 */

export interface PerformanceConfig {
  targetFPS: number;
  minFPS: number;
  maxParticles: number;
  minParticles: number;
  adaptiveEnabled: boolean;
}

export interface PerformanceState {
  currentFPS: number;
  averageFPS: number;
  recommendedParticleMultiplier: number;
  isMobile: boolean;
  isLowPerformance: boolean;
}

// Default configuration
export const DEFAULT_PERFORMANCE_CONFIG: PerformanceConfig = {
  targetFPS: 120,
  minFPS: 30,
  maxParticles: 300,
  minParticles: 50,
  adaptiveEnabled: true,
};

// Detect if device is mobile
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check for touch capability
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Check screen size
  const isSmallScreen = window.innerWidth <= 768;
  
  // Check user agent for mobile keywords
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobileUA = mobileRegex.test(navigator.userAgent);
  
  return (hasTouch && isSmallScreen) || isMobileUA;
};

// Detect if device has low performance capabilities
export const isLowPerformanceDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 2;
  const isLowCores = cores <= 2;
  
  // Check device memory if available
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const isLowMemory = memory !== undefined && memory <= 4;
  
  // Check if mobile
  const mobile = isMobileDevice();
  
  return isLowCores || isLowMemory || mobile;
};

// Get recommended particle count based on device capabilities
export const getRecommendedParticleCount = (
  baseCount: number,
  config: PerformanceConfig = DEFAULT_PERFORMANCE_CONFIG
): number => {
  const mobile = isMobileDevice();
  const lowPerf = isLowPerformanceDevice();
  
  let multiplier = 1.0;
  
  if (mobile) {
    multiplier = 0.3; // 30% of particles on mobile
  } else if (lowPerf) {
    multiplier = 0.5; // 50% of particles on low-performance devices
  }
  
  const recommended = Math.round(baseCount * multiplier);
  return Math.max(config.minParticles, Math.min(config.maxParticles, recommended));
};

/**
 * Performance Monitor class for real-time FPS tracking and adaptive adjustments
 */
export class PerformanceMonitor {
  private config: PerformanceConfig;
  private frameTimestamps: number[] = [];
  private maxSamples: number = 60;
  private currentMultiplier: number = 1.0;
  private lastAdjustmentTime: number = 0;
  private adjustmentCooldown: number = 1000; // 1 second cooldown between adjustments
  
  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = { ...DEFAULT_PERFORMANCE_CONFIG, ...config };
    
    // Initialize with device-appropriate multiplier
    if (isMobileDevice()) {
      this.currentMultiplier = 0.3;
    } else if (isLowPerformanceDevice()) {
      this.currentMultiplier = 0.5;
    }
  }
  
  /**
   * Record a frame timestamp for FPS calculation
   */
  recordFrame(timestamp: number = performance.now()): void {
    this.frameTimestamps.push(timestamp);
    
    // Keep only recent samples
    if (this.frameTimestamps.length > this.maxSamples) {
      this.frameTimestamps.shift();
    }
  }
  
  /**
   * Calculate current FPS based on recent frame timestamps
   */
  getCurrentFPS(): number {
    if (this.frameTimestamps.length < 2) return this.config.targetFPS;
    
    const oldest = this.frameTimestamps[0];
    const newest = this.frameTimestamps[this.frameTimestamps.length - 1];
    const duration = newest - oldest;
    
    if (duration === 0) return this.config.targetFPS;
    
    return (this.frameTimestamps.length - 1) / (duration / 1000);
  }
  
  /**
   * Get average FPS over the sample window
   */
  getAverageFPS(): number {
    return this.getCurrentFPS();
  }
  
  /**
   * Update and get the recommended particle multiplier based on current performance
   */
  updateAndGetMultiplier(currentTimestamp: number = performance.now()): number {
    if (!this.config.adaptiveEnabled) {
      return this.currentMultiplier;
    }
    
    // Check cooldown
    if (currentTimestamp - this.lastAdjustmentTime < this.adjustmentCooldown) {
      return this.currentMultiplier;
    }
    
    const fps = this.getCurrentFPS();
    
    // If FPS is below minimum, reduce particles
    if (fps < this.config.minFPS) {
      this.currentMultiplier = Math.max(0.2, this.currentMultiplier - 0.1);
      this.lastAdjustmentTime = currentTimestamp;
    }
    // If FPS is good and we're below max, gradually increase
    else if (fps > this.config.targetFPS * 0.8 && this.currentMultiplier < 1.0) {
      this.currentMultiplier = Math.min(1.0, this.currentMultiplier + 0.05);
      this.lastAdjustmentTime = currentTimestamp;
    }
    
    return this.currentMultiplier;
  }
  
  /**
   * Get recommended particle count based on current performance
   */
  getRecommendedParticleCount(baseCount: number): number {
    const adjusted = Math.round(baseCount * this.currentMultiplier);
    return Math.max(this.config.minParticles, Math.min(this.config.maxParticles, adjusted));
  }
  
  /**
   * Get current performance state
   */
  getState(): PerformanceState {
    return {
      currentFPS: this.getCurrentFPS(),
      averageFPS: this.getAverageFPS(),
      recommendedParticleMultiplier: this.currentMultiplier,
      isMobile: isMobileDevice(),
      isLowPerformance: isLowPerformanceDevice(),
    };
  }
  
  /**
   * Reset the monitor
   */
  reset(): void {
    this.frameTimestamps = [];
    this.lastAdjustmentTime = 0;
    
    // Reset multiplier based on device
    if (isMobileDevice()) {
      this.currentMultiplier = 0.3;
    } else if (isLowPerformanceDevice()) {
      this.currentMultiplier = 0.5;
    } else {
      this.currentMultiplier = 1.0;
    }
  }
}

// Singleton instance for global use
let globalMonitor: PerformanceMonitor | null = null;

export const getGlobalPerformanceMonitor = (): PerformanceMonitor => {
  if (!globalMonitor) {
    globalMonitor = new PerformanceMonitor();
  }
  return globalMonitor;
};

export default PerformanceMonitor;
