import type { FocusEvent } from "react";
import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";

import meIcon from "@/assets/branding/me_icon.png";
import libraryIcon from "@/assets/branding/library_icon.png";
import projectsIcon from "@/assets/branding/projects_icon.png";
import thoughtsIcon from "@/assets/branding/thoughts_icon.png";

type NavItem = {
  path: string;
  name: string;
  icon: string;
};

const navItems: NavItem[] = [
  { path: "/me", name: "me", icon: meIcon },
  { path: "/library", name: "library", icon: libraryIcon },
  { path: "/projects", name: "projects", icon: projectsIcon },
  { path: "/thoughts", name: "thoughts", icon: thoughtsIcon },
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
        "dark:border-gray-800/20 dark:bg-[#262624]/12 dark:supports-[backdrop-filter]:bg-[#262624]/8",
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
          "dark:border-gray-800/20 dark:bg-gray-800/10",
          isExpanded ? "px-6" : ""
        )}
      >
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xl font-bold font-sans text-[#3c3d3b] dark:text-[#FAF8F4]">
          DAN
        </span>
        <span
          className={cn(
            "absolute left-[3.625rem] top-1/2 -translate-y-1/2 text-xl font-bold font-sans text-[#3c3d3b] transition-opacity duration-300 dark:text-[#FAF8F4]",
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
                    "hover:text-[#3c3d3b] dark:text-[#9a9a98] dark:hover:text-[#FAF8F4]",
                    isActive ? "active text-[#2a2b29] dark:text-[#FAF8F4]" : ""
                  )
                }
              >
                <span className="flex h-6 w-6 items-center justify-center">
                  <img src={item.icon} alt={item.name} className="h-7 w-7" />
                </span>
                <span
                  className={cn(
                    "absolute right-4 w-24 text-right text-lg font-serif lowercase text-[#626360] transition-all duration-300",
                    "dark:text-[#9a9a98] dark:group-[.active]:text-[#FAF8F4]",
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
