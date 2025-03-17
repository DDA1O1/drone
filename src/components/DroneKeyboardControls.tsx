'use client';

import { useState, useEffect } from 'react';

interface DroneKeyboardControlsProps {
  isActive: boolean;
}

export default function DroneKeyboardControls({ isActive }: DroneKeyboardControlsProps) {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'q', 'e'];
      if (validKeys.includes(e.key)) {
        e.preventDefault();
        console.log('Key down:', e.key);
        setActiveKeys(prev => {
          const updated = new Set(prev);
          updated.add(e.key);
          return updated;
        });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'q', 'e'];
      if (validKeys.includes(e.key)) {
        e.preventDefault();
        console.log('Key up:', e.key);
        setActiveKeys(prev => {
          const updated = new Set(prev);
          updated.delete(e.key);
          return updated;
        });
      }
    };

    // Always add keyboard listeners regardless of isActive prop
    console.log('Adding keyboard event listeners');
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      console.log('Removing keyboard event listeners');
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []); // Remove isActive dependency

  return (
    <>
      {/* Left corner - WASD Movement Controls */}
      <div className="absolute bottom-8 left-8 z-30">
        <div className="bg-black bg-opacity-70 p-6 rounded-lg text-white">
          <h3 className="text-center font-bold mb-4">Movement</h3>
          
          {/* WASD keys */}
          <div className="grid grid-cols-3 gap-2 w-40 mx-auto">
            <div></div>
            <div className={`border-2 ${activeKeys.has('w') ? 'bg-blue-500 border-blue-300' : 'border-gray-600'} rounded-md p-3 text-center font-bold`}>W</div>
            <div></div>
            <div className={`border-2 ${activeKeys.has('a') ? 'bg-blue-500 border-blue-300' : 'border-gray-600'} rounded-md p-3 text-center font-bold`}>A</div>
            <div className={`border-2 ${activeKeys.has('s') ? 'bg-blue-500 border-blue-300' : 'border-gray-600'} rounded-md p-3 text-center font-bold`}>S</div>
            <div className={`border-2 ${activeKeys.has('d') ? 'bg-blue-500 border-blue-300' : 'border-gray-600'} rounded-md p-3 text-center font-bold`}>D</div>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-400">
            <p>Forward / Backward</p>
            <p>Left / Right</p>
          </div>
        </div>
      </div>
      
      {/* Right corner - Arrow keys for Altitude & Rotation */}
      <div className="absolute bottom-8 right-8 z-30">
        <div className="bg-black bg-opacity-70 p-6 rounded-lg text-white">
          <h3 className="text-center font-bold mb-4">Altitude & Rotation</h3>
          
          {/* Arrow keys */}
          <div className="grid grid-cols-3 gap-2 w-40 mx-auto">
            <div></div>
            <div className={`border-2 ${activeKeys.has('ArrowUp') ? 'bg-blue-500 border-blue-300' : 'border-gray-600'} rounded-md p-3 text-center font-bold`}>↑</div>
            <div></div>
            <div className={`border-2 ${activeKeys.has('ArrowLeft') ? 'bg-blue-500 border-blue-300' : 'border-gray-600'} rounded-md p-3 text-center font-bold`}>←</div>
            <div className={`border-2 ${activeKeys.has('ArrowDown') ? 'bg-blue-500 border-blue-300' : 'border-gray-600'} rounded-md p-3 text-center font-bold`}>↓</div>
            <div className={`border-2 ${activeKeys.has('ArrowRight') ? 'bg-blue-500 border-blue-300' : 'border-gray-600'} rounded-md p-3 text-center font-bold`}>→</div>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-400">
            <p>Up / Down</p>
            <p>Rotate Left / Right</p>
          </div>
        </div>
      </div>
    </>
  );
} 