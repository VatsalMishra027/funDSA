import React, { useEffect, useRef, useState } from 'react';

interface NetworkNode {
  id: number;
  label: string;
  subLabel?: string;
  hubId?: number; // Connects to Primary Hub 1 or 2
  isPrimaryHub?: boolean;
  relX: number; // Relative position ratio (-1 to 1) within content span
  relY: number; // Relative position ratio (-1 to 1) within content height
  x: number;
  y: number;
  vx: number;
  vy: number;
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
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic Content Span Boundary (Aligned with site max-w-5xl container: max 1024px)
    let maxContentWidth = Math.min(width * 0.90, 1024);
    let halfContentWidth = maxContentWidth / 2;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      maxContentWidth = Math.min(width * 0.90, 1024);
      halfContentWidth = maxContentWidth / 2;
    };
    window.addEventListener('resize', handleResize);

    // Mouse Tracking
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 2 Main Hub Nodes + Multiple Satellite Nodes (Constrained within Content Span!)
    const nodes: NetworkNode[] = [
      // === 2 PRIMARY MAIN HUB NODES (Aligned inside content bounds) ===
      {
        id: 1,
        isPrimaryHub: true,
        label: 'HUB 01: DATA STRUCTURES',
        subLabel: 'Memory & Collections',
        relX: -0.55,
        relY: -0.12,
        x: -halfContentWidth * 0.55,
        y: -height * 0.12,
        vx: 0.08,
        vy: 0.06,
        size: 68,
        color: '#FF5E36',
        glowColor: '#FF7A57',
        type: 'hub',
      },
      {
        id: 2,
        isPrimaryHub: true,
        label: 'HUB 02: BUBBLE SORT ENGINE',
        subLabel: 'Algorithmic Execution',
        relX: 0.55,
        relY: -0.12,
        x: halfContentWidth * 0.55,
        y: -height * 0.12,
        vx: -0.06,
        vy: -0.08,
        size: 68,
        color: '#F59E0B',
        glowColor: '#FBBF24',
        type: 'hub',
      },

      // === SATELLITE NODES CONNECTED TO HUB 1 (Content Span Aligned) ===
      {
        id: 3,
        hubId: 1,
        label: 'Linked List',
        subLabel: '[12] ➔ [45] ➔ [89]',
        relX: -0.85,
        relY: -0.28,
        x: -halfContentWidth * 0.85,
        y: -height * 0.28,
        vx: 0.1,
        vy: -0.08,
        size: 44,
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
        x: -halfContentWidth * 0.78,
        y: height * 0.22,
        vx: -0.09,
        vy: 0.07,
        size: 44,
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
        x: -halfContentWidth * 0.25,
        y: -height * 0.32,
        vx: -0.08,
        vy: 0.1,
        size: 44,
        color: '#8B5CF6',
        glowColor: '#A78BFA',
        type: 'tree',
      },

      // === SATELLITE NODES CONNECTED TO HUB 2 (Content Span Aligned) ===
      {
        id: 6,
        hubId: 2,
        label: 'Time Complexity',
        subLabel: 'O(N²) Quadratic Worst-Case',
        relX: 0.85,
        relY: -0.28,
        x: halfContentWidth * 0.85,
        y: -height * 0.28,
        vx: -0.1,
        vy: -0.06,
        size: 44,
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
        x: halfContentWidth * 0.78,
        y: height * 0.22,
        vx: 0.08,
        vy: 0.09,
        size: 44,
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
        x: halfContentWidth * 0.25,
        y: -height * 0.32,
        vx: 0.09,
        vy: -0.07,
        size: 44,
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
        x: halfContentWidth * 0.45,
        y: height * 0.28,
        vx: -0.07,
        vy: -0.09,
        size: 44,
        color: '#10B981',
        glowColor: '#34D399',
        type: 'logic',
      },
    ];

    let pulseTime = 0;

    // Render Loop
    const render = () => {
      pulseTime += 0.012;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const normMouseX = (mouseX - width / 2) / (width / 2);
      const normMouseY = (mouseY - height / 2) / (height / 2);

      ctx.clearRect(0, 0, width, height);

      // Detect dark theme from document root
      const isDarkMode = document.documentElement.classList.contains('dark');

      // Update Node Positions (Constrained STRICTLY within Content Span Limits!)
      nodes.forEach((node) => {
        node.x += node.vx + normMouseX * 0.10;
        node.y += node.vy + normMouseY * 0.10;

        // Content Span Boundary Bounce (Stays strictly inside halfContentWidth)
        const boundX = halfContentWidth * 0.92;
        const boundY = height * 0.36;

        if (Math.abs(node.x) > boundX) node.vx *= -1;
        if (Math.abs(node.y) > boundY) node.vy *= -1;
      });

      const projectedNodes = nodes.map((node) => {
        const screenX = width / 2 + node.x;
        const screenY = height / 2 + node.y;
        return { ...node, screenX, screenY };
      });

      const hub1 = projectedNodes.find((n) => n.id === 1)!;
      const hub2 = projectedNodes.find((n) => n.id === 2)!;

      // 1. Draw Soft Cross-Hub Laser Bridge (Between Hub 1 & Hub 2)
      ctx.save();
      ctx.strokeStyle = isDarkMode ? 'rgba(255, 94, 54, 0.25)' : 'rgba(255, 94, 54, 0.30)';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 6]);
      ctx.shadowColor = '#FF5E36';
      ctx.shadowBlur = 6;

      ctx.beginPath();
      ctx.moveTo(hub1.screenX, hub1.screenY);
      ctx.lineTo(hub2.screenX, hub2.screenY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Data Pulse travelling between Hub 1 and Hub 2
      const hubPulseProgress = (pulseTime * 0.5) % 1;
      const hubPulseX = hub1.screenX + (hub2.screenX - hub1.screenX) * hubPulseProgress;
      const hubPulseY = hub1.screenY + (hub2.screenY - hub1.screenY) * hubPulseProgress;

      ctx.fillStyle = '#FF7A57';
      ctx.shadowBlur = 8;
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
            ctx.strokeStyle = isDarkMode ? `${node.color}30` : `${node.color}35`;
            ctx.lineWidth = 1.5;
            ctx.shadowColor = node.glowColor;
            ctx.shadowBlur = 6;

            ctx.beginPath();
            ctx.moveTo(parentHub.screenX, parentHub.screenY);
            ctx.lineTo(node.screenX, node.screenY);
            ctx.stroke();

            // Animated Data Flow Pulse from Hub ➔ Satellite Node
            const pulseProgress = (pulseTime * 0.6 + node.id * 0.2) % 1;
            const pulseX = parentHub.screenX + (node.screenX - parentHub.screenX) * pulseProgress;
            const pulseY = parentHub.screenY + (node.screenY - parentHub.screenY) * pulseProgress;

            ctx.fillStyle = node.glowColor;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 3.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
          }
        }
      });

      // 3. Render 2 Primary Main Hubs & Satellite Concept Nodes with Light, Soft Fills
      projectedNodes.forEach((node) => {
        ctx.save();
        ctx.translate(node.screenX, node.screenY);

        // Soft Translucent Card Fill (Light Mode vs Dark Mode)
        const cardFill = isDarkMode ? 'rgba(28, 25, 23, 0.45)' : 'rgba(253, 251, 247, 0.70)';
        const subTextColor = isDarkMode ? 'rgba(255, 255, 255, 0.75)' : 'rgba(68, 64, 60, 0.85)';

        if (node.isPrimaryHub) {
          // === PRIMARY MAIN HUB RENDERING ===
          const rad = node.size;

          // Soft Outer Pulsing Glow Ring
          const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, rad * 1.6);
          grad.addColorStop(0, `${node.glowColor}30`);
          grad.addColorStop(0.7, `${node.glowColor}08`);
          grad.addColorStop(1, 'transparent');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, rad * 1.6, 0, Math.PI * 2);
          ctx.fill();

          // Main Hub Dual Ring
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 2.5;
          ctx.shadowColor = node.glowColor;
          ctx.shadowBlur = 10;

          ctx.fillStyle = cardFill;
          ctx.beginPath();
          ctx.arc(0, 0, rad, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Inner Accent Ring
          ctx.strokeStyle = `${node.glowColor}60`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(0, 0, rad - 8, 0, Math.PI * 2);
          ctx.stroke();

          // Main Hub Text
          ctx.shadowBlur = 0;
          ctx.fillStyle = node.color;
          ctx.font = 'black 11px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.label, 0, -7);

          if (node.subLabel) {
            ctx.fillStyle = subTextColor;
            ctx.font = 'bold 9.5px monospace';
            ctx.fillText(node.subLabel, 0, 9);
          }
        } else {
          // === SATELLITE CONCEPT NODE RENDERING ===
          const pillWidth = 140;
          const pillHeight = 42;

          // Soft Glow Aura
          const grad = ctx.createRadialGradient(0, 0, 5, 0, 0, 46);
          grad.addColorStop(0, `${node.glowColor}25`);
          grad.addColorStop(1, 'transparent');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, 46, 0, Math.PI * 2);
          ctx.fill();

          // Node Capsule Body
          ctx.fillStyle = cardFill;
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 1.8;
          ctx.shadowColor = node.glowColor;
          ctx.shadowBlur = 8;

          ctx.beginPath();
          ctx.roundRect(-pillWidth / 2, -pillHeight / 2, pillWidth, pillHeight, 14);
          ctx.fill();
          ctx.stroke();

          // Node Label
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

    render();

    // Click Impulse (Accelerates Node Velocities Freely)
    const handleClick = () => {
      nodes.forEach((node) => {
        node.vx += (Math.random() - 0.5) * 0.35;
        node.vy += (Math.random() - 0.5) * 0.35;
      });
      setActiveInfo('⚡ Content-Aligned Network Impulse Active!');
      setTimeout(() => setActiveInfo('⚡ Dual-Hub DSA Concept Network'), 2000);
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full pointer-events-auto cursor-crosshair opacity-45 dark:opacity-35" />

      {/* Interactive DSA Network Badge */}
      <div className="absolute bottom-6 right-6 z-20 bg-card/90 backdrop-blur-md border border-textSecondary/20 px-4 py-2 rounded-2xl text-xs font-mono font-extrabold text-main shadow-lg flex items-center gap-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping"></span>
        <span>{activeInfo}</span>
      </div>
    </div>
  );
};

export default Interactive3DFigures;
