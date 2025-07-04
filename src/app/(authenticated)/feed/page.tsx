import { Suspense } from 'react'
import getCurrentUser from '@/actions/getCurrentUser'
import getOtherUsers from '@/actions/getOtherUsers'

import FeedNewChatModalWrapper from '@/components/chat/FeedNewChatModalWrapper'
import FeedClientWrapper from '@/components/feed/FeedClientWrapper'
import LeftNav from '@/components/feed/LeftNav'
import MobileResponsiveWrapper from '@/components/feed/MobileResponsiveWrapper'
import RightNav from '@/components/feed/RightNav'

import Loading from '@/app/loading'

const Page = async () => {
  const otherUsers = await getOtherUsers().catch((err: any) => {
    console.error(
      'Error happened while getting getOtherUsers() on Feed component: ',
      err
    )
  })

  const currentUser = await getCurrentUser()

  return (
    <>
      <main className="mx-auto flex min-h-screen w-full max-w-7xl items-start px-4">
        <LeftNav />
        <div className="mx-auto flex h-[calc(100vh-3.5rem)] flex-1 px-4 md:px-8">
          <div className="w-full overflow-y-auto pt-14 pb-20 lg:pb-4">
            <Suspense fallback={<Loading />}>
              <FeedClientWrapper />
            </Suspense>
          </div>
        </div>
        <RightNav otherUsers={otherUsers} currentUserId={currentUser?._id} />
      </main>

      {/* Mobile responsive components */}
      <MobileResponsiveWrapper otherUsers={otherUsers} />

      <FeedNewChatModalWrapper otherUsers={otherUsers} />
    </>
  )
}

// Move FeedNewChatModalWrapper to its own file as a client component
// Remove it from this file and import it instead

export default Page
