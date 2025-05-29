import { useEffect } from 'react'
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import ProductCard from '../components/ProductCard'
import useProductStore from '../store/product.store'
import { Link } from 'react-router-dom'
import { useColorModeValue } from '../components/ui/color-mode'

function Home() {
  const { products, getProducts } = useProductStore()

  useEffect(() => {
    ;(async () => {
      await getProducts()
    })()
  }, [getProducts])

  return (
    <Container
      maxW={'container.sm'}
      bg={useColorModeValue('gray.100', 'gray.800')}
      mb={8}
      pb={8}
    >
      <Text
        as="h2"
        fontSize="4xl"
        fontWeight={'bold'}
        mb={8}
        bgGradient="linear-gradient(to left, {colors.red.500}, {colors.blue.500})"
        bgClip={'text'}
        textAlign={'center'}
      >
        Products
      </Text>
      {products.length === 0 && (
        <>
          <Text
            fontSize={'xl'}
            textAlign={'center'}
            fontWeight={'bold'}
            color="gray.500"
          >
            No products yet...{' '}
            <Link to="/create">
              <Text
                as="span"
                color={'blue.500'}
                _hover={{ textDecoration: 'underline' }}
              >
                Add Product
              </Text>
            </Link>
          </Text>
        </>
      )}
      <VStack spacing={8}>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          gap={8}
        >
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  )
}

export default Home
