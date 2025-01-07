import { Document, model, models, Schema, Types } from 'mongoose'

enum ReactionType {
  HEART = 'heart',
  LIKE = 'like',
  LAUGH = 'laugh',
  SAD = 'sad',
  ANGRY = 'angry'
}

export interface IPostReaction {
  type: ReactionType
  postId: Types.ObjectId
  userId: Types.ObjectId
}

export interface IPostReactionDoc extends IPostReaction, Document {}

const PostReactionSchema = new Schema<IPostReaction>(
  {
    type: { type: String, enum: Object.values(ReactionType) },
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
)

const PostReaction =
  models?.PostReaction ||
  model<IPostReaction>('PostReaction', PostReactionSchema)

export default PostReaction
