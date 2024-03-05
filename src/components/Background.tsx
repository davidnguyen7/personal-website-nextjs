'use client';

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { Effect } from "postprocessing";
import { forwardRef, useMemo, useRef } from "react";
import { Group, Mesh } from "three";

const fragmentCode = /* glsl */`
    mat4 ditherMatrix = mat4(
      vec4(00.0/16.0, 12.0/16.0, 03.0/16.0, 15.0/16.0),
      vec4(08.0/16.0, 04.0/16.0, 11.0/16.0, 07.0/16.0),
      vec4(02.0/16.0, 14.0/16.0, 01.0/16.0, 13.0/16.0),
      vec4(10.0/16.0, 06.0/16.0, 09.0/16.0, 05.0/16.0)
    );

    const float pixel_per_pixels = 2.;

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
      vec2 coord = uv * resolution;
      vec2 pixelcoord = coord - mod(coord, pixel_per_pixels);

      vec4 col = texture(inputBuffer,pixelcoord/resolution);
      float lum = dot(col.rgb, vec3(0.2126, 0.7152, 0.722));

      float bayerLum = ditherMatrix
        [int(mod(mod(pixelcoord.x, pixel_per_pixels*4.)/pixel_per_pixels, 4.))]
        [int(mod(mod(pixelcoord.y, pixel_per_pixels*4.)/pixel_per_pixels, 4.))];

      outputColor = lum > bayerLum ? vec4(1) : vec4(0);
    }
`

class DitherEffectImpl extends Effect {
  constructor() {
    super("DitherEffect", fragmentCode);
  }
}

// eslint-disable-next-line react/display-name
const DitherEffect = forwardRef(({}, ref) => {
  const effect = useMemo(() => new DitherEffectImpl(), [])
  return <primitive ref={ref} object={effect} dispose={null} />
})

function SpinningMesh({position = [0, 0, 0], children}: {position: [x: number, y: number, z: number], children?: React.ReactNode} ) {
    const meshRef = useRef<Mesh>(null!);

    useFrame((_, delta) => {
        meshRef.current.rotation.x += delta;
        meshRef.current.rotation.y += delta;
    })
    return (
        <mesh ref={meshRef} position={position}>
          {children}
        </mesh>
    )
}

function Scene() {
  const groupRef = useRef<Group>(null!);

  useFrame((state, delta) => {
    groupRef.current.rotation.z += delta;
  })

  return (
    <group ref={groupRef}>
      <SpinningMesh position={[0, 2, 0]}>
        <boxGeometry />
        <meshStandardMaterial />
      </SpinningMesh>
      <SpinningMesh position={[0, -2, 0]}>
        <sphereGeometry args={[0.75]}/>
        <meshStandardMaterial />
      </SpinningMesh>
    </group>
  )
}

export default function Background() {
  return (
    <div className={'fixed -z-10 w-full h-full opacity-50'}>
        <Canvas shadows orthographic camera={{zoom: 100, position: [0, 0, 100]}}>
            <ambientLight color={0xffffff}intensity={1} />
            <directionalLight color={0xffffff} intensity={1} />
            <Scene />
            <EffectComposer>
              <DitherEffect />
            </EffectComposer>
        </Canvas>
    </div>
  )
}