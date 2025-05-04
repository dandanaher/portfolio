
import InfoCard from '../components/InfoCard';
import ScrollColumn from '../components/ScrollColumn';
import BlogCard from '../components/BlogCard';
import PhotoCard from '../components/PhotoCard';

const Me = () => {
  return (
    <>
      <InfoCard />
      <div className="flex flex-1 overflow-hidden">
        <ScrollColumn>
          <BlogCard title="Example title" text="Example subheading" />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </ScrollColumn>
        <ScrollColumn>
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
