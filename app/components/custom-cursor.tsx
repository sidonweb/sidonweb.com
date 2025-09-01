"use client";

import React, { useState, useEffect, useRef } from "react";

const FlareCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  
  const lastPosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    const newX = e.clientX;
    const newY = e.clientY;
    
    // Calculate velocity for recoil effect
    const newVelocity = {
      x: newX - lastPosition.current.x,
      y: newY - lastPosition.current.y
    };
    
    setPosition({ x: newX, y: newY });
    setVelocity(newVelocity);
    
    lastPosition.current = { x: newX, y: newY };

    const target = e.target as HTMLElement;
    const computedStyle = window.getComputedStyle(target);
    const cursor = computedStyle.getPropertyValue("cursor");
    
    // Check for interactive elements
    setIsPointer(
      cursor === "pointer" || 
      target.tagName === "BUTTON" ||
      target.tagName === "A" ||
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.closest("button") !== null ||
      target.closest("a") !== null
    );
  };

  const handleMouseDown = () => setIsClicking(true);
  const handleMouseUp = () => setIsClicking(false);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Calculate dynamic sizes and positions
  const velocityMagnitude = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
  const recoilOffset = isClicking ? velocityMagnitude * 0.3 : 0;
  
  const crosshairSize = isPointer ? 24 : 20;
  const centerDotSize = isPointer ? 4 : isClicking ? 6 : 3;
  const lineLength = crosshairSize;
  const lineThickness = isClicking ? 3 : isPointer ? 2 : 1;
  const gap = isClicking ? 12 : isPointer ? 10 : 8;

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        body {
          cursor: none !important;
        }
      `}</style>

      {/* Crosshair Container */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) ${isClicking ? `translate(${recoilOffset}px, ${recoilOffset}px)` : ''}`,
          transition: isClicking ? 'none' : 'transform 0.1s ease-out',
          filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.8))',
        }}
      >
        {/* Top Line */}
        <div
          className="absolute bg-white"
          style={{
            width: `${lineThickness}px`,
            height: `${lineLength}px`,
            left: '50%',
            top: `-${lineLength + gap}px`,
            transform: 'translateX(-50%)',
            transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            backgroundColor: isPointer ? '#00ff41' : isClicking ? '#ff3333' : 'white',
            boxShadow: isPointer 
              ? '0 0 10px #00ff41, 0 0 20px rgba(0, 255, 65, 0.3)' 
              : isClicking 
              ? '0 0 10px #ff3333, 0 0 20px rgba(255, 51, 51, 0.3)'
              : '0 0 5px rgba(255, 255, 255, 0.8)',
          }}
        />

        {/* Bottom Line */}
        <div
          className="absolute bg-white"
          style={{
            width: `${lineThickness}px`,
            height: `${lineLength}px`,
            left: '50%',
            top: `${gap}px`,
            transform: 'translateX(-50%)',
            transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            backgroundColor: isPointer ? '#00ff41' : isClicking ? '#ff3333' : 'white',
            boxShadow: isPointer 
              ? '0 0 10px #00ff41, 0 0 20px rgba(0, 255, 65, 0.3)' 
              : isClicking 
              ? '0 0 10px #ff3333, 0 0 20px rgba(255, 51, 51, 0.3)'
              : '0 0 5px rgba(255, 255, 255, 0.5)',
          }}
        />

        {/* Left Line */}
        <div
          className="absolute bg-white"
          style={{
            width: `${lineLength}px`,
            height: `${lineThickness}px`,
            left: `-${lineLength + gap}px`,
            top: '50%',
            transform: 'translateY(-50%)',
            transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            backgroundColor: isPointer ? '#00ff41' : isClicking ? '#ff3333' : 'white',
            boxShadow: isPointer 
              ? '0 0 10px #00ff41, 0 0 20px rgba(0, 255, 65, 0.3)' 
              : isClicking 
              ? '0 0 10px #ff3333, 0 0 20px rgba(255, 51, 51, 0.3)'
              : '0 0 5px rgba(255, 255, 255, 0.5)',
          }}
        />

        {/* Right Line */}
        <div
          className="absolute bg-white"
          style={{
            width: `${lineLength}px`,
            height: `${lineThickness}px`,
            left: `${gap}px`,
            top: '50%',
            transform: 'translateY(-50%)',
            transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            backgroundColor: isPointer ? '#00ff41' : isClicking ? '#ff3333' : 'white',
            boxShadow: isPointer 
              ? '0 0 10px #00ff41, 0 0 20px rgba(0, 255, 65, 0.3)' 
              : isClicking 
              ? '0 0 10px #ff3333, 0 0 20px rgba(255, 51, 51, 0.3)'
              : '0 0 5px rgba(255, 255, 255, 0.5)',
          }}
        />

        {/* Center Dot */}
        <div
          className="absolute rounded-full bg-white"
          style={{
            width: `${centerDotSize}px`,
            height: `${centerDotSize}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            backgroundColor: isPointer ? '#00ff41' : isClicking ? '#ff3333' : 'white',
            boxShadow: isPointer 
              ? '0 0 15px #00ff41, 0 0 30px rgba(0, 255, 65, 0.4)' 
              : isClicking 
              ? '0 0 15px #ff3333, 0 0 30px rgba(255, 51, 51, 0.4)'
              : '0 0 8px rgba(255, 255, 255, 0.6)',
            opacity: isClicking ? 0.8 : 1,
          }}
        />

        {/* Outer Ring (appears on hover) */}
        {isPointer && (
          <div
            className="absolute rounded-full border animate-pulse"
            style={{
              width: `${crosshairSize * 2}px`,
              height: `${crosshairSize * 2}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              border: '1px solid rgba(0, 255, 65, 0.4)',
              background: 'radial-gradient(circle, rgba(0, 255, 65, 0.05) 0%, transparent 70%)',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          />
        )}

        {/* Muzzle Flash Effect (appears on click) */}
        {isClicking && (
          <div
            className="absolute"
            style={{
              width: '60px',
              height: '60px',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 165, 0, 0.2) 30%, transparent 70%)',
              borderRadius: '50%',
              animation: 'muzzleFlash 0.1s ease-out',
            }}
          />
        )}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes muzzleFlash {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5);
          }
        }
      `}</style>
    </>
  );
};

export default FlareCursor;