import { useRef, useMemo, Suspense, Component, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

class Canvas3DErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.warn('3D Canvas error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div className="w-full h-full bg-gradient-to-br from-primary/10 to-chart-2/10" />;
    }
    return this.props.children;
  }
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  const particlesCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 1000 : 2000;
  
  const [positions, geometry] = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return [pos, geom];
  }, [particlesCount]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.075;
    }
  });

  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        size={0.02}
        color="#00bfff"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function FloatingCube({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshBasicMaterial color="#a855f7" wireframe />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <ParticleField />
        <FloatingCube position={[-2, 1, -2]} />
        <FloatingCube position={[2, -1, -3]} />
        <FloatingCube position={[0, 2, -4]} />
      </Suspense>
    </>
  );
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 w-full h-full">
        <Canvas3DErrorBoundary
          fallback={
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-chart-2/10 animate-pulse" />
          }
        >
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{ 
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance'
            }}
            dpr={[1, 2]}
            onCreated={({ gl }) => {
              gl.setClearColor('#000000', 0);
            }}
          >
            <Scene />
          </Canvas>
        </Canvas3DErrorBoundary>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background pointer-events-none" />
    </div>
  );
}
