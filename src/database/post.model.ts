import { IPostReactionDoc } from '@/database/post-reaction.model'
import { AuthorInterface } from '@/interfaces'
import { Document, Model, model, models, Schema, Types } from 'mongoose'

export interface IPost {
  content: {
    text?: string
    images?: {
      url: string
      key: string
    }[]
  }
  author: AuthorInterface
  comments: Types.ObjectId[]
  votes: Types.ObjectId[]
  reactions: IPostReactionDoc[]
}

export interface IPostDoc extends IPost, Document {
  createdAt: any
}

const PostSchema = new Schema<IPost>(
  {
    content: {
      text: String,
      images: [{ url: String, key: String }]
    },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    votes: [{ type: Schema.Types.ObjectId, ref: 'PostVote' }],
    reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }]
  },
  { timestamps: true }
)

const Post = (models.Post as Model<IPost>) || model<IPost>('Post', PostSchema)

export default Post
