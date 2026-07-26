import React, { useEffect, useRef, useState } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Shape3D {
  id: number;
  type: 'cube' | 'pyramid' | 'octahedron';
  center: Point3D;
  size: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  color: string;
  glowColor: string;
  isHovered?: boolean;
}

export const Interactive3DFigures: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeShapeInfo, setActiveShapeInfo] = useState<string>('Hover & click 3D figures to interact!');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse Interaction Coordinates
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 3D Shapes Collection
    const shapes: Shape3D[] = [
      {
        id: 1,
        type: 'cube',
        center: { x: -width * 0.35, y: -height * 0.2, z: 400 },
        size: 55,
        rotX: 0.4,
        rotY: 0.6,
        rotZ: 0,
        rotSpeedX: 0.008,
        rotSpeedY: 0.012,
        color: '#D14E33',
        glowColor: '#F07A5C',
      },
      {
        id: 2,
        type: 'octahedron',
        center: { x: width * 0.38, y: -height * 0.15, z: 350 },
        size: 65,
        rotX: 0.2,
        rotY: 0.8,
        rotZ: 0.3,
        rotSpeedX: -0.01,
        rotSpeedY: 0.015,
        color: '#E3B34F',
        glowColor: '#F0C868',
      },
      {
        id: 3,
        type: 'pyramid',
        center: { x: -width * 0.38, y: height * 0.25, z: 380 },
        size: 60,
        rotX: 0.5,
        rotY: 0.3,
        rotZ: 0,
        rotSpeedX: 0.014,
        rotSpeedY: -0.009,
        color: '#10B981',
        glowColor: '#34D399',
      },
      {
        id: 4,
        type: 'cube',
        center: { x: width * 0.35, y: height * 0.28, z: 420 },
        size: 50,
        rotX: 0.1,
        rotY: 0.5,
        rotZ: 0.2,
        rotSpeedX: -0.012,
        rotSpeedY: -0.01,
        color: '#8B5CF6',
        glowColor: '#A78BFA',
      },
    ];

    // Vertices for 3D Geometries
    const cubeVertices: Point3D[] = [
      { x: -1, y: -1, z: -1 },
      { x: 1, y: -1, z: -1 },
      { x: 1, y: 1, z: -1 },
      { x: -1, y: 1, z: -1 },
      { x: -1, y: -1, z: 1 },
      { x: 1, y: -1, z: 1 },
      { x: 1, y: 1, z: 1 },
      { x: -1, y: 1, z: 1 },
    ];

    const cubeEdges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
    ];

    const octaVertices: Point3D[] = [
      { x: 0, y: -1.4, z: 0 },
      { x: 1.4, y: 0, z: 0 },
      { x: 0, y: 0, z: 1.4 },
      { x: -1.4, y: 0, z: 0 },
      { x: 0, y: 0, z: -1.4 },
      { x: 0, y: 1.4, z: 0 },
    ];

    const octaEdges = [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [5, 1], [5, 2], [5, 3], [5, 4],
      [1, 2], [2, 3], [3, 4], [4, 1],
    ];

    // 3D Projection Helpers
    const project = (p: Point3D, center: Point3D, rx: number, ry: number, s: number) => {
      // Rotate Around Y
      let x1 = p.x * Math.cos(ry) + p.z * Math.sin(ry);
      let y1 = p.y;
      let z1 = -p.x * Math.sin(ry) + p.z * Math.cos(ry);

      // Rotate Around X
      let x2 = x1;
      let y2 = y1 * Math.cos(rx) - z1 * Math.sin(rx);
      let z2 = y1 * Math.sin(rx) + z1 * Math.cos(rx);

      // Scale & Translate
      const fov = 600;
      const scale = fov / (fov + center.z + z2 * s);
      const projX = width / 2 + (center.x + x2 * s) * scale;
      const projY = height / 2 + (center.y + y2 * s) * scale;

      return { x: projX, y: projY, scale };
    };

    // Render Loop
    const render = () => {
      // Smooth Mouse Tracking
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const normMouseX = (mouseX - width / 2) / (width / 2);
      const normMouseY = (mouseY - height / 2) / (height / 2);

      ctx.clearRect(0, 0, width, height);

      shapes.forEach((shape) => {
        shape.rotX += shape.rotSpeedX + normMouseY * 0.01;
        shape.rotY += shape.rotSpeedY + normMouseX * 0.01;

        const vertices = shape.type === 'cube' ? cubeVertices : octaVertices;
        const edges = shape.type === 'cube' ? cubeEdges : octaEdges;

        const projected = vertices.map((v) =>
          project(v, shape.center, shape.rotX, shape.rotY, shape.size)
        );

        // Draw Ambient Glow Ring
        const centerProj = project({ x: 0, y: 0, z: 0 }, shape.center, shape.rotX, shape.rotY, shape.size);
        const grad = ctx.createRadialGradient(
          centerProj.x,
          centerProj.y,
          5,
          centerProj.x,
          centerProj.y,
          shape.size * 1.8
        );
        grad.addColorStop(0, `${shape.glowColor}40`);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(centerProj.x, centerProj.y, shape.size * 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Draw 3D Edges
        ctx.strokeStyle = shape.color;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = shape.glowColor;
        ctx.shadowBlur = 12;

        edges.forEach(([i1, i2]) => {
          const p1 = projected[i1];
          const p2 = projected[i2];
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });

        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Click Repulsion Physics Trigger
    const handleClick = (e: MouseEvent) => {
      shapes.forEach((shape) => {
        shape.rotSpeedX += (Math.random() - 0.5) * 0.08;
        shape.rotSpeedY += (Math.random() - 0.5) * 0.08;
      });
      setActiveShapeInfo('💥 3D Physics Impulse Triggered!');
      setTimeout(() => setActiveShapeInfo('Hover & click 3D figures to interact!'), 2000);
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
      <canvas ref={canvasRef} className="w-full h-full pointer-events-auto cursor-crosshair opacity-80 dark:opacity-60" />
      
      {/* 3D Interaction Hint Badge */}
      <div className="absolute bottom-6 right-6 z-20 bg-card/85 backdrop-blur-md border border-textSecondary/20 px-3.5 py-1.5 rounded-xl text-[11px] font-mono font-extrabold text-textSecondary shadow-md flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
        <span>{activeShapeInfo}</span>
      </div>
    </div>
  );
};

export default Interactive3DFigures;
