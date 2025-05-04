
import InfoCard from '../components/InfoCard';
import ScrollColumn from '../components/ScrollColumn';
import BlogCard from '../components/BlogCard';
import PhotoCard from '../components/PhotoCard';

const Me = () => {
  return (
    <>
      <InfoCard />
      <div className="flex-1 flex" style={{ width: 'calc(100% - 40%)', minWidth: '60%' }}>
        <ScrollColumn className="w-1/2 flex-none">
          <BlogCard title="Example title" text="Example subheading" />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </ScrollColumn>
        <ScrollColumn className="w-1/2 flex-none">
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
        </ScrollColumn>
      </div>
    </>
  );
};

export default Me;
