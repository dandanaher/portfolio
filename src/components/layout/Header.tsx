import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { THEME_COLORS } from "@/constants/theme";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 h-8 w-full border-b border-gray-100/20 bg-white/60 font-sans backdrop-blur-lg dark:border-gray-800/20 dark:bg-dark-bg/60">
      <div className="flex h-full items-center">
        <div className="w-2/5 min-w-[280px] px-6" aria-hidden />
        <div className="flex-1" />
        <button
          onClick={toggleTheme}
          className="mr-6 flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle dark mode"
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4 text-gray-700 dark:text-dark-text" />
          ) : (
            <Sun className="h-4 w-4 text-dark-text" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
