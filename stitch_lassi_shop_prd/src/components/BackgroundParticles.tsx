import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 2500 }) {
  const points = useRef<THREE.Points>(null!);
  
  // Use useMemo to generate random positions once
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 10;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate the particle field slowly
    points.current.rotation.y = time * 0.05;
    points.current.rotation.x = time * 0.02;

    // React to mouse movement
    const { x, y } = state.mouse;
    points.current.position.x = THREE.MathUtils.lerp(points.current.position.x, x * 0.5, 0.05);
    points.current.position.y = THREE.MathUtils.lerp(points.current.position.y, y * 0.5, 0.05);
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#fde68a" // Soft amber/white
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

const BackgroundParticles = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none bg-[#0a0a0a]">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 2]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        performance={{ min: 0.5 }}
      >
        <Particles />
      </Canvas>
    </div>
  );
};

export default BackgroundParticles;
