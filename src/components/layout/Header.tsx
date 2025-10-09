
import { useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/" || pathname === "/me";

  return (
    <header className="sticky top-0 z-40 h-8 w-full border-b border-gray-100/20 bg-white/60 font-sans backdrop-blur-lg">
      <div className="flex h-full items-center">
        <div className="w-2/5 min-w-[280px] px-6" aria-hidden />
        {isHomePage ? (
          <div className="flex h-full flex-1">
            <div className="flex h-full w-1/2 items-center px-6 text-left text-xl font-bold uppercase">
              Blog
            </div>
            <div className="flex h-full w-1/2 items-center px-6 text-left text-xl font-bold uppercase">
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
