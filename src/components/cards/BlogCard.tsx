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
    // Check if content exceeds one line
    if (contentRef.current) {
      const lineHeight = 24; // approximate line height
      const isContentOverflowing = contentRef.current.scrollHeight > lineHeight * 1.5;
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
      className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/75 p-5 shadow-lg shadow-slate-900/10 backdrop-blur transition-all duration-300 hover:shadow-xl cursor-pointer dark:border-dark-bg-elevated/40 dark:bg-dark-bg-elevated/90"
      onClick={handleCardClick}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-green/30 via-transparent to-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:to-dark-bg-elevated/80"
        aria-hidden
      />
      <div className="relative flex flex-col gap-3 text-light-text-dark dark:text-dark-text">
        {/* Title and date inline */}
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-serif leading-tight flex-1">{title}</h3>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-light-text-subtle dark:text-dark-text-subtle flex-shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-yellow" aria-hidden />
            <span>{meta}</span>
          </div>
        </div>

        {/* Preview text - one line by default */}
        <div
          ref={contentRef}
          className={`overflow-hidden transition-all duration-500 ${
            isExpanded ? "max-h-[5000px]" : "max-h-[1.5rem]"
          }`}
        >
          <p className={`text-sm leading-relaxed text-light-text-muted dark:text-dark-text-muted ${
            isExpanded ? "whitespace-pre-wrap" : "line-clamp-1"
          }`}>
            {text}
          </p>
        </div>

        {/* Expand/collapse hint */}
        {isOverflowing && (
          <div className="text-xs text-light-text-subtle transition-colors dark:text-dark-text-subtle">
            <span>{isExpanded ? "click to collapse" : "click to expand"}</span>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogCard;
