'use server'

import Post, { IPostDoc } from '@/database/post.model'
import User from '@/database/user.model'
import dbConnect from '@/lib/db'

const getPostsByUsername = async (username: string): Promise<IPostDoc[]> => {
  try {
    // Connect to the database
    await dbConnect()

    // Find the user by username
    const user = await User.findOne({ username })
    if (!user) {
      return [] // Return an empty array if the user is not found
    }

    // Fetch posts authored by the user with audience 'public'
    const userPosts = await Post.find({
      author: user._id,
      audience: 'public'
    })
      .sort({ createdAt: 'desc' }) // Sort posts by creation date
      .populate({
        path: 'author',
        select:
          'firstName lastName username gender pronoun profilePicture coverPhoto'
      })
      .exec()

    // Parse and stringify the posts to ensure JSON compatibility
    const parsedPosts = JSON.parse(JSON.stringify(userPosts))

    return parsedPosts // Return the parsed posts
  } catch (error) {
    console.error(`Error at getPostsByUsername(${username}): `, error)
    return [] // Return an empty array on error
  }
}

export default getPostsByUsername
