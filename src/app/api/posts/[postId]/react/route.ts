import { NextResponse } from 'next/server';
import dbConnect from '@/libs/dbConnect';
import getCurrentUser from '@/actions/getCurrentUser';
import Post, { PostDocument } from '@/models/Post';

interface IParams {
  postId: string;
}

export const PATCH = async (
  request: Request,
  { params }: { params: IParams }
) => {
  try {
    await dbConnect();

    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { type } = body;
    const { postId } = params;

    if (!currentUser?._id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Check if the user has already reacted
    const existingReaction = await Post.findOne({
      _id: postId,
      'reactions.userId': currentUser._id
    });

    if (existingReaction) {
      return new NextResponse('User has already reacted to this post', {
        status: 400
      });
    }

    // Update the post with the new reaction
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          reactions: {
            type,
            userId: currentUser._id,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        }
      },
      { new: true } // Return the updated document
    );

    if (!updatedPost) {
      return new NextResponse('Post not found', { status: 404 });
    }

    return new NextResponse('Reaction added successfully', { status: 200 });
  } catch (err: any) {
    console.log('Error while processing PATCH request: ', err);
    console.error(
      'Error happened while doing PATCH for /api/posts/[postId]/react at route.ts: ',
      err
    );
    return new NextResponse('Internal Error: ', { status: 500 });
  }
};
