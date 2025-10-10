import type { ElementType, FocusEvent } from "react";
import { NavLink } from "react-router-dom";
import { Mail, Settings, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";

type NavItem = {
  path: string;
  name: string;
  icon: ElementType;
};

const navItems: NavItem[] = [
  { path: "/me", name: "me", icon: User },
  { path: "/projects", name: "projects", icon: Settings },
  { path: "/contact", name: "contact", icon: Mail },
];

const Sidebar = () => {
  const { isExpanded, expandSidebar, collapseSidebar } = useSidebar();

  const handleMouseEnter = () => {
    expandSidebar();
  };

  const handleMouseLeave = () => {
    collapseSidebar();
  };

  const handleFocus = () => {
    expandSidebar();
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const relatedTarget = event.relatedTarget;
    if (!(relatedTarget instanceof Node) || !event.currentTarget.contains(relatedTarget)) {
      collapseSidebar();
    }
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r border-white/10 bg-white/12 shadow-lg shadow-slate-900/5 backdrop-blur-md transition-[width] duration-300 supports-[backdrop-filter]:bg-white/8",
        isExpanded ? "w-44" : "w-16"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
    >
      <div
        className={cn(
          "relative flex h-8 items-center overflow-hidden border-b border-white/10 bg-white/10",
          isExpanded ? "px-6" : ""
        )}
      >
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xl font-bold font-sans">
          DAN
        </span>
        <span
          className={cn(
            "absolute left-[3.625rem] top-1/2 -translate-y-1/2 text-xl font-bold font-sans transition-opacity duration-300",
            isExpanded ? "opacity-100" : "opacity-0"
          )}
        >
          DANAHER
        </span>
      </div>

      <nav className="flex-1 pt-6">
        <ul className="space-y-6">
          {navItems.map((item) => (
            <li key={item.path} className="pl-2.5 pr-4">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "group relative flex items-center gap-4 rounded-full p-2 text-[#626360] transition-colors duration-200 ease-out",
                    "hover:text-[#3c3d3b]",
                    isActive ? "active text-[#2a2b29]" : ""
                  )
                }
              >
                <span className="flex h-6 w-6 items-center justify-center">
                  <item.icon className="h-6 w-6" />
                </span>
                <span
                  className={cn(
                    "absolute right-4 w-24 text-right text-lg font-serif lowercase text-[#626360] transition-all duration-300",
                    isExpanded ? "opacity-100" : "opacity-0",
                    "group-[.active]:text-[#2a2b29]"
                  )}
                >
                  {item.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
