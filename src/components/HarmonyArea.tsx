import {
  Box,
  VStack,
  Heading,
  Text,
  Textarea,
  Collapse,
  Button,
  SimpleGrid,
  Icon,
  Container,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { ArrowRight, Target, Wrench, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Area } from '../types/harmony';

interface HarmonyAreaProps {
  area: Area;
  onScoreChange: (score: number) => void;
  onNotesChange: (notes: string) => void;
}

const labelStyles = {
  mt: '6',
  ml: '-2.5',
  fontSize: 'sm',
  color: 'gray.500',
};

export function HarmonyArea({ area, onScoreChange, onNotesChange }: HarmonyAreaProps) {
  const [showMore, setShowMore] = useState(false);
  
  const bg = useColorModeValue('white', 'gray.800');
  const headerBg = useColorModeValue('blue.500', 'blue.600');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Container maxW="container.md" p={0}>
      <Box 
        bg={bg} 
        borderRadius="xl" 
        overflow="hidden" 
        borderWidth="1px" 
        borderColor={borderColor}
      >
        <Box bg={headerBg} p={6} color="white">
          <VStack spacing={4} align="center">
            <Text fontSize="4xl">{area.emoji}</Text>
            <Heading size="lg">
              {area.letter} - {area.name}
            </Heading>
          </VStack>
        </Box>

        <VStack spacing={8} p={6}>
          <Box w="full" textAlign="center">
            <Heading size="md" mb={8} color={textColor}>
              {area.mainQuestion}
            </Heading>
            
            <Box px={8} pt={6}>
              <Slider
                value={area.score}
                min={1}
                max={10}
                step={1}
                onChange={onScoreChange}
              >
                <SliderMark value={1} {...labelStyles}>1</SliderMark>
                <SliderMark value={5} {...labelStyles} ml="-6">5</SliderMark>
                <SliderMark value={10} {...labelStyles}>10</SliderMark>
                <SliderMark
                  value={area.score}
                  textAlign="center"
                  bg="blue.500"
                  color="white"
                  mt="-10"
                  ml="-5"
                  w="10"
                  fontSize="sm"
                  borderRadius="full"
                >
                  {area.score}
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
          </Box>

          <Box w="full">
            <Text fontWeight="medium" mb={3} color={textColor}>Twoje notatki:</Text>
            <Textarea
              value={area.notes}
              onChange={(e) => onNotesChange(e.target.value)}
              placeholder="Zapisz swoje przemyślenia..."
              rows={4}
              bg={bg}
              color={textColor}
              borderColor={borderColor}
              _hover={{ borderColor: 'blue.500' }}
              _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
            />
          </Box>

          <Box w="full">
            <Text fontWeight="medium" mb={3} color={textColor}>Pytania pomocnicze:</Text>
            <VStack align="stretch" spacing={2}>
              {area.helpQuestions.map((question, index) => (
                <HStack
                  key={index}
                  p={3}
                  bg={useColorModeValue('gray.50', 'gray.700')}
                  borderRadius="md"
                  spacing={3}
                >
                  <Icon as={ArrowRight} color="blue.500" />
                  <Text color={textColor}>{question}</Text>
                </HStack>
              ))}
            </VStack>
          </Box>

          <Button
            variant="ghost"
            w="full"
            onClick={() => setShowMore(!showMore)}
            rightIcon={showMore ? <ChevronUpIcon /> : <ChevronDownIcon />}
            color={textColor}
            _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
          >
            {showMore ? 'Pokaż mniej' : 'Pokaż więcej'}
          </Button>

          <Collapse in={showMore}>
            <VStack spacing={6} w="full">
              <Box w="full">
                <Heading size="sm" mb={3} color={textColor}>Narzędzia i techniki:</Heading>
                <VStack align="stretch" spacing={3}>
                  {area.tools.map((tool, index) => (
                    <HStack
                      key={index}
                      p={3}
                      bg={useColorModeValue('gray.50', 'gray.700')}
                      borderRadius="md"
                      spacing={3}
                    >
                      <Icon as={Wrench} color="green.500" />
                      <Box>
                        <Text fontWeight="medium" color={textColor}>{tool.name}</Text>
                        <Text fontSize="sm" color={mutedColor}>
                          {tool.description}
                        </Text>
                      </Box>
                    </HStack>
                  ))}
                </VStack>
              </Box>

              <Box w="full">
                <Heading size="sm" mb={3} color={textColor}>Jak mierzyć postępy:</Heading>
                <VStack align="stretch" spacing={2}>
                  {area.metrics.map((metric, index) => (
                    <HStack
                      key={index}
                      p={3}
                      bg={useColorModeValue('gray.50', 'gray.700')}
                      borderRadius="md"
                      spacing={3}
                    >
                      <Icon as={Target} color="purple.500" />
                      <Text color={textColor}>{metric}</Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            </VStack>
          </Collapse>
        </VStack>
      </Box>
    </Container>
  );
}