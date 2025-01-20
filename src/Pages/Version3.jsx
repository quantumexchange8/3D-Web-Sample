import React, { useRef, Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, useTexture } from "@react-three/drei";
import { Menu } from "@headlessui/react";

function MotorModel({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();

  return (
    <mesh ref={modelRef} scale={[0.6, 0.6, 0.6]} position={[2, -1, 0]}>
      <primitive object={scene} />
    </mesh>
  );
}


const preloadModels = ["/tire1.glb", "/tire2.glb", "/tire3.glb", "/tire4.glb"];
preloadModels.forEach((model) => useGLTF.preload(model));

const Version3 = () => {
  const [currentModel, setCurrentModel] = useState(preloadModels[0]);

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
          <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-700 bg-gray-800 text-white px-4 py-2 text-sm font-medium hover:bg-gray-700">
            Select Model
          </Menu.Button>
          <Menu.Items className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
            {preloadModels.map((model, index) => (
              <Menu.Item key={model}>
                {({ active }) => (
                  <button
                    onClick={() => handleModelChange(model)}
                    className={`${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } group flex w-full items-center px-4 py-2 text-sm`}
                  >
                    {`Tire ${index + 1}`}
                  </button>
                )}
              </Menu.Item>
            ))}
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

        {}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />

        {}
        <Suspense fallback={<Spinner />}>
          <MotorModel modelPath={currentModel} />
        </Suspense>

        <OrbitControls />
      </Canvas>

      {}
      <div
        className="relative w-full bg-gradient-to-r from-blue-900 to-gray-800"
        style={{ height: "100vh" }}
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

   
function Spinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-white">
      <div className="spinner border-t-4 border-b-4 border-white h-12 w-12 rounded-full animate-spin"></div>
    </div>
  );
}

export default Version3;
