'use client'

import { forwardRef, ForwardRefRenderFunction, Suspense, useImperativeHandle, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'


export const Common = ({ color = '#ffffff' }) => (
  <Suspense fallback={null}>
    {color && <color attach='background' args={[color]} />}
    <ambientLight />
    <pointLight position={[20, 30, 10]} />
    {/* <ambientLight intensity={0.65} /> */}
    <pointLight position={[-10, -10, -10]} />
    <PerspectiveCamera makeDefault position={[0, 0, 6]} />
  </Suspense>
)

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