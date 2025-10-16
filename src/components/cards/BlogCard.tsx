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
      className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/75 p-8 shadow-lg shadow-slate-900/10 backdrop-blur transition-all duration-300 hover:shadow-xl cursor-pointer dark:border-dark-bg-elevated/40 dark:bg-dark-bg-elevated/90"
      onClick={handleCardClick}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-green/30 via-transparent to-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:to-dark-bg-elevated/80"
        aria-hidden
      />
      <div className="relative flex flex-col gap-5 text-light-text-dark dark:text-dark-text">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-light-text-subtle dark:text-dark-text-subtle">
          <span className="h-2 w-2 rounded-full bg-accent-yellow" aria-hidden />
          <span>{meta}</span>
        </div>
        <h3 className="text-2xl font-serif leading-snug">{title}</h3>
        <div
          ref={contentRef}
          className={`overflow-hidden transition-all duration-500 ${
            isExpanded ? "max-h-[5000px]" : "max-h-32"
          }`}
        >
          <p className="text-base leading-relaxed text-light-text-muted whitespace-pre-wrap dark:text-dark-text-muted">
            {text}
          </p>
        </div>
        {isOverflowing && (
          <div className="text-sm text-light-text-subtle transition-colors dark:text-dark-text-subtle">
            <span>{isExpanded ? "click card to collapse" : "click card to expand"}</span>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogCard;
