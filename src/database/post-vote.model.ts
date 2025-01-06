import { Document, Model, model, models, Schema, Types } from 'mongoose'

export interface IPostVote {
  userId: Types.ObjectId
  postId: Types.ObjectId
  value: 1 | -1
}

export interface IPostVoteDoc extends IPostVote, Document {}

const PostVoteSchema = new Schema<IPostVote>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
    value: { type: Number, enum: [1, -1] }
  },
  { timestamps: true }
)

const PostVote =
  (models.PostVote as Model<IPostVote>) ||
  model<IPostVote>('PostVote', PostVoteSchema)

export default PostVote
