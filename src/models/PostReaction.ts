import { AuthorInterface } from '@/interfaces'
import mongoose, { Document, Schema } from 'mongoose';

export interface PostReactionDocument extends Document {
  _id: string
  type: string;
  postId: mongoose.Types.ObjectId;
  userId: AuthorInterface
  createdAt: Date;
  updatedAt: Date;
}

const PostReactionSchema = new Schema<PostReactionDocument>(
  {
    type: String,
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
  ,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export default (mongoose.models.PostReaction as mongoose.Model<PostReactionDocument>) ||
  mongoose.model<PostReactionDocument>('PostReaction', PostReactionSchema);
