import { useNavigate } from "react-router-dom";
import { Moon, Sun, ArrowLeft } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

type MobileNavProps = {
  showBackButton?: boolean;
};

const MobileNav = ({ showBackButton = false }: MobileNavProps) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 pointer-events-none">
      {/* Left side - Back button */}
      {showBackButton ? (
        <button
          onClick={() => navigate('/me')}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-lg transition-colors hover:bg-white dark:bg-dark-bg/80 dark:hover:bg-dark-bg border border-light-border/20 dark:border-dark-border/20"
          aria-label="Back to home"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700 dark:text-dark-text" />
        </button>
      ) : (
        <div className="h-10 w-10" /> // Spacer
      )}

      {/* Right side - Theme toggle */}
      <button
        onClick={toggleTheme}
        className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-lg transition-colors hover:bg-white dark:bg-dark-bg/80 dark:hover:bg-dark-bg border border-light-border/20 dark:border-dark-border/20"
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
