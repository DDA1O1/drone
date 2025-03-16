'use client';

import { useState } from 'react';
import { Joystick } from 'react-joystick-component';
import { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick';

export default function DroneJoysticks() {
  const [leftDirection, setLeftDirection] = useState<string | null>(null);
  const [rightDirection, setRightDirection] = useState<string | null>(null);

  const handleLeftJoystickMove = (event: IJoystickUpdateEvent) => {
    // In a real app, this would send commands to the drone for forward/backward and left/right movement
    console.log('Left Joystick:', { x: event.x, y: event.y, direction: event.direction });
    setLeftDirection(event.direction);
  };

  const handleRightJoystickMove = (event: IJoystickUpdateEvent) => {
    // In a real app, this would send commands to the drone for up/down and rotation
    console.log('Right Joystick:', { x: event.x, y: event.y, direction: event.direction });
    setRightDirection(event.direction);
  };

  const handleJoystickStop = () => {
    // In a real app, this would send a stop command to the drone
    console.log('Joystick stopped');
    setLeftDirection(null);
    setRightDirection(null);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="flex justify-between items-center w-full p-6 pb-10">
        {/* Left Joystick - Movement (Forward/Backward, Left/Right) */}
        <div className="pointer-events-auto bg-black bg-opacity-20 backdrop-blur-sm rounded-full p-3 shadow-lg border border-white border-opacity-50 relative">
          {/* Directional Arrows */}
          <div className="absolute inset-0 z-0">
            {/* Up Arrow */}
            <div className={`absolute top-3 left-1/2 transform -translate-x-1/2 transition-opacity ${leftDirection === 'FORWARD' ? 'opacity-100' : 'opacity-40'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </div>
            {/* Right Arrow */}
            <div className={`absolute top-1/2 right-3 transform -translate-y-1/2 transition-opacity ${leftDirection === 'RIGHT' ? 'opacity-100' : 'opacity-40'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            {/* Down Arrow */}
            <div className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 transition-opacity ${leftDirection === 'BACKWARD' ? 'opacity-100' : 'opacity-40'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {/* Left Arrow */}
            <div className={`absolute top-1/2 left-3 transform -translate-y-1/2 transition-opacity ${leftDirection === 'LEFT' ? 'opacity-100' : 'opacity-40'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </div>

          <div className="relative z-10">
            <Joystick 
              size={100}
              stickSize={30}
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
        <div className="pointer-events-auto bg-black bg-opacity-20 backdrop-blur-sm rounded-full p-3 shadow-lg border border-white border-opacity-50 relative">
          {/* Directional Arrows */}
          <div className="absolute inset-0 z-0">
            {/* Up Arrow */}
            <div className={`absolute top-3 left-1/2 transform -translate-x-1/2 transition-opacity ${rightDirection === 'FORWARD' ? 'opacity-100' : 'opacity-40'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </div>
            {/* Right Arrow */}
            <div className={`absolute top-1/2 right-3 transform -translate-y-1/2 transition-opacity ${rightDirection === 'RIGHT' ? 'opacity-100' : 'opacity-40'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            {/* Down Arrow */}
            <div className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 transition-opacity ${rightDirection === 'BACKWARD' ? 'opacity-100' : 'opacity-40'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {/* Left Arrow */}
            <div className={`absolute top-1/2 left-3 transform -translate-y-1/2 transition-opacity ${rightDirection === 'LEFT' ? 'opacity-100' : 'opacity-40'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </div>

          <div className="relative z-10">
            <Joystick 
              size={100}
              stickSize={30}
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