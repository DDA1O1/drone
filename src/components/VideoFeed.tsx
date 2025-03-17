'use client';

import { useState } from 'react';
import DroneJoysticks from '@/components/DroneJoysticks';

export default function VideoFeed() {
  const [isConnected, setIsConnected] = useState(false);
  
  const handleConnect = () => {
    setIsConnected(true);
    // In a real app, this would establish a video stream connection
  };
  
  const handleDisconnect = () => {
    setIsConnected(false);
    // In a real app, this would close the video stream connection
  };
  
  if (!isConnected) {
    return (
      <button 
        onClick={handleConnect}
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
      >
        Connect Drone
      </button>
    );
  }
  
  return (
    <div className="relative">
      <div className="fixed inset-0 z-20 bg-black">
        <div className="absolute top-4 right-4 z-30">
          <button 
            onClick={handleDisconnect}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
          >
            Disconnect
          </button>
        </div>
        
        <div className="w-full h-full flex items-center justify-center">
          {/* In a real app, this would be a video stream */}
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          Live
        </div>
        
        {/* Add joysticks */}
        <DroneJoysticks />
      </div>
    </div>
  );
} 