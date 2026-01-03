
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
    let offset = 0;

    const render = () => {
        const w = canvas.parentElement?.clientWidth || 300;
        const h = canvas.parentElement?.clientHeight || 300;
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
        
        ctx.clearRect(0, 0, w, h);
        
        if (!isConnected) {
            // Static Flatline
            ctx.beginPath();
            ctx.moveTo(0, h/2);
            ctx.lineTo(w, h/2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 1;
            ctx.stroke();
            return;
        }

        offset += 4;
        const midY = h / 2;
        const volScale = (volume / 255);

        // Draw multiple diagnostic waves
        const drawWave = (color: string, speed: number, amplitude: number, lineWidth: number, opacity: number) => {
          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.lineWidth = lineWidth;
          ctx.globalAlpha = opacity;
          
          for (let x = 0; x < w; x++) {
            const freq = 0.01 + (volScale * 0.02);
            const y = midY + Math.sin((x + offset * speed) * freq) * (amplitude + (volScale * 120));
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.globalAlpha = 1;
        };

        // Precision Layers
        drawWave('#0099cc', 1, 10, 2, 0.8);  // Main Signal
        drawWave('#ffffff', 1.5, 5, 1, 0.2); // Noise floor
        drawWave('#003366', 0.5, 15, 4, 0.3); // Deep Resonance

        // Core Pulse
        if (isSpeaking) {
          const coreGrad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, 100 + volScale * 200);
          coreGrad.addColorStop(0, 'rgba(0, 153, 204, 0.05)');
          coreGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = coreGrad;
          ctx.fillRect(0, 0, w, h);
        }

        animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isConnected, isSpeaking, volume]);
  
  return <canvas ref={canvasRef} className="w-full h-full cursor-default" />;
};
