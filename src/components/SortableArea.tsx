import { Box, Text, HStack, VStack, useColorModeValue, Collapse, useDisclosure } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { Area } from '../types/harmony';

interface SortableAreaProps {
  area: Area;
}

export function SortableArea({ area }: SortableAreaProps) {
  const { isOpen, onToggle } = useDisclosure();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: area.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const dragBorderColor = useColorModeValue('blue.500', 'blue.400');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box
      ref={setNodeRef}
      style={style}
      w="full"
      bg={bgColor}
      borderWidth={1}
      borderColor={isDragging ? dragBorderColor : borderColor}
      borderRadius="lg"
      boxShadow={isDragging ? 'lg' : 'sm'}
      transition="all 0.2s"
      _hover={{ bg: hoverBg }}
      onClick={onToggle}
      cursor="pointer"
    >
      <HStack spacing={4} p={4}>
        <Box
          {...attributes}
          {...listeners}
          cursor="grab"
          p={2}
          borderRadius="md"
          _hover={{ bg: 'gray.100' }}
          color="gray.400"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical size={20} />
        </Box>
        
        <Text fontSize="2xl">{area.emoji}</Text>
        
        <VStack align="flex-start" spacing={0} flex={1}>
          <Text fontWeight="medium" color={useColorModeValue('gray.900', 'white')}>
            {area.name}
          </Text>
          <Text fontSize="sm" color={textColor}>
            Ocena: {area.score}/10 • Priorytet: {area.order + 1}
          </Text>
        </VStack>

        {area.notes && (
          <Box color={textColor}>
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </Box>
        )}
      </HStack>

      {area.notes && (
        <Collapse in={isOpen}>
          <Box 
            p={4} 
            pt={0} 
            borderTop="1px" 
            borderColor={borderColor}
          >
            <Text fontSize="sm" color={textColor}>
              {area.notes}
            </Text>
          </Box>
        </Collapse>
      )}
    </Box>
  );
}