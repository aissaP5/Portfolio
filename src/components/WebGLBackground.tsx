import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const WebGLBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.0015);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 250;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x030712, 1);
    containerRef.current.appendChild(renderer.domElement);

    // Mouse coordinates tracker
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    // Particles Data
    const particleCount = 130;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const initialPositions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    // Fill positions and velocities
    for (let i = 0; i < particleCount; i++) {
      // Random position in a spherical/boxy distribution
      const x = (Math.random() - 0.5) * 500;
      const y = (Math.random() - 0.5) * 500;
      const z = (Math.random() - 0.5) * 400;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;

      // Slow velocities
      velocities.push({
        x: (Math.random() - 0.5) * 0.18,
        y: (Math.random() - 0.5) * 0.18,
        z: (Math.random() - 0.5) * 0.18,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Custom circle texture for soft rounded glow particles
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(168, 85, 247, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    // Particle material
    const material = new THREE.PointsMaterial({
      size: 5,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.75,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Create Connection Lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    // We will dynamically update lines geometry in the animation loop
    const lineGeometry = new THREE.BufferGeometry();
    const maxConnections = 300;
    const linePositions = new Float32Array(maxConnections * 2 * 3); // 2 points per line, 3 coords per point
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // Dynamic mouse move interaction
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize to -1 to 1 coordinates
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop variables
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse follow interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Rotate scene slightly based on mouse
      scene.rotation.y = mouse.x * 0.18;
      scene.rotation.x = -mouse.y * 0.18;

      const posAttribute = geometry.getAttribute('position') as THREE.BufferAttribute;
      const posArray = posAttribute.array as Float32Array;

      // Update particle positions
      for (let i = 0; i < particleCount; i++) {
        // Apply base velocity
        posArray[i * 3] += velocities[i].x;
        posArray[i * 3 + 1] += velocities[i].y;
        posArray[i * 3 + 2] += velocities[i].z;

        // Wrap around boundaries
        const bound = 280;
        if (Math.abs(posArray[i * 3]) > bound) velocities[i].x *= -1;
        if (Math.abs(posArray[i * 3 + 1]) > bound) velocities[i].y *= -1;
        if (Math.abs(posArray[i * 3 + 2]) > 200) velocities[i].z *= -1;

        // Dynamic Cursor Gravity Pull
        // Convert mouse screen coords to 3D space approximate vector
        const dx = posArray[i * 3] - (mouse.x * 120);
        const dy = posArray[i * 3 + 1] - (mouse.y * 120);
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Pull nearby particles subtly
        if (dist < 90) {
          posArray[i * 3] -= dx * 0.015;
          posArray[i * 3 + 1] -= dy * 0.015;
        }
      }
      posAttribute.needsUpdate = true;

      // Draw dynamic constellation connection lines
      let connectionIndex = 0;
      const linePosAttribute = lineGeometry.getAttribute('position') as THREE.BufferAttribute;
      const linePosArray = linePosAttribute.array as Float32Array;

      // Clear connection line positions array
      linePosArray.fill(0);

      const maxDistance = 75; // Distance threshold for connection

      for (let i = 0; i < particleCount; i++) {
        const x1 = posArray[i * 3];
        const y1 = posArray[i * 3 + 1];
        const z1 = posArray[i * 3 + 2];

        for (let j = i + 1; j < particleCount; j++) {
          const x2 = posArray[j * 3];
          const y2 = posArray[j * 3 + 1];
          const z2 = posArray[j * 3 + 2];

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance && connectionIndex < maxConnections) {
            // First node coordinate
            linePosArray[connectionIndex * 6] = x1;
            linePosArray[connectionIndex * 6 + 1] = y1;
            linePosArray[connectionIndex * 6 + 2] = z1;

            // Second node coordinate
            linePosArray[connectionIndex * 6 + 3] = x2;
            linePosArray[connectionIndex * 6 + 4] = y2;
            linePosArray[connectionIndex * 6 + 5] = z2;

            connectionIndex++;
          }
        }
      }
      linePosAttribute.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Memory cleanup
      if (containerRef.current && renderer.domElement.parentNode) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="webgl-canvas" />;
};
