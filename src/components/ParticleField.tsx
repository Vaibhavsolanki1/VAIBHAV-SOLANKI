import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

const PARTICLE_COUNT = 850;

const ParticleStars = ({ theme }: { theme: string }) => {
  const meshRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const posArr = new Float32Array(PARTICLE_COUNT * 3);
    const colorArr = new Float32Array(PARTICLE_COUNT * 3);

    let palette: THREE.Color[];

    if (theme === 'mono') {
      palette = [
        new THREE.Color('#ffffff'),
        new THREE.Color('#e4e4e7'),
        new THREE.Color('#a1a1aa'),
        new THREE.Color('#71717a'),
        new THREE.Color('#52525b'),
      ];
    } else if (theme === 'cosmic') {
      // Cosmic: Black sky, Pink secondary, Purple tertiary + starlight white
      palette = [
        new THREE.Color('#ec4899'), // pink secondary
        new THREE.Color('#f472b6'), // soft pink
        new THREE.Color('#a855f7'), // purple tertiary
        new THREE.Color('#9333ea'), // deep purple
        new THREE.Color('#ffffff'), // star white
      ];
    } else {
      // Default: Crimson Red, Pure White, Silver Grey, Obsidian
      palette = [
        new THREE.Color('#ef4444'), // crimson red
        new THREE.Color('#ffffff'), // pure white
        new THREE.Color('#fca5a5'), // soft rose
        new THREE.Color('#71717a'), // silver grey
        new THREE.Color('#dc2626'), // deep ruby
        new THREE.Color('#e4e4e7'), // platinum
      ];
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 25;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      posArr[i * 3] = x;
      posArr[i * 3 + 1] = y;
      posArr[i * 3 + 2] = z;

      const randomColor = palette[Math.floor(Math.random() * palette.length)];
      colorArr[i * 3] = randomColor.r;
      colorArr[i * 3 + 1] = randomColor.g;
      colorArr[i * 3 + 2] = randomColor.b;
    }

    return [posArr, colorArr];
  }, [theme]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.04;
      meshRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export const ParticleField = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <ParticleStars key={theme} theme={theme} />
        </Suspense>
      </Canvas>
    </div>
  );
};
