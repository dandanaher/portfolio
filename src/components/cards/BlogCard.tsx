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
  const [isMobileOverflowing, setIsMobileOverflowing] = useState(false);
  const [isDesktopOverflowing, setIsDesktopOverflowing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Add a small delay to ensure content is rendered
    const timer = setTimeout(() => {
      if (contentRef.current) {
        if (isMobile) {
          // Mobile: Check if content exceeds one line
          const lineHeight = 24;
          const isOverflowing = contentRef.current.scrollHeight > lineHeight * 1.5;
          console.log('Mobile overflow check:', {
            scrollHeight: contentRef.current.scrollHeight,
            threshold: lineHeight * 1.5,
            isOverflowing
          });
          setIsMobileOverflowing(isOverflowing);
        } else {
          // Desktop: Check if content exceeds max-h-32 (128px)
          const isOverflowing = contentRef.current.scrollHeight > 128;
          console.log('Desktop overflow check:', {
            scrollHeight: contentRef.current.scrollHeight,
            threshold: 128,
            isOverflowing
          });
          setIsDesktopOverflowing(isOverflowing);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [text, isMobile]);

  const isOverflowing = isMobile ? isMobileOverflowing : isDesktopOverflowing;

  const handleCardClick = () => {
    if (isOverflowing) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <article
      className={`group relative overflow-hidden border border-white/40 bg-white/75 shadow-lg shadow-slate-900/10 backdrop-blur transition-all duration-300 hover:shadow-xl dark:border-dark-bg-elevated/40 dark:bg-dark-bg-elevated/90 ${
        isMobile ? 'rounded-2xl p-5' : 'rounded-3xl p-8'
      } ${isOverflowing ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-green/30 via-transparent to-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:to-dark-bg-elevated/80"
        aria-hidden
      />
      <div className={`relative flex flex-col text-light-text-dark dark:text-dark-text ${isMobile ? 'gap-3' : 'gap-5'}`}>
        {isMobile ? (
          <>
            {/* Mobile layout: Title and date inline */}
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-serif leading-tight flex-1">{title}</h3>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-light-text-subtle dark:text-dark-text-subtle flex-shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-yellow" aria-hidden />
                <span>{meta}</span>
              </div>
            </div>

            {/* Preview text - one line by default on mobile */}
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
          </>
        ) : (
          <>
            {/* Desktop layout: Date above, title, then content */}
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
          </>
        )}

        {/* Expand/collapse hint */}
        {isOverflowing && (
          <div className={`text-light-text-subtle transition-colors dark:text-dark-text-subtle ${isMobile ? 'text-xs' : 'text-sm'}`}>
            <span>{isExpanded ? "click to collapse" : "click to expand"}</span>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogCard;
