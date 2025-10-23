import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import BlogCard from "@/components/cards/BlogCard";
import ScrollColumn from "@/components/shared/ScrollColumn";
import { blogEntries } from "@/data/samples";
import { THEME_COMBINATIONS } from "@/constants/theme";

const Thoughts = () => {
  const navigate = useNavigate();

  return (
    <div className={`flex flex-1 flex-col overflow-hidden ${THEME_COMBINATIONS.background}`}>
      <div className="flex flex-1 overflow-hidden px-6 pb-10 pt-10">
        <ScrollColumn className="flex-1">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
            {/* Mobile back button */}
            <button
              onClick={() => navigate('/me')}
              className="flex items-center gap-2 text-sm text-light-text-muted hover:text-light-text dark:text-dark-text-muted dark:hover:text-dark-text transition-colors md:hidden"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to home</span>
            </button>
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
