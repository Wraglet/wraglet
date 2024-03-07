'use client';

import WragletAblyProvider from '@/providers/WragletAblyProvider';
import Feed from '..';
import { PostInterface } from '@/interfaces';

type Props = {
  initialPosts: PostInterface[];
};

const AblyWrapper = ({ initialPosts }: Props) => {
  return (
    <WragletAblyProvider>
      <Feed initialPosts={initialPosts} />
    </WragletAblyProvider>
  );
};

export default AblyWrapper;
