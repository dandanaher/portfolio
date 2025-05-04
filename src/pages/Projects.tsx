
import InfoCard from '../components/InfoCard';
import ScrollColumn from '../components/ScrollColumn';

const Projects = () => {
  return (
    <>
      <InfoCard />
      <div className="flex flex-1 overflow-hidden">
        <ScrollColumn>
          <div className="text-gray-400">Project descriptions will be displayed here</div>
        </ScrollColumn>
        <ScrollColumn>
          <div className="text-gray-400">Project images will be displayed here</div>
        </ScrollColumn>
      </div>
    </>
  );
};

export default Projects;
