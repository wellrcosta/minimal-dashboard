import { memo } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export const ThemeToggle = memo(({ darkMode, setDarkMode }: ThemeToggleProps) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
      aria-label="Toggle Theme"
    >
      {darkMode ? (
        <Sun size={20} className="text-yellow-400" />
      ) : (
        <Moon size={20} className="text-gray-600" />
      )}
    </button>
  );
});