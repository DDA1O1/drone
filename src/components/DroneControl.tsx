'use client';

import { useState, useEffect } from 'react';
import useDeviceDetection from '@/utils/useDeviceDetection';
import DroneControlMobile from '@/components/DroneControlMobile';
import DroneControlDesktop from '@/components/DroneControlDesktop';

export default function DroneControl() {
  const { isMobileOrTablet, isLandscape } = useDeviceDetection();
  const [showDebug, setShowDebug] = useState(true);
  
  // Hide debug info after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDebug(false);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Show rotation message for mobile/tablet in portrait mode
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
  
  // Debug overlay
  const debugOverlay = showDebug ? (
    <div className="fixed top-0 left-0 right-0 bg-black bg-opacity-80 text-white p-4 z-50 text-sm">
      <p>Device Detection: {isMobileOrTablet ? 'Mobile/Tablet' : 'Desktop'}</p>
      <p>Orientation: {isLandscape ? 'Landscape' : 'Portrait'}</p>
      <p>Rendering: {isMobileOrTablet ? 'Mobile Controls' : 'Desktop Controls'}</p>
      <button 
        onClick={() => setShowDebug(false)}
        className="mt-2 bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-xs"
      >
        Close Debug
      </button>
    </div>
  ) : null;
  
  // Force desktop mode for testing
  const forceDesktop = true;
  
  // Render appropriate control interface based on device type
  return (
    <>
      {debugOverlay}
      {forceDesktop ? <DroneControlDesktop /> : (isMobileOrTablet ? <DroneControlMobile /> : <DroneControlDesktop />)}
    </>
  );
} 