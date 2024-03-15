'use client'

// import Link from 'next/link'
import { See2clubLogo } from '@/components/svg/Logo'
import { useEffect, useState } from 'react';
import styles from './Tabs.module.css';

function LinksTabs() {

  return (
    <div className="relative mx-8 mt-4 flex h-10 items-center rounded-full bg-black p-1 shadow">
      <div className="flex w-full justify-center">
        <button>Left</button>
      </div>
      <div className="flex w-full justify-center">
        <button>Right</button>
      </div>
      <span
        className="elSwitch absolute left-1 top-[4px] flex h-8 w-1/2 items-center justify-center rounded-full bg-[#212121] text-white shadow transition-all ">
        Text
      </span>
    </div>
  );
}

export default LinksTabs
