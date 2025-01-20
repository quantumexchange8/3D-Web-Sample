import React, { useState, useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, useTexture } from "@react-three/drei";
import { Menu } from "@headlessui/react";

function MotorModel({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();


  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5; 
    }
  });

  return (
    <mesh ref={modelRef} scale={[0.6, 0.6, 0.6]} position={[0, -1, 0]}>
      <primitive object={scene} />
    </mesh>
  );
}


const preloadModels = [
  "/porsche_boxster.glb",
  "/new1.glb",
  "/new2.glb",
  "/new3.glb",
];
preloadModels.forEach((model) => useGLTF.preload(model));

const Version1 = () => {
  const [currentModel, setCurrentModel] = useState("/porsche_boxster.glb");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleButtonClick = (modelPath) => {
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
          <Menu.Items className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
            <div className="py-1">
              {preloadModels.map((model, index) => (
                <Menu.Item key={model}>
                  {({ active }) => (
                    <button
                      onClick={() => handleButtonClick(model)}
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } group flex w-full items-center px-4 py-2 text-sm`}
                    >
                      {["Red", "Dark Blue", "Light Blue", "Yellow"][index]}
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
        style={{ width: "100%", height: "100vh" }}
        camera={{ position: [0, 2, 8], fov: 70 }}
      >
       {}
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

export default Version1;
