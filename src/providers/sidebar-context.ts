import { createContext } from "react";

export type SidebarContextValue = {
  isExpanded: boolean;
  toggleSidebar: () => void;
  expandSidebar: () => void;
  collapseSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);
