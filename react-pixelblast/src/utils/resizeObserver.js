import { useEffect } from 'react';

const resizeObserver = (canvasRef, renderer) => {
  useEffect(() => {
    const canvas = canvasRef.current;

    const observer = new ResizeObserver(() => {
      if (canvas) {
        const { clientWidth, clientHeight } = canvas;
        renderer.setSize(clientWidth, clientHeight);
      }
    });

    if (canvas) {
      observer.observe(canvas);
    }

    return () => {
      if (canvas) {
        observer.unobserve(canvas);
      }
    };
  }, [canvasRef, renderer]);
};

export default resizeObserver;