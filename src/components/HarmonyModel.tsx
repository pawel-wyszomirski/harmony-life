import { useState } from 'react';
import {
  VStack,
  ButtonGroup,
  Button,
  Progress,
  Text,
  Container,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { HarmonyArea } from './HarmonyArea';
import { Area } from '../types/harmony';

interface HarmonyModelProps {
  areas: Area[];
  onAreasChange: (areas: Area[]) => void;
  onComplete: () => void;
}

export function HarmonyModel({ areas, onAreasChange, onComplete }: HarmonyModelProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  const handleScoreChange = (score: number) => {
    const newAreas = areas.map((area, idx) =>
      idx === currentStep ? { ...area, score } : area
    );
    onAreasChange(newAreas);
  };

  const handleNotesChange = (notes: string) => {
    const newAreas = areas.map((area, idx) =>
      idx === currentStep ? { ...area, notes } : area
    );
    onAreasChange(newAreas);
  };

  const progress = ((currentStep + 1) / areas.length) * 100;

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} w="full">
        <Box 
          w="full" 
          bg={bg} 
          p={4} 
          borderRadius="xl" 
          boxShadow="sm"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Progress 
            value={progress} 
            size="sm" 
            colorScheme="blue" 
            borderRadius="full"
            bg={useColorModeValue('gray.100', 'gray.700')}
          />
          <Text color={textColor} textAlign="center" mt={2} fontSize="sm">
            Krok {currentStep + 1} z {areas.length}
          </Text>
        </Box>

        <HarmonyArea
          area={areas[currentStep]}
          onScoreChange={handleScoreChange}
          onNotesChange={handleNotesChange}
        />
        
        <ButtonGroup spacing={4} w="full" justifyContent="center">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => prev - 1)}
            isDisabled={currentStep === 0}
            size="lg"
            minW={32}
          >
            Poprzedni
          </Button>
          {currentStep === areas.length - 1 ? (
            <Button 
              colorScheme="blue" 
              onClick={onComplete}
              size="lg"
              minW={32}
            >
              Zakończ
            </Button>
          ) : (
            <Button 
              colorScheme="blue"
              onClick={() => setCurrentStep(prev => prev + 1)}
              size="lg"
              minW={32}
            >
              Następny
            </Button>
          )}
        </ButtonGroup>
      </VStack>
    </Container>
  );
}