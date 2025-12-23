import React, { useRef, useEffect, useCallback, useState } from 'react';

// Smoke particle interface
export interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  life: number;
  maxLife: number;
  turbulence: number;
  noiseOffset: number;
  colorIndex: number;
}

// Smoke effect phases
export type SmokePhase = 'idle' | 'exhale' | 'float' | 'zoom' | 'disperse';

// Component props
export interface SmokeEffectProps {
  isActive: boolean;
  phase: SmokePhase;
  emitterPosition?: { x: number; y: number };
  density?: number;
  spreadFactor?: number;
  focusLevel?: number;
  mousePosition?: { x: number; y: number } | null;
  onDisperseComplete?: () => void;
  width?: number;
  height?: number;
}

// Smoke colors (grayscale)
export const SMOKE_COLORS = [
  'rgba(255, 255, 255, 0.8)',
  'rgba(220, 220, 220, 0.7)',
  'rgba(180, 180, 180, 0.6)',
  'rgba(140, 140, 140, 0.5)',
  'rgba(100, 100, 100, 0.4)',
];

// Configuration constants
export const SMOKE_CONFIG = {
  maxParticles: 500,
  exhale: {
    initialVelocityX: 3,
    initialVelocityY: -2,
    spread: 0.4,
    particleSizeMin: 8,
    particleSizeMax: 20,
    emissionRate: 15,
    coneAngle: Math.PI / 4,
  },
  float: {
    velocityDecay: 0.985,
    turbulenceStrength: 0.6,
    sizeGrowth: 1.008,
    opacityDecay: 0.992,
  },
  zoom: {
    targetScale: 2.5,
    blurIncrease: true,
    particleSizeMultiplier: 1.8,
    velocityBoost: 0.3,
  },
  disperse: {
    disperseForce: 8,
    maxDisperseRadius: 1.8,
    disperseDuration: 1000,
    fadeSpeed: 0.02,
  },
  mouse: {
    influenceRadius: 100,
    pushForce: 3,
    turbulenceBoost: 2,
  },
  particle: {
    minLife: 150,
    maxLife: 300,
    rotationSpeedMin: -0.02,
    rotationSpeedMax: 0.02,
    turbulenceMin: 0.3,
    turbulenceMax: 0.8,
  },
};

// Simple Perlin-like noise implementation
class SimplexNoise {
  private perm: number[] = [];

  constructor(seed: number = Math.random() * 10000) {
    const p = [];
    for (let i = 0; i < 256; i++) p[i] = i;
    
    // Shuffle using seed
    let n = seed;
    for (let i = 255; i > 0; i--) {
      n = (n * 16807) % 2147483647;
      const j = n % (i + 1);
      [p[i], p[j]] = [p[j], p[i]];
    }
    
    this.perm = [...p, ...p];
  }

