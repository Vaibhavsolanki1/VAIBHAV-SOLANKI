import { Suspense, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center, ContactShadows, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Loader2, Rotate3d, Sparkles, Swords, RefreshCw, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

// Generates smooth Staunton-style rotational profile curves for Three.js LatheGeometry
function createPawnPoints(): THREE.Vector2[] {
  const pts: [number, number][] = [
    [0, 0], [0.38, 0], [0.38, 0.08], [0.32, 0.12], [0.28, 0.15],
    [0.22, 0.25], [0.17, 0.45], [0.21, 0.52], [0.15, 0.56],
    [0.22, 0.65], [0.20, 0.78], [0.0, 0.92]
  ];
  return pts.map(([x, y]) => new THREE.Vector2(x, y));
}

function createRookPoints(): THREE.Vector2[] {
  const pts: [number, number][] = [
    [0, 0], [0.42, 0], [0.42, 0.1], [0.34, 0.16], [0.28, 0.24],
    [0.26, 0.72], [0.36, 0.82], [0.38, 1.05], [0.28, 1.05],
    [0.28, 0.94], [0, 0.94]
  ];
  return pts.map(([x, y]) => new THREE.Vector2(x, y));
}

function createKnightPoints(): THREE.Vector2[] {
  const pts: [number, number][] = [
    [0, 0], [0.42, 0], [0.42, 0.12], [0.35, 0.18], [0.3, 0.3],
    [0.25, 0.6], [0.32, 0.78], [0.28, 0.98], [0.12, 1.1], [0, 1.15]
  ];
  return pts.map(([x, y]) => new THREE.Vector2(x, y));
}

function createBishopPoints(): THREE.Vector2[] {
  const pts: [number, number][] = [
    [0, 0], [0.42, 0], [0.42, 0.1], [0.34, 0.16], [0.25, 0.3],
    [0.2, 0.7], [0.28, 0.8], [0.22, 0.9], [0.26, 1.15], [0.08, 1.32], [0.08, 1.38], [0, 1.42]
  ];
  return pts.map(([x, y]) => new THREE.Vector2(x, y));
}

function createQueenPoints(): THREE.Vector2[] {
  const pts: [number, number][] = [
    [0, 0], [0.46, 0], [0.46, 0.1], [0.38, 0.18], [0.28, 0.35],
    [0.22, 0.85], [0.35, 1.02], [0.32, 1.15], [0.38, 1.38], [0.12, 1.5], [0.1, 1.56], [0, 1.62]
  ];
  return pts.map(([x, y]) => new THREE.Vector2(x, y));
}

function createKingPoints(): THREE.Vector2[] {
  const pts: [number, number][] = [
    [0, 0], [0.48, 0], [0.48, 0.12], [0.4, 0.2], [0.3, 0.38],
    [0.24, 0.9], [0.38, 1.1], [0.34, 1.25], [0.4, 1.48], [0.18, 1.62], [0.18, 1.74], [0, 1.82]
  ];
  return pts.map(([x, y]) => new THREE.Vector2(x, y));
}

type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';

interface PieceData {
  id: string;
  type: PieceType;
  color: 'white' | 'black';
  col: number; // 0 to 7
  row: number; // 0 to 7
}

interface PieceProps {
  data: PieceData;
  isSelected: boolean;
  onSelect: (id: string) => void;
  whiteMat: THREE.Material;
  blackMat: THREE.Material;
  latheGeometries: Record<PieceType, THREE.LatheGeometry>;
}

function Piece({
  data,
  isSelected,
  onSelect,
  whiteMat,
  blackMat,
  latheGeometries,
}: PieceProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetX = (data.col - 3.5) * 1.0;
  const targetZ = (data.row - 3.5) * 1.0;

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const currentY = meshRef.current.position.y;
    const desiredY = isSelected ? 0.35 : 0;
    meshRef.current.position.y = THREE.MathUtils.damp(currentY, desiredY, 12, delta);
  });

  const geo = latheGeometries[data.type];
  const mat = data.color === 'white' ? whiteMat : blackMat;

  return (
    <mesh
      ref={meshRef}
      geometry={geo}
      material={mat}
      position={[targetX, 0, targetZ]}
      castShadow
      receiveShadow
      onClick={(e) => {
        e.stopPropagation();
        onSelect(data.id);
      }}
      scale={0.88}
    />
  );
}

