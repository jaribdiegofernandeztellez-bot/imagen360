import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import type { Mesh } from 'three';
import './App.css';

function Entorno360({ rutaImagen }: { rutaImagen: string }) {
  const textura = useTexture(rutaImagen);
  textura.mapping = THREE.EquirectangularReflectionMapping;
  textura.colorSpace = THREE.SRGBColorSpace;

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[50, 64, 40]} />
      <meshBasicMaterial map={textura} side={THREE.BackSide} />
    </mesh>
  );
}

function Cilindro() {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      
      meshRef.current.position.x = -2.5 + Math.cos(t * 1.5) * 1.2;
      meshRef.current.position.y = Math.sin(t * 2.0) * 1.0;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[-2.5, 0, 0]}>
      <cylinderGeometry args={[1, 1, 2.2, 32]} />
      <meshStandardMaterial color="#4ea8de" roughness={0.3} metalness={0.2} />
    </mesh>
  );
}

function Esfera() {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      // Centro en x = 2.5, y = 0; movimiento desfasado para que no choquen
      meshRef.current.position.x = 2.5 - Math.cos(t * 1.5) * 1.2;
      meshRef.current.position.y = -Math.sin(t * 2.0) * 1.0;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[2.5, 0, 0]}>
      <sphereGeometry args={[1.1, 32, 32]} />
      <meshStandardMaterial color="#ff6b6b" roughness={0.3} metalness={0.2} />
    </mesh>
  );
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 1.5, 7], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} />

        {/* Carga public/imagen.jpg */}
        <Entorno360 rutaImagen="/imagen.jpg" />

        <Cilindro />
        <Esfera />

        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}