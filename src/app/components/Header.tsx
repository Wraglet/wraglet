'use client';

import Link from 'next/link';
import React from 'react';
import HeaderRightNav from './HeaderRightNav';
import Image from 'next/image';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap'
});

const Header = () => {
  return (
    <header className='h-[56px] w-full bg-[#0EA5E9] px-6 items-center drop-shadow-md grid grid-cols-10 gap-x-10'>
      <div className='flex space-x-1.5 items-center h-full col-span-2'>
        <Link href='/' className='block'>
          <div className='relative h-10 w-10'>
            <Image src={'/images/logo/logo.png'} fill alt='Wraglet' />
          </div>
        </Link>
        <Link
          href={'/'}
          className={`${quicksand.className} text-xl font-bold text-white`}
        >
          wraglet
        </Link>
      </div>
      <div className='col-start-4 col-span-3 h-full flex items-center'>
        <input
          type='search'
          className='bg-[#E7ECF0] w-full h-[30px] rounded-2xl border border-solid border-[#E5E5E5] focus:outline-none px-2 text-sm text-[#333333]'
        />
      </div>
      <HeaderRightNav />
    </header>
  );
};

export default Header;
