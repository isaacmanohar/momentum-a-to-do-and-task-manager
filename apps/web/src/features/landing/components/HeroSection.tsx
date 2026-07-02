import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

function TaskCardModel() {
  const mesh = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!mesh.current) return;
    const { mouse } = state;
    // Slight parallax based on mouse
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, (mouse.y * Math.PI) / 10, 0.05);
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, (mouse.x * Math.PI) / 10, 0.05);
  });

  return (
    <group ref={mesh} position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Main tablet body */}
        <RoundedBox args={[4.2, 5.5, 0.4]} radius={0.15} smoothness={4} position={[0, 0, 0]} castShadow receiveShadow>
          <meshPhysicalMaterial 
            color="#0a0a0f"
            metalness={0.8}
            roughness={0.1}
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </RoundedBox>
        
        {/* Screen / Glass layer */}
        <RoundedBox args={[3.8, 5.1, 0.1]} radius={0.05} smoothness={2} position={[0, 0, 0.2]}>
          <meshPhysicalMaterial 
            color="#140b2e"
            transmission={0.4}
            opacity={0.8}
            roughness={0.2}
            metalness={0.5}
            ior={1.5}
            thickness={0.5}
          />
        </RoundedBox>

        {/* Fake UI elements on the card */}
        {/* Header block */}
        <mesh position={[-0.8, 2, 0.26]}>
          <planeGeometry args={[1.5, 0.3]} />
          <meshBasicMaterial color="#d8b4fe" />
        </mesh>
        
        {/* Checkbox 1 */}
        <mesh position={[-1.4, 1.1, 0.26]}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshBasicMaterial color="#d8b4fe" />
        </mesh>
        {/* Line 1 */}
        <mesh position={[0.2, 1.1, 0.26]}>
          <planeGeometry args={[2.5, 0.15]} />
          <meshBasicMaterial color="#7e22ce" />
        </mesh>
        
        {/* Checkbox 2 */}
        <mesh position={[-1.4, 0.3, 0.26]}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshBasicMaterial color="#d8b4fe" />
        </mesh>
        {/* Line 2 */}
        <mesh position={[0.2, 0.3, 0.26]}>
          <planeGeometry args={[2.5, 0.15]} />
          <meshBasicMaterial color="#6b21a8" />
        </mesh>

        {/* Checkbox 3 */}
        <mesh position={[-1.4, -0.5, 0.26]}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshBasicMaterial color="#2e1065" />
        </mesh>
        {/* Line 3 */}
        <mesh position={[0.2, -0.5, 0.26]}>
          <planeGeometry args={[2.5, 0.15]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>

        {/* Checkbox 4 */}
        <mesh position={[-1.4, -1.3, 0.26]}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshBasicMaterial color="#2e1065" />
        </mesh>
        {/* Line 4 */}
        <mesh position={[0.2, -1.3, 0.26]}>
          <planeGeometry args={[2.5, 0.15]} />
          <meshBasicMaterial color="#c084fc" />
        </mesh>

        {/* Checkbox 5 */}
        <mesh position={[-1.4, -2.1, 0.26]}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshBasicMaterial color="#2e1065" />
        </mesh>
        {/* Line 5 */}
        <mesh position={[0.2, -2.1, 0.26]}>
          <planeGeometry args={[2.5, 0.15]} />
          <meshBasicMaterial color="#d8b4fe" />
        </mesh>

      </Float>
    </group>
  );
}

export function HeroSection() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative w-full h-screen flex items-center pt-24 overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 flex justify-end items-center">
        <div className="w-full md:w-1/2 h-full">
          <Canvas shadows>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 10]} intensity={1.5} color="#e9d5ff" castShadow />
            <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#c084fc" />
            <Environment preset="city" />
            <TaskCardModel />
          </Canvas>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row items-center">
        <motion.div 
          className="w-full md:w-[55%] flex flex-col items-start gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ y, opacity }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500"></span>
            </span>
            Now with smart prioritization
          </div>
          
          <h1 className="text-6xl md:text-[5rem] font-bold tracking-tighter leading-[1.05]">
            Move your work <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
              forward, calmly.
            </span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed font-medium"
          >
            Momentum is the focused task manager for people and teams who ship. Prioritize smarter, plan with kanban, and never miss a deadline.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
            <button onClick={() => navigate('/register')} className="px-8 py-3.5 text-sm font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full hover:brightness-110 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              Get started free
            </button>
            <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3.5 text-sm font-semibold bg-white/5 text-white border border-white/10 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm">
              See it in action
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
