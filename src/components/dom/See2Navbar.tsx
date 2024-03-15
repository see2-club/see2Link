import Link from 'next/link'
import { See2clubLogo } from '@/components/svg/Logo'
function See2Navbar() {
  return (
    <nav className='flex flex-row items-center justify-between bg-[#171717] p-4 text-white '>
      <See2clubLogo />
      <Link href="/">首頁</Link>
      <Link href="/about">關於我們</Link>
      <Link href="/contact">聯絡我們</Link>
    </nav>
  )
}

export default See2Navbar