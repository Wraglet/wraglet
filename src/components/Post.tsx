'use client'

import Avatar from '@/components/Avatar'
import Button from '@/components/Button'
import { ShareIcon } from '@/components/Icons'
import { PostInterface } from '@/interfaces'
import { useAppSelector } from '@/libs/redux/hooks'
import { RootState } from '@/libs/redux/store'
import arrGenerator from '@/utils/arrGenerator'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import {
  FaRegComment,
  FaRegHeart,
  FaRegFaceLaugh,
  FaRegFaceSadTear,
  FaRegFaceAngry,
  FaRegFaceMeh
} from 'react-icons/fa6'
import { LuArrowBigUp, LuArrowBigDown } from 'react-icons/lu'

type Props = {
  post: PostInterface
}

const Post = ({ post }: Props) => {
  useEffect(() => {
    import('@lottiefiles/lottie-player')
  })
  const { user } = useAppSelector((state: RootState) => state.userState)
  const [isOpenComment, setIsOpenComment] = useState(false)
  const content = useRef<HTMLDivElement | null>(null)

  const [showEmojis, setShowEmojis] = useState(false)
  const timeoutRef = useRef<number | null>(null)
  const emojisTimeout = useRef<number | null>(null)
  const emojisRef = useRef<HTMLDivElement | null>(null)

  const reactions = [
    {
      name: 'like',
      ref: useRef(null)
    },
    {
      name: 'love',
      ref: useRef(null)
    },
    {
      name: 'haha',
      ref: useRef(null)
    },
    {
      name: 'wow',
      ref: useRef(null)
    },
    {
      name: 'sad',
      ref: useRef(null)
    },
    {
      name: 'angry',
      ref: useRef(null)
    }
  ]

  const handlePressStart = () => {
    timeoutRef.current = window.setTimeout(() => {
      setShowEmojis(true)
    }, 500) // Set your desired long press duration
  }

  const handlePressEnd = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setShowEmojis(false)
  }

  const [height, setHeight] = useState<string>('0px')

  useEffect(() => {
    if (isOpenComment) {
      setHeight(`${content.current?.scrollHeight}px`)
    }

    if (!isOpenComment) {
      setHeight('0px')
    }
  }, [isOpenComment])

  const toggleComment = () => {
    setIsOpenComment((prev) => !prev)
    setHeight(isOpenComment ? `${content.current?.scrollHeight}px` : '0px')
  }

  const handleHoverStart = () => {
    emojisTimeout.current = window.setTimeout(() => {
      setShowEmojis(true)
    }, 200) // Delay for showing emojis on hover
  }

  const handleHoverEnd = () => {
    if (emojisTimeout.current) {
      clearTimeout(emojisTimeout.current)
      emojisTimeout.current = null
    }
    setShowEmojis(false)
  }

  const handleEmojiHoverStart = () => {
    if (emojisTimeout.current) {
      clearTimeout(emojisTimeout.current)
      emojisTimeout.current = null
    }
    setShowEmojis(true)
  }

  const handleEmojiHoverEnd = () => {
    setShowEmojis(false)
  }

  const handleReaction = async (type: string) => {
    try {
      const response = await fetch(`/api/posts/${post._id}/react`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type })
      })

      if (response.ok) {
        // You can handle success, e.g., update the UI
        console.log(`Reaction '${type}' added successfully`)
      } else {
        // Handle error
        console.error('Failed to add reaction:', response.statusText)
      }
    } catch (error) {
      console.error('Error adding reaction:', error)
    }
  }

  return (
    <div className='flex w-full'>
      <div className='sm:rounded-lg drop-shadow-md bg-white border border-solid border-neutral-200 flex px-4 py-3 gap-x-2 w-full items-start justify-between'>
        <div className='block relative'>
          <Avatar
            gender={post.author?.gender}
            src={post.author.profilePicture?.url}
          />
        </div>
        <div className='flex flex-col gap-y-5 flex-grow justify-start'>
          <div className='flex flex-col gap-y-1'>
            <div className='flex space-x-1 items-baseline'>
              <h3 className={`text-sm font-bold leading-none`}>
                {post.author.firstName} {post.author.lastName}
              </h3>
              <svg
                className='self-center'
                width='2'
                height='3'
                viewBox='0 0 2 3'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx='1' cy='1.85547' r='1' fill='#4B5563' />
              </svg>
              {post.createdAt && (
                <h4 className='text-xs text-zinc-500'>
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true
                  })}
                </h4>
              )}
            </div>
            {post.content.text && (
              <p className='text-gray-600 text-xs'>{post.content.text}</p>
            )}

            {post.content.images
              ? post.content.images.map((image) => (
                  <div
                    key={image.key}
                    className='block rounded-md overflow-hidden my-3'
                  >
                    <Image
                      src={image.url}
                      alt='Post Image'
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      width={1}
                      height={1}
                      style={{
                        height: 'auto',
                        width: '100%'
                      }}
                    />
                  </div>
                ))
              : null}
          </div>
          <div className='flex justify-between items-center z-10 bg-white'>
            <div className='flex items-center gap-1 border border-solid border-gray-400 rounded-full px-2 py-0.5'>
              <LuArrowBigUp className='text-xs text-gray-600 cursor-pointer' />
              <span className='text-xs text-gray-600 cursor-pointer'>12</span>
              <LuArrowBigDown className='text-xs text-gray-600 cursor-pointer' />
            </div>
            <div className='flex items-center gap-1 border border-solid border-gray-400 rounded-full px-2 py-0.5'>
              <FaRegComment
                className='text-xs text-gray-600 cursor-pointer'
                onClick={toggleComment}
              />
            </div>
            <div
              role='button'
              tabIndex={0}
              className='flex items-center gap-1 border border-solid border-gray-400 rounded-full px-2 py-0.5 relative'
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
            >
              <FaRegHeart
                className='text-xs text-gray-600 cursor-pointer'
                onClick={() => handleReaction('heart')}
              />
              {showEmojis && (
                <div
                  onMouseEnter={handleEmojiHoverStart}
                  onMouseLeave={handleEmojiHoverEnd}
                  ref={emojisRef}
                  className='absolute -top-8 bg-white border border-solid border-gray-400 rounded-full p-2 flex gap-1 w-fit px-2 py-0.5 -translate-x-9 -translate-y-0.5'
                >
                  {reactions.map((reaction) => (
                    <lottie-player
                      key={reaction.name}
                      id={reaction.name}
                      ref={reaction.ref}
                      autoplay
                      loop
                      mode='normal'
                      src={`/lottie/${reaction.name}.json`}
                      onClick={() => handleReaction(reaction.name)}
                      onMouseEnter={handleEmojiHoverStart}
                      onMouseLeave={handleEmojiHoverEnd}
                      style={{ width: '24px', height: '24px' }}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className='flex items-center gap-1 border border-solid border-gray-400 rounded-full px-2 py-0.5'>
              <ShareIcon className='text-xs text-gray-600 cursor-pointer' />
            </div>
          </div>

          <div
            style={{ maxHeight: `${height}` }}
            ref={content}
            className={`${
              isOpenComment ? 'border-t border-solid border-[#E7ECF0]' : '-mt-6'
            } w-full flex flex-col pt-2 overflow-hidden transition-all duration-300 ease-in-out gap-4`}
          >
            <div className='flex items-center gap-2'>
              <Avatar
                gender={user?.gender}
                size='h-6 w-6'
                src={user?.profilePicture?.url}
              />
              <div className='flex-1'>
                <input
                  type='text'
                  className='px-3 outline-none rounded-full h-[30px] w-full bg-[#E7ECF0] text-xs'
                  placeholder='Comment something...'
                />
              </div>
            </div>
          </div>
        </div>
        <Button className='flex gap-0.5 items-center'>
          {arrGenerator(3).map((i) => (
            <span className='h-0.5 w-0.5 bg-gray-700 rounded-full' key={i} />
          ))}
        </Button>
      </div>
    </div>
  )
}

export default Post
