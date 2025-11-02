import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/react-app/contexts/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-600 dark:text-gray-300 hover:text-cricket-green-700 dark:hover:text-cricket-green-400 hover:bg-cricket-green-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}
