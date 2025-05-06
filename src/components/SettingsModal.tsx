import { useState, memo } from 'react';
import { X } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal = memo(({ onClose }: SettingsModalProps) => {
  const [showDescriptions, setShowDescriptions] = useState(() => {
    const saved = localStorage.getItem('showDescriptions');
    return saved ? saved === 'true' : true;
  });

  const [autoHideCredentials, setAutoHideCredentials] = useState(() => {
    const saved = localStorage.getItem('autoHideCredentials');
    return saved ? saved === 'true' : true;
  });

  const [gridColumns, setGridColumns] = useState(() => {
    const saved = localStorage.getItem('gridColumns');
    return saved ? parseInt(saved) : 3;
  });

  const [autoCollapseSections, setAutoCollapseSections] = useState(() => {
    const saved = localStorage.getItem('autoCollapseSections');
    return saved ? saved === 'true' : false;
  });

  const [showServiceIcons, setShowServiceIcons] = useState(() => {
    const saved = localStorage.getItem('showServiceIcons');
    return saved ? saved === 'true' : true;
  });

  const [credentialTimeout, setCredentialTimeout] = useState(() => {
    const saved = localStorage.getItem('credentialTimeout');
    return saved ? parseInt(saved) : 30;
  });

  const handleSave = () => {
    localStorage.setItem('showDescriptions', showDescriptions.toString());
    localStorage.setItem('autoHideCredentials', autoHideCredentials.toString());
    localStorage.setItem('gridColumns', gridColumns.toString());
    localStorage.setItem('autoCollapseSections', autoCollapseSections.toString());
    localStorage.setItem('showServiceIcons', showServiceIcons.toString());
    localStorage.setItem('credentialTimeout', credentialTimeout.toString());
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b dark:border-slate-700">
          <h2 className="text-xl font-semibold dark:text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="space-y-2">
            <h3 className="text-lg font-medium dark:text-white">Display</h3>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Show descriptions by default
              </label>
              <button
                onClick={() => setShowDescriptions(!showDescriptions)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showDescriptions ? 'bg-blue-500' : 'bg-gray-200 dark:bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showDescriptions ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Show service icons
              </label>
              <button
                onClick={() => setShowServiceIcons(!showServiceIcons)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showServiceIcons ? 'bg-blue-500' : 'bg-gray-200 dark:bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showServiceIcons ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Grid columns
              </label>
              <select
                value={gridColumns}
                onChange={(e) => setGridColumns(parseInt(e.target.value))}
                className="p-2 rounded border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Auto-collapse sections
              </label>
              <button
                onClick={() => setAutoCollapseSections(!autoCollapseSections)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  autoCollapseSections ? 'bg-blue-500' : 'bg-gray-200 dark:bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoCollapseSections ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium dark:text-white">Security</h3>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Auto-hide credentials
              </label>
              <button
                onClick={() => setAutoHideCredentials(!autoHideCredentials)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  autoHideCredentials ? 'bg-blue-500' : 'bg-gray-200 dark:bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoHideCredentials ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Hide credentials after (seconds)
              </label>
              <select
                value={credentialTimeout}
                onChange={(e) => setCredentialTimeout(parseInt(e.target.value))}
                className="p-2 rounded border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              >
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="60">60</option>
                <option value="120">120</option>
                <option value="300">300</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}); 