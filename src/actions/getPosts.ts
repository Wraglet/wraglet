'use server'

import Post, { IPostDoc } from '@/database/post.model'
import dbConnect from '@/lib/db'

// Import PostDocument for type safety

const getPosts = async (): Promise<IPostDoc[]> => {
  try {
    // Connect to the database
    await dbConnect()

    // Fetch posts with audience 'public', sorted by creation date
    const posts = await Post.find({ audience: 'public' })
      .sort({ createdAt: 'desc' })
      .populate({
        path: 'author',
        select:
          'firstName lastName username gender pronoun profilePicture coverPhoto'
      })
      .exec()

    // Parse and stringify the posts to ensure JSON compatibility
    const parsedPosts = JSON.parse(JSON.stringify(posts))

    return parsedPosts as IPostDoc[] // Return the parsed posts
  } catch (error) {
    console.error('Error at getPosts() while fetching posts: ', error)
    return [] // Return an empty array on error
  }
}

export default getPosts
