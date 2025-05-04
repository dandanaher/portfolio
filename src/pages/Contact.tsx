
import InfoCard from '../components/InfoCard';
import ScrollColumn from '../components/ScrollColumn';

const Contact = () => {
  return (
    <>
      <InfoCard />
      <div className="flex flex-1 overflow-hidden">
        <ScrollColumn>
          <div className="text-gray-400">Contact information will be displayed here</div>
        </ScrollColumn>
        <ScrollColumn>
          <div className="text-gray-400">Contact form will be displayed here</div>
        </ScrollColumn>
      </div>
    </>
  );
};

export default Contact;
