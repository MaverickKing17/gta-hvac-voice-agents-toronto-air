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
    let particles: { x: number; y: number; s: number; v: number; a: number }[] = [];
    let phase = 0;

    // Initialize particles for the "Neural Field"
    const initParticles = (w: number, h: number) => {
      particles = [];
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          s: Math.random() * 2 + 1,
          v: Math.random() * 0.5,
          a: Math.random() * Math.PI * 2
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
        const baseRadius = Math.min(w, h) * 0.25;
        const volScale = (volume / 255);
        
        ctx.clearRect(0, 0, w, h);
        
        // Background Glow
        const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseRadius * 2);
        grad.addColorStop(0, isSpeaking ? 'rgba(14, 165, 233, 0.15)' : 'rgba(30, 41, 59, 0.1)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        if (!isConnected) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
            ctx.setLineDash([10, 10]);
            ctx.stroke();
            return;
        }

        phase += isSpeaking ? 0.08 : 0.02;

        // Neural Particles
        particles.forEach(p => {
          p.x += Math.cos(p.a) * p.v;
          p.y += Math.sin(p.a) * p.v;
          if (p.x < 0 || p.x > w) p.a = Math.PI - p.a;
          if (p.y < 0 || p.y > h) p.a = -p.a;
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
          ctx.fillStyle = isSpeaking ? `rgba(14, 165, 233, ${0.2 + volScale})` : 'rgba(71, 85, 105, 0.2)';
          ctx.fill();
        });

        // 3D-Style Rotating Rings
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          const r = baseRadius + (i * 20) + (isSpeaking ? volScale * 40 : 0);
          const rotation = phase * (i + 1) * 0.2;
          
          for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
            const distortion = Math.sin(angle * 4 + phase) * (isSpeaking ? volScale * 25 : 5);
            const x = centerX + Math.cos(angle + rotation) * (r + distortion);
            const y = centerY + Math.sin(angle + rotation) * (r + distortion) * 0.6; // Elliptical 3D effect
            
            if (angle === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          
          ctx.closePath();
          ctx.strokeStyle = isSpeaking 
            ? `rgba(56, 189, 248, ${0.8 - (i * 0.2)})` 
            : `rgba(148, 163, 184, ${0.3 - (i * 0.1)})`;
          ctx.lineWidth = 2 - (i * 0.5);
          ctx.stroke();
        }

        // Central Core
        ctx.beginPath();
        const coreR = 15 + (isSpeaking ? volScale * 20 : 0);
        ctx.arc(centerX, centerY, coreR, 0, Math.PI * 2);
        const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreR);
        coreGrad.addColorStop(0, '#fff');
        coreGrad.addColorStop(0.5, '#0ea5e9');
        coreGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = coreGrad;
        ctx.fill();
        
        animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isConnected, isSpeaking, volume]);
  
  return <canvas ref={canvasRef} className="w-full h-full" />;
};