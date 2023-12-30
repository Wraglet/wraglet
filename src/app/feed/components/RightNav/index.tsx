'use client';

import Avatar from '@/components/Avatar';
import { UserInterface } from '@/interfaces';
import { useState, useEffect } from 'react';
import { IoPersonAddSharp } from 'react-icons/io5';

const RigthNav = ({ otherUsers }: { otherUsers: UserInterface[] }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // This forces a rerender, so the date is rendered
    // the second time but not the first
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return (
    <section className='hidden tablet:flex xl:w-[360px] md:w-[280px] relative h-[calc(100vh-56px)]'>
      <div
        className={`top-14 lg:flex bottom-0 mt-4 fixed overflow-y-auto right-0 3xl:right-auto 2xl:w-[360px] md:w-[280px]`}
      >
        <div className='w-full drop-shadow-md  px-4 py-3'>
          <div className='flex flex-col w-full gap-y-3.5'>
            <h6 className={`ml-4 font-normal text-xs text-[#333333]`}>
              Friend Suggestions
            </h6>

            {otherUsers.map((user) => (
              <div
                key={user._id}
                className='flex rounded-lg group px-3 h-[50px] hover:ring-1 hover:ring-solid hover:bg-white hover:ring-neutral-200 items-center cursor-pointer'
              >
                <div className='flex items-center space-x-2 flex-1'>
                  <Avatar
                    gender={user.gender}
                    className='group-hover:border-white'
                    alt={`${user.firstName}'s Profile`}
                    src={user.profilePicture?.url}
                  />
                  <div className='flex flex-col gap-y-0.5'>
                    <div className='flex items-center gap-4'>
                      <h3 className='group-hover:text-gray-700 text-sm font-semibold text-[#333333]'>
                        {user.firstName} {user.lastName}{' '}
                      </h3>
                      {/* <FaPlus className='hover:text-blue-500 text-sm' /> */}
                      <span className='border border-solid border-[#333333] hover:border-blue-500 text-xs font-semibold text-[#333333] hover:text-blue-500 rounded px-1'>
                        Follow
                      </span>
                    </div>
                    <h4 className='group-hover:text-gray-700 text-[10px] font-semibold text-[#333333]'>
                      {user.friends.length} mutual friends
                    </h4>
                  </div>
                </div>

                <IoPersonAddSharp className='hover:text-blue-500' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RigthNav;
