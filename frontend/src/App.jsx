import { Box } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import Edit from './pages/Edit'
import Navbar from './components/Navbar'
import { useColorModeValue } from './components/ui/color-mode'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <>
      <Toaster />
      <Box
        minH={'100vh'}
        style={{ margin: '0 auto' }}
        maxW={'1140px'}
        color={useColorModeValue('black', 'white')}
        bg={useColorModeValue('gray.100', 'gray.800')}
      >
        <Navbar />
        <Box
          position={'absolute'}
          top={'5vh'}
          minH={'95vh'}
          maxW={'1140px'}
          w="full"
          padding={'1rem'}
        >
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/create"
              element={<Create />}
            />
            <Route
              path="/edit/:id"
              element={<Edit />}
            />
          </Routes>
        </Box>
      </Box>
    </>
  )
}

export default App
