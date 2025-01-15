import React, { useRef } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Text, OrbitControls, useTexture } from '@react-three/drei';
import { Suspense } from 'react';

function MotorModel() {
    const { scene } = useGLTF('/porsche_997_gt3rsr.glb');
    
    const modelRef = useRef();
  
    useFrame(() => {
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.01;
      }
    });
  
    return (
      <mesh ref={modelRef} scale={[0.6, 0.6, 0.6]} position={[0, -1, 0]}>
        <primitive object={scene} />
      </mesh>
    );
  }

  const Version9 = () => {

    return (
        <div className="relative w-full h-screen bg-gray-900">
          <Canvas
            style={{ width: "99%", height: "100vh", margin: "auto" }}
            camera={{ position: [0, 2, 8], fov: 70 }}
          >
                {}
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
    )

  }

function Background() {
  const texture = useTexture('/porsche.jpg'); 
  
  return <primitive object={texture} attach="background" />;
}

export default Version9;