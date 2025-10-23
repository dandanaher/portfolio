import MobileNav from "@/components/layout/MobileNav";

import BlogCard from "@/components/cards/BlogCard";
import ScrollColumn from "@/components/shared/ScrollColumn";
import { blogEntries } from "@/data/samples";
import { THEME_COMBINATIONS } from "@/constants/theme";

const Thoughts = () => {
  return (
    <div className={`flex flex-1 flex-col overflow-hidden ${THEME_COMBINATIONS.background}`}>
      <MobileNav showBackButton={true} />
      <div className="flex flex-1 overflow-hidden px-6 pb-10 pt-10">
        <ScrollColumn className="flex-1">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
            <h1 className={`text-center text-sm font-serif ${THEME_COMBINATIONS.textSubtle}`}>
              collection of my thoughts
            </h1>
            {[...blogEntries].reverse().map((entry) => (
              <BlogCard key={entry.title} {...entry} />
            ))}
          </div>
        </ScrollColumn>
      </div>
    </div>
  );
};

export default Thoughts;
