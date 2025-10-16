import { cn } from "@/lib/utils";

type ProjectCardProps = {
  title?: string;
  description?: string;
  stack?: string[];
  link?: string;
  meta?: string;
  className?: string;
  onSelect?: () => void;
  isActive?: boolean;
  index?: number;
};

const ProjectCard = ({
  title = "Example Project",
  description = "Project description goes here",
  stack = [],
  link,
  meta = "Recent work",
  className,
  onSelect,
  isActive,
  index = 0,
}: ProjectCardProps) => {
  const content = (
    <div className="relative">
      <div className="mb-2">
        <h3 className="font-serif text-xl leading-tight tracking-tight text-[#2a2b29]">
          {title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-[#6d6c68]">
        {description}
      </p>
    </div>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={cn(
          "group relative mb-2 w-full overflow-hidden rounded-2xl border border-white/40 bg-white/75 p-6 text-left shadow-lg shadow-slate-900/10 backdrop-blur transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#85A78D]/50 hover:shadow-xl",
          isActive && "shadow-xl",
          className
        )}
      >
        {/* Green gradient overlay on hover/active - matching BlogCard */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br from-[#85A78D]/30 via-transparent to-white/80 opacity-0 transition-opacity duration-300",
            isActive ? "opacity-100" : "group-hover:opacity-100"
          )}
          aria-hidden
        />

        {/* Content */}
        <div className="relative">
          {content}
        </div>

        {/* Active indicator dot */}
        {isActive && (
          <div className="absolute right-6 top-6">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#85A78D] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#85A78D]"></span>
            </span>
          </div>
        )}

        {/* Hover arrow */}
        {!isActive && (
          <div
            className="absolute right-6 top-1/2 -translate-y-1/2 text-lg text-[#8A8984] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            style={{ transform: 'translate(8px, -50%)' }}
          >
            →
          </div>
        )}
      </button>
    );
  }

  return (
    <div className={cn("mb-2 rounded-2xl bg-white/40 p-6", className)}>
      {content}
    </div>
  );
};

export default ProjectCard;
