import React from 'react';

// 定義 FooterSvg 元件
const FooterSvg = () => {
  // 在這裡放入你的 logo 程式碼
  return (
    <div className='flex w-full justify-center bg-black p-2'>
      <svg className='size-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M15 19l-7-7 7-7'
        />
      </svg>
    </div>
  );
};

export { FooterSvg };