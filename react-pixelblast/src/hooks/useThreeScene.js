import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { PixelShader } from '../shaders/pixel.frag.glsl';

const useThreeScene = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
  const rendererRef = useRef(new THREE.WebGLRenderer({ alpha: true }));
  const composerRef = useRef(new EffectComposer(rendererRef.current));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set up renderer
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    canvas.appendChild(rendererRef.current.domElement);

    // Set up camera
    cameraRef.current.position.z = 5;

    // Set up controls
    const controls = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
    controls.enableDamping = true;

    // Set up postprocessing
    const renderPass = new RenderPass(sceneRef.current, cameraRef.current);
    composerRef.current.addPass(renderPass);
    const shaderPass = new ShaderPass(PixelShader);
    composerRef.current.addPass(shaderPass);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      composerRef.current.render();
    };
    animate();

    // Clean up on unmount
    return () => {
      rendererRef.current.dispose();
      controls.dispose();
    };
  }, []);

  return { canvasRef, sceneRef, cameraRef, rendererRef };
};

export default useThreeScene;