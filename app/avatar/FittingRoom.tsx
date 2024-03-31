'use client'
import React from 'react';
import dynamic from 'next/dynamic'
import Image from 'next/image';
import FittingRoomREMLogo from '@/components/svg/FittingRoomREMLogo'
import FittingSwitch from '@/components/ui/FittingSwitch'
import FittingModal from '@/components/ui/FittingModal'
import FittingModalTabs from '@/components/ui/FittingModalTabs'

const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })
const Dog = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Dog), { ssr: false })
const Duck = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Duck), { ssr: false })
const Blob = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Blob), { ssr: false })
const View = dynamic(() => import('@/components/canvas/REMView').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 size-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const REMavatar = dynamic(() => import('@/components/canvas/REMView').then((mod) => mod.REMavatar), { ssr: false })

function FittingRoomPage() {
  return (
    <div className='flex  size-full flex-col '>
      {/* <Image
        className='FittingRoomBG'
        src="/img/FittingRoomBG.png"
        // width="400"
        // height="400"
        alt="Profile Picture"
        layout='fill'
        objectFit='cover'
      /> */}

      <FittingRoomREMLogo className='fixed left-1/2 top-1/2 z-[-1] w-full -translate-x-1/2 -translate-y-1/2' />
      <div className='fixed right-4 top-1/2 z-30 flex size-8 -translate-y-1/2 rotate-90 flex-row'>
        <FittingSwitch />
        <FittingModal >
          <FittingModalTabs />
        </FittingModal>

      </div>

      <View className='REMavatar z-20 flex size-full min-h-[500px] flex-col items-center justify-center'>
        {/* <Blob />
        <Logo route='/blob' scale={0.6} position={[0, 0, 0]} />
        <Dog scale={2} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
        <Duck route='/blob' scale={2} position={[0, -1.6, 0]} /> */}
        <REMavatar />
      </View>
    </div>
  )
}

export default FittingRoomPage;