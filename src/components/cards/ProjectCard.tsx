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
}: ProjectCardProps) => {
  const content = (
    <>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="mb-3 text-[#3c3d3b]">{description}</p>
      {stack.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-[#3c3d3b]"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
      {!onSelect && link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-[#3c3d3b] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2a2b29]"
        >
          View Project →
        </a>
      )}
      <p className="mt-4 text-sm text-[#3c3d3b]">{meta}</p>
    </>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={cn(
          "w-full rounded-3xl border border-transparent bg-white/80 p-6 text-left text-[#2a2b29] shadow-md transition duration-200 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2a2b29]",
          isActive && "border-[#2a2b29]/50 bg-white",
          className
        )}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={cn("rounded-3xl bg-white p-6 shadow-md", className)}>{content}</div>
  );
};

export default ProjectCard;
