'use server'

import client from '@/lib/db'
import Post, { PostDocument } from '@/models/Post'

// Import PostDocument for type safety

const getPosts = async (): Promise<PostDocument[]> => {
  try {
    // Connect to the database
    await client()

    // Fetch posts with audience 'public', sorted by creation date
    const posts = await Post.find({ audience: 'public' })
      .sort({ createdAt: 'desc' })
      .populate({
        path: 'author',
        select:
          'firstName lastName username gender pronoun profilePicture coverPhoto'
      })
      .exec()

    return posts // Return the fetched posts
  } catch (error) {
    console.error('Error at getPosts() while fetching posts: ', error)
    return [] // Return an empty array on error
  }
}

export default getPosts
