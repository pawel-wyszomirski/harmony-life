import {
  VStack,
  Heading,
  Text,
  Button,
  Container,
  useToast,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableArea } from './SortableArea';
import { Area } from '../types/harmony';

interface SummaryProps {
  areas: Area[];
  onAreasChange: (areas: Area[]) => void;
  onBack: () => void;
}

export function Summary({ areas, onAreasChange, onBack }: SummaryProps) {
  const toast = useToast();
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

  const handleDragEnd = ({ active, over }: any) => {
    if (over && active.id !== over.id) {
      const oldIndex = areas.findIndex((area) => area.id === active.id);
      const newIndex = areas.findIndex((area) => area.id === over.id);
      
      const newAreas = arrayMove(areas, oldIndex, newIndex).map((area, index) => ({
        ...area,
        order: index, // Remove the +1 here to start from 0
      }));
      
      onAreasChange(newAreas);
    }
  };

  const handleDownloadCSV = () => {
    const headers = ['Obszar', 'Ocena', 'Priorytet', 'Notatki'];
    const rows = areas.map(area => [
      area.name,
      area.score.toString(),
      (area.order + 1).toString(), // Add +1 only for display
      area.notes.replace(/"/g, '""')
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'harmony-life-analysis.csv';
    link.click();
    URL.revokeObjectURL(link.href);

    toast({
      title: 'Plik został pobrany',
      description: 'Analiza została zapisana w formacie CSV',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <VStack spacing={4} textAlign="center">
          <Heading size="lg">Podsumowanie Analizy</Heading>
          <Text color="gray.600">
            Przeciągnij obszary, aby ustalić ich priorytety
          </Text>
        </VStack>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={areas.map(area => area.id)}
            strategy={verticalListSortingStrategy}
          >
            <VStack spacing={3} w="full">
              {areas.map((area) => (
                <SortableArea key={area.id} area={area} />
              ))}
            </VStack>
          </SortableContext>
        </DndContext>

        <VStack spacing={4} w="full">
          <Button
            leftIcon={<DownloadIcon />}
            colorScheme="blue"
            size="lg"
            onClick={handleDownloadCSV}
            w="full"
          >
            Pobierz Analizę (CSV)
          </Button>
          <Button
            variant="ghost"
            onClick={onBack}
            size="lg"
            w="full"
          >
            Wróć do Edycji
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
}