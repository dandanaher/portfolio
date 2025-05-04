
import React from 'react';
import { cn } from '@/lib/utils';

interface ScrollColumnProps {
  className?: string;
  children: React.ReactNode;
}

const ScrollColumn: React.FC<ScrollColumnProps> = ({ className, children }) => {
  return (
    <div className={cn("relative flex-1 h-full", className)}>
      <div className="absolute inset-0 overflow-y-auto custom-scrollbar">
        <div className="p-6">
          {children}
        </div>
      </div>
      
      {/* Gradient fade at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-100 to-transparent pointer-events-none" />
    </div>
  );
};

export default ScrollColumn;
