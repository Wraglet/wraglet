import LeftSideNav from './components/LeftSideNav';
import FeedBody from './components/FeedBody';
import Header from '../components/Header';
import getCurrentUser from '../actions/getCurrentUser';

const Feed = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className='flex flex-col min-h-screen overflow-hidden relative bg-[rgba(110,201,247,0.15)]'>
      <Header currentUser={currentUser!} />
      <main className='flex-grow grid grid-cols-10 mx-6 gap-x-5'>
        <LeftSideNav currentUser={currentUser!} />
        <FeedBody />
        <section className='col-span-3 h-auto'></section>
      </main>
    </div>
  );
};

export default Feed;
