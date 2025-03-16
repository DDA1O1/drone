'use client';

import { useState } from 'react';
import { Joystick } from 'react-joystick-component';
import { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick';

export default function DroneJoysticks() {
  const [leftJoystickData, setLeftJoystickData] = useState({ x: 0, y: 0 });
  const [rightJoystickData, setRightJoystickData] = useState({ x: 0, y: 0 });

  const handleLeftJoystickMove = (event: IJoystickUpdateEvent) => {
    setLeftJoystickData({ x: event.x || 0, y: event.y || 0 });
    // In a real app, this would send commands to the drone for forward/backward and left/right movement
    console.log('Left Joystick:', { x: event.x, y: event.y });
  };

  const handleRightJoystickMove = (event: IJoystickUpdateEvent) => {
    setRightJoystickData({ x: event.x || 0, y: event.y || 0 });
    // In a real app, this would send commands to the drone for up/down and rotation
    console.log('Right Joystick:', { x: event.x, y: event.y });
  };

  const handleJoystickStop = () => {
    // In a real app, this would send a stop command to the drone
    console.log('Joystick stopped');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
      <div className="flex justify-between items-center w-full p-4">
        {/* Left Joystick - Movement (Forward/Backward, Left/Right) */}
        <div className="pointer-events-auto bg-black bg-opacity-30 rounded-full p-2">
          <div className="relative">
            <Joystick 
              size={100}
              baseColor="rgba(0, 0, 0, 0.5)"
              stickColor="rgba(255, 255, 255, 0.8)"
              move={handleLeftJoystickMove}
              stop={handleJoystickStop}
            />
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
              Movement
            </div>
          </div>
        </div>

        {/* Right Joystick - Altitude and Rotation */}
        <div className="pointer-events-auto bg-black bg-opacity-30 rounded-full p-2">
          <div className="relative">
            <Joystick 
              size={100}
              baseColor="rgba(0, 0, 0, 0.5)"
              stickColor="rgba(255, 255, 255, 0.8)"
              move={handleRightJoystickMove}
              stop={handleJoystickStop}
            />
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
              Altitude/Rotation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 