// 3D Wooden Chess Board using the provided textures
function ChessBoard() {
  const [boardTex, normalTex, roughnessTex] = useTexture([
    '/textures/chess/D_ChessBoard.png',
    '/textures/chess/NOR_ChessBoard.png',
    '/textures/chess/R_ChessBoard@channels=G.png',
  ]);

  useMemo(() => {
    boardTex.wrapS = boardTex.wrapT = THREE.RepeatWrapping;
    normalTex.wrapS = normalTex.wrapT = THREE.RepeatWrapping;
    roughnessTex.wrapS = roughnessTex.wrapT = THREE.RepeatWrapping;
  }, [boardTex, normalTex, roughnessTex]);

  return (
    <group position={[0, -0.15, 0]}>
      {/* Playing Board Surface */}
      <mesh receiveShadow position={[0, 0.12, 0]}>
        <boxGeometry args={[8.2, 0.24, 8.2]} />
        <meshStandardMaterial
          map={boardTex}
          normalMap={normalTex}
          normalScale={new THREE.Vector2(0.8, 0.8)}
          roughnessMap={roughnessTex}
          roughness={0.45}
          metalness={0.08}
        />
      </mesh>

      {/* Elegant Wooden Border Lip */}
      <mesh receiveShadow position={[0, 0.06, 0]}>
        <boxGeometry args={[8.8, 0.22, 8.8]} />
        <meshStandardMaterial
          color="#3a1b0d"
          roughness={0.4}
          metalness={0.15}
        />
      </mesh>

      {/* Gold Trim Corner Inlays */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[9.1, 0.1, 9.1]} />
        <meshStandardMaterial
          color="#1e0e07"
          roughness={0.5}
          metalness={0.25}
        />
      </mesh>
    </group>
  );
}

const INITIAL_PIECES: PieceData[] = [
  // Black pieces (back row)
  { id: 'b_r1', type: 'rook', color: 'black', col: 0, row: 7 },
  { id: 'b_n1', type: 'knight', color: 'black', col: 1, row: 7 },
  { id: 'b_b1', type: 'bishop', color: 'black', col: 2, row: 7 },
  { id: 'b_q', type: 'queen', color: 'black', col: 3, row: 7 },
  { id: 'b_k', type: 'king', color: 'black', col: 4, row: 7 },
  { id: 'b_b2', type: 'bishop', color: 'black', col: 5, row: 7 },
  { id: 'b_n2', type: 'knight', color: 'black', col: 6, row: 7 },
  { id: 'b_r2', type: 'rook', color: 'black', col: 7, row: 7 },
  // Black pawns
  { id: 'b_p1', type: 'pawn', color: 'black', col: 0, row: 6 },
  { id: 'b_p2', type: 'pawn', color: 'black', col: 1, row: 6 },
  { id: 'b_p3', type: 'pawn', color: 'black', col: 2, row: 6 },
  { id: 'b_p4', type: 'pawn', color: 'black', col: 3, row: 4 }, // 1... e5 / d5 active
  { id: 'b_p5', type: 'pawn', color: 'black', col: 4, row: 6 },
  { id: 'b_p6', type: 'pawn', color: 'black', col: 5, row: 6 },
  { id: 'b_p7', type: 'pawn', color: 'black', col: 6, row: 6 },
  { id: 'b_p8', type: 'pawn', color: 'black', col: 7, row: 6 },

  // White pieces (back row)
  { id: 'w_r1', type: 'rook', color: 'white', col: 0, row: 0 },
  { id: 'w_n1', type: 'knight', color: 'white', col: 2, row: 2 }, // Nf3 development
  { id: 'w_b1', type: 'bishop', color: 'white', col: 2, row: 0 },
  { id: 'w_q', type: 'queen', color: 'white', col: 3, row: 0 },
  { id: 'w_k', type: 'king', color: 'white', col: 4, row: 0 },
  { id: 'w_b2', type: 'bishop', color: 'white', col: 4, row: 3 }, // Bc4 Italian
  { id: 'w_n2', type: 'knight', color: 'white', col: 6, row: 0 },
  { id: 'w_r2', type: 'rook', color: 'white', col: 7, row: 0 },
  // White pawns
  { id: 'w_p1', type: 'pawn', color: 'white', col: 0, row: 1 },
  { id: 'w_p2', type: 'pawn', color: 'white', col: 1, row: 1 },
  { id: 'w_p3', type: 'pawn', color: 'white', col: 2, row: 1 },
  { id: 'w_p4', type: 'pawn', color: 'white', col: 3, row: 1 },
  { id: 'w_p5', type: 'pawn', color: 'white', col: 4, row: 3 }, // e4 center control
  { id: 'w_p6', type: 'pawn', color: 'white', col: 5, row: 1 },
  { id: 'w_p7', type: 'pawn', color: 'white', col: 6, row: 1 },
  { id: 'w_p8', type: 'pawn', color: 'white', col: 7, row: 1 },
];

