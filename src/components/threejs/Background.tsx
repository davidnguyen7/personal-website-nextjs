'use client';

import {Canvas, useFrame} from '@react-three/fiber';
import {Bloom, EffectComposer} from '@react-three/postprocessing';
import {useRef} from 'react';
import {useMediaQuery} from 'react-responsive';
import {Group} from 'three';
import {DitherEffect} from '@/components/threejs/effects/DitherEffect';
import {SpinningMesh} from './SpinningMesh';

function Scene() {
  const groupRef = useRef<Group>(null!);

  useFrame((_, delta) => {
    groupRef.current.rotation.z += delta;
  });

  return (
    <group ref={groupRef}>
      <SpinningMesh position={[0, 2, 0]}>
        <boxGeometry />
        <meshStandardMaterial />
      </SpinningMesh>
      <SpinningMesh position={[0, -2, 0]}>
        <sphereGeometry args={[0.75]} />
        <meshStandardMaterial />
      </SpinningMesh>
    </group>
  );
}

export default function Background() {
  const isDarkMode = useMediaQuery({
    query: '(prefers-color-scheme: dark)',
  });

  return (
    <div className={'fixed -z-10 w-full h-screen opacity-35'}>
      <Canvas
        shadows
        orthographic
        camera={{zoom: 100, position: [0, 0, 100]}}
        dpr={[0.5, 1]}>
        <color attach={'background'} args={['#000000']} />
        <ambientLight color={0xffffff} intensity={1} />
        <directionalLight color={0xffffff} intensity={1} />
        <Scene />
        <EffectComposer multisampling={0}>
          <DitherEffect
            color1={isDarkMode ? '#FFFFFF' : '#000000'}
            color2={isDarkMode ? '#000000' : '#FFFFFF'}
          />
          <Bloom intensity={isDarkMode ? 1 : 0} luminanceThreshold={0} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
