'use client';

import { Menu, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import React, { Fragment } from 'react';
import { FaCircleUser, FaRegCircleUser } from 'react-icons/fa6';
import {
  HiCog,
  HiOutlineCog,
  HiArrowRightOnRectangle,
  HiOutlineArrowRightOnRectangle
} from 'react-icons/hi2';
import Avatar from './Avatar';
import Link from 'next/link';
import { useAppSelector } from '@/libs/hooks';

const AvatarMenu = () => {
  const { user } = useAppSelector((state) => state.userState);
  return (
    <Menu as='li' className='inline-flex'>
      <Menu.Button className='relative h-8 w-8 cursor-pointer border border-solid border-white rounded-full'>
        <Avatar
          gender={user!.gender}
          size='h-8 w-8'
          src={'/images/placeholder/male-placeholder.png'}
          alt={'Avatar'}
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-6 mt-12 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
          <div className='px-1 py-1 '>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`${user!.username}`}
                  className={`${
                    active ? 'bg-[#1B87EA] text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <FaCircleUser className='mr-2 h-5 w-5' aria-hidden='true' />
                  ) : (
                    <FaRegCircleUser
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  )}
                  {user!.firstName}
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-[#1B87EA] text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <HiCog className='mr-2 h-5 w-5' aria-hidden='true' />
                  ) : (
                    <HiOutlineCog className='mr-2 h-5 w-5' aria-hidden='true' />
                  )}
                  Account Settings
                </button>
              )}
            </Menu.Item>
          </div>
          <div className='px-1 py-1'>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => signOut()}
                  className={`${
                    active ? 'bg-[#1B87EA] text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <HiArrowRightOnRectangle
                      className='mr-2 h-5 w-5 text-[#bg-[#1B87EA]]'
                      aria-hidden='true'
                    />
                  ) : (
                    <HiOutlineArrowRightOnRectangle
                      className='mr-2 h-5 w-5 text-red-400'
                      aria-hidden='true'
                    />
                  )}
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AvatarMenu;
