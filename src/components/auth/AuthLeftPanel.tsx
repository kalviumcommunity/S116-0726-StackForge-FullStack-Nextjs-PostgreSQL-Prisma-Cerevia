'use client';

import { useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/layout/Logo';
import { usePathname } from 'next/navigation';

export function AuthLeftPanel() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const [mouse, setMouse] = useState({ x: 0, y: 0, isHovering: false });

  // Get dynamic titles and subtitles based on route
  const getPanelText = () => {
    switch (pathname) {
      case '/register':
        return {
          title: 'Create your Account',
          subtitle: 'Track your learning streaks and rank up in our gamified platform!',
        };
      case '/forgot-password':
        return {
          title: 'Password Recovery',
          subtitle: 'Retrieve your account access and get back to your learning streak.',
        };
      case '/reset-password':
        return {
          title: 'Secure Account',
          subtitle: 'Create a new secure password to safeguard your achievements.',
        };
      case '/login':
      default:
        return {
          title: 'Welcome Back',
          subtitle: 'Keep your learning streak alive and climb the global leaderboard!',
        };
    }
  };

  const { title, subtitle } = getPanelText();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    // Particle flow-field setup
    const particleCount = 180;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      speed: number;
      alpha: number;
      size: number;
      color: string;
      angleOffset: number;
    }> = [];

    const colors = [
      'rgba(6, 182, 212, 0.45)',  // Vibrant Cyan
      'rgba(59, 130, 246, 0.4)',   // Deep Blue
      'rgba(99, 102, 241, 0.35)',  // Indigo
      'rgba(168, 85, 247, 0.3)',   // Purple
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        speed: 0.5 + Math.random() * 1.5,
        alpha: 0.1 + Math.random() * 0.6,
        size: 1 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        angleOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.4;
      
      // Semitransparent fill to create a smooth trailing motion blur
      ctx.fillStyle = 'rgba(3, 7, 18, 0.12)';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle swirling abstract grids/vortexes in background
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 60) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.bezierCurveTo(
          i + Math.sin(time * 0.01) * 30,
          height / 2,
          i - Math.cos(time * 0.01) * 30,
          height / 2,
          i,
          height
        );
        ctx.stroke();
      }

      // Update and draw particles
      particles.forEach((p) => {
        // Compute fluid field angle based on sin/cos noise fields and mouse interaction
        let angle =
          Math.sin(p.x * 0.005 + time * 0.002) * Math.cos(p.y * 0.005 - time * 0.002) * Math.PI * 2 +
          p.angleOffset;

        // If mouse is hovering, influence particles to swirl around it
        if (mouse.isHovering) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            // Swirl direction vector perpendicular to mouse pointer
            const swirlAngle = Math.atan2(dy, dx) + Math.PI / 2;
            angle = angle * (1 - force) + swirlAngle * force;
            p.speed = (0.5 + Math.random() * 1.5) * (1 + force * 1.5);
          } else {
            p.speed = 0.5 + Math.random() * 1.5;
          }
        }

        p.vx = Math.cos(angle) * p.speed;
        p.vy = Math.sin(angle) * p.speed;

        // Draw trail connector line
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        p.x += p.vx;
        p.y += p.vy;
        ctx.lineTo(p.x, p.y);

        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.size;
        ctx.stroke();

        // Wrap around borders
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouse]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovering: true,
    });
  };

  const handleMouseLeave = () => {
    setMouse((prev) => ({ ...prev, isHovering: false }));
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative hidden md:flex md:w-1/2 bg-gray-950 overflow-hidden flex-col justify-between p-12 text-white select-none group"
    >
      {/* Background canvas fluid animation */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full pointer-events-none" />

      {/* Glossy mesh lighting layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.15),transparent_50%)] pointer-events-none" />

      {/* Top logo branding */}
      <div className="relative z-10 flex flex-col gap-1.5 animate-fade-in">
        <Logo showText={true} />
        <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest font-mono">
          Gamification Platform
        </span>
      </div>

      {/* Middle/Bottom typography message */}
      <div className="relative z-10 max-w-sm mt-auto animate-fade-in-up">
        <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight font-sans drop-shadow-sm">
          {title}
        </h2>
        <p className="mt-3 text-sm text-gray-300 font-medium leading-relaxed drop-shadow-sm">
          {subtitle}
        </p>
      </div>

      {/* Fine-grained border highlights for glassmorphic edge */}
      <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent" />
    </div>
  );
}
