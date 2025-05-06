import { memo } from "react";
import { X } from "lucide-react";
import { Service } from "../types/dashboard";

interface MoveModalProps {
  service: Service;
  sections: Array<{ id: string; name: string }>;
  onMove: (targetSectionId: string) => void;
  onClose: () => void;
}

export const MoveModal = memo(({ 
  sections,
  onMove,
  onClose
}: MoveModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b dark:border-slate-700">
          <h2 className="text-xl font-semibold dark:text-white">Move Service</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select Destination Section
            </label>
            <select
              onChange={(e) => onMove(e.target.value)}
              className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            >
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}); 