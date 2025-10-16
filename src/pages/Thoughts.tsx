import BlogCard from "@/components/cards/BlogCard";
import PhotoCard from "@/components/cards/PhotoCard";
import ScrollColumn from "@/components/shared/ScrollColumn";
import { blogEntries, photoEntries } from "@/data/samples";

const Thoughts = () => {
  return (
    <div className="flex flex-1 overflow-hidden">
      <ScrollColumn className="flex-1">
        {blogEntries.map((entry) => (
          <BlogCard key={entry.title} {...entry} />
        ))}
      </ScrollColumn>
      <ScrollColumn className="flex-1 border-l border-white/20">
        {photoEntries.map((photo) => (
          <PhotoCard key={photo.caption} {...photo} />
        ))}
      </ScrollColumn>
    </div>
  );
};

export default Thoughts;
