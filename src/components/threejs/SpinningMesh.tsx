'use client';
import {useFrame} from '@react-three/fiber';
import {useRef} from 'react';
import {Mesh} from 'three';

export function SpinningMesh({
  position = [0, 0, 0],
  children,
}: {
  position: [x: number, y: number, z: number];
  children?: React.ReactNode;
}) {
  const meshRef = useRef<Mesh>(null!);

  useFrame((_, delta) => {
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta;
  });
  return (
    <mesh ref={meshRef} position={position}>
      {children}
    </mesh>
  );
}
