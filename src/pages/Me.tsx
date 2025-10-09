
import InfoCard from "@/components/cards/InfoCard";
import BlogCard from "@/components/cards/BlogCard";
import PhotoCard from "@/components/cards/PhotoCard";
import ScrollColumn from "@/components/shared/ScrollColumn";
import { blogEntries, photoEntries } from "@/data/samples";

const Me = () => {
  return (
    <>
      <InfoCard />
      <div className="flex min-w-[60%] flex-1 overflow-hidden">
        <ScrollColumn className="w-1/2 flex-none">
          {blogEntries.map((entry) => (
            <BlogCard key={entry.title} {...entry} />
          ))}
        </ScrollColumn>
        <ScrollColumn className="w-1/2 flex-none">
          {photoEntries.map((photo) => (
            <PhotoCard key={photo.caption} {...photo} />
          ))}
        </ScrollColumn>
      </div>
    </>
  );
};

export default Me;
