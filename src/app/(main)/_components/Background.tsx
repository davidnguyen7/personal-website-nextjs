'use client';
import {Canvas, useFrame} from '@react-three/fiber';
import {Bloom, EffectComposer} from '@react-three/postprocessing';
import {Group, Mesh, MeshStandardMaterial, Vector2, Vector3} from 'three';
import {useRef} from 'react';
import {useMediaQuery} from 'react-responsive';
import {useLenis} from 'lenis/react';

import {DitherEffect} from '@/threejs/effects/DitherEffect';
import {useMouseClientCoords} from './hooks/useMouseClientCoords';

function SpinningMesh({
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

interface SceneConfig {
  movement_stiffness: number;
  movement_friction: number;

  rotation_constant_force: number;
  rotation_scroll_factor: number;
  rotation_friction: number;

  opacity_animation_time: number;
  opacity_animation_delay: number;

  friction_factor: number;
  spring_factor: number;
}

function Scene({
  config = {
    movement_stiffness: 25,
    movement_friction: 5,
    rotation_constant_force: 8,
    rotation_scroll_factor: 4,
    rotation_friction: 10,
    opacity_animation_time: 0.5,
    opacity_animation_delay: 0.5,
    friction_factor: 0.1,
    spring_factor: 0.001,
  },
}: {
  config?: SceneConfig;
}) {
  const lenis = useLenis();
  const mouse = useMouseClientCoords();

  const group_ref = useRef<Group>(null!);
  const cube_material_ref = useRef<MeshStandardMaterial>(null!);
  const sphere_material_ref = useRef<MeshStandardMaterial>(null!);

  const positional_velocity = useRef(new Vector2());
  const rotational_velocity = useRef(0);

  useFrame((state, delta) => {
    // perform mount animation of scene opacity
    if (state.clock.elapsedTime > config.opacity_animation_delay) {
      if (cube_material_ref.current.opacity < 1) {
        cube_material_ref.current.opacity +=
          delta / config.opacity_animation_time;
        cube_material_ref.current.opacity = Math.min(
          cube_material_ref.current.opacity,
          1,
        );
      }
      if (sphere_material_ref.current.opacity < 1) {
        sphere_material_ref.current.opacity +=
          delta / config.opacity_animation_time;
        sphere_material_ref.current.opacity = Math.min(
          sphere_material_ref.current.opacity,
          1,
        );
      }
    }

    // perform rotational translation
    const rotational_force =
      (config.rotation_constant_force +
        (lenis?.velocity ?? 0) * config.rotation_scroll_factor) *
      0.001;
    const rotational_damping =
      -rotational_velocity.current *
      config.friction_factor *
      config.rotation_friction;
    rotational_velocity.current += rotational_force + rotational_damping;
    group_ref.current.rotation.z += rotational_velocity.current;

    // perform position translation
    const mouseWorldVec = new Vector3(mouse.x, mouse.y, 0)
      .unproject(state.camera)
      .multiplyScalar(0.25);

    const damp_force_x =
      -config.movement_friction *
      config.friction_factor *
      positional_velocity.current.x;
    const spring_force_x =
      config.spring_factor *
      -config.movement_stiffness *
      (group_ref.current.position.x - mouseWorldVec.x);
    positional_velocity.current.x += spring_force_x + damp_force_x;
    group_ref.current.position.x += positional_velocity.current.x;

    const damp_force_y =
      -config.movement_friction *
      config.friction_factor *
      positional_velocity.current.y;
    const spring_force_y =
      config.spring_factor *
      -config.movement_stiffness *
      (group_ref.current.position.y - mouseWorldVec.y);
    positional_velocity.current.y += spring_force_y + damp_force_y;
    group_ref.current.position.y += positional_velocity.current.y;
  });

  return (
    <group ref={group_ref}>
      <SpinningMesh position={[0, 2, 0]}>
        <boxGeometry />
        <meshStandardMaterial
          opacity={0}
          transparent={true}
          ref={cube_material_ref}
        />
      </SpinningMesh>
      <SpinningMesh position={[0, -2, 0]}>
        <sphereGeometry args={[0.75]} />
        <meshStandardMaterial
          opacity={0}
          transparent={true}
          ref={sphere_material_ref}
        />
      </SpinningMesh>
    </group>
  );
}

export default function Background() {
  const isDarkMode = useMediaQuery({
    query: '(prefers-color-scheme: dark)',
  });

  return (
    <div id={'bg'}>
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
            color1={isDarkMode ? '#767676' : '#c9c9c9'}
            color2={isDarkMode ? '#000000' : '#FFFFFF'}
          />
          <Bloom intensity={isDarkMode ? 0.05 : 0} luminanceThreshold={0} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
