
import { NavLink } from 'react-router-dom';
import { User, GraduationCap, Settings, Mail } from 'lucide-react';
import { useSidebar } from '../contexts/SidebarContext';
import { cn } from '@/lib/utils';

type NavItem = {
  path: string;
  name: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { path: '/me', name: 'me', icon: User },
  { path: '/academics', name: 'academics', icon: GraduationCap },
  { path: '/projects', name: 'projects', icon: Settings },
  { path: '/contact', name: 'contact', icon: Mail },
];

const Sidebar = () => {
  const { isExpanded, toggleSidebar, collapseSidebar } = useSidebar();
  
  return (
    <aside 
      className={cn(
        "h-screen bg-white border-r border-gray-200 transition-width duration-300 flex flex-col",
        isExpanded ? "w-60" : "w-16"
      )}
    >
      <div 
        className="h-16 border-b border-gray-200 flex items-center px-6 relative"
        onClick={() => isExpanded && collapseSidebar()}
      >
        <span className="text-xl font-bold absolute left-6">Dan</span>
        {isExpanded && (
          <span className="text-xl font-bold pl-[2.5rem]">aher</span>
        )}
        {!isExpanded && (
          <span 
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={toggleSidebar}
          ></span>
        )}
      </div>
      
      <nav className="flex-1 pt-6">
        <ul className="space-y-6">
          {navItems.map((item) => (
            <li key={item.path} className="px-4">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-4 p-2 rounded-full transition-colors relative",
                    isActive ? "bg-gray-200" : "hover:bg-gray-100"
                  )
                }
              >
                <div className="flex justify-center items-center w-6 h-6 z-10">
                  <item.icon className="h-6 w-6" />
                </div>
                {isExpanded && (
                  <span className="text-lg absolute left-12">{item.name}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
