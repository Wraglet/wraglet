import {
  AuthorInterface,
  PostReactionInterface,
  PostVoteInterface
} from '@/interfaces';
import mongoose, { Document, Schema } from 'mongoose';

export interface PostDocument extends Document {
  _id: string;
  content: {
    text?: string;
    images?: [
      {
        url: string;
        key: string;
      }
    ];
  };
  audience: string;
  author: AuthorInterface;
  reactions: PostReactionInterface[]; // Change this to use Types.
  votes: PostVoteInterface[]; // Array of PostVote references
  createdAt: Date;
  updatedAt?: Date;
}

const PostSchema = new Schema<PostDocument>(
  {
    content: {
      text: String,
      images: [{ type: Object, url: String, key: String }]
    },
    audience: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reactions: [
      {
        type: String,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: Date,
        updatedAt: Date
      }
    ],
    votes: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        voteType: { type: String, enum: ['upvote', 'downvote'] },
        createdAt: Date,
        updatedAt: Date
      }
    ]
  },
  { timestamps: true }
);

export default (mongoose.models.Post as mongoose.Model<PostDocument>) ||
  mongoose.model<PostDocument>('Post', PostSchema);
