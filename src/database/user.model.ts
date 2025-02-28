'use server'

import { Document, model, models, Schema, Types } from 'mongoose'

export interface IUser {
  firstName: string
  lastName: string
  suffix?: string
  email: string
  hashedPassword: string
  username: string
  dob: Date
  gender: string
  bio?: string
  pronoun: string
  profilePicture?: {
    url: string
    key: string
  }
  coverPhoto?: {
    url: string
    key: string
  }
  publicProfileVisible: boolean
  friendRequests: string
  followers: [
    {
      userId: Types.ObjectId
      createdAt: Date
    }
  ]
  following: [
    {
      userId: Types.ObjectId
      createdAt: Date
    }
  ]
  friends: [
    {
      userId: Types.ObjectId
      relationship: string
      createdAt: Date
    }
  ]
  phoneNumber?: string // Example additional property
  address?: string // Example additional property
}

export interface IUserDoc extends IUser, Document {}

const UserSchema = new Schema<IUser>(
  {
    firstName: String,
    lastName: String,
    suffix: String,
    email: { type: String, unique: true },
    hashedPassword: String,
    username: String,
    dob: Date,
    gender: String,
    bio: String,
    pronoun: String,
    profilePicture: { type: Object, url: String, key: String },
    coverPhoto: { type: Object, url: String, key: String },
    publicProfileVisible: { type: Boolean, default: true },
    friendRequests: String,
    followers: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now }
      }
    ],
    following: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now }
      }
    ],
    friends: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        relationship: String
      }
    ],
    phoneNumber: String, // Example additional property
    address: String // Example additional property
  },
  { timestamps: true }
)

const User = models?.User || model<IUser>('User', UserSchema)

export default User
