import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import { ThemeToggle } from "./components/ThemeToggle";
import { Monitor, Settings, Edit } from "lucide-react";
import { SettingsModal } from "./components/SettingsModal";
import dashboardConfig from "./config/dashboard.config.json";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      if (savedMode !== null) {
        return savedMode === "true";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  const [editMode, setEditMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-gray-100 dark:border-slate-700 transition-colors duration-300">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Monitor className="w-6 h-6 text-blue-500 dark:text-blue-400" />
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              {dashboardConfig.title}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEditMode(!editMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle Edit Mode"
            >
              <Edit
                size={20}
                className={`transition-colors ${
                  editMode
                    ? "text-blue-500"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              />
            </button>
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Settings"
            >
              <Settings
                size={20}
                className="text-gray-600 dark:text-gray-300"
              />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Dashboard editMode={editMode} />
      </main>

      <footer className="mt-auto py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          © {new Date().getFullYear()} Minimal Dashboard. All rights reserved.
        </p>
      </footer>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}

export default App;
