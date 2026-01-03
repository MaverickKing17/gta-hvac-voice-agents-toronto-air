
import React, { useEffect, useRef } from 'react';

interface WaveVisualizerProps {
  isConnected: boolean;
  isSpeaking: boolean;
  volume: number; 
}

export const WaveVisualizer: React.FC<WaveVisualizerProps> = ({ isConnected, isSpeaking, volume }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let phase = 0;

    const render = () => {
        const w = canvas.parentElement?.clientWidth || 300;
        const h = canvas.parentElement?.clientHeight || 300;
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
        
        const centerX = w / 2;
        const centerY = h / 2;
        const baseRadius = Math.min(w, h) * 0.25;
        const volScale = (volume / 255);
        
        ctx.clearRect(0, 0, w, h);
        
        if (!isConnected) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(15, 23, 42, 0.05)';
            ctx.setLineDash([4, 12]);
            ctx.lineWidth = 1;
            ctx.stroke();
            return;
        }

        phase += isSpeaking ? 0.045 : 0.008;

        // Render layered organic waves in Prismatic Gradients
        const layers = 5;
        for (let i = 0; i < layers; i++) {
          ctx.beginPath();
          ctx.setLineDash([]);
          const r = baseRadius + (i * 18) + (isSpeaking ? volScale * 75 : 0);
          
          for (let angle = 0; angle < Math.PI * 2; angle += 0.015) {
            const freq = (i + 1) * 1.5;
            const distortion = Math.sin(angle * freq + phase * (1 + i * 0.15)) * (isSpeaking ? volScale * 55 : 3);
            const x = centerX + Math.cos(angle) * (r + distortion);
            const y = centerY + Math.sin(angle) * (r + distortion) * 0.82; 
            
            if (angle === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          
          ctx.closePath();
          
          // Dynamic Gradient per layer
          const grad = ctx.createLinearGradient(centerX - r, centerY, centerX + r, centerY);
          grad.addColorStop(0, `rgba(37, 99, 235, ${isSpeaking ? 0.8 : 0.15})`); // Blue
          grad.addColorStop(0.5, `rgba(139, 92, 246, ${isSpeaking ? 0.6 : 0.1})`); // Purple
          grad.addColorStop(1, `rgba(6, 182, 212, ${isSpeaking ? 0.8 : 0.15})`); // Cyan
            
          ctx.strokeStyle = grad;
          ctx.lineWidth = isSpeaking ? 2.5 - (i * 0.3) : 1;
          ctx.stroke();
        }

        // The Intelligence Core
        const coreR = 12 + (isSpeaking ? volScale * 40 : 2);
        
        // Outer Core Glow
        const outerGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreR * 5);
        outerGrad.addColorStop(0, isSpeaking ? 'rgba(37, 99, 235, 0.4)' : 'rgba(37, 99, 235, 0.05)');
        outerGrad.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, coreR * 5, 0, Math.PI * 2);
        ctx.fillStyle = outerGrad;
        ctx.fill();

        // Inner Core Glow
        const innerGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreR * 1.5);
        innerGrad.addColorStop(0, isSpeaking ? '#fff' : 'rgba(37, 99, 235, 0.2)');
        innerGrad.addColorStop(1, 'rgba(37, 99, 235, 0.8)');
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, coreR, 0, Math.PI * 2);
        ctx.fillStyle = innerGrad;
        ctx.shadowBlur = isSpeaking ? 20 : 0;
        ctx.shadowColor = 'rgba(37, 99, 235, 0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;
        
        animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isConnected, isSpeaking, volume]);
  
  return <canvas ref={canvasRef} className="w-full h-full cursor-default" />;
};
