'use client';

import { useState } from 'react';
import DroneJoysticks from '@/components/DroneJoysticks';

export default function DroneControlMobile() {
  const [entered, setEntered] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(100); // Battery level in percentage

  const handleEnter = () => {
    setEntered(true);
  };

  const handleConnect = () => {
    // Dummy function for UI demonstration
    setIsConnected(!isConnected);
  };

  const handleTakeoff = () => {
    // Dummy function for UI demonstration
    setIsFlying(true);
  };

  const handleLand = () => {
    // Dummy function for UI demonstration
    setIsFlying(false);
  };

  const handleEmergency = () => {
    // Dummy function for UI demonstration
    setIsFlying(false);
  };

  // Battery icon based on level
  const getBatteryIcon = () => {
    if (batteryLevel >= 75) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2 1v8h12V6H4z" />
          <path d="M17 8h1.5a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H17V8z" />
          <rect x="5" y="7" width="9" height="6" fill="currentColor" />
        </svg>
      );
    } else if (batteryLevel >= 50) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2 1v8h12V6H4z" />
          <path d="M17 8h1.5a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H17V8z" />
          <rect x="5" y="7" width="6" height="6" fill="currentColor" />
        </svg>
      );
    } else if (batteryLevel >= 25) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2 1v8h12V6H4z" />
          <path d="M17 8h1.5a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H17V8z" />
          <rect x="5" y="7" width="4" height="6" fill="currentColor" />
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2 1v8h12V6H4z" />
          <path d="M17 8h1.5a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H17V8z" />
          <rect x="5" y="7" width="2" height="6" fill="currentColor" />
        </svg>
      );
    }
  };

  if (!entered) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <button
          onClick={handleEnter}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-medium transition-colors"
        >
          Enter Drone Control
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Status Indicator - Top Left */}
      <div className="absolute top-4 left-4 z-30 flex items-center space-x-2">
        <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm flex items-center">
          <div className={`h-3 w-3 rounded-full mr-2 ${isFlying ? 'bg-green-500 animate-pulse' : isConnected ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
          {isFlying ? 'Flying' : isConnected ? 'Ready' : 'Disconnected'}
        </div>
        
        {/* Battery Indicator */}
        <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm flex items-center">
          {getBatteryIcon()}
          <span className="ml-1">{batteryLevel}%</span>
        </div>
      </div>
      
      {/* Connect Button */}
      <div className="absolute top-4 right-4 z-30">
        <button 
          onClick={handleConnect}
          className={`${isConnected ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center`}
        >
          {isConnected ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Disconnect
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Connect
            </>
          )}
        </button>
      </div>
      
      {/* Flight Control Buttons - Always visible */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-4">
        {!isFlying ? (
          <button 
            onClick={handleTakeoff}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            Takeoff
          </button>
        ) : (
          <>
            <button 
              onClick={handleLand}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Land
            </button>
            <button 
              onClick={handleEmergency}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Emergency
            </button>
          </>
        )}
      </div>
      
      <div className="w-full h-screen flex items-center justify-center">
        {/* Video placeholder - always visible */}
        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
          {isConnected ? (
            isFlying ? (
              /* In a real app, this would be a video stream */
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <div className="text-gray-400 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-xl">Press Takeoff to start flying</span>
              </div>
            )
          ) : (
            <div className="text-gray-400 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-xl">Connect to view drone feed</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Always show joysticks */}
      <DroneJoysticks />
    </div>
  );
} 