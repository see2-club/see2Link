'use client'
import React from 'react';
import Image from 'next/image';

const DemoPage = () => {
  return (
    <div className='flex size-full flex-col bg-red-500'>
      <Image priority src="/img/Home_avatar.png" alt="See2club Logo" width={500} height={500} />
      <h1>這是一個示範頁面</h1>
      <p>在這裡，你可以放置你的內容。</p>
      <p>REM</p>
      <p>Your web3 ID and lifestyle</p>
      <p>Lorem ipsum dolor sit amet consectetur. Vitae in id eget habitasse facilisi non in quam praesent. Quis nunc</p>
    </div>
  );
};

export default DemoPage;