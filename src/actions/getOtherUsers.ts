'use server'

import getSession from '@/actions/getSession'
import client from '@/lib/db'
import User from '@/models/User'
import mongoose from 'mongoose'

const getOtherUsers = async () => {
  const session = await getSession().catch((err) => {
    console.error(
      'Error happened while getting getSession on getOtherUsers: ',
      err
    )
  })

  if (!session?.user?.email) {
    return []
  }

  try {
    await client()

    const users = await User.find({
      email: { $ne: session.user.email }
    })
      .select('-hashedPassword')
      .sort({ createdAt: 'desc' })
      .exec()

    // Convert each user document to a plain object and convert ObjectId to string
    const plainUsers = users.map((user) => {
      const userObject = user.toObject()
      if (userObject._id instanceof mongoose.Types.ObjectId) {
        userObject._id = userObject._id.toString()
      }
      return userObject
    })

    return plainUsers
  } catch (error: any) {
    console.error('Some error happened while getting getOtherUsers(): ', error)
    return []
  }
}

export default getOtherUsers
