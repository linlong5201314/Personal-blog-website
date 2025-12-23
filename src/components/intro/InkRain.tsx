import React, { useRef, useEffect, useCallback } from 'react';

// Raindrop interface
interface RainDrop {
  x: number;
  y: number;
  length: number;       // 10-40px
  speed: number;        // 8-20px/frame
  opacity: number;      // 0.3-0.9
  thickness: number;    // 1-3px
  angle: number;        // slight tilt
  colorIndex: number;   // index into RAINDROP_COLORS
}

// Splash particle interface
interface SplashParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  gravity: number;
}

// Ripple interface
interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
}

// Configuration constants
const RAINDROP_COLORS = ['#1a1a1a', '#2d2d2d', '#404040', '#595959', '#737373'];

const RAINDROP_CONFIG = {
  minLength: 10,
  maxLength: 40,
  minSpeed: 8,
  maxSpeed: 20,
  minOpacity: 0.3,
  maxOpacity: 0.9,
  minThickness: 1,
  maxThickness: 3,
  angleVariation: 0.1,
};

const SPLASH_CONFIG = {
  minParticleCount: 6,
  maxParticleCount: 10,
  particleSpeed: 3,
  particleLife: 30,
  minRippleCount: 1,
  maxRippleCount: 3,
  rippleSpeed: 2,
  rippleMaxRadius: 30,
};

const REFLECTION_CONFIG = {
  opacity: 0.4,
  distortionAmplitude: 3,
  distortionFrequency: 0.1,
};

interface InkRainProps {
  isActive: boolean;
  intensity?: number;      // 0-1, controls raindrop density
  groundLevel?: number;    // ground Y coordinate percentage (default 85%)
  maxDrops?: number;       // default 300
  width?: number;
  height?: number;
  cameraY?: number;        // Camera Y position (0 = ground, 100 = eye level)
  enableReflection?: boolean; // Enable ground reflection (default true)
}

// Utility functions for raindrop generation
export const createRaindrop = (canvasWidth: number, groundY: number, _canvasHeight?: number): RainDrop => {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * groundY * 0.3 - groundY * 0.3, // Start above screen
    length: RAINDROP_CONFIG.minLength + Math.random() * (RAINDROP_CONFIG.maxLength - RAINDROP_CONFIG.minLength),
    speed: RAINDROP_CONFIG.minSpeed + Math.random() * (RAINDROP_CONFIG.maxSpeed - RAINDROP_CONFIG.minSpeed),
    opacity: RAINDROP_CONFIG.minOpacity + Math.random() * (RAINDROP_CONFIG.maxOpacity - RAINDROP_CONFIG.minOpacity),
    thickness: RAINDROP_CONFIG.minThickness + Math.random() * (RAINDROP_CONFIG.maxThickness - RAINDROP_CONFIG.minThickness),
    angle: (Math.random() - 0.5) * RAINDROP_CONFIG.angleVariation,
    colorIndex: Math.floor(Math.random() * RAINDROP_COLORS.length),
  };
};

export const createSplashParticles = (x: number, y: number): SplashParticle[] => {
  const count = SPLASH_CONFIG.minParticleCount + 
    Math.floor(Math.random() * (SPLASH_CONFIG.maxParticleCount - SPLASH_CONFIG.minParticleCount + 1));
  const particles: SplashParticle[] = [];
  
  for (let i = 0; i < count; i++) {
    const angle = Math.PI + (Math.random() - 0.5) * Math.PI; // Upward spread
    const speed = SPLASH_CONFIG.particleSpeed * (0.5 + Math.random() * 0.5);
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed * 1.5, // More upward velocity
      size: 1 + Math.random() * 3,
      opacity: 0.5 + Math.random() * 0.4,
      life: SPLASH_CONFIG.particleLife,
      maxLife: SPLASH_CONFIG.particleLife,
      gravity: 0.15,
    });
  }
  
  return particles;
};

export const createRipples = (x: number, y: number): Ripple[] => {
  const count = SPLASH_CONFIG.minRippleCount + 
    Math.floor(Math.random() * (SPLASH_CONFIG.maxRippleCount - SPLASH_CONFIG.minRippleCount + 1));
  const ripples: Ripple[] = [];
  
  for (let i = 0; i < count; i++) {
    ripples.push({
      x,
      y,
      radius: 2 + i * 3,
      maxRadius: SPLASH_CONFIG.rippleMaxRadius + Math.random() * 10,
      opacity: 0.6 - i * 0.15,
      speed: SPLASH_CONFIG.rippleSpeed * (0.8 + Math.random() * 0.4),
    });
  }
  
  return ripples;
};

