
import InfoCard from "@/components/cards/InfoCard";
import ScrollColumn from "@/components/shared/ScrollColumn";
import { projectNotes } from "@/data/samples";

const Projects = () => {
  return (
    <>
      <InfoCard />
      <div className="flex flex-1 overflow-hidden">
        <ScrollColumn>
          {projectNotes.descriptions.map((description) => (
            <p key={description} className="mb-4 text-gray-600">
              {description}
            </p>
          ))}
        </ScrollColumn>
        <ScrollColumn>
          {projectNotes.visuals.map((visual) => (
            <p key={visual} className="mb-4 text-gray-600">
              {visual}
            </p>
          ))}
        </ScrollColumn>
      </div>
    </>
  );
};

export default Projects;
