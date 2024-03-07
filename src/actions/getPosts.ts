import dbConnect from '@/libs/dbConnect';
import Post from '@/models/Post';

const getPosts = async () => {
  await dbConnect();
  try {
    const posts = await Post.find({ audience: 'public' })
      .sort({ createdAt: 'desc' })
      .populate({
        path: 'author',
        select:
          'firstName lastName username gender pronoun profilePicture coverPhoto'
      })
      .exec();

    return posts;
  } catch (err: any) {
    console.error('Error at getPosts() while fetching posts: ', err);
    return [];
  }
};

export default getPosts;