// Check if a color is grayscale (R = G = B within tolerance)
export const isGrayscale = (color: string, tolerance: number = 10): boolean => {
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return Math.abs(r - g) <= tolerance && Math.abs(g - b) <= tolerance && Math.abs(r - b) <= tolerance;
  }
  return false;
};

// Verify all raindrop colors are grayscale
export const verifyGrayscaleColors = (): boolean => {
  return RAINDROP_COLORS.every(color => isGrayscale(color));
};

const InkRain: React.FC<InkRainProps> = ({
  isActive,
  intensity = 1,
  groundLevel = 85,
  maxDrops = 300,
  width,
  height,
  cameraY = 0,
  enableReflection = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raindropsRef = useRef<RainDrop[]>([]);
  const splashParticlesRef = useRef<SplashParticle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  // Initialize raindrops
  const initRaindrops = useCallback((canvasWidth: number, canvasHeight: number) => {
    const groundY = canvasHeight * (groundLevel / 100);
    const targetCount = Math.floor(maxDrops * intensity);
    raindropsRef.current = [];
    
    for (let i = 0; i < targetCount; i++) {
      const drop = createRaindrop(canvasWidth, groundY, groundY);
      // Distribute initial Y positions across the screen
      drop.y = Math.random() * groundY;
      raindropsRef.current.push(drop);
    }
  }, [groundLevel, maxDrops, intensity]);

  // Update raindrop position
  const updateRaindrop = useCallback((drop: RainDrop, _canvasWidth: number, groundY: number): boolean => {
    drop.y += drop.speed;
    drop.x += Math.sin(drop.angle) * drop.speed * 0.5;

    // Check if raindrop hit the ground
    if (drop.y >= groundY) {
      // Create splash effect
      const newSplashParticles = createSplashParticles(drop.x, groundY);
      splashParticlesRef.current.push(...newSplashParticles);
      
      // Create ripples
      const newRipples = createRipples(drop.x, groundY);
      ripplesRef.current.push(...newRipples);
      
      return true; // Raindrop should be reset
    }
    
    return false;
  }, []);

  // Update splash particles
  const updateSplashParticles = useCallback(() => {
    splashParticlesRef.current = splashParticlesRef.current.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += particle.gravity; // Apply gravity
      particle.life--;
      particle.opacity = (particle.life / particle.maxLife) * 0.9;
      return particle.life > 0;
    });
  }, []);

  // Update ripples
  const updateRipples = useCallback(() => {
    ripplesRef.current = ripplesRef.current.filter(ripple => {
      ripple.radius += ripple.speed;
      ripple.opacity -= 0.02;
      return ripple.opacity > 0 && ripple.radius < ripple.maxRadius;
    });
  }, []);

  // Draw a single raindrop
  const drawRaindrop = useCallback((ctx: CanvasRenderingContext2D, drop: RainDrop) => {
    ctx.save();
    ctx.translate(drop.x, drop.y);
    ctx.rotate(drop.angle);
    
    const color = RAINDROP_COLORS[drop.colorIndex];
    ctx.strokeStyle = color;
    ctx.globalAlpha = drop.opacity;
    ctx.lineWidth = drop.thickness;
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, drop.length);
    ctx.stroke();
    
    ctx.restore();
  }, []);

  // Draw reflection of a raindrop
  const drawReflection = useCallback((
    ctx: CanvasRenderingContext2D, 
    drop: RainDrop, 
    groundY: number,
    time: number
  ) => {
    const reflectionY = groundY + (groundY - drop.y);
    if (reflectionY > groundY && drop.y < groundY) {
      ctx.save();
      
      // Add water distortion effect
      const distortionX = Math.sin(time * REFLECTION_CONFIG.distortionFrequency + drop.x * 0.01) 
        * REFLECTION_CONFIG.distortionAmplitude;
      
      ctx.translate(drop.x + distortionX, reflectionY);
      ctx.rotate(-drop.angle); // Flip angle for reflection
      ctx.scale(1, -1); // Vertical flip
      
      const color = RAINDROP_COLORS[drop.colorIndex];
      ctx.strokeStyle = color;
      ctx.globalAlpha = drop.opacity * REFLECTION_CONFIG.opacity;
      ctx.lineWidth = drop.thickness;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, drop.length * 0.7); // Shorter reflection
      ctx.stroke();
      
      ctx.restore();
    }
  }, []);

  // Draw splash particles
  const drawSplashParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    splashParticlesRef.current.forEach(particle => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = RAINDROP_COLORS[Math.floor(Math.random() * RAINDROP_COLORS.length)];
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }, []);

  // Draw ripples
  const drawRipples = useCallback((ctx: CanvasRenderingContext2D) => {
    ripplesRef.current.forEach(ripple => {
      ctx.save();
      ctx.globalAlpha = ripple.opacity;
      ctx.strokeStyle = '#4a4a4a';
      ctx.lineWidth = 1;
      ctx.beginPath();
      // Draw ellipse for perspective effect
      ctx.ellipse(ripple.x, ripple.y, ripple.radius, ripple.radius * 0.3, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    });
  }, []);

  // Draw ground line with gradient
  const drawGroundLine = useCallback((ctx: CanvasRenderingContext2D, groundY: number, canvasWidth: number) => {
    const gradient = ctx.createLinearGradient(0, groundY - 5, 0, groundY + 5);
    gradient.addColorStop(0, 'rgba(50, 50, 50, 0)');
    gradient.addColorStop(0.5, 'rgba(50, 50, 50, 0.3)');
    gradient.addColorStop(1, 'rgba(50, 50, 50, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, groundY - 5, canvasWidth, 10);
  }, []);

  // Main animation loop
  const animate = useCallback((timestamp: number) => {
    if (!isActive) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Calculate camera offset - as camera rises (cameraY increases), 
    // the ground appears to move down in the viewport
    // cameraY: 0 = ground level view, 100 = eye level view
    const cameraOffset = (cameraY / 100) * canvasHeight * 0.3; // Max 30% shift
    
    // Adjust ground level based on camera position
    // When camera is at ground (cameraY=0), ground is at groundLevel%
    // When camera rises, ground appears lower in the viewport
    const adjustedGroundY = canvasHeight * (groundLevel / 100) + cameraOffset;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw ground line (only if visible in viewport)
    if (adjustedGroundY < canvasHeight) {
      drawGroundLine(ctx, adjustedGroundY, canvasWidth);
    }

    // Update and draw raindrops
    raindropsRef.current.forEach((drop, index) => {
      // Apply camera offset to raindrop rendering position
      const renderY = drop.y + cameraOffset;
      
      const shouldReset = updateRaindrop(drop, canvasWidth, adjustedGroundY - cameraOffset);
      
      if (shouldReset) {
        // Reset raindrop to top
        raindropsRef.current[index] = createRaindrop(canvasWidth, adjustedGroundY - cameraOffset);
      }
      
      // Draw raindrop at camera-adjusted position
      const adjustedDrop = { ...drop, y: renderY };
      drawRaindrop(ctx, adjustedDrop);
      
      // Draw reflection at camera-adjusted position (only if enabled)
      if (enableReflection) {
        drawReflection(ctx, adjustedDrop, adjustedGroundY, timestamp);
      }
    });

    // Update and draw splash particles with camera offset
    updateSplashParticles();
    ctx.save();
    ctx.translate(0, cameraOffset);
    drawSplashParticles(ctx);
    ctx.restore();

    // Update and draw ripples with camera offset
    updateRipples();
    ctx.save();
    ctx.translate(0, cameraOffset);
    drawRipples(ctx);
    ctx.restore();

    // Limit splash particles and ripples to prevent memory issues
    if (splashParticlesRef.current.length > 100) {
      splashParticlesRef.current = splashParticlesRef.current.slice(-100);
    }
    if (ripplesRef.current.length > 50) {
      ripplesRef.current = ripplesRef.current.slice(-50);
    }

    lastTimeRef.current = timestamp;
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isActive, groundLevel, cameraY, enableReflection, updateRaindrop, drawRaindrop, drawReflection, 
      updateSplashParticles, drawSplashParticles, updateRipples, drawRipples, drawGroundLine]);

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = (width || rect.width) * dpr;
      canvas.height = (height || rect.height) * dpr;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      
      // Reinitialize raindrops on resize
      initRaindrops(canvas.width / dpr, canvas.height / dpr);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [width, height, initRaindrops]);

  // Start/stop animation
  useEffect(() => {
    if (isActive) {
      const canvas = canvasRef.current;
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        initRaindrops(canvas.width / dpr, canvas.height / dpr);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, animate, initRaindrops]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ 
        width: width || '100%', 
        height: height || '100%',
        pointerEvents: 'none',
      }}
    />
  );
};

export default InkRain;

// Export configuration for testing
export { RAINDROP_CONFIG, SPLASH_CONFIG, REFLECTION_CONFIG, RAINDROP_COLORS };
