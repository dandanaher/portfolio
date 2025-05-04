
import { useLocation } from 'react-router-dom';
import { useSidebar } from '../contexts/SidebarContext';

const Header = () => {
  const { isExpanded, expandSidebar } = useSidebar();
  const location = useLocation();
  const pathName = location.pathname;
  
  // Only show Blog and Images text in the header on the /me page
  const isHomePage = pathName === '/' || pathName === '/me';
  
  return (
    <header className="sticky top-0 z-50 w-full h-16 bg-white/60 backdrop-blur-lg">
      <div className="flex items-center justify-between h-full px-6">
        <div onClick={expandSidebar} className="cursor-pointer">
          {!isExpanded && <span className="text-lg font-bold">Dan</span>}
        </div>
        {isHomePage && (
          <>
            <div className="text-xl font-bold">Blog</div>
            <div className="text-xl font-bold">Images</div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
