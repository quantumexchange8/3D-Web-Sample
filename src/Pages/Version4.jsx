import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Text, OrbitControls} from "@react-three/drei";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { Image } from '@react-three/drei';

function MotorModel() {
  const { scene } = useGLTF("/porsche_997_gt3rsr.glb");
  const modelRef = useRef();

  return (
    <mesh ref={modelRef} scale={[0.4, 0.4, 0.4]} position={[0, -1, 0]}>
      <primitive object={scene} />
    </mesh>
  );
}

function Background() {
 

  return (
    <Image
      scale={[10, 6, 1]}  
      position={[0, 0, -5]} 
      url="/porsche.jpg"  
    />
  );
}
const Version4 = () => {
   useEffect(() => {
          document.body.style.overflow = 'hidden'; 
          return () => {
              document.body.style.overflow = '';
          };
      }, []);
  
  return (
    <div className="relative w-full bg-gray-900">
      <div style={{ height: "50vh" }}>
        <Canvas
          shadows
          style={{ width: "100%", height: "100%", margin: "auto" }}
          camera={{ position: [0, 2, 8], fov: 70 }}
        >
          <Background />
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
          <Suspense
            fallback={
              <Text position={[0, 0, 0]} fontSize={1} color="white">
                Loading...
              </Text>
            }
          >
            <MotorModel />
          </Suspense>
          <OrbitControls enablePan={true} enableZoom={true} />
        </Canvas>
      </div>

      <div
        className="relative w-full bg-gradient-to-r from-blue-900 to-gray-800"
        style={{ height: "43vh" }}
      >
        <div className="absolute top-1/2 w-full text-center transform -translate-y-1/2 text-white">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl font-extrabold leading-tight sm:text-5xl md:text-6xl"
          >
            The one and only.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-4 text-lg md:text-xl font-medium"
          >
            Experience perfection in every curve and line. <br />
            The Porsche 997 GT3 RS - built for precision and performance.
          </motion.p>
          <button className="mt-8 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Version4;
