
import InfoCard from '../components/InfoCard';
import ScrollColumn from '../components/ScrollColumn';

const Contact = () => {
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

export default Contact;
