'use client'

import dynamic from 'next/dynamic'
import { IPost } from '@/models/Post'

const ProfilePostsAbly = dynamic(
  () => import('@/components/profile/ProfilePostsAbly'),
  { ssr: false }
)

interface ProfilePostsClientWrapperProps {
  username: string
  initialPosts: IPost[]
}

const ProfilePostsClientWrapper = ({
  username,
  initialPosts
}: ProfilePostsClientWrapperProps) => {
  return <ProfilePostsAbly username={username} initialPosts={initialPosts} />
}

export default ProfilePostsClientWrapper
