'use client';

import { Joystick } from 'react-joystick-component';
import { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick';

export default function SimpleJoystick() {
  const handleMove = (event: IJoystickUpdateEvent) => {
    console.log('Joystick Move:', event);
  };

  const handleStop = () => {
    console.log('Joystick Stop');
  };

  return (
    <>
      {/* Left Joystick */}
      <div className="fixed bottom-10 left-10 z-50">
        <Joystick 
          size={100}
          baseColor="rgba(0, 0, 0, 0.5)"
          stickColor="white"
          move={handleMove}
          stop={handleStop}
        />
      </div>
      
      {/* Right Joystick */}
      <div className="fixed bottom-10 right-10 z-50">
        <Joystick 
          size={100}
          baseColor="rgba(0, 0, 0, 0.5)"
          stickColor="white"
          move={handleMove}
          stop={handleStop}
        />
      </div>
    </>
  );
} 