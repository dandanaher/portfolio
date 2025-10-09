
import ScrollColumn from "@/components/shared/ScrollColumn";
import { projectNotes } from "@/data/samples";

const Projects = () => {
  return (
    <div className="flex flex-1 overflow-hidden">
      <ScrollColumn>
        {projectNotes.descriptions.map((description) => (
          <p key={description} className="mb-4 text-[#3c3d3b]">
            {description}
          </p>
        ))}
      </ScrollColumn>
      <ScrollColumn>
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
