import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { PixelShader } from '../shaders/pixel.frag.glsl';
import { useThreeScene } from '../hooks/useThreeScene';

const BackgroundCanvas = () => {
  const canvasRef = useRef(null);
  const { scene, camera, renderer } = useThreeScene(canvasRef);

  useEffect(() => {
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const pixelPass = new ShaderPass(PixelShader);
    composer.addPass(pixelPass);

    const animate = () => {
      requestAnimationFrame(animate);
      composer.render();
    };

    animate();

    return () => {
      renderer.dispose();
      composer.dispose();
    };
  }, [renderer, scene, camera]);

  return <canvas ref={canvasRef} className="background-canvas" />;
};

export default BackgroundCanvas;