import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, useTexture } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import React from "react";
import { Menu } from "@headlessui/react";


const preloadModels = [
  "/S1.glb",
  "/S2.glb",
  "/S3.glb",
  "/porsche_concept_car.glb",
];
preloadModels.forEach((model) => useGLTF.preload(model));

function MotorModel({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return (
    <mesh scale={[2, 2, 2]} position={[0, -1, 0]}>
      <primitive object={scene} />
    </mesh>
  );
}

const Version2 = () => {
  const [currentModel, setCurrentModel] = useState("/S1.glb");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleModelChange = (modelPath) => {
    setCurrentModel(modelPath);
  };

  return (
    <div className="relative w-full h-screen bg-gray-900">
      {}
      <div className="absolute top-4 left-4 z-10">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-700 bg-gray-800 text-white px-4 py-2 text-sm font-medium hover:bg-gray-700">
              Select Model
            </Menu.Button>
          </div>
          <Menu.Items className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {preloadModels.map((model, index) => (
                <Menu.Item key={model}>
                  {({ active }) => (
                    <button
                      onClick={() => handleModelChange(model)}
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } group flex w-full items-center px-4 py-2 text-sm`}
                    >
                      {["Purple", "Red", "Green", "Black"][index]}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Menu>
      </div>

      {}
      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        camera={{
          position: [0, 2, 10],
          fov: 75,
        }}
      >
        <Background />
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />

        {}
        <Suspense fallback={<LoadingFallback />}>
          <MotorModel modelPath={currentModel} />
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


function LoadingFallback() {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white">
      <div className="spinner border-t-4 border-b-4 border-white h-12 w-12 rounded-full animate-spin"></div>
    </div>
  );
}

export default Version2;
