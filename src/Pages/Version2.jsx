import { Canvas } from "@react-three/fiber";
import { useGLTF, Text, OrbitControls, useTexture } from "@react-three/drei";
import { Suspense } from "react";

function MotorModel() {
  const { scene } = useGLTF("/porsche_997_gt3rsr.glb");

  return (
    <mesh scale={[0.6, 0.6, 0.6]} position={[0, -1, 0]}>
      <primitive object={scene} />
    </mesh>
  );
}

const Version2 = () => {
  return (
    <div>
      <Canvas
        style={{ width: "100vw", height: "100vh", background: "#00000000" }}
        camera={{
          position: [0, 2, 10],
          fov: 75,
        }}
      >
        <Background />

        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />

        <Suspense
          fallback={
            <Text position={[0, 0, 0]} fontSize={1} color="black">
              Loading...
            </Text>
          }
        >
          <MotorModel />
        </Suspense>

        <OrbitControls />
      </Canvas>
    </div>
  );
};

function Background() {
  const texture = useTexture("/porsche.jpg");

  return <primitive object={texture} attach="background" />;
}

export default Version2;
