import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { CiSquarePlus } from 'react-icons/ci'
import { FaHome } from 'react-icons/fa'
import { IoMdMoon } from 'react-icons/io'
import { MdOutlineWbSunny } from 'react-icons/md'
import { useColorMode } from './ui/color-mode'

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Container
      maxW={'1140px'}
      px={4}
      borderRadius="5px"
    >
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDir={{
          base: 'column',
          sm: 'row',
        }}
      >
        <Text
          bgGradient="linear-gradient(to left, {colors.red.500}, {colors.blue.500})"
          bgClip="text"
          fontSize={{ base: '1.5rem', sm: '2.5rem' }}
          fontWeight={600}
        >
          <Link to="/">MERN-LEARN</Link>
        </Text>
        <HStack
          spacing={2}
          alignItems={'center'}
        >
          <Link to="/create">
            <Button>
              <CiSquarePlus />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <IoMdMoon /> : <MdOutlineWbSunny />}
          </Button>
          <Link to="/">
            <Button>
              <FaHome />
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar
