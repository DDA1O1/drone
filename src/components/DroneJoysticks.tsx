'use client';

import { useState, useRef, useEffect } from 'react';

interface JoystickPosition {
  x: number;
  y: number;
}

export default function DroneJoysticks() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [leftPosition, setLeftPosition] = useState<JoystickPosition>({ x: 0, y: 0 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rightPosition, setRightPosition] = useState<JoystickPosition>({ x: 0, y: 0 });
  
  const leftJoystickRef = useRef<HTMLDivElement>(null);
  const rightJoystickRef = useRef<HTMLDivElement>(null);
  const leftKnobRef = useRef<HTMLDivElement>(null);
  const rightKnobRef = useRef<HTMLDivElement>(null);
  
  const [leftActive, setLeftActive] = useState(false);
  const [rightActive, setRightActive] = useState(false);
  
  // Handle joystick movement
  const handleJoystickMove = (
    e: MouseEvent | TouchEvent,
    joystickRef: React.RefObject<HTMLDivElement | null>,
    setPosition: React.Dispatch<React.SetStateAction<JoystickPosition>>,
    knobRef: React.RefObject<HTMLDivElement | null>
  ) => {
    if (!joystickRef.current || !knobRef.current) return;
    
    const joystickRect = joystickRef.current.getBoundingClientRect();
    const joystickCenterX = joystickRect.left + joystickRect.width / 2;
    const joystickCenterY = joystickRect.top + joystickRect.height / 2;
    
    // Get position based on mouse or touch
    let clientX, clientY;
    if (e instanceof MouseEvent) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    
    // Calculate distance from center
    let deltaX = clientX - joystickCenterX;
    let deltaY = clientY - joystickCenterY;
    
    // Calculate distance from center (Pythagorean theorem)
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Limit to joystick radius
    const maxRadius = joystickRect.width / 2 - knobRef.current.offsetWidth / 2;
    if (distance > maxRadius) {
      const angle = Math.atan2(deltaY, deltaX);
      deltaX = Math.cos(angle) * maxRadius;
      deltaY = Math.sin(angle) * maxRadius;
    }
    
    // Update position (normalized between -1 and 1)
    const normalizedX = deltaX / maxRadius;
    const normalizedY = deltaY / maxRadius;
    
    setPosition({ x: normalizedX, y: normalizedY });
    
    // Update visual position
    knobRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    
    // Send drone commands based on joystick position
    console.log(`Joystick position: x=${normalizedX.toFixed(2)}, y=${normalizedY.toFixed(2)}`);
  };
  
  // Reset joystick position
  const resetJoystick = (
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
    setPosition: React.Dispatch<React.SetStateAction<JoystickPosition>>,
    knobRef: React.RefObject<HTMLDivElement | null>
  ) => {
    setActive(false);
    setPosition({ x: 0, y: 0 });
    if (knobRef.current) {
      knobRef.current.style.transform = 'translate(0px, 0px)';
    }
  };
  
  // Set up event listeners
  useEffect(() => {
    const handleLeftJoystickMove = (e: MouseEvent | TouchEvent) => {
      if (leftActive) {
        handleJoystickMove(e, leftJoystickRef, setLeftPosition, leftKnobRef);
      }
    };
    
    const handleRightJoystickMove = (e: MouseEvent | TouchEvent) => {
      if (rightActive) {
        handleJoystickMove(e, rightJoystickRef, setRightPosition, rightKnobRef);
      }
    };
    
    const handleLeftJoystickEnd = () => {
      resetJoystick(setLeftActive, setLeftPosition, leftKnobRef);
    };
    
    const handleRightJoystickEnd = () => {
      resetJoystick(setRightActive, setRightPosition, rightKnobRef);
    };
    
    // Add event listeners
    window.addEventListener('mousemove', handleLeftJoystickMove);
    window.addEventListener('mousemove', handleRightJoystickMove);
    window.addEventListener('touchmove', handleLeftJoystickMove);
    window.addEventListener('touchmove', handleRightJoystickMove);
    
    window.addEventListener('mouseup', handleLeftJoystickEnd);
    window.addEventListener('mouseup', handleRightJoystickEnd);
    window.addEventListener('touchend', handleLeftJoystickEnd);
    window.addEventListener('touchend', handleRightJoystickEnd);
    
    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleLeftJoystickMove);
      window.removeEventListener('mousemove', handleRightJoystickMove);
      window.removeEventListener('touchmove', handleLeftJoystickMove);
      window.removeEventListener('touchmove', handleRightJoystickMove);
      
      window.removeEventListener('mouseup', handleLeftJoystickEnd);
      window.removeEventListener('mouseup', handleRightJoystickEnd);
      window.removeEventListener('touchend', handleLeftJoystickEnd);
      window.removeEventListener('touchend', handleRightJoystickEnd);
    };
  }, [leftActive, rightActive]);
  
  // Helper function to determine if arrow should be highlighted
  const isArrowActive = (position: JoystickPosition, direction: 'up' | 'down' | 'left' | 'right'): boolean => {
    const threshold = 0.5; // Activation threshold
    
    switch (direction) {
      case 'up':
        return position.y < -threshold;
      case 'down':
        return position.y > threshold;
      case 'left':
        return position.x < -threshold;
      case 'right':
        return position.x > threshold;
      default:
        return false;
    }
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-between p-8 z-40 pointer-events-none">
      {/* Left Joystick - Altitude and Rotation */}
      <div 
        ref={leftJoystickRef}
        className="w-32 h-32 bg-transparent border-2 border-white rounded-full relative pointer-events-auto"
        onMouseDown={() => setLeftActive(true)}
        onTouchStart={() => setLeftActive(true)}
      >
        {/* Directional Arrows */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Up Arrow */}
          <div className={`absolute top-2 left-1/2 transform -translate-x-1/2 ${isArrowActive(leftPosition, 'up') ? 'text-white' : 'text-gray-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
          
          {/* Down Arrow */}
          <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 ${isArrowActive(leftPosition, 'down') ? 'text-white' : 'text-gray-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          
          {/* Left Arrow */}
          <div className={`absolute left-2 top-1/2 transform -translate-y-1/2 ${isArrowActive(leftPosition, 'left') ? 'text-white' : 'text-gray-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          
          {/* Right Arrow */}
          <div className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${isArrowActive(leftPosition, 'right') ? 'text-white' : 'text-gray-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
        
        {/* Joystick Knob */}
        <div 
          ref={leftKnobRef}
          className={`w-12 h-12 ${leftActive ? 'bg-blue-500 bg-opacity-70' : 'bg-white bg-opacity-30'} rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-colors border border-white`}
        >
          <span className="text-xs font-semibold text-white">ALT</span>
        </div>
      </div>
      
      {/* Right Joystick - Direction */}
      <div 
        ref={rightJoystickRef}
        className="w-32 h-32 bg-transparent border-2 border-white rounded-full relative pointer-events-auto"
        onMouseDown={() => setRightActive(true)}
        onTouchStart={() => setRightActive(true)}
      >
        {/* Directional Arrows */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Up Arrow */}
          <div className={`absolute top-2 left-1/2 transform -translate-x-1/2 ${isArrowActive(rightPosition, 'up') ? 'text-white' : 'text-gray-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
          
          {/* Down Arrow */}
          <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 ${isArrowActive(rightPosition, 'down') ? 'text-white' : 'text-gray-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          
          {/* Left Arrow */}
          <div className={`absolute left-2 top-1/2 transform -translate-y-1/2 ${isArrowActive(rightPosition, 'left') ? 'text-white' : 'text-gray-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          
          {/* Right Arrow */}
          <div className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${isArrowActive(rightPosition, 'right') ? 'text-white' : 'text-gray-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
        
        {/* Joystick Knob */}
        <div 
          ref={rightKnobRef}
          className={`w-12 h-12 ${rightActive ? 'bg-blue-500 bg-opacity-70' : 'bg-white bg-opacity-30'} rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-colors border border-white`}
        >
          <span className="text-xs font-semibold text-white">MOVE</span>
        </div>
      </div>
    </div>
  );
} 