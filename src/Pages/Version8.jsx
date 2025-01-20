import React, { useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Text } from "@react-three/drei";
import { Suspense } from "react";

function PorscheModel() {
  const { scene } = useGLTF("/porsche_911_turbo_s.glb");

  const initialPosition = -10;
  const stopPosition = 10;
  const speed = 0.15;

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.color.set("#ffffff");
        child.material.metalness = 0.9;
        child.material.roughness = 0.2;
      }
    });
    scene.position.x = initialPosition;
  }, [scene, initialPosition]);

  useFrame(() => {
    if (scene.position.x < stopPosition) {
      scene.position.x += speed;
    } else {
      scene.position.x = initialPosition;
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
      <meshStandardMaterial color="#111" />
      <gridHelper args={[100, 20, "#666666", "#333333"]} />
    </mesh>
  );
}

function ReflectiveFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial
        color="#000"
        metalness={0.95}
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
      position={[0, 3.5, -10]}
      fontSize={2.5}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.05}
      outlineColor="#000"
    >
      "Drive Excellence"
    </Text>
  );
}

function HighlightedFeatures() {
  return (
    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center space-y-4 text-gray-100">
      <h2 className="text-4xl font-extrabold tracking-wide">
        Experience Luxury and Performance
      </h2>
      <p className="text-lg max-w-2xl mx-auto leading-relaxed">
        Discover the pinnacle of engineering with the Porsche 911 Turbo S. A car designed for ultimate precision, unparalleled speed, and timeless elegance.
      </p>
      <button className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-full text-white font-semibold hover:scale-105 transition transform shadow-md">
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
    <div className="relative w-full h-screen bg-gradient-to-b from-blue-900 via-black  to-gray-800">
      <Canvas
        style={{ width: "100%", height: "100vh" }}
        camera={{ position: [0, 2, 15], fov: 50 }}
      >
        <ambientLight intensity={0.5} />  
        <spotLight position={[10, 10, 10]} intensity={1.5} angle={0.2} />
        <Suspense
          fallback={
            <Text position={[0, 0, 0]} fontSize={1.5} color="white">
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
  