
import { Outlet, useLocation } from 'react-router-dom';
import { SidebarProvider } from '../contexts/SidebarContext';
import Header from './Header';
import Sidebar from './Sidebar';
import { useEffect } from 'react';

const Layout = () => {
  const location = useLocation();
  
  useEffect(() => {
    document.title = "Dan Danaher";
  }, []);
  
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-neutral-100">
        <Sidebar />
        <div className="flex-1 flex flex-col relative">
          <Header />
          <main className="flex h-full relative">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
