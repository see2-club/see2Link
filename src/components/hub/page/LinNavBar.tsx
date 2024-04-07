import Link from 'next/link'
import React, { useState } from 'react';

import { See2clubLogo } from '@/components/svg/Logo'
function See2LinNavBar() {

  return (
    <>
      <div className='fixed z-50 flex h-16 w-full flex-col-reverse items-stretch border-b bg-neutral-900 md:inset-x-2 md:top-2 md:w-auto md:flex-row md:items-center md:rounded-full'>
        <div className='mx-auto flex max-w-screen-xl flex-col px-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8'>
          <div className='flex flex-row items-center justify-between p-4'>
            <Link href='#' className='dark-mode:text-white focus:shadow-outline rounded-lg text-lg font-semibold uppercase tracking-widest text-gray-900 focus:outline-none'>
              <See2clubLogo />
            </Link>
            <div className="dropdown ">
              <div tabIndex={0} role="button" className="btn m-0 h-2 p-0 ">
                Theme
                <svg width="8px" height="8px" className="inline-block size-2 fill-current opacity-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] w-52 rounded-box bg-base-300 p-2 shadow-2xl">
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-ghost btn-sm btn-block justify-start" aria-label="Default" value="default" /></li>

                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-ghost btn-sm btn-block justify-start" aria-label="see2" value="see2" /></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-ghost btn-sm btn-block justify-start" aria-label="Retro" value="retro" /></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-ghost btn-sm btn-block justify-start" aria-label="Cyberpunk" value="cyberpunk" /></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-ghost btn-sm btn-block justify-start" aria-label="Valentine" value="valentine" /></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-ghost btn-sm btn-block justify-start" aria-label="Aqua" value="aqua" /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='h-16'>

      </div>
    </>

  )
}

export default See2LinNavBar

//   < div className = ' fixed z-50 flex h-16 w-full flex-col-reverse items-stretch border-b bg-neutral-900 md:inset-x-2 md:top-2 md:w-auto md:flex-row md:items-center md:rounded-full' >
//     <See2clubLogo />
// {/* <nav className=' absolute z-auto flex h-16 flex-row  items-center justify-between bg-neutral-900 p-4 text-white '>
//         <See2clubLogo />
//         <Link href="/">首頁</Link>
//         <Link href="/about">關於我們</Link>
//         <Link href="/contact">聯絡我們</Link>
//       </nav>
//       <See2clubLogo />
//       <Link href="/">首頁</Link>
//       <Link href="/about">關於我們</Link>
//       <Link href="/contact">聯絡我們</Link> */}

//     </ >