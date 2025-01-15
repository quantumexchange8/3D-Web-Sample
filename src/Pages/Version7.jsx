import React, { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Text, OrbitControls} from '@react-three/drei';
import { Suspense } from 'react';

function MotorModel({ rotationY }) {
    const { scene } = useGLTF('/porsche_997_gt3rsr.glb');
    const modelRef = useRef();

    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y = rotationY; 
        }
    });

    return (
        <mesh ref={modelRef} scale={[0.6, 0.6, 0.6]} position={[0, -1, 0]}>
            <primitive object={scene} />
        </mesh>
    );
}

const Version7 = () => {
    const [rotationY, setRotationY] = useState(0);
    const rotationStep = Math.PI / 2; 

    
    const handleScroll = useCallback((event) => {
        event.preventDefault(); 

      
        if (event.deltaY > 0) {
            setRotationY((prev) => prev + rotationStep); 
        } else {
            setRotationY((prev) => prev - rotationStep); 
        }
    }, [rotationStep]); 

    
    useEffect(() => {
        window.addEventListener('wheel', handleScroll);
        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, [handleScroll]); 

    
    useEffect(() => {
        document.body.style.overflow = 'hidden'; 
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden"> {}
            {}
            <img
                src="/porsche.jpg"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: -1 }}
            />
            <Canvas
                style={{ width: "100%", height: "100vh" }} 
                camera={{ position: [0, 1, 15], fov: 50 }} 
            >
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 5, 5]} intensity={0.7} />

                <Suspense
                    fallback={
                        <Text position={[0, 0, 0]} fontSize={1} color="black">
                            Loading...
                        </Text>
                    }
                >
                    <MotorModel rotationY={rotationY} /> {}
                </Suspense>

                <OrbitControls enableZoom={false} /> {}
            </Canvas>
        </div>
    );
}

export default Version7;
