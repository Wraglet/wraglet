'use client'

import dynamic from 'next/dynamic'
import { IPostDoc } from '@/database/post.model'

const FeedAbly = dynamic(() => import('./FeedAbly'), { ssr: false })

const FeedClientWrapper = ({ initialPosts }: { initialPosts: IPostDoc[] }) => {
  return <FeedAbly initialPosts={initialPosts} />
}

export default FeedClientWrapper
