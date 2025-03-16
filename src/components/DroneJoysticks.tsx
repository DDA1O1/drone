'use client';

import { Joystick } from 'react-joystick-component';
import { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick';

export default function DroneJoysticks() {
  const handleLeftJoystickMove = (event: IJoystickUpdateEvent) => {
    // In a real app, this would send commands to the drone for forward/backward and left/right movement
    console.log('Left Joystick:', { x: event.x, y: event.y, direction: event.direction });
  };

  const handleRightJoystickMove = (event: IJoystickUpdateEvent) => {
    // In a real app, this would send commands to the drone for up/down and rotation
    console.log('Right Joystick:', { x: event.x, y: event.y, direction: event.direction });
  };

  const handleJoystickStop = () => {
    // In a real app, this would send a stop command to the drone
    console.log('Joystick stopped');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
      <div className="flex justify-between items-center w-full p-6 pb-10">
        {/* Left Joystick - Movement (Forward/Backward, Left/Right) */}
        <div className="pointer-events-auto bg-black bg-opacity-20 backdrop-blur-sm rounded-full p-3 shadow-lg border border-white border-opacity-50">
          <div className="relative">
            <Joystick 
              size={120}
              stickSize={40}
              throttle={100}
              sticky={false}
              baseColor="rgba(0, 0, 0, 0.3)"
              stickColor="rgba(255, 255, 255, 0.9)"
              move={handleLeftJoystickMove}
              stop={handleJoystickStop}
            />
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-xs font-medium bg-black bg-opacity-40 backdrop-blur-sm px-3 py-1 rounded-full">
              Movement
            </div>
          </div>
        </div>

        {/* Right Joystick - Altitude and Rotation */}
        <div className="pointer-events-auto bg-black bg-opacity-20 backdrop-blur-sm rounded-full p-3 shadow-lg border border-white border-opacity-50">
          <div className="relative">
            <Joystick 
              size={120}
              stickSize={40}
              throttle={100}
              sticky={false}
              baseColor="rgba(0, 0, 0, 0.3)"
              stickColor="rgba(255, 255, 255, 0.9)"
              move={handleRightJoystickMove}
              stop={handleJoystickStop}
            />
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-xs font-medium bg-black bg-opacity-40 backdrop-blur-sm px-3 py-1 rounded-full">
              Altitude/Rotation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 