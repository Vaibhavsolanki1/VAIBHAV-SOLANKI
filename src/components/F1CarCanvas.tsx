import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Center, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Loader2, Rotate3d, Zap } from 'lucide-react';

interface F1CarModelProps {
  isDrsActive: boolean;
}

function F1CarModel({ isDrsActive }: F1CarModelProps) {
  const { scene } = useGLTF('/models/f1_car.glb');
  const carRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!carRef.current) return;
    if (isDrsActive) {
      // High-frequency aerodynamic vibration at 340+ km/h
      carRef.current.position.y = Math.sin(state.clock.elapsedTime * 45) * 0.02;
      carRef.current.position.z = Math.cos(state.clock.elapsedTime * 30) * 0.015;
    } else {
      carRef.current.position.y = 0;
      carRef.current.position.z = 0;
    }
  });

  return (
    <group ref={carRef}>
      <Center top>
        {/* Scale model to fit viewport cleanly */}
        <primitive object={scene} scale={0.55} rotation={[0, -Math.PI / 4, 0]} />
      </Center>
    </group>
  );
}

// Preload the GLB model in background for instantaneous render
useGLTF.preload('/models/f1_car.glb');

interface F1CarCanvasProps {
  isDrsActive: boolean;
  onToggleDrs: () => void;
  accentColor?: string;
}

export const F1CarCanvas = ({
  isDrsActive,
  onToggleDrs,
  accentColor = '#ef4444',
}: F1CarCanvasProps) => {
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <div className="relative w-full rounded-2xl bg-neutral-950/90 border border-white/10 overflow-hidden shadow-2xl group">
      {/* Dynamic 3D DRS Wind Tunnel Light Sheen */}
      {isDrsActive && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10 animate-pulse" />
          <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent blur-xs animate-[shimmer_1s_infinite]" />
          <div className="absolute top-2/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent blur-xs animate-[shimmer_0.7s_infinite]" />
          <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent blur-xs animate-[shimmer_1.2s_infinite]" />
        </div>
      )}

      {/* Top Telemetry Header */}
      <div className="relative z-20 flex items-center justify-between px-3.5 py-2.5 bg-neutral-900/80 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isDrsActive ? 'bg-emerald-400' : 'bg-red-400'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isDrsActive ? 'bg-emerald-500' : 'bg-red-500'
              }`}
            />
          </span>
          <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-300 font-semibold">
            RB22 TELEMETRY 3D
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded transition-colors ${
              isDrsActive
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-white/5 text-zinc-400 border border-white/10'
            }`}
          >
            {isDrsActive ? 'DRS OPEN · +85 KM/H' : 'DRS STANDBY'}
          </span>
          <button
            type="button"
            onClick={onToggleDrs}
            className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1 transition-all cursor-pointer ${
              isDrsActive
                ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                : 'bg-red-600 hover:bg-red-500 text-white shadow-md'
            }`}
          >
            <Zap className="w-3 h-3 fill-current" />
            <span>{isDrsActive ? 'CLOSE DRS' : 'LAUNCH DRS'}</span>
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div className="relative h-64 sm:h-72 w-full cursor-grab active:cursor-grabbing">
        <Suspense
          fallback={
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-neutral-950 text-zinc-400 font-mono text-xs">
              <Loader2 className="w-7 h-7 text-red-500 animate-spin" />
              <span>Streaming 3D F1 Mesh (RB22)...</span>
            </div>
          }
        >
          <Canvas
            camera={{ position: [3.8, 2.2, 4.2], fov: 38 }}
            className="w-full h-full"
            onPointerDown={() => setIsInteracting(true)}
            onPointerUp={() => setIsInteracting(false)}
          >
            {/* Ambient & Studio Key Lights */}
            <ambientLight intensity={1.2} />
            <directionalLight position={[6, 8, 4]} intensity={2.2} castShadow />
            <directionalLight position={[-6, 5, -4]} intensity={1.2} />
            <pointLight position={[0, 4, 0]} intensity={1.5} color="#ffffff" />
            <pointLight position={[0, -1, 3]} intensity={1.0} color={accentColor} />

            {/* 3D Model with DRS Animation */}
            <F1CarModel isDrsActive={isDrsActive} />

            {/* Ground Contact Shadow */}
            <ContactShadows
              position={[0, -0.01, 0]}
              opacity={0.75}
              scale={8}
              blur={1.8}
              far={3}
            />

            {/* Orbit Controls (360 Degree Inspection) */}
            <OrbitControls
              enableZoom={true}
              minDistance={3.0}
              maxDistance={7.5}
              enablePan={false}
              autoRotate={!isInteracting && !isDrsActive}
              autoRotateSpeed={1.8}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 2.05}
            />
          </Canvas>
        </Suspense>

        {/* 3D Orbit Helper Badge */}
        <div className="absolute bottom-2.5 left-3 pointer-events-none z-10 flex items-center gap-1.5 px-2 py-1 rounded-md bg-neutral-950/80 border border-white/10 text-[10px] font-mono text-zinc-400 backdrop-blur-md">
          <Rotate3d className="w-3 h-3 text-red-400" />
          <span>Drag to rotate 360° · Scroll to zoom</span>
        </div>

        {/* Real-Time Telemetry Readout Overlay */}
        <div className="absolute bottom-2.5 right-3 pointer-events-none z-10 flex items-center gap-2 text-[10px] font-mono">
          <div className="px-2 py-1 rounded bg-neutral-950/80 border border-white/10 text-zinc-300 backdrop-blur-md">
            SPEED:{' '}
            <span
              className={`font-bold ${isDrsActive ? 'text-emerald-400' : 'text-white'}`}
            >
              {isDrsActive ? '348 KM/H' : '312 KM/H'}
            </span>
          </div>
          <div className="px-2 py-1 rounded bg-neutral-950/80 border border-white/10 text-zinc-300 backdrop-blur-md">
            GEAR: <span className="font-bold text-red-400">8</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default F1CarCanvas;
