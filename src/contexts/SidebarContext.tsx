
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface SidebarContextType {
  isExpanded: boolean;
  toggleSidebar: () => void;
  expandSidebar: () => void;
  collapseSidebar: () => void;
  sidebarWidth: number;
  infoCardWidth: string;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(64); // 16rem = 64px
  const [infoCardWidth, setInfoCardWidth] = useState("40%");

  // Update widths when sidebar state changes
  useEffect(() => {
    setSidebarWidth(isExpanded ? 240 : 64); // 60px when collapsed, 240px when expanded
    setInfoCardWidth(isExpanded ? "30%" : "40%");
  }, [isExpanded]);

  const toggleSidebar = () => setIsExpanded(prev => !prev);
  const expandSidebar = () => setIsExpanded(true);
  const collapseSidebar = () => setIsExpanded(false);

  return (
    <SidebarContext.Provider value={{ 
      isExpanded, 
      toggleSidebar, 
      expandSidebar, 
      collapseSidebar,
      sidebarWidth,
      infoCardWidth
    }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
