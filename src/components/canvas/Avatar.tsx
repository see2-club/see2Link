import React, { Suspense, useEffect, useRef, useState, useTransition } from 'react'
import * as ReactDOM from 'react-dom'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, PerspectiveCamera, OrbitControls, Stats } from '@react-three/drei';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRM, VRMLoaderPlugin, VRMHumanBoneName } from '@pixiv/three-vrm'
// import type * as VRMSchema from '@pixiv/types-vrm-0.0'
import { Light, Object3D } from 'three'
import { useControls } from 'leva'

import { AccumulativeShadows, RandomizedLight, Center, Environment } from '@react-three/drei'
// import { EnvironmentScene, CustomCamera, LightStudio } from './scene/Env'
/*

inspired by https://twitter.com/yeemachine/status/1414993821583118341

*/

const Avatar = () => {
  const { ...controls } = useControls({
    Head: { value: 0, min: -0.4, max: 0.4 },
    leftArm: { value: 0, min: -0.4, max: 0.4 },
    rightArm: { value: 0, min: -0.4, max: 0.4 },
    Neutral: { value: 0, min: 0, max: 1 },
    Angry: { value: 0, min: 0, max: 1 },
    Relaxed: { value: 0, min: 0, max: 1 },
    Happy: { value: 0, min: 0, max: 1 },
    Sad: { value: 0, min: 0, max: 1 },
    Surprised: { value: 0, min: 0, max: 1 },
    Extra: { value: 0, min: 0, max: 1 }
  })
  const { scene, camera } = useThree()
  // const gltf = useGLTF('/three-vrm-girl.vrm')
  const [gltf, setGltf] = useState<GLTF>()
  const [progress, setProgress] = useState<number>(0)
  const avatar = useRef<VRM>()
  const [bonesStore, setBones] = useState<{ [part: string]: Object3D }>({})

  // const loader = new GLTFLoader()
  // loader.register((parser) => new VRMLoaderPlugin(parser)) // here we are installing VRMLoaderPlugin

  useEffect(() => {
    if (!gltf) {
      // VRMUtils.removeUnnecessaryJoints(gltf.scene)

      // VRM.from(gltf as GLTF).then((vrm) => {

      const loader = new GLTFLoader()
      loader.register((parser) => {
        return new VRMLoaderPlugin(parser)
      })

      loader.load(
        '/assets/model/three-vrm-girl.vrm',
        (gltf) => {
          setGltf(gltf)
          const vrm: VRM = gltf.userData.vrm
          avatar.current = vrm
          vrm.lookAt.target = camera

          vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.Hips).rotation.y = Math.PI
          // console.log(vrm.blendShapeProxy.exp  ressions)
          // console.log(vrm.expressionManager.expressions)
          const expressionNames = vrm.expressionManager.expressions.map((expression) => expression.expressionName)
          console.log(expressionNames)
          // VRMUtils.rotateVRM0(vrm)

          const bones = {
            head: vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.Head),
            neck: vrm.humanoid.getRawBoneNode(VRMHumanBoneName.Neck),
            hips: vrm.humanoid.getRawBoneNode(VRMHumanBoneName.Hips),
            spine: vrm.humanoid.getRawBoneNode(VRMHumanBoneName.Spine),
            upperChest: vrm.humanoid.getRawBoneNode(VRMHumanBoneName.UpperChest),
            leftArm: vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.LeftUpperArm),
            rightArm: vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.RightUpperArm)
          }

          // bones.rightArm.rotation.z = -Math.PI / 4

          setBones(bones)
        },

        // called as loading progresses
        (xhr) => {
          setProgress((xhr.loaded / xhr.total) * 100)
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        // called when loading has errors
        (error) => {
          console.log('An error happened')
          console.log(error)
        }
      )
    }
  }, [scene, gltf, camera])

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime()

    if (avatar.current) {
      avatar.current.update(delta)
      const blinkDelay = 10
      const blinkFrequency = 3
      if (Math.round(t * blinkFrequency) % blinkDelay === 0) {
        avatar.current.expressionManager.setValue('blink', 1 - Math.abs(Math.sin(t * blinkFrequency * Math.PI)))
      }
      avatar.current.expressionManager.setValue('neutral', controls.Neutral)
      avatar.current.expressionManager.setValue('angry', controls.Angry)
      avatar.current.expressionManager.setValue('relaxed', controls.Relaxed)
      avatar.current.expressionManager.setValue('happy', controls.Happy)
      avatar.current.expressionManager.setValue('sad', controls.Sad)
      avatar.current.expressionManager.setValue('Surprised', controls.Surprised)
      avatar.current.expressionManager.setValue('Extra', controls.Extra)
    }
    if (bonesStore.neck) {
      bonesStore.neck.rotation.y = (Math.PI / 100) * Math.sin((t / 4) * Math.PI)
    }
    // if (bonesStore.spine) {
    //   // bonesStore.spine.position.x = (Math.PI / 300) * Math.sin((t / 4) * Math.PI)
    //   // bonesStore.spine.position.z = (Math.PI / 300) * Math.cos((t / 4) * Math.PI)
    // }

    if (bonesStore.upperChest) {
      bonesStore.upperChest.rotation.y = (Math.PI / 600) * Math.sin((t / 8) * Math.PI)
      bonesStore.spine.position.y = (Math.PI / 400) * Math.sin((t / 2) * Math.PI)
      bonesStore.spine.position.z = (Math.PI / 600) * Math.sin((t / 2) * Math.PI)
    }
    if (bonesStore.head) {
      bonesStore.head.rotation.y = controls.Head * Math.PI
    }

    if (bonesStore.leftArm) {
      // bonesStore.leftArm.position.y = leftArm
      bonesStore.leftArm.rotation.z = controls.leftArm * Math.PI
    }
    if (bonesStore.rightArm) {
      bonesStore.rightArm.rotation.z = controls.rightArm * Math.PI
    }
  })
  return (
    <>
      {gltf ? (
        <>
          <primitive object={gltf.scene} />
        </>
      ) : (
        <Html center>{progress} % loaded</Html>
      )}
    </>
  )
}

export default Avatar
// export default function App() {
//   return (
//     <Canvas gl={{ logarithmicDepthBuffer: true }} shadows dpr={[1, 2]}>
//       <Stats showPanel={0} className="stats" />
//       {/* <CustomCamera /> */}
//       <ambientLight intensity={0.65} />
//       {/* <spotLight position={[0, 2, -1]} intensity={0.4} /> */}
//       {/* <Center top> */}
//       <Suspense fallback={null}>
//         {/* <LoadingAvatar /> */}
//       </Suspense>
//       {/* </Center> */}
//       <OrbitControls target={[0, 1.3, 0]} />
//       {/* <LightStudio/> */}
//       {/* <EnvironmentScene /> */}
//     </Canvas>)
// }

// ReactDOM.render(
//   <Canvas camera={{ position: [0, 1.3, 0.6] }}>
//     <ambientLight intensity={0.65} />
//     {/* <spotLight position={[0, 2, -1]} intensity={0.4} /> */}
//     <Suspense fallback={null}>
//       <Avatar />
//     </Suspense>
//     <OrbitControls target={[0, 1.3, 0]} />
//   </Canvas>,
//   document.getElementById('root')
// )
