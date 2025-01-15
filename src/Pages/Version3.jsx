import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Text, OrbitControls, useTexture } from '@react-three/drei';
import { Suspense } from 'react';


function MotorModel() {
  const { scene } = useGLTF("/porsche_997_gt3rsr.glb");
  const modelRef = useRef();

 
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; 
    }
  });

  return (
    <mesh ref={modelRef} scale={[0.6, 0.6, 0.6]} position={[2, -1, 0]}>
      <primitive object={scene} />
    </mesh>
  );
}

const Version3 = () => {
    useEffect(() => {
          document.body.style.overflow = 'hidden'; 
          return () => {
              document.body.style.overflow = '';
          };
      }, []);
  return (
       <div className="relative w-full h-screen bg-gray-900">
          <div style={{ height: "40vh" }}>
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
      <div 
      className="relative w-full bg-gradient-to-r from-blue-900 to-gray-800"
        style={{ height: "-100vh" }}
      >

      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 text-white">
        
        <h1 className="text-9xl font-bold leading-tight">
          The one and <br />
          always.
        </h1>
      </div>
      </div>
    </div>
  );
};

function Background() {
  const texture = useTexture("/porsche.jpg");

  return <primitive object={texture} attach="background" />;
}

export default Version3;
