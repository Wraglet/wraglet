'use client'

import dynamic from 'next/dynamic'
import { IPostDoc } from '@/database/post.model'

const ProfilePostsAbly = dynamic(() => import('./ProfilePostsAbly'), {
  ssr: false
})

const ProfilePostsClientWrapper = ({
  initialPosts,
  username
}: {
  initialPosts: IPostDoc[]
  username: string
}) => {
  return <ProfilePostsAbly initialPosts={initialPosts} username={username} />
}

export default ProfilePostsClientWrapper
