'use client'

import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { r3f } from '@/helpers/global'
import * as THREE from 'three'
import { useGLTF, OrbitControls, Stage, CameraShake, useAnimations } from '@react-three/drei'

export default function Scene({ ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}
      // frameloop="demand" // r3f  節省效能
      frameloop="always" // r3f  節省效能
      onCreated={(state) => (state.gl.toneMapping = THREE.AgXToneMapping)}
      shadows
      // camera={{ fov: 50 }}
      camera={{ position: [0, 0, 10], fov: 10 + 2 }}
    >
      {/* @ts-ignore */}
      <r3f.Out />
      <Preload all />
      <OrbitControls autoRotate autoRotateSpeed={0.05} enableZoom={false} makeDefault minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
      {/* <OrbitControls autoRotate autoRotateSpeed={4} enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.1} maxPolarAngle={Math.PI / 2.1} /> */}
      {/* <OrbitControls makeDefault /> */}
      {/* <CameraShake
        maxYaw={0.1} // Max amount camera can yaw in either direction
        maxPitch={0.1} // Max amount camera can pitch in either direction
        maxRoll={0.1} // Max amount camera can roll in either direction
        yawFrequency={0.1} // Frequency of the the yaw rotation
        pitchFrequency={0.1} // Frequency of the pitch rotation
        rollFrequency={0.1} // Frequency of the roll rotation
        intensity={1} // initial intensity of the shake
        decayRate={0.65} // if decay = true this is the rate at which intensity will reduce at />
      /> */}
    </Canvas>
  )
}
