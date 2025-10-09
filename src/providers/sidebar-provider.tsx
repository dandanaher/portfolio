import type { ReactNode } from "react";
import { useMemo, useState } from "react";

import { SidebarContext } from "@/providers/sidebar-context";

type SidebarProviderProps = {
  children: ReactNode;
};

const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const value = useMemo(
    () => ({
      isExpanded,
      toggleSidebar: () => setIsExpanded((prev) => !prev),
      expandSidebar: () => setIsExpanded(true),
      collapseSidebar: () => setIsExpanded(false),
    }),
    [isExpanded]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

export default SidebarProvider;