  noise2D(x: number, y: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    
    x -= Math.floor(x);
    y -= Math.floor(y);
    
    const u = this.fade(x);
    const v = this.fade(y);
    
    const A = this.perm[X] + Y;
    const B = this.perm[X + 1] + Y;
    
    return this.lerp(v,
      this.lerp(u, this.grad(this.perm[A], x, y), this.grad(this.perm[B], x - 1, y)),
      this.lerp(u, this.grad(this.perm[A + 1], x, y - 1), this.grad(this.perm[B + 1], x - 1, y - 1))
    );
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private lerp(t: number, a: number, b: number): number {
    return a + t * (b - a);
  }

  private grad(hash: number, x: number, y: number): number {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }
}

// Create smoke particle
export const createSmokeParticle = (
  emitterX: number,
  emitterY: number,
  _canvasWidth: number,
  _canvasHeight: number,
  _phase: SmokePhase
): SmokeParticle => {
  const config = SMOKE_CONFIG;
  
  // Calculate emission angle (cone shape from mouth)
  const baseAngle = -Math.PI / 6; // Slightly upward and to the right
  const angleVariation = (Math.random() - 0.5) * config.exhale.coneAngle;
  const angle = baseAngle + angleVariation;
  
  // Initial velocity based on phase
  let vx = Math.cos(angle) * config.exhale.initialVelocityX * (0.8 + Math.random() * 0.4);
  let vy = Math.sin(angle) * Math.abs(config.exhale.initialVelocityY) - Math.random() * 1.5;
  
  // Add some spread
  vx += (Math.random() - 0.5) * config.exhale.spread;
  vy += (Math.random() - 0.5) * config.exhale.spread;

  const size = config.exhale.particleSizeMin + 
    Math.random() * (config.exhale.particleSizeMax - config.exhale.particleSizeMin);

  return {
    x: emitterX + (Math.random() - 0.5) * 10,
    y: emitterY + (Math.random() - 0.5) * 5,
    vx,
    vy,
    size,
    opacity: 0.6 + Math.random() * 0.3,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: config.particle.rotationSpeedMin + 
      Math.random() * (config.particle.rotationSpeedMax - config.particle.rotationSpeedMin),
    life: config.particle.minLife + Math.random() * (config.particle.maxLife - config.particle.minLife),
    maxLife: config.particle.maxLife,
    turbulence: config.particle.turbulenceMin + 
      Math.random() * (config.particle.turbulenceMax - config.particle.turbulenceMin),
    noiseOffset: Math.random() * 1000,
    colorIndex: Math.floor(Math.random() * SMOKE_COLORS.length),
  };
};

// Verify smoke colors are grayscale
export const verifySmokeGrayscale = (): boolean => {
  return SMOKE_COLORS.every(color => {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return false;
    const [, r, g, b] = match.map(Number);
    return Math.abs(r - g) <= 10 && Math.abs(g - b) <= 10;
  });
};

const SmokeEffect: React.FC<SmokeEffectProps> = ({
  isActive,
  phase,
  emitterPosition = { x: 0.55, y: 0.45 },
  density = 1,
  spreadFactor: _spreadFactor = 1,
  focusLevel = 1,
  mousePosition = null,
  onDisperseComplete,
  width,
  height,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<SmokeParticle[]>([]);
  const noiseRef = useRef<SimplexNoise>(new SimplexNoise());
  const animationFrameRef = useRef<number>();
  const timeRef = useRef<number>(0);
  const disperseStartRef = useRef<number>(0);
  const disperseRadiusRef = useRef<number>(0);
  const [_canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // Get emitter position in pixels
  const getEmitterPixelPosition = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const dpr = window.devicePixelRatio || 1;
    return {
      x: emitterPosition.x * (canvas.width / dpr),
      y: emitterPosition.y * (canvas.height / dpr),
    };
  }, [emitterPosition]);

  // Emit new particles
  const emitParticles = useCallback(() => {
    if (phase !== 'exhale' && phase !== 'float' && phase !== 'zoom') return;
    if (particlesRef.current.length >= SMOKE_CONFIG.maxParticles) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const canvasWidth = canvas.width / dpr;
    const canvasHeight = canvas.height / dpr;
    const emitter = getEmitterPixelPosition();
    
    // Increase emission rate during zoom to fill screen
    const emissionMultiplier = phase === 'zoom' ? 2 : 1;
    const emissionCount = Math.floor(SMOKE_CONFIG.exhale.emissionRate * density * emissionMultiplier);

    for (let i = 0; i < emissionCount; i++) {
      if (particlesRef.current.length >= SMOKE_CONFIG.maxParticles) break;
      
      // During zoom, emit from multiple points to fill screen faster
      let emitX = emitter.x;
      let emitY = emitter.y;
      
      if (phase === 'zoom') {
        // Emit from random positions across the screen
        emitX = Math.random() * canvasWidth;
        emitY = Math.random() * canvasHeight;
      }
      
      particlesRef.current.push(
        createSmokeParticle(emitX, emitY, canvasWidth, canvasHeight, phase)
      );
    }
  }, [phase, density, getEmitterPixelPosition]);

  // Update particle physics
  const updateParticle = useCallback((
    particle: SmokeParticle,
    time: number,
    canvasWidth: number,
    canvasHeight: number,
    currentPhase: SmokePhase,
    mouse: { x: number; y: number } | null
  ): boolean => {
    const config = SMOKE_CONFIG;
    const noise = noiseRef.current;

    // Apply Perlin noise turbulence
    const noiseX = noise.noise2D(particle.x * 0.01 + particle.noiseOffset, time * 0.001) * particle.turbulence;
    const noiseY = noise.noise2D(particle.y * 0.01 + particle.noiseOffset + 100, time * 0.001) * particle.turbulence;

    // Base movement
    particle.vx += noiseX * config.float.turbulenceStrength;
    particle.vy += noiseY * config.float.turbulenceStrength - 0.05; // Slight upward drift

    // Apply velocity decay
    particle.vx *= config.float.velocityDecay;
    particle.vy *= config.float.velocityDecay;

    // Mouse interaction - push smoke particles away
    if (mouse && currentPhase !== 'disperse') {
      const dx = particle.x - mouse.x;
      const dy = particle.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < config.mouse.influenceRadius && dist > 0) {
        // Calculate push force based on distance (stronger when closer)
        const normalizedDist = dist / config.mouse.influenceRadius;
        const force = (1 - normalizedDist) * config.mouse.pushForce;
        
        // Push particles away from mouse
        particle.vx += (dx / dist) * force;
        particle.vy += (dy / dist) * force;
        
        // Add extra turbulence near mouse for swirling effect
        const turbulenceBoost = (1 - normalizedDist) * config.mouse.turbulenceBoost;
        particle.turbulence = Math.min(particle.turbulence + turbulenceBoost * 0.1, 2);
        
        // Add rotational turbulence (swirl effect)
        const perpX = -dy / dist;
        const perpY = dx / dist;
        const swirlForce = (1 - normalizedDist) * 0.5;
        particle.vx += perpX * swirlForce * (Math.random() - 0.5);
        particle.vy += perpY * swirlForce * (Math.random() - 0.5);
        
        // Increase rotation speed near mouse
        particle.rotationSpeed += (Math.random() - 0.5) * 0.01 * turbulenceBoost;
      }
    }

    // Phase-specific behavior
    if (currentPhase === 'zoom') {
      // Particles grow and spread during zoom to fill screen
      particle.size *= 1.015; // Faster growth during zoom
      
      // Push particles outward from center to fill screen
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      const dx = particle.x - centerX;
      const dy = particle.y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > 0) {
        // Gentle outward push to spread smoke across screen
        const spreadForce = config.zoom.velocityBoost * 0.05;
        particle.vx += (dx / dist) * spreadForce;
        particle.vy += (dy / dist) * spreadForce;
      }
      
      // Slow down decay to keep particles visible longer
      particle.opacity *= 0.998;
      particle.life = Math.max(particle.life, 50); // Keep particles alive longer
    } else if (currentPhase === 'disperse') {
      // Radial dispersion from center - particles pushed outward
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      const dx = particle.x - centerX;
      const dy = particle.y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Calculate clear zone radius
      const clearRadius = disperseRadiusRef.current * Math.max(canvasWidth, canvasHeight) * 0.5;

      if (dist > 0) {
        // Strong outward force that increases with disperse progress
        const disperseForce = config.disperse.disperseForce * (1 + disperseRadiusRef.current * 2);
        
        // Particles inside clear zone get pushed out faster
        const insideClearZone = dist < clearRadius;
        const forceMultiplier = insideClearZone ? 3 : 1;
        
        particle.vx += (dx / dist) * disperseForce * 0.15 * forceMultiplier;
        particle.vy += (dy / dist) * disperseForce * 0.15 * forceMultiplier;
      }

      // Faster fade during disperse, especially for particles inside clear zone
      const fadeMultiplier = dist < clearRadius ? 3 : 1;
      particle.opacity -= config.disperse.fadeSpeed * fadeMultiplier;
      
      // Particles inside clear zone should disappear quickly
      if (dist < clearRadius * 0.5) {
        particle.opacity -= 0.05;
      }
    }

    // Update position
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Update rotation
    particle.rotation += particle.rotationSpeed;

    // Update size (grow over time)
    particle.size *= config.float.sizeGrowth;

    // Update opacity
    particle.opacity *= config.float.opacityDecay;
    particle.life--;

    // Check if particle should be removed
    return particle.life > 0 && particle.opacity > 0.01;
  }, []);

  // Draw a single smoke particle
  const drawParticle = useCallback((
    ctx: CanvasRenderingContext2D,
    particle: SmokeParticle,
    currentPhase: SmokePhase
  ) => {
    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.rotation);

    // Apply blur during zoom phase
    if (currentPhase === 'zoom') {
      ctx.filter = `blur(${2 + particle.size * 0.1}px)`;
    }

    // Parse color and apply current opacity
    const baseColor = SMOKE_COLORS[particle.colorIndex];
    const match = baseColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      const [, r, g, b] = match;
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.opacity})`;
    } else {
      ctx.fillStyle = baseColor;
      ctx.globalAlpha = particle.opacity;
    }

    // Draw smoke puff (irregular circle)
    ctx.beginPath();
    const segments = 8;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const radiusVariation = 0.7 + Math.random() * 0.3;
      const r = particle.size * radiusVariation;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }, []);

  // Main animation loop
  const animate = useCallback((timestamp: number) => {
    if (!isActive && phase === 'idle') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const canvasWidth = canvas.width / dpr;
    const canvasHeight = canvas.height / dpr;

    timeRef.current = timestamp;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);

    // Emit new particles during exhale/float phases
    if (phase === 'exhale' || phase === 'float') {
      emitParticles();
    }

    // Update disperse radius
    if (phase === 'disperse') {
      if (disperseStartRef.current === 0) {
        disperseStartRef.current = timestamp;
      }
      const elapsed = timestamp - disperseStartRef.current;
      disperseRadiusRef.current = Math.min(
        elapsed / SMOKE_CONFIG.disperse.disperseDuration,
        SMOKE_CONFIG.disperse.maxDisperseRadius
      );

      // Check if disperse is complete
      if (elapsed > SMOKE_CONFIG.disperse.disperseDuration && particlesRef.current.length === 0) {
        onDisperseComplete?.();
      }
    } else {
      disperseStartRef.current = 0;
      disperseRadiusRef.current = 0;
    }

    // Convert mouse position to canvas coordinates
    let mouseCanvasPos: { x: number; y: number } | null = null;
    if (mousePosition) {
      mouseCanvasPos = {
        x: mousePosition.x,
        y: mousePosition.y,
      };
    }

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter(particle => {
      const alive = updateParticle(
        particle,
        timestamp,
        canvasWidth,
        canvasHeight,
        phase,
        mouseCanvasPos
      );
      if (alive) {
        drawParticle(ctx, particle, phase);
      }
      return alive;
    });

    // Draw disperse clear zone (circular mask from center)
    if (phase === 'disperse' && disperseRadiusRef.current > 0) {
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      const clearRadius = disperseRadiusRef.current * Math.max(canvasWidth, canvasHeight) * 0.5;

      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      
      // Create radial gradient for soft edge
      const gradient = ctx.createRadialGradient(
        centerX, centerY, clearRadius * 0.3,
        centerX, centerY, clearRadius
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, clearRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.restore();

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isActive, phase, emitParticles, updateParticle, drawParticle, mousePosition, onDisperseComplete]);

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const newWidth = width || rect.width;
      const newHeight = height || rect.height;
      
      canvas.width = newWidth * dpr;
      canvas.height = newHeight * dpr;
      
      setCanvasSize({ width: newWidth, height: newHeight });
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [width, height]);

  // Start/stop animation
  useEffect(() => {
    if (isActive || phase !== 'idle') {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, phase, animate]);

  // Clear particles when becoming inactive
  useEffect(() => {
    if (!isActive && phase === 'idle') {
      particlesRef.current = [];
    }
  }, [isActive, phase]);

  // Apply blur filter during zoom phase
  const canvasStyle: React.CSSProperties = {
    width: width || '100%',
    height: height || '100%',
    pointerEvents: 'none',
    filter: phase === 'zoom' ? `blur(${(1 - focusLevel) * 5}px)` : 'none',
    transition: 'filter 0.5s ease-out',
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={canvasStyle}
    />
  );
};

export default SmokeEffect;

// Export for testing
export { SimplexNoise };
