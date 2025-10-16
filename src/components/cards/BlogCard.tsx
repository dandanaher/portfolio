import { useState, useRef, useEffect } from "react";

type BlogCardProps = {
  title?: string;
  text?: string;
  meta?: string;
};

const BlogCard = ({
  title = "Example blog title",
  text = "Example blog text",
  meta = "Updated moments ago",
}: BlogCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if content exceeds the default card size (max-h-32 = 128px)
    if (contentRef.current) {
      const isContentOverflowing = contentRef.current.scrollHeight > 128;
      setIsOverflowing(isContentOverflowing);
    }
  }, [text]);

  const handleCardClick = () => {
    if (isOverflowing) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <article
      className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/75 p-8 shadow-lg shadow-slate-900/10 backdrop-blur transition-all duration-300 hover:shadow-xl cursor-pointer"
      onClick={handleCardClick}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#85A78D]/30 via-transparent to-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <div className="relative flex flex-col gap-5 text-[#2a2b29]">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-[#9c9b96]">
          <span className="h-2 w-2 rounded-full bg-[#f4b860]" aria-hidden />
          <span>{meta}</span>
        </div>
        <h3 className="text-2xl font-serif leading-snug">{title}</h3>
        <div
          ref={contentRef}
          className={`overflow-hidden transition-all duration-500 ${
            isExpanded ? "max-h-[5000px]" : "max-h-32"
          }`}
        >
          <p className="text-base leading-relaxed text-[#4F4F4C] whitespace-pre-wrap">
            {text}
          </p>
        </div>
        {isOverflowing && (
          <div className="text-sm text-[#9c9b96] transition-colors">
            <span>{isExpanded ? "click card to collapse" : "click card to expand"}</span>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogCard;
