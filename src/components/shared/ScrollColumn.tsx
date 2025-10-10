
import { useEffect, useRef, useState, type PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type ScrollColumnProps = PropsWithChildren<{
  className?: string;
}>;

const ScrollColumn = ({ className, children }: ScrollColumnProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) {
      return;
    }

    const handleScroll = () => {
      setIsScrolled(element.scrollTop > 0);
    };

    handleScroll();
    element.addEventListener("scroll", handleScroll);

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={cn("relative h-full", className)}>
      <div ref={scrollRef} className="custom-scrollbar absolute inset-0 overflow-y-auto">
        <div className="p-6">{children}</div>
      </div>
      <div
        className={cn(
          "pointer-events-none absolute left-0 right-0 top-0 h-24 bg-gradient-to-b from-neutral-100 to-transparent transition-opacity duration-200",
          isScrolled ? "opacity-100" : "opacity-0"
        )}
      />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-100 to-transparent" />
    </div>
  );
};

export default ScrollColumn;
