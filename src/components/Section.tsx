import { useState } from 'react';
import ServiceCard from './ServiceCard';
import { ChevronDown, ChevronUp, Edit, Trash, Plus } from 'lucide-react';
import { Section as SectionType, Service } from '../types/dashboard';

interface SectionProps {
  section: SectionType;
  editMode: boolean;
  onUpdate: (sectionId: string, updatedSection: SectionType) => void;
  onDelete: (sectionId: string) => void;
  onMove: (serviceId: string, targetSectionId: string) => void;
  sections: Array<{ id: string; name: string }>;
}

const Section = ({ 
  section, 
  editMode, 
  onUpdate, 
  onDelete,
  onMove,
  sections
}: SectionProps) => {
  const [collapsed, setCollapsed] = useState(() => {
    const autoCollapse = localStorage.getItem('autoCollapseSections') === 'true';
    return autoCollapse;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [sectionName, setSectionName] = useState(section.name);

  const addService = () => {
    const newService: Service = {
      id: `service-${Date.now()}`,
      name: 'New Service',
      type: 'web',
      url: 'https://',
      icon: 'Globe'
    };
    onUpdate(section.id, {
      ...section,
      services: [...section.services, newService]
    });
  };

  const updateService = (serviceId: string, updatedService: Service) => {
    onUpdate(section.id, {
      ...section,
      services: section.services.map(service =>
        service.id === serviceId ? updatedService : service
      )
    });
  };

  const deleteService = (serviceId: string) => {
    onUpdate(section.id, {
      ...section,
      services: section.services.filter(service => service.id !== serviceId)
    });
  };

  const handleSectionNameSave = () => {
    onUpdate(section.id, { ...section, name: sectionName });
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden animate-fade-in">
      <div className="flex items-center p-4 bg-gray-50 dark:bg-slate-700/50 border-b border-gray-100 dark:border-slate-700 transition-colors duration-300">
        {isEditing ? (
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              className="flex-1 px-2 py-1 rounded border dark:bg-slate-600 dark:border-slate-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSectionNameSave()}
            />
            <button
              onClick={handleSectionNameSave}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        ) : (
          <h2 className="flex-1 text-lg font-semibold text-gray-800 dark:text-white">
            {section.name}
          </h2>
        )}

        <div className="flex items-center gap-2">
          {editMode && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600"
              >
                <Edit size={18} className="text-blue-500" />
              </button>
              <button
                onClick={() => onDelete(section.id)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600"
              >
                <Trash size={18} className="text-red-500" />
              </button>
            </>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600"
          >
            {collapsed ? (
              <ChevronDown size={18} className="text-gray-500 dark:text-gray-300" />
            ) : (
              <ChevronUp size={18} className="text-gray-500 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>
      
      <div className={`transition-all duration-300 ease-in-out ${
        collapsed ? 'max-h-0 p-0 opacity-0 pointer-events-none overflow-hidden' : 'max-h-[1000px] opacity-100'
      }`}>
        <div className="grid gap-3 p-4">
          {section.services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              editMode={editMode}
              onUpdate={updateService}
              onDelete={deleteService}
              onMove={onMove}
              sections={sections}
            />
          ))}
        </div>

        {editMode && (
          <div className="px-4 pb-4">
            <button
              onClick={addService}
              className="w-full flex items-center justify-center gap-2 p-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <Plus size={20} className="text-gray-500 dark:text-gray-400" />
              <span className="text-gray-500 dark:text-gray-400">Add Service</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Section;