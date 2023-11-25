import LeftSideNav from './components/LeftSideNav';
import FeedBody from './components/FeedBody';
import Header from '../components/Header';

const Feed = () => {
  return (
    <div className='flex flex-col min-h-screen overflow-hidden relative bg-[rgba(110,201,247,0.15)]'>
      <Header />
      <main className='flex-grow grid grid-cols-10 mx-6 gap-x-5'>
        <LeftSideNav />
        <FeedBody />
        <section className='col-span-3 h-auto'></section>
      </main>
    </div>
  );
};

export default Feed;
