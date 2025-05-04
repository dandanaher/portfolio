
import { Outlet, useLocation } from 'react-router-dom';
import { SidebarProvider } from '../contexts/SidebarContext';
import Header from './Header';
import Sidebar from './Sidebar';
import { useEffect } from 'react';

const Layout = () => {
  const location = useLocation();
  const pathName = location.pathname;
  
  useEffect(() => {
    document.title = "Dan Danaher";
  }, []);
  
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-neutral-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
