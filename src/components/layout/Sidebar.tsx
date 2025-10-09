import type { ElementType } from "react";
import { NavLink } from "react-router-dom";
import { GraduationCap, Mail, Settings, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";

type NavItem = {
  path: string;
  name: string;
  icon: ElementType;
};

const navItems: NavItem[] = [
  { path: "/me", name: "me", icon: User },
  { path: "/academics", name: "academics", icon: GraduationCap },
  { path: "/projects", name: "projects", icon: Settings },
  { path: "/contact", name: "contact", icon: Mail },
];

const Sidebar = () => {
  const { isExpanded, toggleSidebar, collapseSidebar } = useSidebar();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r border-gray-200 bg-white transition-[width] duration-300",
        isExpanded ? "w-44" : "w-16"
      )}
    >
      <div
        className={cn(
          "relative flex h-8 items-center overflow-hidden border-b border-gray-200",
          isExpanded ? "px-6" : ""
        )}
        onClick={() => isExpanded && collapseSidebar()}
      >
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xl font-bold">
          DAN
        </span>
        <span
          className={cn(
            "absolute left-[3.625rem] top-1/2 -translate-y-1/2 text-xl font-bold transition-opacity duration-300",
            isExpanded ? "opacity-100" : "opacity-0"
          )}
        >
          DANAHER
        </span>
        {!isExpanded && (
          <button
            type="button"
            className="absolute inset-0 flex cursor-pointer items-center justify-center"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Expand navigation</span>
          </button>
        )}
      </div>

      <nav className="flex-1 pt-6">
        <ul className="space-y-6">
          {navItems.map((item) => (
            <li key={item.path} className="pl-2.5 pr-4">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "relative flex items-center gap-4 rounded-full p-2 transition-colors",
                    isActive ? "bg-gray-200" : "hover:bg-gray-100"
                  )
                }
              >
                <span className="flex h-6 w-6 items-center justify-center">
                  <item.icon className="h-6 w-6" />
                </span>
                <span
                  className={cn(
                    "absolute right-4 text-lg capitalize transition-opacity duration-300",
                    isExpanded ? "opacity-100" : "opacity-0"
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
