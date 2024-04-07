import Link from 'next/link'
import { See2clubLogo } from '@/components/svg/Logo'
function See2HubNavBar() {
  return (
    <div className=' fixed z-50 flex h-16 w-full flex-col-reverse items-stretch border-b bg-neutral-900 md:inset-x-2 md:top-2 md:w-auto md:flex-row md:items-center md:rounded-full'>
      <div className=''>
        <See2clubLogo />
      </div>
      <nav className=' flex  flex-row  items-center justify-between bg-neutral-900 p-1 text-white '>
        <See2clubLogo />
        <Link href="/">首頁</Link>
        <Link href="/about">關於我們</Link>
        <Link href="/contact">聯絡我們</Link>
      </nav>
      {/* <nav className=' absolute z-auto flex h-16 flex-row  items-center justify-between bg-neutral-900 p-4 text-white '>
        <See2clubLogo />
        <Link href="/">首頁</Link>
        <Link href="/about">關於我們</Link>
        <Link href="/contact">聯絡我們</Link>
      </nav>
      <See2clubLogo />
      <Link href="/">首頁</Link>
      <Link href="/about">關於我們</Link>
      <Link href="/contact">聯絡我們</Link> */}

    </div>

  )
}

export default See2HubNavBar