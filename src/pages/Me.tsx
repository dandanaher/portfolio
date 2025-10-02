
import InfoCard from '../components/InfoCard';
import ScrollColumn from '../components/ScrollColumn';
import BlogCard from '../components/BlogCard';
import PhotoCard from '../components/PhotoCard';

const Me = () => {
  return (
    <>
      <InfoCard />
      <div className="flex flex-1 min-w-[60%] overflow-hidden">
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
