
import { useLocation } from 'react-router-dom';
import { useSidebar } from '../contexts/SidebarContext';

const Header = () => {
  const { isExpanded } = useSidebar();
  const location = useLocation();
  const pathName = location.pathname;
  
  // Only show Blog and Images text in the header on the /me page
  const isHomePage = pathName === '/' || pathName === '/me';
  
  return (
    <header className="sticky top-0 z-50 w-full h-8 bg-white/60 backdrop-blur-lg border-b border-gray-100/20">
      <div className="flex items-center justify-between h-full px-6">
        <div className="w-6"></div> {/* Empty spacer to maintain layout */}
        {isHomePage && (
          <div className="flex-1 grid grid-cols-2 absolute inset-x-0">
            <div className="text-base font-semibold text-center">Blog</div>
            <div className="text-base font-semibold text-center">Images</div>
          </div>
        )}
        <div className="w-6"></div> {/* Empty spacer for right side to maintain layout */}
      </div>
    </header>
  );
};

export default Header;
