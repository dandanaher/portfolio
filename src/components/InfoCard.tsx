
import { useSidebar } from '../contexts/SidebarContext';

const InfoCard = () => {
  const { isExpanded } = useSidebar();
  
  return (
    <div className="h-full w-full px-6 py-6">
      <div className="relative bg-white h-full rounded-3xl shadow-lg p-6 overflow-hidden">
        {/* Profile picture container - top right corner */}
        <div className="absolute top-6 right-6 w-32 h-32 rounded-3xl bg-gray-100">
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Profile Picture
          </div>
        </div>
        
        {/* Card content would go here, but it's empty as specified */}
      </div>
    </div>
  );
};

export default InfoCard;
