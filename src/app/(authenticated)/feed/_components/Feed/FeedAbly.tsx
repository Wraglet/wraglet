'use client'

import { IPostDoc } from '@/database/post.model'
import * as Ably from 'ably'
import { AblyProvider, ChannelProvider } from 'ably/react'

import FeedBody from '@/app/(authenticated)/feed/_components/Feed'

const FeedAbly = ({ initialPosts }: { initialPosts: IPostDoc[] }) => {
  const client = new Ably.Realtime({ authUrl: '/api/token' })

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="post-channel">
        <FeedBody initialPosts={initialPosts} />
      </ChannelProvider>
    </AblyProvider>
  )
}

export default FeedAbly
