import React, { useEffect, useRef } from 'react';

interface WaveVisualizerProps {
  isConnected: boolean;
  isSpeaking: boolean;
  volume: number; // 0-255
}

export const WaveVisualizer: React.FC<WaveVisualizerProps> = ({ isConnected, isSpeaking, volume }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: { x: number; y: number; s: number; v: number; a: number, color: string }[] = [];
    let phase = 0;

    const initParticles = (w: number, h: number) => {
      particles = [];
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          s: Math.random() * 2 + 1,
          v: Math.random() * 0.4 + 0.1,
          a: Math.random() * Math.PI * 2,
          color: Math.random() > 0.5 ? '56, 189, 248' : '99, 102, 241' // Sky or Indigo
        });
      }
    };
    
    const render = () => {
        const w = canvas.parentElement?.clientWidth || 300;
        const h = canvas.parentElement?.clientHeight || 300;
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          initParticles(w, h);
        }
        
        const centerX = w / 2;
        const centerY = h / 2;
        const baseRadius = Math.min(w, h) * 0.3;
        const volScale = (volume / 255);
        
        ctx.clearRect(0, 0, w, h);
        
        // Dynamic Glow Backdrop
        if (isConnected) {
            const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseRadius * 1.5);
            grad.addColorStop(0, isSpeaking ? `rgba(14, 165, 233, ${0.1 + volScale * 0.2})` : 'rgba(30, 41, 59, 0.05)');
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);
        }

        if (!isConnected) {
            // Standby Orbit
            ctx.beginPath();
            ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.05)';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 15]);
            ctx.stroke();
            ctx.setLineDash([]);
            return;
        }

        phase += isSpeaking ? 0.05 + volScale * 0.1 : 0.02;

        // Interactive Neural Particles
        particles.forEach(p => {
          const moveSpeed = isSpeaking ? p.v * (1 + volScale * 5) : p.v;
          p.x += Math.cos(p.a) * moveSpeed;
          p.y += Math.sin(p.a) * moveSpeed;
          
          if (p.x < 0 || p.x > w) p.a = Math.PI - p.a;
          if (p.y < 0 || p.y > h) p.a = -p.a;
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
          ctx.fillStyle = isSpeaking ? `rgba(${p.color}, ${0.3 + volScale})` : 'rgba(71, 85, 105, 0.2)';
          ctx.fill();
        });

        // High-Fi 3D Elliptical Rings
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          const r = baseRadius + (i * 15) + (isSpeaking ? volScale * 60 : 0);
          const rotation = phase * (i + 1) * 0.1;
          
          for (let angle = 0; angle < Math.PI * 2; angle += 0.05) {
            const distortion = Math.sin(angle * 6 + phase) * (isSpeaking ? volScale * 40 : 4);
            const x = centerX + Math.cos(angle + rotation) * (r + distortion);
            const y = centerY + Math.sin(angle + rotation) * (r + distortion) * 0.5; // Elliptical 3D depth
            
            if (angle === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          
          ctx.closePath();
          ctx.strokeStyle = isSpeaking 
            ? `rgba(56, 189, 248, ${0.9 - (i * 0.2) + volScale})` 
            : `rgba(148, 163, 184, ${0.2 - (i * 0.05)})`;
          ctx.lineWidth = isSpeaking ? 2.5 - (i * 0.5) : 1;
          
          if (isSpeaking) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(56, 189, 248, 0.5)';
          }
          
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // Kinetic Plasma Core
        const coreR = 12 + (isSpeaking ? volScale * 35 : 0);
        const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreR);
        coreGrad.addColorStop(0, '#fff');
        coreGrad.addColorStop(0.3, '#0ea5e9');
        coreGrad.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, coreR, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();

        // Core Ring (Outer)
        ctx.beginPath();
        ctx.arc(centerX, centerY, coreR + 4, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isConnected, isSpeaking, volume]);
  
  return <canvas ref={canvasRef} className="w-full h-full" />;
};