# React PixelBlast

This project implements a pixelated background effect using Three.js and GSAP, creating an engaging visual experience. The application is structured to allow easy integration of additional features and components.

## Project Structure

```
react-pixelblast
├── public
│   └── index.html
├── src
│   ├── index.jsx
│   ├── App.jsx
│   ├── components
│   │   ├── PixelBlast.jsx
│   │   └── BackgroundCanvas.jsx
│   ├── hooks
│   │   └── useThreeScene.js
│   ├── shaders
│   │   ├── pixel.vert.glsl
│   │   └── pixel.frag.glsl
│   ├── utils
│   │   ├── postprocessing.js
│   │   └── resizeObserver.js
│   ├── styles
│   │   └── global.css
│   └── assets
│       └── (placeholders for non-image assets, fonts, etc.)
├── package.json
├── .gitignore
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd react-pixelblast
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the development server, run:
```
npm start
```
This will launch the application in your default web browser.

## Features

- **Pixelated Background**: Utilizes Three.js to create a dynamic pixelated effect.
- **GSAP Animations**: Integrates GSAP for smooth animations and transitions.
- **Responsive Design**: The canvas adjusts to different screen sizes using a resize observer.

## Customization

You can customize the pixelated effect by modifying the shaders located in the `src/shaders` directory. The vertex and fragment shaders can be adjusted to achieve different visual styles.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.