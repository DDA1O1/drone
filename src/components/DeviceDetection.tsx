'use client';

import { useState, useEffect } from 'react';
import DroneJoysticks from './DroneJoysticks';

export default function DeviceDetection() {
  const [entered, setEntered] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [isLandscape, setIsLandscape] = useState(true);
  const [isFlying, setIsFlying] = useState(false);

  useEffect(() => {
    // Detect if device is mobile or tablet
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
      const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);
      
      setIsMobileOrTablet(isMobile || isTablet);
      
      // Check orientation
      checkOrientation();
    };
    
    // Check device orientation
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    
    // Add event listener for orientation changes
    window.addEventListener('resize', checkOrientation);
    
    // Initial check
    checkDevice();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  const handleEnter = () => {
    setEntered(true);
  };

  const handleTakeoff = () => {
    // In a real app, this would send a takeoff command to the drone
    console.log('Takeoff command sent');
    setIsFlying(true);
  };

  const handleLand = () => {
    // In a real app, this would send a land command to the drone
    console.log('Land command sent');
    setIsFlying(false);
  };

  const handleEmergency = () => {
    // In a real app, this would send an emergency stop command to the drone
    console.log('Emergency stop command sent');
    setIsFlying(false);
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

  if (isMobileOrTablet && !isLandscape) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <h2 className="text-2xl font-bold mb-4">Please Rotate Your Device</h2>
          <p className="text-gray-600 mb-6">For the best experience with the drone control interface, please rotate your device to landscape orientation.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
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
          {isFlying ? (
            /* In a real app, this would be a video stream */
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <div className="text-gray-400 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-xl">Press Takeoff to start flying</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm flex items-center">
        <div className={`h-3 w-3 rounded-full mr-2 ${isFlying ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
        {isFlying ? 'Flying' : 'Ready'}
      </div>
      
      {/* Always show joysticks */}
      <DroneJoysticks />
    </div>
  );
} 