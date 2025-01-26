import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FloatingSphere = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Sphere Geometry
    const geometry = new THREE.SphereGeometry(0.5, 32, 32); // Small sphere
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff, // White sphere
      emissive: 0x000000, // No emissive glow
      roughness: 0.5,
      metalness: 0.3,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Lights
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x404040); // Soft general light
    scene.add(ambientLight);

    // Camera Position
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.01; // Rotate the sphere
      sphere.position.y = Math.sin(Date.now() * 0.002) * 0.2; // Floating effect
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default FloatingSphere;
