
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
        <div className="overflow-hidden absolute left-[calc(6px+3ch)]" style={{ width: isExpanded ? 'auto' : '0' }}>
          <span className="text-xl font-bold whitespace-nowrap">aher</span>
        </div>
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
                    "flex items-center p-2 rounded-full transition-colors relative",
                    isActive ? "bg-gray-200" : "hover:bg-gray-100"
                  )
                }
              >
                {/* Icon container - fixed position */}
                <div className="flex justify-center items-center w-6 h-6 z-10">
                  <item.icon className="h-6 w-6" />
                </div>
                
                {/* Text label - appears/disappears with transition */}
                <div 
                  className="overflow-hidden transition-all duration-300" 
                  style={{ 
                    maxWidth: isExpanded ? '160px' : '0',
                    opacity: isExpanded ? 1 : 0
                  }}
                >
                  <span className="text-lg pl-4 whitespace-nowrap">{item.name}</span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
