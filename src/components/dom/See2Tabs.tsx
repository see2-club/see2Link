'use client'

// import Link from 'next/link'
import { See2clubLogo } from '@/components/svg/Logo'
import { useEffect, useState } from 'react';
import styles from './Tabs.module.css';
import Image from 'next/image';
import FittingRoom from '@/components/svg/FittingRoom';

function See2Tabs() {
  return (
    <div className="z-50 w-full rounded-2xl px-0 shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
      <div className="flex">
        <div className="group flex-1 items-center">
          <a href="#Home" className="mx-auto flex w-full items-center justify-center rounded-3xl px-4 pt-2 text-center text-[#9A97AD] group-hover:bg-slate-600  group-hover:text-white">
            <span className="flex flex-col items-center justify-center p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path d="M4.10001 12L5.96667 10.1333M5.96667 10.1333L12.5 3.60001L19.0333 10.1333M5.96667 10.1333V19.4667C5.96667 19.9821 6.38454 20.4 6.90001 20.4H9.70001M19.0333 10.1333L20.9 12M19.0333 10.1333V19.4667C19.0333 19.9821 18.6155 20.4 18.1 20.4H15.3M9.70001 20.4C10.2155 20.4 10.6333 19.9821 10.6333 19.4667V15.7333C10.6333 15.2179 11.0512 14.8 11.5667 14.8H13.4333C13.9488 14.8 14.3667 15.2179 14.3667 15.7333V19.4667C14.3667 19.9821 14.7845 20.4 15.3 20.4M9.70001 20.4H15.3" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span className="block pb-2 text-xs">Home</span>
              <span className="mx-auto block h-1 w-5 rounded-full group-hover:bg-indigo-500"></span>
            </span>
          </a>
        </div>
        <div className="group flex-1 items-center">
          <a href="#Profile" className="mx-auto flex w-full items-center justify-center rounded-3xl px-4 pt-2 text-center text-[#9A97AD] group-hover:bg-slate-600  group-hover:text-white">
            <span className="flex flex-col items-center justify-center p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path d="M16.5 7C16.5 9.20914 14.7091 11 12.5 11C10.2909 11 8.5 9.20914 8.5 7C8.5 4.79086 10.2909 3 12.5 3C14.7091 3 16.5 4.79086 16.5 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12.5 14C8.63401 14 5.5 17.134 5.5 21H19.5C19.5 17.134 16.366 14 12.5 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span className="block pb-2 text-xs">Profile</span>
              <span className="mx-auto block h-1 w-5 rounded-full group-hover:bg-indigo-500"></span>
            </span>
          </a>
        </div>
        <div className="group flex-1 items-center">
          <a href="#FittingRoom" className="mx-auto flex w-full items-center justify-center rounded-3xl px-4 pt-2 text-center text-[#9A97AD] group-hover:bg-slate-600  group-hover:text-white">
            <span className="flex flex-col items-center justify-center p-1">
              <FittingRoom className='size-6' />
              <span className="block pb-2 text-xs">Fitting Room</span>
              <span className="mx-auto block h-1 w-5 rounded-full group-hover:bg-indigo-500"></span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
// function See2Tabs() {

//   const [activeButton, setActiveButton] = useState('Fitting Room');

//   const buttonClasses = 'inline-flex w-full flex-col items-center gap-2 rounded-md px-4 py-2 text-sm transition-colors duration-200';
//   const activeClasses = 'bg-white bg-opacity-10 text-white';
//   const inactiveClasses = 'text-gray-500 hover:text-gray-700 focus:relative';

//   useEffect(() => {
//     console.log(activeButton); // 這裡會在 activeButton 改變時印出新的值
//   }, [activeButton]);


//   return (
//     <div>
//       <div className="  sm:block" style={{ backgroundColor: 'rgba(12, 12, 12, 0.8)' }}>
//         <div className="border-b border-gray-200">
//           <nav className="-mb-px flex gap-6">
//             <button
//               className={`${buttonClasses} ${activeButton === 'HOME' ? activeClasses : inactiveClasses}`}
//               onClick={() => setActiveButton('HOME')}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke-width="1.5"
//                 stroke="currentColor"
//                 className="size-4"
//               >
//                 <path
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
//                 />
//               </svg>

//               HOME
//             </button>

//             <button
//               className={`${buttonClasses} ${activeButton === 'Profile' ? activeClasses : inactiveClasses}`}
//               onClick={() => setActiveButton('Profile')}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke-width="1.5"
//                 stroke="currentColor"
//                 className="size-4"
//               >
//                 <path
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
//                 />
//                 <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>

//               Profile
//             </button>

//             <button
//               className={`${buttonClasses} ${activeButton === 'Fitting Room' ? activeClasses : inactiveClasses}`}
//               onClick={() => setActiveButton('Fitting Room')}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke-width="1.5"
//                 stroke="currentColor"
//                 className="size-4"
//               >
//                 <path
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
//                 />
//               </svg>

//               Fitting Room
//             </button>
//           </nav>
//           <h1>${activeButton}</h1>
//         </div>
//       </div>
//     </div>
//   )
// }

export default See2Tabs