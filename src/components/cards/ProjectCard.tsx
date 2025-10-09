type ProjectCardProps = {
  title?: string;
  description?: string;
  stack?: string[];
  link?: string;
  meta?: string;
};

const ProjectCard = ({
  title = "Example Project",
  description = "Project description goes here",
  stack = [],
  link,
  meta = "Recent work",
}: ProjectCardProps) => (
  <div className="mb-6 rounded-3xl bg-white p-6 shadow-md">
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
    {link && (
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
  </div>
);

export default ProjectCard;
