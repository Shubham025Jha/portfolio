'use client';

import { useEffect, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  alpha: number;
  scale: number;
  dx: number;
  dy: number;
  id: string;
  distanceTraveled: number;
  startX: number;
  startY: number;
  initialScale: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const MAX_DISTANCE = 20; // Longer trail of 20 pixels

  const createParticle = useCallback((x: number, y: number, dx: number, dy: number) => {
    const speed = 0.5;
    const normalizedDx = dx === 0 ? 0 : dx / Math.sqrt(dx * dx + dy * dy);
    const normalizedDy = dy === 0 ? 0 : dy / Math.sqrt(dx * dx + dy * dy);
    const initialScale = 2; // Start with 2px width

    return {
      x,
      y,
      startX: x,
      startY: y,
      alpha: 0.6,
      scale: initialScale,
      initialScale,
      dx: -normalizedDx * speed,
      dy: -normalizedDy * speed,
      id: `${Date.now()}-${Math.random()}`,
      distanceTraveled: 0,
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    const particleLifetime = 300;

    const updateParticles = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      setParticles(prevParticles => {
        const updatedParticles = prevParticles
          .map(particle => {
            const dx = particle.dx * 2;
            const dy = particle.dy * 2;
            
            const distanceFromStart = Math.sqrt(
              Math.pow(particle.x + dx - particle.startX, 2) + 
              Math.pow(particle.y + dy - particle.startY, 2)
            );

            if (distanceFromStart >= MAX_DISTANCE) {
              return { ...particle, alpha: 0 };
            }

            // Calculate scale based on distance traveled (tapered effect)
            const scaleRatio = 1 - (distanceFromStart / MAX_DISTANCE);
            const newScale = particle.initialScale * scaleRatio;

            return {
              ...particle,
              x: particle.x + dx,
              y: particle.y + dy,
              alpha: Math.max(0, particle.alpha - (deltaTime / particleLifetime)),
              scale: newScale,
              distanceTraveled: distanceFromStart,
            };
          })
          .filter(particle => particle.alpha > 0);

        const dx = position.x - prevPosition.x;
        const dy = position.y - prevPosition.y;
        const movement = Math.sqrt(dx * dx + dy * dy);

        const newParticles: Particle[] = [];
        if (movement > 0.5) {
          for (let i = 0; i < 5; i++) {
            newParticles.push(createParticle(position.x, position.y, dx, dy));
          }
        }

        return [...updatedParticles, ...newParticles];
      });

      setPrevPosition({ x: position.x, y: position.y });
      animationFrameId = requestAnimationFrame(updateParticles);
    };

    if (isVisible) {
      animationFrameId = requestAnimationFrame(updateParticles);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [position, prevPosition, isVisible, createParticle]);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;
      
      // Calculate angle based on movement direction
      const dx = newX - position.x;
      const dy = newY - position.y;
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        // Add 90 degrees to align the rocket head with the movement direction
        const angle = (Math.atan2(dy, dx) * (180 / Math.PI)) + 90;
        setRotation(angle);
      }
      
      setPosition({ x: newX, y: newY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [position]);

  return (
    <>
      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-b from-blue-400/30 to-purple-500/30 dark:from-blue-300/30 dark:to-purple-400/30 blur-[1px]"
            style={{
              left: particle.x,
              top: particle.y,
              width: `${particle.scale}px`,
              height: `${particle.scale}px`,
              transform: 'translate(-50%, -50%)',
              opacity: particle.alpha,
              transition: 'opacity 0.1s ease-out',
            }}
          />
        ))}
      </div>

      {/* Rocket cursor */}
      <div
        className={`fixed pointer-events-none z-50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`
        }}
      >
        <div className="relative w-2 h-3">
          {/* Rocket body - metallic gradient with pointed head */}
          <div className="absolute inset-0">
            {/* Pointed head */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-gray-300"></div>
            
            {/* Main body */}
            <div className="absolute top-[4px] inset-x-0 bottom-0 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-400 rounded-b-full shadow-lg">
              {/* Window */}
              <div className="absolute top-1 left-1/2 w-0.5 h-0.5 -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 border-[0.5px] border-gray-400"></div>
              
              {/* Side fins */}
              <div className="absolute bottom-0.5 -left-0.5 w-0.5 h-1 bg-gradient-to-br from-gray-300 to-gray-500 transform -rotate-45"></div>
              <div className="absolute bottom-0.5 -right-0.5 w-0.5 h-1 bg-gradient-to-br from-gray-300 to-gray-500 transform rotate-45"></div>
              
              {/* Bottom fins */}
              <div className="absolute -bottom-0.5 left-1/2 w-1 h-0.5 -translate-x-1/2 bg-gradient-to-b from-gray-400 to-gray-600"></div>
            </div>
          </div>

          {/* Flame effect */}
          <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2">
            <div className="w-1 h-1 bg-gradient-to-t from-blue-500 via-blue-400 to-transparent rounded-b-full opacity-75 animate-pulse"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-gradient-to-t from-blue-300 via-blue-200 to-transparent rounded-b-full opacity-50 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Hide the default cursor */}
      <style jsx global>{`
        body {
          cursor: none;
        }
        a, button, [role="button"] {
          cursor: none;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </>
  );
} 