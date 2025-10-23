import { useNavigate } from "react-router-dom";
import { Moon, Sun, ArrowLeft } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

type MobileNavProps = {
  showBackButton?: boolean;
  title?: string;
};

const MobileNav = ({ showBackButton = false, title }: MobileNavProps) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 pointer-events-none">
      {/* Left side - Back button */}
      {showBackButton ? (
        <button
          onClick={() => navigate('/me')}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/12 shadow-lg shadow-slate-900/5 backdrop-blur-md transition-colors hover:bg-white/20 supports-[backdrop-filter]:bg-white/8 dark:border-dark-border/10 dark:bg-dark-bg/12 dark:hover:bg-dark-bg/20 dark:supports-[backdrop-filter]:bg-dark-bg/8"
          aria-label="Back to home"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700 dark:text-dark-text" />
        </button>
      ) : (
        <div className="h-10 w-10" /> // Spacer
      )}

      {/* Center - Title in glassy pill */}
      {title && (
        <div className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border border-white/10 bg-white/12 shadow-lg shadow-slate-900/5 backdrop-blur-md px-6 py-2 supports-[backdrop-filter]:bg-white/8 dark:border-dark-border/10 dark:bg-dark-bg/12 dark:supports-[backdrop-filter]:bg-dark-bg/8">
          <h1 className="font-serif text-xl tracking-tight text-light-text-dark dark:text-dark-text">
            {title}
          </h1>
        </div>
      )}

      {/* Right side - Theme toggle */}
      <button
        onClick={toggleTheme}
        className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/12 shadow-lg shadow-slate-900/5 backdrop-blur-md transition-colors hover:bg-white/20 supports-[backdrop-filter]:bg-white/8 dark:border-dark-border/10 dark:bg-dark-bg/12 dark:hover:bg-dark-bg/20 dark:supports-[backdrop-filter]:bg-dark-bg/8"
        aria-label="Toggle dark mode"
      >
        {theme === "light" ? (
          <Moon className="h-5 w-5 text-gray-700 dark:text-dark-text" />
        ) : (
          <Sun className="h-5 w-5 text-dark-text" />
        )}
      </button>
    </div>
  );
};

export default MobileNav;
