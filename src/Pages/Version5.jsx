import React, { useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Text } from "@react-three/drei";
import { Suspense } from "react";

function PorscheModel() {
  const { scene } = useGLTF("/porsche_911_turbo_s.glb");

  const initialPosition = 10;
  const stopPosition = 0;
  const speed = 0.1;

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.color.set("#ffffff");
        child.material.metalness = 0.8;
        child.material.roughness = 0.3;
      }
    });
    scene.position.x = initialPosition;
  }, [scene, initialPosition]);

  useFrame(() => {
    if (scene.position.x > stopPosition) {
      scene.position.x -= speed;
    }
  });

  return (
    <mesh scale={[2, 2, 2]} position={[0, -1.3, 0]} rotation={[0, Math.PI, 0]}>
      <primitive object={scene} />
    </mesh>
  );
}

function GridBackground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#222" />
      <gridHelper args={[100, 20, "#ffffff", "#444444"]} />
    </mesh>
  );
}

function ReflectiveFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial
        color="#111"
        metalness={0.9}
        roughness={0.1}
        transparent={true}
        opacity={0.8}
      />
    </mesh>
  );
}

function TextOverlay() {
  return (
    <Text
      position={[0, 4, -8]}
      fontSize={3}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.05}
      outlineColor="#000000"
      depthTest={false}
    >
      "Drive Excellence"
      <meshStandardMaterial
        attach="material"
        color="white"
        emissive="#ff5500"
        emissiveIntensity={0.7}
        transparent={true}
        opacity={1}
      />
    </Text>
  );
}

function HighlightedFeatures() {
  return (
    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center text-white space-y-4">
      <h2 className="text-4xl font-bold">Experience the Ultimate Performance</h2>
      <p className="text-lg max-w-3xl mx-auto">
        The Porsche 911 Turbo S combines unparalleled speed, precision engineering, and timeless design. Discover what makes it a true icon of luxury and performance.
      </p>
      <button className="px-6 py-3 bg-red-600 rounded-full text-white font-semibold hover:bg-red-700 transition">
        Learn More
      </button>
    </div>
  );
}

const Version5 = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-orange-600 to-red-600">
      <Canvas
        style={{ width: "100%", height: "100vh", margin: "auto" }}
        camera={{ position: [0, 2, 12], fov: 50 }}
        background="#ff6600"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} />
        <Suspense
          fallback={
            <Text position={[0, 0, 0]} fontSize={1} color="white">
              Loading...
            </Text>
          }
        >
          <GridBackground />
          <PorscheModel />
          <ReflectiveFloor />
          <TextOverlay />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={true} maxPolarAngle={Math.PI / 2.2} />
      </Canvas>
      <HighlightedFeatures />
    </div>
  );
};

export default Version5;
