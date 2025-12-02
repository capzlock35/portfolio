import React from 'react';
// Import your Portfolio component (adjust path if needed)
import Portfolio from './components/Portfolio'; 
// Import PixelBlast
import PixelBlast from './components/PixelBlast'; 
// Import your global styles
import './styles/global.css';

function App() {
  return (
    // The main container. Use 'relative' so fixed children are scoped correctly, 
    // and 'min-h-screen' to ensure it takes up the full viewport height.
    <div className="App relative min-h-screen">
      
      {/* 1. PixelBlast as Background Layer
        - fixed inset-0: Covers the whole viewport.
        - -z-10: Puts it behind all other content (assuming your content uses z-index 0 or higher).
        - pointer-events-none: Ensures clicks go through the background to the content underneath.
      */}
      <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
         <PixelBlast /> 
      </div>
      
      {/* 2. Portfolio Content
        - This component holds your entire portfolio structure (Header, Sections, etc.)
        - Its content will sit above the PixelBlast background.
      */}
      <Portfolio />
      
    </div>
  );
}

export default App;