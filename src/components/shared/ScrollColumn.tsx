
import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type ScrollColumnProps = PropsWithChildren<{
  className?: string;
}>;

const ScrollColumn = ({ className, children }: ScrollColumnProps) => {
  return (
    <div className={cn("relative h-full", className)}>
      <div className="custom-scrollbar absolute inset-0 overflow-y-auto">
        <div className="p-6">{children}</div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-100 to-transparent" />
    </div>
  );
};

export default ScrollColumn;
