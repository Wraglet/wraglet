import { IPostDoc } from '@/database/post.model'
import { create } from 'zustand'

type FeedPostsProps = {
  posts: IPostDoc[]
  isFeedPostsInitialized: boolean
  setFeedPosts: (posts: IPostDoc[]) => void
  setIsFeedPostsInitialized: (initialized: boolean) => void
  clearFeedPosts: () => void
}

const useFeedPostsStore = create<FeedPostsProps>((set) => ({
  posts: [],
  isFeedPostsInitialized: false,
  setFeedPosts: (posts) => set({ posts }),
  setIsFeedPostsInitialized: (initialized) =>
    set({ isFeedPostsInitialized: initialized }),
  clearFeedPosts: () => set({ posts: [], isFeedPostsInitialized: false })
}))

export default useFeedPostsStore
