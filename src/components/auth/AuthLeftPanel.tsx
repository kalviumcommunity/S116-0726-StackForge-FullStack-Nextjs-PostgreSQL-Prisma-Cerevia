'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Logo } from '@/components/layout/Logo';
import { usePathname } from 'next/navigation';

// Declare custom shader material types for TS compilation
type CustomShaderMaterialType = THREE.ShaderMaterial & {
  uniforms: {
    uTime: { value: number };
    uMouse: { value: THREE.Vector2 };
  };
};

function Waves() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<CustomShaderMaterialType>(null);
  const countX = 75;
  const countY = 75;

  const [positions, colors] = useMemo(() => {
    const count = countX * countY;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const colorCyan = new THREE.Color('#06b6d4');
    const colorBlue = new THREE.Color('#3b82f6');
    const colorIndigo = new THREE.Color('#6366f1');

    let idx = 0;
    for (let x = 0; x < countX; x++) {
      for (let y = 0; y < countY; y++) {
        const posX = (x - countX / 2) * 0.4;
        const posY = (y - countY / 2) * 0.4;

        positions[idx] = posX;
        positions[idx + 1] = posY;
        positions[idx + 2] = 0;

        const ratio = x / countX;
        const color = new THREE.Color();
        if (ratio < 0.5) {
          color.lerpColors(colorCyan, colorBlue, ratio * 2);
        } else {
          color.lerpColors(colorBlue, colorIndigo, (ratio - 0.5) * 2);
        }

        colors[idx] = color.r;
        colors[idx + 1] = color.g;
        colors[idx + 2] = color.b;

        idx += 3;
      }
    }
    return [positions, colors];
  }, [countX, countY]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec3 vColor;
    varying float vElevation;

    void main() {
      vColor = color;
      
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      
      // Multi-layered waves
      float elevation = sin(modelPosition.x * 0.2 + uTime * 0.5) * 0.8;
      elevation += cos(modelPosition.y * 0.2 + uTime * 0.4) * 0.8;
      elevation += sin((modelPosition.x + modelPosition.y) * 0.1 + uTime * 0.6) * 0.5;
      
      // Mouse interaction displacement
      vec2 mappedMouse = uMouse * 12.0;
      float dist = distance(modelPosition.xy, mappedMouse);
      if (dist < 8.0) {
        float strength = (8.0 - dist) / 8.0;
        elevation += sin(uTime * 2.0) * strength * 1.8;
      }

      modelPosition.z += elevation;
      vElevation = elevation;

      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      
      gl_Position = projectedPosition;
      gl_PointSize = (14.0 + elevation * 4.0) * (1.0 / -viewPosition.z);
    }
  `;

  const fragmentShader = `
    varying vec3 vColor;
    varying float vElevation;

    void main() {
      float dist = distance(gl_PointCoord, vec2(0.5));
      if (dist > 0.5) {
        discard;
      }
      
      float glow = 1.0 - (dist * 2.0);
      glow = pow(glow, 1.5);
      
      vec3 finalColor = vColor * (1.0 + vElevation * 0.25);
      gl_FragColor = vec4(finalColor, glow * 0.9);
    }
  `;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
      materialRef.current.uniforms.uMouse.value.lerp(state.pointer, 0.05);
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.z = time * 0.02;
      pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.08;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  );
}

function BackgroundOrbs() {
  const orb1Ref = useRef<THREE.Mesh>(null);
  const orb2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (orb1Ref.current) {
      orb1Ref.current.position.x = -5 + Math.sin(time * 0.2) * 2;
      orb1Ref.current.position.y = 3 + Math.cos(time * 0.3) * 1.5;
    }
    if (orb2Ref.current) {
      orb2Ref.current.position.x = 5 + Math.cos(time * 0.15) * 2;
      orb2Ref.current.position.y = -4 + Math.sin(time * 0.25) * 1.5;
    }
  });

  return (
    <>
      <mesh ref={orb1Ref} position={[-5, 3, -5]}>
        <sphereGeometry args={[6, 32, 32]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={orb2Ref} position={[5, -4, -8]}>
        <sphereGeometry args={[8, 32, 32]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
}

export function AuthLeftPanel() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getPanelText = () => {
    switch (pathname) {
      case '/register':
        return {
          title: 'Create your Account',
          subtitle: 'Track your learning streaks and rank up in our gamified platform!',
        };
      case '/forgot-password':
        return {
          title: 'Password Recovery',
          subtitle: 'Retrieve your account access and get back to your learning streak.',
        };
      case '/reset-password':
        return {
          title: 'Secure Account',
          subtitle: 'Create a new secure password to safeguard your achievements.',
        };
      case '/login':
      default:
        return {
          title: 'Welcome Back',
          subtitle: 'Keep your learning streak alive and climb the global leaderboard!',
        };
    }
  };

  const { title, subtitle } = getPanelText();

  return (
    <div className="relative hidden md:flex md:w-1/2 bg-gray-950 overflow-hidden flex-col justify-between p-12 text-white select-none group animate-fade-in">
      {/* Background canvas fluid R3F/Three.js animation */}
      <div className="absolute inset-0 block w-full h-full pointer-events-none z-0">
        {mounted && (
          <Canvas
            camera={{ position: [0, 0, 15], fov: 60, near: 0.1, far: 100 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <ambientLight intensity={0.5} />
            <Waves />
            <BackgroundOrbs />
          </Canvas>
        )}
      </div>

      {/* Glossy mesh lighting layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.15),transparent_50%)] pointer-events-none z-5" />

      {/* Top logo branding */}
      <div className="relative z-10 flex flex-col gap-1.5 animate-fade-in">
        <Logo showText={true} />
        <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest font-mono">
          Gamification Platform
        </span>
      </div>

      {/* Middle/Bottom typography message */}
      <div className="relative z-10 max-w-sm mt-auto animate-fade-in-up">
        <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight font-sans drop-shadow-sm">
          {title}
        </h2>
        <p className="mt-3 text-sm text-gray-300 font-medium leading-relaxed drop-shadow-sm">
          {subtitle}
        </p>
      </div>

      {/* Fine-grained border highlights for glassmorphic edge */}
      <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent z-10" />
    </div>
  );
}
