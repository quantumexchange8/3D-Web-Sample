import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Ground = () => {
  return (
    <mesh position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[5, 5]} />
      <meshStandardMaterial color="lightgray" />
    </mesh>
  );
};

const Version8 = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="min-h-screen bg-yellow-500">
      <header className="absolute top-4 left-4">
        <div className="w-8 h-1 bg-black mb-1"></div>
        <div className="w-8 h-1 bg-black mb-1"></div>
        <div className="w-8 h-1 bg-black"></div>
      </header>

      <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12">
        <div className="text-center md:text-left max-w-lg">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
            MAKE A WEBSITE <br /> IN HTML & CSS
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Celebrating our 110-year history full of passion and elegance.
          </p>
          <button className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
            Data Sheet
          </button>
        </div>

        <div className="relative w-full md:w-1/2 h-96">
          <Canvas shadows>
            {/* Lighting for the scene */}
            <ambientLight intensity={0.5} />
            <directionalLight 
              position={[5, 5, 5]} 
              castShadow 
              intensity={1} 
            />
            <Suspense fallback={null}>
              <Ground />
            </Suspense>
            <OrbitControls /> {/* Allow camera control */}
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default Version8;
