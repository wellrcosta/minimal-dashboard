import { useState, useMemo, useCallback, memo } from "react";
import { X } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Service } from "../types/dashboard";
import { WebServiceFields } from "./form-fields/WebServiceFields";
import { InfoServiceFields } from "./form-fields/InfoServiceFields";
import CustomIcons from "./icons/CustomIcons";

interface EditModalProps {
  service: Service;
  onUpdate: (updatedService: Service) => void;
  onClose: () => void;
}

export const EditModal = memo(
  ({ service, onUpdate, onClose }: EditModalProps) => {
    const [editedService, setEditedService] = useState(service);

    const handleTypeChange = useCallback((type: "web" | "info") => {
      setEditedService((prev) => ({
        ...prev,
        type,
        ...(type === "web"
          ? { description: undefined, credentials: undefined }
          : { url: undefined }),
      }));
    }, []);

    const handleNameChange = useCallback((name: string) => {
      setEditedService((prev) => ({ ...prev, name }));
    }, []);

    const handleUrlChange = useCallback((url: string) => {
      setEditedService((prev) => ({ ...prev, url }));
    }, []);

    const handleDescriptionChange = useCallback((description: string) => {
      setEditedService((prev) => ({ ...prev, description }));
    }, []);

    const handleCredentialsChange = useCallback(
      (field: string, value: string) => {
        setEditedService((prev) => ({
          ...prev,
          credentials: {
            ...prev.credentials,
            [field]: value,
          },
        }));
      },
      []
    );

    const handleIconChange = useCallback((icon: string) => {
      setEditedService((prev) => ({ ...prev, icon }));
    }, []);

    const handleSave = useCallback(() => {
      onUpdate(editedService);
      onClose();
    }, [editedService, onUpdate, onClose]);

    const webFields = useMemo(
      () => (
        <WebServiceFields
          url={editedService.url || ""}
          onUrlChange={handleUrlChange}
        />
      ),
      [editedService.url, handleUrlChange]
    );

    const infoFields = useMemo(
      () => (
        <InfoServiceFields
          description={editedService.description || ""}
          url={editedService.url || ""}
          credentials={editedService.credentials}
          onDescriptionChange={handleDescriptionChange}
          onUrlChange={handleUrlChange}
          onCredentialsChange={handleCredentialsChange}
        />
      ),
      [
        editedService.description,
        editedService.url,
        editedService.credentials,
        handleDescriptionChange,
        handleUrlChange,
        handleCredentialsChange,
      ]
    );

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full max-w-md">
          <div className="flex items-center justify-between p-4 border-b dark:border-slate-700">
            <h2 className="text-xl font-semibold dark:text-white">
              Edit Service
            </h2>
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
                Name
              </label>
              <input
                type="text"
                value={editedService.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Type
              </label>
              <select
                value={editedService.type}
                onChange={(e) =>
                  handleTypeChange(e.target.value as "web" | "info")
                }
                className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              >
                <option value="web">Web Service</option>
                <option value="info">Informational</option>
              </select>
            </div>

            {editedService.type === "web" ? webFields : infoFields}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Icon
              </label>
              <select
                value={editedService.icon}
                onChange={(e) => handleIconChange(e.target.value)}
                className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              >
                <optgroup label="Ícones Personalizados">
                  {Object.keys(CustomIcons).map((iconName) => (
                    <option key={iconName} value={iconName}>
                      {iconName}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Ícones Lucide">
                  {Object.keys(LucideIcons).map((iconName) => (
                    <option key={iconName} value={iconName}>
                      {iconName}
                    </option>
                  ))}
                </optgroup>
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
  }
);
