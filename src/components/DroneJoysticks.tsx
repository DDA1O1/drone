'use client';

import { useState } from 'react';

interface JoystickPosition {
  x: number;
  y: number;
}

export default function DroneJoysticks() {
  const [leftPosition, setLeftPosition] = useState<JoystickPosition>({ x: 0, y: 0 });
  const [rightPosition, setRightPosition] = useState<JoystickPosition>({ x: 0, y: 0 });
  
  // Simple joystick UI without complex interactions for demo purposes
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-between p-8 z-40 pointer-events-none">
      {/* Left Joystick - Altitude and Rotation */}
      <div className="w-32 h-32 bg-black bg-opacity-50 rounded-full relative pointer-events-auto">
        <div className="w-16 h-16 bg-gray-300 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <span className="text-xs font-semibold text-gray-700">ALT/ROT</span>
        </div>
      </div>
      
      {/* Right Joystick - Direction */}
      <div className="w-32 h-32 bg-black bg-opacity-50 rounded-full relative pointer-events-auto">
        <div className="w-16 h-16 bg-gray-300 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <span className="text-xs font-semibold text-gray-700">MOVE</span>
        </div>
      </div>
    </div>
  );
} 