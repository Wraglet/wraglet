'use server'

import { Document, model, models, Schema, Types } from 'mongoose'

enum ReactionType {
  Like = 'like',
  Love = 'love'
  // Add other reaction types as needed
}

export interface IReaction {
  type: ReactionType
  userId: Types.ObjectId
  postId?: Types.ObjectId
  commentId?: Types.ObjectId
}

export interface IReactionDoc extends IReaction, Document {}

const ReactionSchema = new Schema<IReaction>(
  {
    type: { type: String, enum: Object.values(ReactionType) },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
    commentId: { type: Schema.Types.ObjectId, ref: 'Comment' }
  },
  { timestamps: true }
)

const Reaction =
  models?.Reaction || model<IReaction>('Reaction', ReactionSchema)

export default Reaction
