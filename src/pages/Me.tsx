
import InfoCard from '../components/InfoCard';
import ScrollColumn from '../components/ScrollColumn';
import BlogCard from '../components/BlogCard';
import PhotoCard from '../components/PhotoCard';
import { useSidebar } from '../contexts/SidebarContext';

const Me = () => {
  const { infoCardWidth } = useSidebar();

  return (
    <div className="flex h-full w-full">
      {/* Info card - flexible width */}
      <div className="info-card-container" style={{ width: infoCardWidth }}>
        <InfoCard />
      </div>
      
      {/* Fixed-width content columns */}
      <div className="fixed-columns-container">
        <div className="columns-wrapper">
          <ScrollColumn className="blog-column">
            <BlogCard title="Example title" text="Example subheading" />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </ScrollColumn>
          
          <ScrollColumn className="photo-column">
            <PhotoCard />
            <PhotoCard />
            <PhotoCard />
            <PhotoCard />
          </ScrollColumn>
        </div>
      </div>
    </div>
  );
};

export default Me;
