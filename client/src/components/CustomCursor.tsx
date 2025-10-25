import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A'
      );

      setTrail(prev => [
        ...prev.slice(-8),
        { x: e.clientX, y: e.clientY, id: trailId++ }
      ]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed w-2 h-2 rounded-full pointer-events-none z-50 mix-blend-screen"
          style={{
            left: point.x,
            top: point.y,
            transform: 'translate(-50%, -50%)',
            background: `hsl(var(--chart-2) / ${(index + 1) / 9})`,
            transition: 'opacity 0.3s ease-out',
            opacity: (index + 1) / 9,
          }}
        />
      ))}
      <div
        className={`fixed w-6 h-6 rounded-full border-2 pointer-events-none z-50 transition-all duration-200 mix-blend-difference ${
          isPointer ? 'scale-150 border-primary' : 'border-chart-2'
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}
