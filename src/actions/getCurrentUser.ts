'use server'

import getSession from '@/actions/getSession'
import User from '@/database/user.model'
import dbConnect from '@/lib/db'

const getCurrentUser = async () => {
  try {
    // Get the session
    const session = await getSession()

    // Check if the session has a valid user email
    if (!session?.user?.email) {
      return null // Return null if no email is found
    }

    // Connect to the database
    await dbConnect()

    // Find the user by email, excluding the hashed password
    const currentUser = await User.findOne({
      email: session.user.email
    }).select('-hashedPassword')

    // Convert the Mongoose document to a plain object
    if (currentUser) {
      const userObject = currentUser.toObject()
      return userObject
    }

    return null // Return null if the user is not found
  } catch (error) {
    console.error('Error while getting current user: ', error)
    return null // Return null on error
  }
}

export default getCurrentUser
