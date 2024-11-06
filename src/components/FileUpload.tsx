import React from 'react';
import { 
  Box, 
  VStack, 
  Button, 
  Text, 
  Container,
  useColorModeValue,
  Heading,
  SimpleGrid,
  Icon,
  useToast,
  useColorMode,
} from '@chakra-ui/react';
import { Sparkle, FileUp, Rocket, MoonStar, Sun } from 'lucide-react';

interface FileUploadProps {
  onUpload: (data: any[]) => void;
  onStart: () => void;
}

export function FileUpload({ onUpload, onStart }: FileUploadProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgHover = useColorModeValue('gray.50', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.800');
  const toast = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const csvData = e.target?.result as string;
          const lines = csvData.split('\n').filter(line => line.trim());
          if (lines.length < 2) throw new Error('Pusty plik CSV');
          
          const headers = lines[0].split(',');
          if (headers.length < 3) throw new Error('Nieprawidłowy format pliku');
          
          const parsedData = lines.slice(1).map(line => {
            const values = line.split(',').map(val => val.replace(/^"|"$/g, '').trim());
            return {
              name: values[0],
              score: parseInt(values[1]) || 5,
              notes: values[3] || '',
            };
          });

          onUpload(parsedData);
          toast({
            title: 'Plik wczytany pomyślnie',
            status: 'success',
            duration: 3000,
          });
        } catch (error) {
          console.error('Błąd podczas wczytywania pliku:', error);
          toast({
            title: 'Błąd wczytywania pliku',
            description: 'Sprawdź czy plik ma prawidłowy format CSV',
            status: 'error',
            duration: 5000,
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Container maxW="container.md" py={12}>
      <Box position="absolute" top="4" right="4">
        <Button
          onClick={toggleColorMode}
          variant="ghost"
          size="lg"
          aria-label="Przełącz motyw"
        >
          <Icon as={colorMode === 'light' ? MoonStar : Sun} />
        </Button>
      </Box>

      <VStack spacing={12}>
        <VStack spacing={6} textAlign="center">
          <Icon as={Sparkle} w={12} h={12} color="blue.500" />
          <Heading size="2xl" fontWeight="bold">
            Harmony Life
          </Heading>
          <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')} maxW="md">
            Odkryj równowagę w swoim życiu i stwórz harmonijną przyszłość
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
          <Box
            p={8}
            bg={cardBg}
            borderRadius="xl"
            boxShadow="sm"
            _hover={{ transform: 'translateY(-2px)', transition: 'all 0.2s' }}
          >
            <VStack spacing={6} align="flex-start">
              <Icon as={Rocket} w={16} h={16} color="blue.500" />
              <Heading size="md">Rozpocznij od Nowa</Heading>
              <Text color={useColorModeValue('gray.600', 'gray.400')}>
                Zacznij swoją podróż ku lepszemu życiu z czystą kartą
              </Text>
              <Button
                leftIcon={<Icon as={Sparkle} />}
                colorScheme="blue"
                size="lg"
                w="full"
                onClick={onStart}
              >
                Rozpocznij Analizę
              </Button>
            </VStack>
          </Box>

          <Box
            p={8}
            bg={cardBg}
            borderRadius="xl"
            boxShadow="sm"
            _hover={{ 
              transform: 'translateY(-2px)',
              transition: 'all 0.2s',
              bg: bgHover 
            }}
          >
            <VStack spacing={6} align="flex-start">
              <Icon as={FileUp} w={16} h={16} color="blue.500" />
              <Heading size="md">Kontynuuj Podróż</Heading>
              <Text color={useColorModeValue('gray.600', 'gray.400')}>
                Wgraj poprzednią analizę i śledź swój postęp
              </Text>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <Button
                leftIcon={<Icon as={FileUp} />}
                variant="outline"
                colorScheme="blue"
                size="lg"
                w="full"
                onClick={handleUploadClick}
              >
                Wgraj Plik CSV
              </Button>
            </VStack>
          </Box>
        </SimpleGrid>
      </VStack>
    </Container>
  );
}