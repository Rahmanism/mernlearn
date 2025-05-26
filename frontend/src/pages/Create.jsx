import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useColorModeValue } from '../components/ui/color-mode'

function Create() {
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: 0,
    image: '',
  })

  const handleAddProduct = () => {
    // Add the new product to the database or perform any other action
    console.log(newProduct)
    // Reset the form after adding the product
    setNewProduct({ title: '', price: 0, image: '' })
  }

  return (
    <Container maxW={'container.sm'}>
      <VStack spacing={8}>
        <Heading
          as="h1"
          size="2xl"
          textAlign={'center'}
          mb={8}
        >
          Create a New Product
        </Heading>

        <Box
          w="full"
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Title"
              name="title"
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  title: e.target.value,
                })
              }
            />
            <Input
              placeholder="Product Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: e.target.value,
                })
              }
            />
            <Input
              placeholder="Product Image"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  image: e.target.value,
                })
              }
            />
            <Button
              colorScheme="blue"
              type="submit"
              w="full"
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default Create
