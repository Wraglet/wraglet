import { Document, Model, model, models, Schema, Types } from 'mongoose'

export interface IFriendship {
  userId: Types.ObjectId
  status: 'pending' | 'accepted'
  following: boolean
  followed: boolean
}

export interface IFriendshipDoc extends IFriendship, Document {}

const FriendshipSchema = new Schema<IFriendship>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['pending', 'accepted'],
      default: 'pending'
    },
    following: { type: Boolean, default: false },
    followed: { type: Boolean, default: false }
  },
  { timestamps: true }
)

const Friendship =
  (models.Friendship as Model<IFriendship>) ||
  model<IFriendship>('Friendship', FriendshipSchema)

export default Friendship
