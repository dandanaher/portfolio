
import ScrollColumn from "@/components/shared/ScrollColumn";
import ProjectCard from "@/components/cards/ProjectCard";
import { projectEntries, projectNotes } from "@/data/samples";

const Projects = () => {
  return (
    <div className="flex min-w-[60%] flex-1 overflow-hidden">
      <ScrollColumn className="w-1/2 flex-none">
        {projectEntries.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            stack={project.stack}
            link={project.link}
            meta={project.meta}
          />
        ))}
        {projectNotes.descriptions.map((description) => (
          <p key={description} className="mb-4 text-[#3c3d3b]">
            {description}
          </p>
        ))}
      </ScrollColumn>
      <ScrollColumn className="w-1/2 flex-none">
        {projectNotes.visuals.map((visual) => (
          <p key={visual} className="mb-4 text-[#3c3d3b]">
            {visual}
          </p>
        ))}
      </ScrollColumn>
    </div>
  );
};

export default Projects;
