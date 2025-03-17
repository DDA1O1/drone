'use client';

import { useState, useEffect } from 'react';

export interface DeviceInfo {
  isMobileOrTablet: boolean;
  isLandscape: boolean;
  isDesktop: boolean;
}

export default function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobileOrTablet: false,
    isLandscape: true,
    isDesktop: true
  });

  useEffect(() => {
    // Detect if device is mobile or tablet
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
      const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);
      const isMobileOrTablet = isMobile || isTablet;
      
      const newDeviceInfo = {
        isMobileOrTablet,
        isDesktop: !isMobileOrTablet,
        isLandscape: window.innerWidth > window.innerHeight
      };
      
      console.log('Device detection:', newDeviceInfo);
      setDeviceInfo(newDeviceInfo);
    };
    
    // Check device orientation
    const checkOrientation = () => {
      const isLandscape = window.innerWidth > window.innerHeight;
      console.log('Orientation change:', { isLandscape, width: window.innerWidth, height: window.innerHeight });
      
      setDeviceInfo(prev => ({
        ...prev,
        isLandscape
      }));
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

  return deviceInfo;
} 