import { useState } from 'react';
import { Box, Container, useColorMode } from '@chakra-ui/react';
import { HarmonyModel } from './components/HarmonyModel';
import { FileUpload } from './components/FileUpload';
import { Summary } from './components/Summary';
import { ReloadPrompt } from './ReloadPrompt';
import { harmonyData } from './data/harmonyData';
import { Area } from './types/harmony';

type AppState = 'start' | 'assessment' | 'summary';

export default function App() {
  const [state, setState] = useState<AppState>('start');
  const [areas, setAreas] = useState<Area[]>(
    harmonyData.map((area, index) => ({
      ...area,
      score: 5,
      notes: '',
      order: index,
    }))
  );
  const { colorMode } = useColorMode();

  const handleFileUpload = (data: any[]) => {
    const updatedAreas = areas.map((area, index) => {
      const uploadedArea = data.find(item => item.name === area.name);
      return {
        ...area,
        score: uploadedArea?.score ?? 5,
        notes: uploadedArea?.notes ?? '',
        order: index,
      };
    });
    setAreas(updatedAreas);
    setState('assessment');
  };

  const handleStart = () => setState('assessment');
  const handleComplete = () => setState('summary');
  const handleBack = () => setState('assessment');

  return (
    <Box
      minH="100vh"
      bg={colorMode === 'dark' ? 'gray.900' : 'gray.50'}
      transition="background-color 0.2s"
      py={8}
    >
      <Container maxW="container.lg" px={4}>
        {state === 'start' && (
          <FileUpload onUpload={handleFileUpload} onStart={handleStart} />
        )}
        {state === 'assessment' && (
          <HarmonyModel
            areas={areas}
            onAreasChange={setAreas}
            onComplete={handleComplete}
          />
        )}
        {state === 'summary' && (
          <Summary
            areas={areas}
            onAreasChange={setAreas}
            onBack={handleBack}
          />
        )}
      </Container>
      <ReloadPrompt />
    </Box>
  );
}