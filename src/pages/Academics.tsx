
import InfoCard from '../components/InfoCard';
import ScrollColumn from '../components/ScrollColumn';

const Academics = () => {
  return (
    <>
      <InfoCard />
      <div className="flex flex-1 overflow-hidden">
        <ScrollColumn>
          <div className="text-gray-400">Academic content will be displayed here</div>
        </ScrollColumn>
        <ScrollColumn>
          <div className="text-gray-400">Additional academic information will be displayed here</div>
        </ScrollColumn>
      </div>
    </>
  );
};

export default Academics;
