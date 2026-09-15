"use client";

import React, { useEffect, useRef } from "react";

export default function BackgroundAmbience() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Particle definition
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      maxOpacity: number;
      pulseSpeed: number;
      hue: number;
    }

    const particleCount = window.innerWidth < 768 ? 20 : 35;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.6,
        speedY: -(Math.random() * 0.35 + 0.1),
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.3 + 0.1,
        maxOpacity: Math.random() * 0.4 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        hue: Math.random() > 0.6 ? 25 : 35,
      });
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.y += p.speedY;
          p.x += p.speedX;

          p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.003;
          if (p.opacity < 0.05) p.opacity = 0.05;
          if (p.opacity > p.maxOpacity) p.opacity = p.maxOpacity;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 60%, 65%, ${p.opacity})`;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none gpu-accelerated">
      {/* Faint notebook lines */}
      <div className="absolute inset-0 notebook-lines opacity-60" />

      {/* Subtle paper grain texture */}
      <div className="absolute inset-0 paper-grain" />

      {/* Soft warm light leaks at corners */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#F3A79A]/15 blur-3xl transform-gpu" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#D9B6A9]/20 blur-3xl transform-gpu" />

      {/* 60FPS Ambient particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full transform-gpu"
        style={{ pointerEvents: "none" }}
      />

      {/* Soft editorial vignette */}
      <div className="absolute inset-0 vignette" />
    </div>
  );
}