function ChessScene({
  pieces,
  selectedPieceId,
  onSelectPiece,
}: {
  pieces: PieceData[];
  selectedPieceId: string | null;
  onSelectPiece: (id: string) => void;
}) {
  const [whiteTex, blackTex] = useTexture([
    '/textures/chess/D_WhitePieces.jpeg',
    '/textures/chess/D_BlackPieces.jpeg',
  ]);

  const latheGeometries = useMemo(
    () => ({
      pawn: new THREE.LatheGeometry(createPawnPoints(), 32),
      rook: new THREE.LatheGeometry(createRookPoints(), 32),
      knight: new THREE.LatheGeometry(createKnightPoints(), 32),
      bishop: new THREE.LatheGeometry(createBishopPoints(), 32),
      queen: new THREE.LatheGeometry(createQueenPoints(), 32),
      king: new THREE.LatheGeometry(createKingPoints(), 32),
    }),
    []
  );

  const whiteMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: whiteTex,
        roughness: 0.32,
        metalness: 0.08,
      }),
    [whiteTex]
  );

  const blackMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: blackTex,
        roughness: 0.35,
        metalness: 0.12,
      }),
    [blackTex]
  );

  return (
    <group>
      <Center top>
        <ChessBoard />
        {pieces.map((p) => (
          <Piece
            key={p.id}
            data={p}
            isSelected={selectedPieceId === p.id}
            onSelect={onSelectPiece}
            whiteMat={whiteMat}
            blackMat={blackMat}
            latheGeometries={latheGeometries}
          />
        ))}
        <ContactShadows
          position={[0, -0.22, 0]}
          opacity={0.8}
          scale={12}
          blur={2.0}
          far={4}
        />
      </Center>
    </group>
  );
}

