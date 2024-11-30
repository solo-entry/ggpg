import Logo from '@/app/assets/logo.png';
import Link from 'next/link';
import { ArrowUpRightIcon, MenuIcon } from 'lucide-react';

export default function LandingHeader() {
  return (
    <div
      className={
        'flex w-full flex-row items-center justify-between border-b border-neutral-200 px-8 py-6'
      }
    >
      <div className={'flex w-[200px] flex-row items-center'}>
        <div className={'-ml-6 cursor-pointer px-4 lg:hidden'}>
          <MenuIcon />
        </div>
        <img src={Logo.src} alt={'logo'} className={'h-[40]'} />
      </div>
      <div className={'hidden flex-1 flex-row justify-center gap-4 lg:flex'}>
        <Link href={'/'}>Home</Link>
        <Link href={'/explore'}>Explore</Link>
        <Link href={'/authors'}>Authors</Link>
      </div>
      <div className={'flex w-[200px] justify-end'}>
        <div
          className={
            'flex items-center justify-center gap-1 rounded-full bg-black px-4 py-2 text-sm text-white'
          }
        >
          <ArrowUpRightIcon />
          Explore More
        </div>
      </div>
    </div>
  );
}
