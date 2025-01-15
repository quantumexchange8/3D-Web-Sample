import React, { useEffect }  from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Text, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

function MotorModel() {
  const { scene } = useGLTF("/porsche_boxster.glb");

  return (
    <mesh scale={[0.6, 0.6, 0.6]} position={[0, 0.2, 0]}>
      <primitive object={scene} />
    </mesh>
  );
} 

function NeonArches() {
  const arches = [];
  const colors = ["#00d4ff", "#ff4dff"];
  const spacing = 5; 

  for (let i = -10; i <= 10; i++) {
    arches.push(
      <mesh key={i} position={[0, 0, i * spacing]}>
        <torusGeometry args={[5, 0.1, 16, 100]} />
        <meshStandardMaterial
          color={colors[Math.abs(i) % 2]}
          emissive={colors[Math.abs(i) % 2]}
        />
      </mesh>
    );
  }

  return <group>{arches}</group>;
}

function ReflectiveFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#0d3386" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

const Version6 = () => {
  useEffect(() => {
          document.body.style.overflow = 'hidden'; 
          return () => {
              document.body.style.overflow = '';
          };
      }, []);
  
  return (
    <div className="relative w-full h-screen bg-gray-900">
      <Canvas
        style={{ width: "99%", height: "100vh", margin: "auto" }}
        camera={{ position: [0, 2, 12], fov: 70 }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Suspense
          fallback={
            <Text position={[0, 0, 0]} fontSize={1} color="white">
              Loading...
            </Text>
          }
        >
          <NeonArches />
          <MotorModel />
          <ReflectiveFloor />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Version6;