export const ChessCanvas = () => {
  const [pieces, setPieces] = useState<PieceData[]>(INITIAL_PIECES);
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [tacticalStep, setTacticalStep] = useState(0);
  const controlsRef = useRef<any>(null);

  const tacticalMoves = [
    { desc: '1. e4 e5 (Italian Game)', evalStr: '+0.3' },
    { desc: '2. Nf3 Nc6 3. Bc4 (Giuoco Piano)', evalStr: '+0.6' },
    { desc: '4. d4 exd4 5. O-O (Kingside Castle & Tactics)', evalStr: '+1.8' },
  ];

  const advanceTactic = () => {
    setTacticalStep((prev) => (prev + 1) % tacticalMoves.length);
    setSelectedPieceId(null);
  };

  const resetBoard = () => {
    setPieces(INITIAL_PIECES);
    setSelectedPieceId(null);
    setTacticalStep(0);
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (controlsRef.current) {
      controlsRef.current.dollyIn(1.3);
      controlsRef.current.update();
    }
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (controlsRef.current) {
      controlsRef.current.dollyOut(1.3);
      controlsRef.current.update();
    }
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div
      data-lenis-prevent="true"
      className="relative w-full rounded-2xl bg-neutral-950/90 border border-white/10 overflow-hidden shadow-2xl group overscroll-contain"
    >
      {/* Top Header & Tactical Evaluation */}
      <div className="relative z-20 flex items-center justify-between px-3.5 py-2.5 bg-neutral-900/80 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Swords className="w-3.5 h-3.5" />
          </span>
          <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-300 font-semibold">
            WOODEN CHESS 3D
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            EVAL: {tacticalMoves[tacticalStep].evalStr}
          </span>
          <button
            type="button"
            onClick={advanceTactic}
            className="px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            title="Advance tactical position"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>STEP {tacticalStep + 1}/3</span>
          </button>
          <button
            type="button"
            onClick={resetBoard}
            className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Reset Chess Board"
            aria-label="Reset board"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas */}
      <div
        data-lenis-prevent="true"
        className="relative h-64 sm:h-72 w-full cursor-grab active:cursor-grabbing overscroll-contain"
      >
        {/* Floating Zoom Controls Bar */}
        <div className="absolute top-2.5 right-3 z-30 flex items-center gap-1 bg-neutral-900/90 border border-white/10 rounded-lg p-1 backdrop-blur-md shadow-lg">
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-1.5 rounded hover:bg-white/15 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Zoom In"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-1.5 rounded hover:bg-white/15 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleResetZoom}
            className="p-1.5 rounded hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Reset Camera"
            aria-label="Reset camera"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <Suspense
          fallback={
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-neutral-950 text-zinc-400 font-mono text-xs">
              <Loader2 className="w-7 h-7 text-amber-500 animate-spin" />
              <span>Rendering 3D Wooden Chess Set...</span>
            </div>
          }
        >
          <Canvas
            camera={{ position: [0, 8.5, 7.5], fov: 42 }}
            className="w-full h-full"
            onPointerDown={() => setIsInteracting(true)}
            onPointerUp={() => setIsInteracting(false)}
            shadows
          >
            {/* Ambient & Warm Studio Track Lights for Wood Grain */}
            <ambientLight intensity={1.1} />
            <directionalLight
              position={[5, 12, 6]}
              intensity={2.2}
              castShadow
              shadow-mapSize={[1024, 1024]}
            />
            <directionalLight position={[-6, 8, -6]} intensity={1.1} />
            <pointLight position={[0, 6, 0]} intensity={1.2} color="#fff4e6" />

            <ChessScene
              pieces={pieces}
              selectedPieceId={selectedPieceId}
              onSelectPiece={(id) => setSelectedPieceId(id)}
            />

            {/* Orbit Controls (360 Degree View & Drag Zoom) */}
            <OrbitControls
              ref={controlsRef}
              enableZoom={true}
              zoomSpeed={1.4}
              minDistance={4}
              maxDistance={18}
              enablePan={false}
              mouseButtons={{
                LEFT: THREE.MOUSE.ROTATE,
                MIDDLE: THREE.MOUSE.DOLLY,
                RIGHT: THREE.MOUSE.DOLLY,
              }}
              touches={{
                ONE: THREE.TOUCH.ROTATE,
                TWO: THREE.TOUCH.DOLLY_PAN,
              }}
              autoRotate={!isInteracting && selectedPieceId === null}
              autoRotateSpeed={1.0}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2.1}
            />
          </Canvas>
        </Suspense>

        {/* 3D Orbit Helper Badge */}
        <div className="absolute bottom-2.5 left-3 pointer-events-none z-10 flex items-center gap-1.5 px-2 py-1 rounded-md bg-neutral-950/80 border border-white/10 text-[10px] font-mono text-zinc-400 backdrop-blur-md">
          <Rotate3d className="w-3 h-3 text-amber-400" />
          <span>Left-drag rotate · Right-drag/scroll zoom</span>
        </div>

        {/* Tactical Annotation */}
        <div className="absolute bottom-2.5 right-3 pointer-events-none z-10 flex items-center gap-2 text-[10px] font-mono">
          <div className="px-2 py-1 rounded bg-neutral-950/80 border border-white/10 text-zinc-300 backdrop-blur-md">
            {tacticalMoves[tacticalStep].desc}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessCanvas;

