
import InfoCard from '../components/InfoCard';
import ScrollColumn from '../components/ScrollColumn';

const Projects = () => {
  return (
    <>
      <InfoCard />
      <div className="flex flex-1 overflow-hidden">
        <ScrollColumn />
        <ScrollColumn />
      </div>
    </>
  );
};

export default Projects;
