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
  
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-between p-8 z-40 pointer-events-none">
      {/* Left Joystick - Altitude and Rotation */}
      <div 
        ref={leftJoystickRef}
        className="w-32 h-32 bg-black bg-opacity-50 rounded-full relative pointer-events-auto"
        onMouseDown={() => setLeftActive(true)}
        onTouchStart={() => setLeftActive(true)}
      >
        <div 
          ref={leftKnobRef}
          className={`w-16 h-16 ${leftActive ? 'bg-blue-500' : 'bg-gray-300'} rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-colors`}
        >
          <span className="text-xs font-semibold text-gray-700">ALT/ROT</span>
        </div>
      </div>
      
      {/* Right Joystick - Direction */}
      <div 
        ref={rightJoystickRef}
        className="w-32 h-32 bg-black bg-opacity-50 rounded-full relative pointer-events-auto"
        onMouseDown={() => setRightActive(true)}
        onTouchStart={() => setRightActive(true)}
      >
        <div 
          ref={rightKnobRef}
          className={`w-16 h-16 ${rightActive ? 'bg-blue-500' : 'bg-gray-300'} rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-colors`}
        >
          <span className="text-xs font-semibold text-gray-700">MOVE</span>
        </div>
      </div>
    </div>
  );
} 