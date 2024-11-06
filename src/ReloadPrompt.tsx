import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button, Text, VStack, useToast } from '@chakra-ui/react';

export function ReloadPrompt() {
  const toast = useToast();
  
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered:', r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const handleRefresh = () => {
    updateServiceWorker(true);
    setNeedRefresh(false);
  };

  if (needRefresh) {
    toast({
      position: 'bottom',
      duration: null,
      render: () => (
        <VStack
          p={4}
          bg="blue.500"
          color="white"
          borderRadius="lg"
          spacing={4}
          shadow="lg"
        >
          <Text>Nowa wersja aplikacji jest dostępna!</Text>
          <Button
            colorScheme="whiteAlpha"
            onClick={handleRefresh}
          >
            Odśwież
          </Button>
        </VStack>
      ),
    });
  }

  return null;
}