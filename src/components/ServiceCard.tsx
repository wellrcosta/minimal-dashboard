import { useState, useMemo, memo, useEffect } from "react";
import {
  ExternalLink,
  Edit,
  Trash,
  Move,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Service } from "../types/dashboard";
import { EditModal } from "./EditModal";
import { MoveModal } from "./MoveModal";
import CustomIcons from "./icons/CustomIcons";

interface ServiceProps {
  service: Service;
  editMode: boolean;
  onUpdate: (serviceId: string, updatedService: Service) => void;
  onDelete: (serviceId: string) => void;
  onMove: (serviceId: string, targetSectionId: string) => void;
  sections: Array<{ id: string; name: string }>;
}

const ServiceCard = ({
  service,
  editMode,
  onUpdate,
  onDelete,
  onMove,
  sections,
}: ServiceProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isExpanded, setIsExpanded] = useState(() => {
    const saved = localStorage.getItem("showDescriptions");
    return saved ? saved === "true" : true;
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [showConnectionString, setShowConnectionString] = useState(false);

  useEffect(() => {
    const autoHide = localStorage.getItem("autoHideCredentials") === "true";
    if (autoHide) {
      const timeout = setTimeout(() => {
        setShowPassword(false);
        setShowUsername(false);
        setShowConnectionString(false);
      }, parseInt(localStorage.getItem("credentialTimeout") || "30") * 1000);

      return () => clearTimeout(timeout);
    }
  }, [showPassword, showUsername, showConnectionString]);

  const IconComponent = useMemo(() => {
    if (localStorage.getItem("showServiceIcons") === "false") {
      return () => null;
    }

    const customIcon = CustomIcons[
      service.icon as keyof typeof CustomIcons
    ] as React.ComponentType<React.SVGProps<SVGSVGElement>>;
    if (customIcon) {
      return customIcon;
    }

    return (
      (LucideIcons[
        service.icon as keyof typeof LucideIcons
      ] as React.ComponentType<React.SVGProps<SVGSVGElement>>) ||
      LucideIcons.Globe
    );
  }, [service.icon]);

  return (
    <>
      <div className="group flex flex-col gap-2 p-3 bg-gray-50 dark:bg-slate-700/30 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700/60 transition-all duration-200 animate-scale-in">
        <div className="flex items-start gap-2">
          {service.type === "web" ? (
            <a
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center gap-3"
            >
              <IconComponent width={20} height={20} className="text-blue-500" />
              <span className="font-medium">{service.name}</span>
            </a>
          ) : (
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <IconComponent
                  width={20}
                  height={20}
                  className="text-blue-500"
                />
                <span className="font-medium">{service.name}</span>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600"
                >
                  {isExpanded ? (
                    <ChevronUp size={16} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-500" />
                  )}
                </button>
              </div>
              {service.description && !isExpanded && (
                <p className="ml-8 text-sm text-gray-500 dark:text-gray-300 line-clamp-1">
                  {service.description}
                </p>
              )}
            </div>
          )}

          {editMode && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600"
              >
                <Edit size={16} className="text-blue-500" />
              </button>
              <button
                onClick={() => setIsMoving(true)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600"
              >
                <Move size={16} className="text-purple-500" />
              </button>
              <button
                onClick={() => onDelete(service.id)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600"
              >
                <Trash size={16} className="text-red-500" />
              </button>
            </div>
          )}

          {!editMode && service.type === "web" && (
            <ExternalLink
              size={16}
              className="text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all"
            />
          )}
        </div>

        {service.type === "info" && isExpanded && (
          <div className="ml-8 text-sm text-gray-500 dark:text-gray-300 space-y-2">
            {service.description && <p>{service.description}</p>}
            {service.url && (
              <p>
                <strong>URL:</strong> {service.url}
              </p>
            )}
            {service.credentials && (
              <ul className="space-y-2">
                {service.credentials.username && (
                  <li className="flex items-center gap-2">
                    <strong>User:</strong>
                    <button
                      onClick={() => setShowUsername(!showUsername)}
                      className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600"
                    >
                      {showUsername ? (
                        <EyeOff size={14} className="text-gray-500" />
                      ) : (
                        <Eye size={14} className="text-gray-500" />
                      )}
                    </button>
                    {showUsername && (
                      <span className="font-mono">
                        {service.credentials.username}
                      </span>
                    )}
                  </li>
                )}
                {service.credentials.password && (
                  <li className="flex items-center gap-2">
                    <strong>Password:</strong>
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600"
                    >
                      {showPassword ? (
                        <EyeOff size={14} className="text-gray-500" />
                      ) : (
                        <Eye size={14} className="text-gray-500" />
                      )}
                    </button>
                    {showPassword && (
                      <span className="font-mono">
                        {service.credentials.password}
                      </span>
                    )}
                  </li>
                )}
                {service.credentials.connectionString && (
                  <li className="flex items-center gap-2">
                    <strong>Connection:</strong>
                    <button
                      onClick={() =>
                        setShowConnectionString(!showConnectionString)
                      }
                      className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600"
                    >
                      {showConnectionString ? (
                        <EyeOff size={14} className="text-gray-500" />
                      ) : (
                        <Eye size={14} className="text-gray-500" />
                      )}
                    </button>
                    {showConnectionString && (
                      <span className="font-mono">
                        {service.credentials.connectionString}
                      </span>
                    )}
                  </li>
                )}
              </ul>
            )}
          </div>
        )}
      </div>

      {isEditing && (
        <EditModal
          service={service}
          onUpdate={(updatedService: Service) =>
            onUpdate(service.id, updatedService)
          }
          onClose={() => setIsEditing(false)}
        />
      )}

      {isMoving && (
        <MoveModal
          service={service}
          sections={sections}
          onMove={(targetSectionId: string) => {
            onMove(service.id, targetSectionId);
            setIsMoving(false);
          }}
          onClose={() => setIsMoving(false)}
        />
      )}
    </>
  );
};

export default memo(ServiceCard);
