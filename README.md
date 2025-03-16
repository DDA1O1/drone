# Tello Drone Control Interface

A professional Next.js frontend application for controlling DJI Tello drones, with device-specific control systems.

## Features

- Modern, clean UI with responsive design
- Device-specific control systems:
  - Dual virtual joysticks for mobile/tablet users
  - Keyboard controls (WASD + QE + Space/Shift) for desktop users
- Comprehensive flight controls (takeoff, land, directional movement)
- Real-time telemetry dashboard (battery, altitude, speed, temperature)
- Live video feed display with connection status

## Control Systems

### Mobile/Tablet Controls
- Dual joysticks for intuitive drone control:
  - Left joystick: Forward/backward and left/right movement
  - Right joystick: Altitude (up/down) and rotation
- Quick access buttons for takeoff, landing, and emergency stop
- Touch-optimized interface elements
- Helpful instruction banners for first-time users

### Desktop Controls
- Keyboard-based control system:
  - W/S: Forward/backward movement
  - A/D: Left/right movement
  - Q/E: Rotate left/right
  - Space/Shift: Up/down movement
- Visual keyboard control indicator
- Real-time movement feedback

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser
5. For mobile testing, use your device or Chrome DevTools mobile emulation

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- React Hooks for state management
- Responsive design with device detection

## Implementation Details

- Frontend-only implementation with simulated drone responses
- Device detection for optimized control experience
- Responsive design that works on all device sizes
- SVG icons for clean, scalable UI elements
- Keyboard event handling for desktop controls

## Future Improvements

- Backend integration with Tello SDK
- Real-time video streaming
- Flight path planning and waypoint navigation
- Mission programming interface
- Flight data recording and playback
