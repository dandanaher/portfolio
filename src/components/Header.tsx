
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const pathName = location.pathname;
  
  // Only show Blog and Images text in the header on the /me page
  const isHomePage = pathName === '/' || pathName === '/me';
  
  return (
    <header className="sticky top-0 z-40 w-full h-8 bg-white/60 backdrop-blur-lg border-b border-gray-100/20">
      <div className="flex h-full items-center">
        <div className="w-2/5 min-w-[280px] px-6" aria-hidden />
        {isHomePage ? (
          <div className="flex flex-1 h-full">
            <div className="w-1/2 px-6 flex items-center text-left text-xl font-bold uppercase">
              Blog
            </div>
            <div className="w-1/2 px-6 flex items-center text-left text-xl font-bold uppercase">
              Images
            </div>
          </div>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </header>
  );
};

export default Header;
