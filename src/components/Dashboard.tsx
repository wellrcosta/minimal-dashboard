import { useEffect, useState } from "react";
import Section from "./Section";
import { DndContext, closestCenter, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { Section as SectionType, Service } from "../types/dashboard";

interface DashboardProps {
  editMode: boolean;
}

const Dashboard = ({ editMode }: DashboardProps) => {
  const [sections, setSections] = useState<SectionType[]>([]);
  const [activeService, setActiveService] = useState<Service | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => setSections(data.sections || []));
  }, []);

  useEffect(() => {
    if (!editMode) return;
    fetch("/api/dashboard", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sections }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to save changes');
        }
        return res.json();
      })
      .catch((err) => {
        console.error('Error saving dashboard:', err);
        alert('Failed to save changes. Please try again.');
      });
  }, [sections, editMode]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    
    const service = sections
      .flatMap(section => section.services)
      .find(s => s.id === active.id);
    
    if (service) {
      setActiveService(service);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeSection = sections.find(section => 
      section.services.some(service => service.id === active.id)
    );
    const overSection = sections.find(section => 
      section.id === over.id || section.services.some(service => service.id === over.id)
    );

    if (!activeSection || !overSection) return;

    const activeServiceIndex = activeSection.services.findIndex(
      service => service.id === active.id
    );

    if (activeServiceIndex === -1) return;

    const activeService = activeSection.services[activeServiceIndex];

    if (over.id === overSection.id) {
      const newActiveServices = activeSection.services.filter(
        service => service.id !== active.id
      );
      const newOverServices = [...overSection.services, activeService];

      setSections(sections.map(section => {
        if (section.id === activeSection.id) {
          return { ...section, services: newActiveServices };
        }
        if (section.id === overSection.id) {
          return { ...section, services: newOverServices };
        }
        return section;
      }));
    } else {
      const overServiceIndex = overSection.services.findIndex(
        service => service.id === over.id
      );

      if (overServiceIndex === -1) return;

      if (activeSection.id === overSection.id) {
        const items = Array.from(activeSection.services);
        const [reorderedItem] = items.splice(activeServiceIndex, 1);
        items.splice(overServiceIndex, 0, reorderedItem);

        setSections(sections.map(section => 
          section.id === activeSection.id 
            ? { ...section, services: items }
            : section
        ));
      } else {
        const newActiveServices = activeSection.services.filter(
          service => service.id !== active.id
        );
        const newOverServices = [
          ...overSection.services.slice(0, overServiceIndex),
          activeService,
          ...overSection.services.slice(overServiceIndex)
        ];

        setSections(sections.map(section => {
          if (section.id === activeSection.id) {
            return { ...section, services: newActiveServices };
          }
          if (section.id === overSection.id) {
            return { ...section, services: newOverServices };
          }
          return section;
        }));
      }
    }

    setActiveService(null);
  };

  const addSection = () => {
    const newSection: SectionType = {
      id: `section-${Date.now()}`,
      name: "New Section",
      services: [],
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (sectionId: string, updatedSection: SectionType) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId ? updatedSection : section
      )
    );
  };

  const deleteSection = (sectionId: string) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  const moveService = (serviceId: string, targetSectionId: string) => {
    const sourceSection = sections.find(section =>
      section.services.some(service => service.id === serviceId)
    );
    const targetSection = sections.find(section => section.id === targetSectionId);

    if (!sourceSection || !targetSection) return;

    const service = sourceSection.services.find(service => service.id === serviceId);
    if (!service) return;

    setSections(sections.map(section => {
      if (section.id === sourceSection.id) {
        return {
          ...section,
          services: section.services.filter(s => s.id !== serviceId)
        };
      }
      if (section.id === targetSectionId) {
        return {
          ...section,
          services: [...section.services, service]
        };
      }
      return section;
    }));
  };

  const sectionsList = sections.map(section => ({
    id: section.id,
    name: section.name
  }));

  return (
    <div className="space-y-6">
      {editMode && (
        <div className="flex justify-end">
          <button
            onClick={addSection}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Plus size={20} />
            Add Section
          </button>
        </div>
      )}

      <DndContext 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd} 
        collisionDetection={closestCenter}
      >
        <SortableContext
          items={sections.map((section) => section.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className={`grid gap-6 ${
            localStorage.getItem('gridColumns') === '1' ? 'grid-cols-1' :
            localStorage.getItem('gridColumns') === '2' ? 'grid-cols-1 lg:grid-cols-2' :
            localStorage.getItem('gridColumns') === '3' ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' :
            localStorage.getItem('gridColumns') === '4' ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-4' :
            'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
          }`}>
            {sections.map((section) => (
              <Section
                key={section.id}
                section={section}
                editMode={editMode}
                onUpdate={updateSection}
                onDelete={deleteSection}
                onMove={moveService}
                sections={sectionsList}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeService && (
            <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg opacity-50">
              <div className="flex items-center gap-2">
                <span className="font-medium">{activeService.name}</span>
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Dashboard;
