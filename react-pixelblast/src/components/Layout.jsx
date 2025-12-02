import React from 'react';
import PixelBlast from './PixelBlast'; // Adjust path as necessary

const Layout = ({ children }) => {
  return (
    // 1. Full viewport container
    <div className="relative w-screen h-screen overflow-auto">
      
      {/* 2. Background Layer (Positioned absolute, covering everything) */}
      <div 
        className="fixed inset-0" 
        style={{ zIndex: 0 }} // zIndex: 0 ensures it's in the background
      >
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#B19EEF"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      </div>

      {/* 3. Foreground Layer (Your main portfolio content) */}
      <div 
        className="relative z-10 w-full min-h-full bg-transparent" 
        style={{ zIndex: 1 }} // zIndex: 1 ensures it sits above the background
      >
        {children}
      </div>

    </div>
  );
};

export default Layout;  