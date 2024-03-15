'use client'

import dynamic from 'next/dynamic'
import Head from "next/head";
import See2Navbar from '@/components/dom/See2Navbar'
import LinksTabs from '@/components/dom/LinksTabs';
// import { FooterSvg } from '@/components/svg/Footer';
const Blob = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Blob), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
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
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })
// my avatar 
export default function Page() {
  return (
    <div className='overflow-auto bg-black  pt-12'>
      <Head>
        <title>This page has a title 🤔</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='fixed top-0 w-full'>
        <See2Navbar />
      </div>
      <div className=" flex  w-full flex-col rounded bg-[#171717] px-4 shadow">
        <div className='flex'>
          <p className='text-2xl font-bold text-white'>My Avatar</p>
        </div>
        <p className='text-2xl font-bold text-white'>My Avatar</p>
        <p className='text-2xl font-bold text-white'>My Avatar</p>
        <p className='text-2xl font-bold text-white'>My Avatar</p>
        <LinksTabs />
      </div>
      <div className=" flex  w-full flex-col rounded bg-black px-4 shadow">
        <div className='w-full bg-[#171717]'>
          <p className='text-2xl font-bold text-white'>My Avatar</p>
        </div>
        <LinksTabs />
      </div>
      <div className='flex w-full  flex-col bg-black'>
        <LinksTabs />
      </div>
      {/* <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5'>
        <div className='flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left'>
          <p className='w-full uppercase'>Next + React Three Fiber</p>
          <h1 className='my-4 text-5xl font-bold leading-tight'>Next 3D Starter</h1>
          <p className='mb-8 text-2xl leading-normal'>A minimalist starter for React, React-three-fiber and Threejs.</p>
        </div>
      </div> */}
      {/* <View className='absolute top-0 flex h-screen w-full flex-col items-center justify-center'>
        <Blob />
        <Common />
      </View> */}
      <div className='fixed bottom-0 w-full'>
        {/* <FooterSvg /> */}
      </div>

    </div>
  )
}
