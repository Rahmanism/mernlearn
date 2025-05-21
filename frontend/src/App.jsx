import {
  Box,
  Button,
  Checkbox,
  ClientOnly,
  HStack,
  Heading,
  Progress,
  RadioGroup,
  Skeleton,
  VStack,
} from '@chakra-ui/react'
import { ColorModeToggle } from './components/color-mode-toggle'

function App() {
  return (
    <Box
      textAlign="center"
      fontSize="xl"
      pt="30vh"
    >
      <VStack gap="8">
        <Heading
          size="2xl"
          letterSpacing="tight"
        >
          Welcome to Chakra UI v3 + Vite
        </Heading>

        <HStack>
          <Button>Let's go!</Button>
        </HStack>
      </VStack>

      <Box
        pos="absolute"
        top="4"
        right="4"
      >
        <ClientOnly
          fallback={
            <Skeleton
              w="10"
              h="10"
              rounded="md"
            />
          }
        >
          <ColorModeToggle />
        </ClientOnly>
      </Box>
    </Box>
  )
}

export default App
