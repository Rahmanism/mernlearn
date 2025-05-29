import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useProductStore from '../store/product.store'
import { toaster } from '../components/ui/toaster'
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import { useColorModeValue } from '../components/ui/color-mode'

function Edit({ productId, onSubmit }) {
  let { id } = useParams()
  id = productId ?? id
  const { getProductById, updateProduct } = useProductStore()
  const [product, setProduct] = useState({
    _id: '',
    title: '',
    price: 0,
    image: '',
  })
  useEffect(() => {
    ;(async () => {
      const res = await getProductById(id)
      if (!res.success) toaster.error(res.message)
      setProduct({
        _id: res.product._id,
        title: res.product.title,
        price: res.product.price,
        image: res.product.image,
      })
    })()
  }, [id])

  const handleUpdateProduct = async () => {
    const res = await updateProduct(product)
    if (res.success) {
      toaster.create({
        title: 'Success',
        description: res.message,
        type: 'success',
      })
    } else {
      toaster.create({
        title: 'Error',
        description: res.message,
        type: 'error',
      })
    }
    if (onSubmit) onSubmit()
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
          Update Product {product.title}
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
              value={product.title}
              onChange={(e) =>
                setProduct({
                  ...product,
                  title: e.target.value,
                })
              }
            />
            <Input
              placeholder="Product Price"
              name="price"
              type="number"
              value={product.price}
              onChange={(e) =>
                setProduct({
                  ...product,
                  price: +e.target.value,
                })
              }
            />
            <Input
              placeholder="Product Image"
              name="image"
              value={product.image}
              onChange={(e) =>
                setProduct({
                  ...product,
                  image: e.target.value,
                })
              }
            />
            <Button
              colorScheme="blue"
              type="submit"
              w="full"
              onClick={handleUpdateProduct}
            >
              Update Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default Edit
