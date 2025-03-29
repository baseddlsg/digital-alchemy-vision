
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface CosmicSceneProps {
  mousePosition: { x: number; y: number };
}

const CosmicScene: React.FC<CosmicSceneProps> = ({ mousePosition }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const geometriesRef = useRef<THREE.Mesh[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene, camera and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Add point lights with colors
    const pointLight1 = new THREE.PointLight(0x9b87f5, 1, 100);
    pointLight1.position.set(-15, 5, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x33C3F0, 1, 100);
    pointLight2.position.set(15, -5, 10);
    scene.add(pointLight2);

    // Create sophisticated geometric forms
    const geometries = [];
    
    // Create icosahedron clusters
    for (let i = 0; i < 20; i++) {
      const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(
          Math.random() * 0.1 + 0.1, 
          Math.random() * 0.1 + 0.1, 
          Math.random() * 0.2 + 0.2
        ),
        metalness: 0.8,
        roughness: 0.2,
        opacity: 0.7,
        transparent: true,
        side: THREE.DoubleSide
      });
      
      const geometry = new THREE.IcosahedronGeometry(Math.random() * 1.5 + 0.5, 0);
      const mesh = new THREE.Mesh(geometry, material);
      
      // Position randomly in 3D space
      mesh.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30
      );
      
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      scene.add(mesh);
      geometries.push(mesh);
    }

    // Add some larger geometric forms
    const dodecahedronGeometry = new THREE.DodecahedronGeometry(3, 0);
    const dodecahedronMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1EAEDB,
      metalness: 0.9,
      roughness: 0.2,
      opacity: 0.7,
      transparent: true,
      side: THREE.DoubleSide
    });
    
    const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);
    dodecahedron.position.set(-8, 5, -5);
    scene.add(dodecahedron);
    geometries.push(dodecahedron);

    // Add toroidal structure
    const torusGeometry = new THREE.TorusGeometry(5, 0.7, 16, 50);
    const torusMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x10B981,
      metalness: 0.8,
      roughness: 0.2,
      opacity: 0.6,
      transparent: true
    });
    
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(8, -4, -10);
    torus.rotation.x = Math.PI / 3;
    scene.add(torus);
    geometries.push(torus);

    geometriesRef.current = geometries;

    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        const camera = cameraRef.current;
        const renderer = rendererRef.current;
        
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      animationFrameRef.current = requestAnimationFrame(animate);
      
      // Slowly rotate all objects
      geometriesRef.current.forEach((mesh, i) => {
        mesh.rotation.x += 0.001 + (i % 3) * 0.0003;
        mesh.rotation.y += 0.001 + (i % 4) * 0.0005;
      });
      
      // Render the scene
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    
    animate();

    // Clean up on unmount
    return () => {
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      
      // Dispose geometries and materials
      geometriesRef.current.forEach(mesh => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
    };
  }, []);

  // Update camera position based on mouse movement
  useEffect(() => {
    if (!cameraRef.current) return;
    
    // Calculate normalized mouse position (-1 to 1)
    const normalizedX = (mousePosition.x / window.innerWidth) * 2 - 1;
    const normalizedY = -(mousePosition.y / window.innerHeight) * 2 + 1;
    
    // Apply subtle camera movement
    const targetX = normalizedX * 2;
    const targetY = normalizedY * 2;
    
    // Smooth transition
    cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.05;
    cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.05;
    
    // Look at center
    cameraRef.current.lookAt(0, 0, 0);
    
    // Also move some geometries slightly
    geometriesRef.current.forEach((mesh, i) => {
      if (i % 3 === 0) {
        mesh.position.x += normalizedX * 0.02;
        mesh.position.y += normalizedY * 0.02;
      }
    });
  }, [mousePosition]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-[#0f0920] via-[#1A1F2C] to-[#18222b]"
    />
  );
};

export default CosmicScene;
