'use client'

import { forwardRef, ForwardRefRenderFunction, Suspense, useImperativeHandle, useRef, useState } from 'react'
import { OrbitControls, Stage, PerspectiveCamera, Html, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'
import Avatar from './Avatar'
import LoadingAvatar from './scene/LoadingAvatar'
import { useThree } from '@react-three/fiber'
import { useGLTF, Grid, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing'
import { easing } from 'maath'

export const REMavatar = ({ color = '#ffffff' }) => (
  <Suspense fallback={null}>
    {/* {color && <color attach='background' args={[color]} />} */}
    {/* <ambientLight />
    <pointLight position={[20, 30, 10]} />
    <ambientLight intensity={0.65} />
    <pointLight position={[-10, -10, -10]} /> */}
    {/* <ambientLight intensity={0.5} /> */}
    {/* <directionalLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow shadow-mapSize={[2024, 2024]} /> */}
    <pointLight position={[10, 0, 0]} />
    <ambientLight />
    {/* <ambientLight intensity={0.65} /> */}
    {/* <PerspectiveCamera makeDefault position={[0, 0, 6]} /> */}
    {/* <fog attach="fog" args={['#f0f0f0', 100, 150]} /> */}

    {/* <Stage contactShadow={{ opacity: 1, blur: 2 }}> */}
    <Suspense fallback={null}>
      <group>
        <Html scale={0.18} rotation={[0, 0, 0]} position={[0, 0.72, 0.15]} transform occlude>
          <div className="annotation">
            6.550 $ <span style={{ fontSize: '1.5em' }}>🥲</span>
          </div>
        </Html>
        <LoadingAvatar />
      </group>
    </Suspense>
    {/* <EffectComposer disableNormalPass>
      <Bloom luminanceThreshold={2} mipmapBlur />
      <ToneMapping />
    </EffectComposer> */}
    {/* <fog attach="fog" args={['black', 15, 22.5]} /> */}
    {/* <Grid renderOrder={-1} position={[0, -0.815, 0]} infiniteGrid cellSize={0.6} cellThickness={0.6} sectionSize={3.3 / 5} sectionThickness={1.5} sectionColor={[0.5, 0.5, 10]} fadeDistance={30} /> */}
    {/* <Environment preset="sunset" blur={0.01} /> */}
    {/* <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} /> */}
    {/* <Shadows position={[0, -0.83, 0]} /> */}
    {/* </Stage> */}

    {/* <OrbitControls target={[0, 1.3, 0]} /> */}

    {/* <color attach="background" args={['#fF00f0']} /> */}
  </Suspense>
)

function Shadows(props) {
  const { viewport } = useThree()
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow scale={[viewport.width, viewport.height, 1]} {...props}>
      <planeGeometry args={[5, 5,]} />
      <boxGeometry args={[0.5, 0.5, 0.01]} />
      {/* <meshStandardMaterial color={'orange'} /> */}
      <shadowMaterial transparent opacity={0.5} />
    </mesh>
  )
}


function Box(props) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  return (
    <mesh  {...props} castShadow ref={ref} onPointerOver={(event) => hover(true)} onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      <Html distanceFactor={3}>
        <div className="content">
          hello <br />
          world
        </div>
      </Html>
    </mesh>
  )
}

interface ViewProps {
  children?: React.ReactNode;
  orbit?: boolean;
  [key: string]: any;
}

const View: ForwardRefRenderFunction<HTMLDivElement, ViewProps> = ({ children, orbit, ...props }, ref) => {
  const localRef = useRef(null)
  useImperativeHandle(ref, () => localRef.current)

  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>
          {children}
          {orbit && <OrbitControls />}
        </ViewImpl>
      </Three>
    </>
  )
}

const ForwardedView = forwardRef(View);
ForwardedView.displayName = 'View';

export { ForwardedView as View }