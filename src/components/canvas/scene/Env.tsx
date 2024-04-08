// import React, { useEffect, useRef, useState, useTransition } from 'react'
// import { PerspectiveCamera, OrbitControls, Center, AccumulativeShadows, RandomizedLight } from '@react-three/drei';
// // import type * as VRMSchema from '@pixiv/types-vrm-0.0'
// import { useControls } from 'leva'
// import { Environment } from '@react-three/drei'
// import { useStore } from '../store/store'; // Replace with the actual path to your store file
// import * as THREE from 'three';

// // export const CustomCamera = React.memo(({ ...props }) => {
// //   const virtualCamera = useRef<THREE.Camera>();
// //   return (
// //     <>
// //       <PerspectiveCamera name="FBO Camera" ref={virtualCamera} position={[0, 1.3, 0.6]} fov={1} aspect={window.innerWidth / window.innerHeight} near={0.1} far={20} />
// //       {/* <PerspectiveCamera name="FBO Camera" ref={virtualCamera} position={[0, 1.3, 0.6]} fov={30} aspect={window.innerWidth / window.innerHeight} near={0.1} far={20} /> */}
// //       {/* <OrbitControls camera={virtualCamera.current} {...props} enabled={true} screenSpacePanning={true} target={[0.0, 1.0, 0.0]} /> */}
// //     </>
// //   );
// // });

// // CustomCamera.displayName = 'CustomCamera';

// type PresetType = 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby';

// export function EnvironmentScene() {
//   const [preset, setPreset] = useState<PresetType>('sunset');
//   // You can use the "inTransition" boolean to react to the loading in-between state,
//   // For instance by showing a message
//   const [inTransition, startTransition] = useTransition()
//   const { blur, near, far, resolution } = useControls('env', {
//     blur: { value: 0.05, min: 0, max: 1 },
//     near: { value: 1, min: 0, max: 1000 },
//     far: { value: 1000, min: 0, max: 1000 },
//     resolution: { value: 256, min: 0, max: 1024 },
//     preset: {
//       value: preset,
//       options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
//       // If onChange is present the value will not be reactive, see https://github.com/pmndrs/leva/blob/main/docs/advanced/controlled-inputs.md#onchange
//       // Instead we transition the preset value, which will prevents the suspense bound from triggering its fallback
//       // That way we can hang onto the current environment until the new one has finished loading ...
//       onChange: (value) => startTransition(() => setPreset(value))
//     }
//   })
//   return <Environment background blur={blur} near={near} far={far} resolution={resolution} files="/hdr/canary_wharf_1k.hdr" />
//   // return <Environment background near={1} far={1000} resolution={256} files="/hdr/cyclorama_hard_light_1k.hdr" />
//   // return <Environment background near={1} far={1000} resolution={256} preset="warehouse"/>
//   {/* return <Environment preset={preset} background blur={blur} /> */ }
// }


// export function Sphere() {
//   const { roughness, visibleSphere } = useControls('env', { visibleSphere: false, roughness: { value: 1, min: 0, max: 1 } })
//   return (
//     <Center top>
//       <mesh castShadow visible={visibleSphere}>
//         <sphereGeometry args={[0.75, 64, 64]} />
//         <meshStandardMaterial metalness={1} roughness={roughness} />
//       </mesh>
//     </Center>
//   )
// }

// export function LightStudio() {
//   const { color, colorBlend, opacity, scale, alphaTest, amount, radius, ambient, bias, position } = useControls('env', {
//     color: '#ff0000',
//     colorBlend: 0.5,
//     opacity: 1,
//     scale: 10,
//     alphaTest: 0.85,
//     roughness: { value: 1, min: 0, max: 1 },
//     amount: { value: 8, min: 0, max: 20, step: 1 },
//     radius: { value: 5, min: 0, max: 20, step: 1 },
//     ambient: { value: 0.5, min: 0, max: 1, step: 0.1 },
//     bias: { value: 0.001, min: 0, max: 0.01, step: 0.001 },
//     position: { x: 0, y: 0, z: -0.07 },
//   })
//   return (
//     <group position={[0, -0.65, 0]}>
//       {/* <Sphere /> */}
//       {/* <AccumulativeShadows temporal frames={200} color={color} colorBlend={colorBlend} opacity={opacity} scale={scale} alphaTest={alphaTest}> */}
//       <RandomizedLight amount={amount} radius={radius} ambient={ambient} position={[position.x, position.z, position.y]} bias={bias} />
//       {/* </AccumulativeShadows> */}
//     </group>
//   )
// }
