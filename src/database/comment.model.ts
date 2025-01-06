import { Document, Model, model, models, Schema, Types } from 'mongoose'

export interface IComment {
  content: string
  authorId: Types.ObjectId
  postId: Types.ObjectId
  reactions: Types.ObjectId[]
}

export interface ICommentDoc extends IComment, Document {}

const CommentSchema = new Schema<IComment>(
  {
    content: String,
    authorId: { type: Schema.Types.ObjectId, ref: 'User' },
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
    reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }]
  },
  { timestamps: true }
)

const Comment =
  (models.Comment as Model<IComment>) ||
  model<IComment>('Comment', CommentSchema)

export default Comment
