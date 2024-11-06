import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableArea } from './SortableArea';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface Area {
  id: string;
  emoji: string;
  name: string;
  score: number;
  order: number;
}

interface DragDropContextProps {
  areas: Area[];
  onReorder: (areas: Area[]) => void;
  onComplete: () => void;
}

export function DragDropContext({ areas, onReorder, onComplete }: DragDropContextProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!active || !over || active.id === over.id) {
      return;
    }

    const oldIndex = areas.findIndex((area) => area.id === active.id);
    const newIndex = areas.findIndex((area) => area.id === over.id);
    
    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const newAreas = arrayMove(areas, oldIndex, newIndex).map((area, index) => ({
      ...area,
      order: index,
    }));
    
    onReorder(newAreas);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="p-6 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Ustal Priorytety</h2>
          <p className="text-gray-600">
            Przeciągnij i upuść obszary według ich ważności dla Ciebie
          </p>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={areas.map(area => area.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {areas.map((area) => (
                <SortableArea key={area.id} area={area} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <Button onClick={onComplete} className="w-full mt-6">
          Zakończ i Pobierz Analizę
        </Button>
      </Card>
    </div>
  );
}