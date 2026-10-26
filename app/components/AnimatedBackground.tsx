'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = ['rgba(255, 107, 53', 'rgba(157, 78, 221', 'rgba(0, 212, 255'];

    // Create particles
    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    // Initialize particles
    for (let i = 0; i < 30; i++) {
      particles.push(createParticle());
    }

    let animationFrameId: number;

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(15, 15, 35, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.opacity -= 0.003;

        // Wrap around edges or remove
        if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height || particle.opacity <= 0) {
          particles[index] = createParticle();
          particle = particles[index];
        }

        // Draw particle with glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color + ', 0.5)';
        ctx.fillStyle = particle.color + ', ' + particle.opacity + ')';
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
      });

      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-30 z-0"
    />
  );
}
