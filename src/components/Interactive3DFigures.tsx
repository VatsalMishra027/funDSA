import React, { useEffect, useRef, useState } from 'react';

interface NetworkNode {
  id: number;
  label: string;
  title?: string;
  subLabel?: string;
  hubId?: number; // Connects to Primary Hub 1 or 2
  isPrimaryHub?: boolean;
  relX: number; // Ratio (-1 to 1) relative to halfContentWidth
  relY: number; // Ratio (-1 to 1) relative to halfContentHeight
  phase: number; // Initial phase angle for harmonic oscillation
  freqX: number; // Harmonic frequency X
  freqY: number; // Harmonic frequency Y
  ampX: number;  // Floating radius X (px)
  ampY: number;  // Floating radius Y (px)
  size: number;
  color: string;
  glowColor: string;
  type: 'hub' | 'linked_list' | 'array' | 'tree' | 'complexity' | 'logic';
}

export const Interactive3DFigures: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeInfo, setActiveInfo] = useState<string>('⚡ Dual-Hub DSA Concept Network');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Set High-DPI Resolution & Layout Dimensions
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const updateCanvasSize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    updateCanvasSize();

    window.addEventListener('resize', updateCanvasSize);

    // Smooth Mouse Parallax Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) / (width / 2);
      targetMouseY = (e.clientY - height / 2) / (height / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Dynamic Content Span Boundary (Aligned with max-w-5xl container: max 1024px)
    let maxContentWidth = Math.min(width * 0.90, 1024);
    let halfContentWidth = maxContentWidth / 2;

    // 2 Main Hub Nodes + Multiple Satellite Nodes (Text perfectly contained within 82px radius circles!)
    const nodes: NetworkNode[] = [
      // === 2 PRIMARY MAIN HUB NODES ===
      {
        id: 1,
        isPrimaryHub: true,
        label: 'HUB 01',
        title: 'DATA STRUCTURES',
        subLabel: 'Memory & Collections',
        relX: -0.55,
        relY: -0.10,
        phase: 0,
        freqX: 0.0008,
        freqY: 0.0006,
        ampX: 18,
        ampY: 14,
        size: 82,
        color: '#FF5E36',
        glowColor: '#FF7A57',
        type: 'hub',
      },
      {
        id: 2,
        isPrimaryHub: true,
        label: 'HUB 02',
        title: 'BUBBLE SORT ENGINE',
        subLabel: 'Algorithmic Execution',
        relX: 0.55,
        relY: -0.10,
        phase: Math.PI * 0.5,
        freqX: 0.0007,
        freqY: 0.0009,
        ampX: 16,
        ampY: 18,
        size: 82,
        color: '#F59E0B',
        glowColor: '#FBBF24',
        type: 'hub',
      },

      // === SATELLITE NODES CONNECTED TO HUB 1 ===
      {
        id: 3,
        hubId: 1,
        label: 'Linked List',
        subLabel: '[12] ➔ [45] ➔ [89]',
        relX: -0.85,
        relY: -0.28,
        phase: 1.2,
        freqX: 0.001,
        freqY: 0.0008,
        ampX: 22,
        ampY: 16,
        size: 46,
        color: '#FF5E36',
        glowColor: '#FF7A57',
        type: 'linked_list',
      },
      {
        id: 4,
        hubId: 1,
        label: 'Array Memory Block',
        subLabel: 'arr[0..3] contiguous',
        relX: -0.78,
        relY: 0.22,
        phase: 2.4,
        freqX: 0.0009,
        freqY: 0.0011,
        ampX: 20,
        ampY: 22,
        size: 46,
        color: '#10B981',
        glowColor: '#34D399',
        type: 'array',
      },
      {
        id: 5,
        hubId: 1,
        label: 'Binary Search Tree',
        subLabel: 'Root (50) ➔ L(25), R(75)',
        relX: -0.25,
        relY: -0.32,
        phase: 3.6,
        freqX: 0.0011,
        freqY: 0.0007,
        ampX: 16,
        ampY: 20,
        size: 46,
        color: '#8B5CF6',
        glowColor: '#A78BFA',
        type: 'tree',
      },

      // === SATELLITE NODES CONNECTED TO HUB 2 ===
      {
        id: 6,
        hubId: 2,
        label: 'Time Complexity',
        subLabel: 'O(N²) Quadratic Worst-Case',
        relX: 0.85,
        relY: -0.28,
        phase: 0.8,
        freqX: 0.0008,
        freqY: 0.001,
        ampX: 22,
        ampY: 18,
        size: 46,
        color: '#EC4899',
        glowColor: '#F472B6',
        type: 'complexity',
      },
      {
        id: 7,
        hubId: 2,
        label: 'Space Complexity',
        subLabel: 'O(1) Auxiliary Space',
        relX: 0.78,
        relY: 0.22,
        phase: 2.0,
        freqX: 0.001,
        freqY: 0.0009,
        ampX: 18,
        ampY: 22,
        size: 46,
        color: '#3B82F6',
        glowColor: '#60A5FA',
        type: 'complexity',
      },
      {
        id: 8,
        hubId: 2,
        label: 'Compare Step',
        subLabel: 'Left > Right ?',
        relX: 0.25,
        relY: -0.32,
        phase: 3.2,
        freqX: 0.0009,
        freqY: 0.0012,
        ampX: 20,
        ampY: 16,
        size: 46,
        color: '#F59E0B',
        glowColor: '#FBBF24',
        type: 'logic',
      },
      {
        id: 9,
        hubId: 2,
        label: 'In-Place Swap',
        subLabel: 'swap(arr[j], arr[j+1])',
        relX: 0.45,
        relY: 0.28,
        phase: 4.4,
        freqX: 0.0011,
        freqY: 0.0008,
        ampX: 16,
        ampY: 20,
        size: 46,
        color: '#10B981',
        glowColor: '#34D399',
        type: 'logic',
      },
    ];

    let startTime = performance.now();
    let impulseBoost = 0;

    // Render Loop
    const render = (now: number) => {
      const elapsed = now - startTime;

      // Smooth mouse lerp
      smoothMouseX += (targetMouseX - smoothMouseX) * 0.04;
      smoothMouseY += (targetMouseY - smoothMouseY) * 0.04;

      // Decay impulse boost
      impulseBoost *= 0.94;

      maxContentWidth = Math.min(width * 0.90, 1024);
      halfContentWidth = maxContentWidth / 2;

      ctx.clearRect(0, 0, width, height);

      // Detect dark theme
      const isDarkMode = document.documentElement.classList.contains('dark');

      // Calculate 100% Smooth Subpixel-Harmonic Positions
      const projectedNodes = nodes.map((node) => {
        const baseX = node.relX * halfContentWidth;
        const baseY = node.relY * height;

        const floatX = Math.sin(elapsed * node.freqX + node.phase) * (node.ampX + impulseBoost);
        const floatY = Math.cos(elapsed * node.freqY + node.phase) * (node.ampY + impulseBoost);

        const parallaxX = smoothMouseX * 22;
        const parallaxY = smoothMouseY * 18;

        const screenX = width / 2 + baseX + floatX + parallaxX;
        const screenY = height / 2 + baseY + floatY + parallaxY;

        return { ...node, screenX, screenY };
      });

      const hub1 = projectedNodes.find((n) => n.id === 1)!;
      const hub2 = projectedNodes.find((n) => n.id === 2)!;

      // 1. Draw Crisp Laser Bridge (Hub 1 ➔ Hub 2)
      ctx.save();
      ctx.strokeStyle = isDarkMode ? 'rgba(255, 94, 54, 0.35)' : 'rgba(255, 94, 54, 0.40)';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 6]);
      ctx.shadowColor = '#FF5E36';
      ctx.shadowBlur = 8;

      ctx.beginPath();
      ctx.moveTo(hub1.screenX, hub1.screenY);
      ctx.lineTo(hub2.screenX, hub2.screenY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Traveling Data Pulse
      const hubPulseProgress = (elapsed * 0.0003) % 1;
      const hubPulseX = hub1.screenX + (hub2.screenX - hub1.screenX) * hubPulseProgress;
      const hubPulseY = hub1.screenY + (hub2.screenY - hub1.screenY) * hubPulseProgress;

      ctx.fillStyle = '#FF7A57';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(hubPulseX, hubPulseY, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Draw Connection Laser Lines from Primary Hubs to Satellite Nodes
      projectedNodes.forEach((node) => {
        if (!node.isPrimaryHub && node.hubId) {
          const parentHub = projectedNodes.find((h) => h.id === node.hubId);
          if (parentHub) {
            ctx.save();
            ctx.strokeStyle = isDarkMode ? `${node.color}40` : `${node.color}45`;
            ctx.lineWidth = 1.6;
            ctx.shadowColor = node.glowColor;
            ctx.shadowBlur = 8;

            ctx.beginPath();
            ctx.moveTo(parentHub.screenX, parentHub.screenY);
            ctx.lineTo(node.screenX, node.screenY);
            ctx.stroke();

            // Traveling Data Flow Pulse
            const pulseProgress = (elapsed * 0.0004 + node.id * 0.18) % 1;
            const pulseX = parentHub.screenX + (node.screenX - parentHub.screenX) * pulseProgress;
            const pulseY = parentHub.screenY + (node.screenY - parentHub.screenY) * pulseProgress;

            ctx.fillStyle = node.glowColor;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 3.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
          }
        }
      });

      // 3. Render 2 Primary Main Hubs & Satellite Concept Nodes
      projectedNodes.forEach((node) => {
        ctx.save();
        ctx.translate(node.screenX, node.screenY);

        const cardFill = isDarkMode ? 'rgba(28, 25, 23, 0.75)' : 'rgba(253, 251, 247, 0.90)';
        const subTextColor = isDarkMode ? 'rgba(255, 255, 255, 0.82)' : 'rgba(68, 64, 60, 0.88)';
        const titleTextColor = isDarkMode ? '#FFFFFF' : '#1C1917';

        if (node.isPrimaryHub) {
          // === PRIMARY MAIN HUB (Radius = 82px) ===
          const rad = node.size;

          const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, rad * 1.5);
          grad.addColorStop(0, `${node.glowColor}35`);
          grad.addColorStop(0.7, `${node.glowColor}10`);
          grad.addColorStop(1, 'transparent');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, rad * 1.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = node.color;
          ctx.lineWidth = 2.8;
          ctx.shadowColor = node.glowColor;
          ctx.shadowBlur = 14;

          ctx.fillStyle = cardFill;
          ctx.beginPath();
          ctx.arc(0, 0, rad, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.strokeStyle = `${node.glowColor}80`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(0, 0, rad - 8, 0, Math.PI * 2);
          ctx.stroke();

          // Hub Content Text (3 Clean Lines Perfectly Fit Inside Circle!)
          ctx.shadowBlur = 0;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // Line 1: HUB Header Tag
          ctx.fillStyle = node.color;
          ctx.font = 'black 11px sans-serif';
          ctx.fillText(node.label, 0, -18);

          // Line 2: Main Concept Title
          if (node.title) {
            ctx.fillStyle = titleTextColor;
            ctx.font = 'black 11.5px sans-serif';
            ctx.fillText(node.title, 0, 0);
          }

          // Line 3: Subtitle Description
          if (node.subLabel) {
            ctx.fillStyle = subTextColor;
            ctx.font = 'bold 9.5px monospace';
            ctx.fillText(node.subLabel, 0, 17);
          }
        } else {
          // === SATELLITE CONCEPT NODE ===
          const pillWidth = 142;
          const pillHeight = 42;

          const grad = ctx.createRadialGradient(0, 0, 5, 0, 0, 48);
          grad.addColorStop(0, `${node.glowColor}30`);
          grad.addColorStop(1, 'transparent');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, 48, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = cardFill;
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 2;
          ctx.shadowColor = node.glowColor;
          ctx.shadowBlur = 10;

          ctx.beginPath();
          ctx.roundRect(-pillWidth / 2, -pillHeight / 2, pillWidth, pillHeight, 14);
          ctx.fill();
          ctx.stroke();

          ctx.shadowBlur = 0;
          ctx.fillStyle = node.color;
          ctx.font = 'bold 11px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.label, 0, -6);

          if (node.subLabel) {
            ctx.fillStyle = subTextColor;
            ctx.font = 'bold 9.5px monospace';
            ctx.fillText(node.subLabel, 0, 9);
          }
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Click Impulse (Smooth Harmonic Boost)
    const handleClick = () => {
      impulseBoost = 25;
      setActiveInfo('⚡ Smooth Harmonic Kinetic Impulse Active!');
      setTimeout(() => setActiveInfo('⚡ Dual-Hub DSA Concept Network'), 2000);
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full pointer-events-auto cursor-crosshair opacity-65 dark:opacity-55" />

      {/* Interactive DSA Network Badge */}
      <div className="absolute bottom-6 right-6 z-20 bg-card/90 backdrop-blur-md border border-textSecondary/20 px-4 py-2 rounded-2xl text-xs font-mono font-extrabold text-main shadow-lg flex items-center gap-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping"></span>
        <span>{activeInfo}</span>
      </div>
    </div>
  );
};

export default Interactive3DFigures;
