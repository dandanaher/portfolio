
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const pathName = location.pathname;
  
  // Only show Blog and Images text in the header on the /me page
  const isHomePage = pathName === '/' || pathName === '/me';
  
  return (
    <header className="sticky top-0 z-50 w-full h-8 bg-white/60 backdrop-blur-lg border-b border-gray-100/20">
      <div className="flex items-center justify-between h-full px-6">
        <div className="w-6"></div> {/* Empty spacer to maintain layout */}
        
        {isHomePage && (
          <div className="header-title-container">
            <div className="header-title">Blog</div>
            <div className="header-title">Images</div>
          </div>
        )}
        
        <div className="w-6"></div> {/* Empty spacer for right side to maintain layout */}
      </div>
    </header>
  );
};

export default Header;
