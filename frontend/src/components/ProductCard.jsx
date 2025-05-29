import { useState } from 'react'
import { Button, Card, CloseButton, Dialog, Heading, Image, Text, VStack } from '@chakra-ui/react'
import { MdDelete, MdEdit } from 'react-icons/md'
import useProductStore from '../store/product.store'
import { toaster } from './ui/toaster'
import Edit from '../pages/Edit'

function ProductCard({ product }) {
  const { removeProduct } = useProductStore()
  const [isEditing, setIsEditing] = useState(false)

  const handleDelete = async () => {
    const res = await removeProduct(product._id)
    if (res.success) {
      toaster.create({
        title: 'Product deleted',
        description: `The product has been deleted.`,
        type: 'success',
      })
    } else {
      toaster.create({
        title: 'Product deletion failed',
        description: res.message,
        type: 'error',
      })
    }
  }

  return (
    <>
      <Card.Root
        _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
        transition="all 0.2s ease-in-out"
        w="full"
      >
        <Card.Body>
          <Image
            src={product.image}
            alt={product.title}
            h={80}
            w="full"
            mb={8}
            objectFit={'cover'}
          />
          <VStack
            spacing={4}
            alignItems={'left'}
          >
            <Heading
              as="h3"
              size="md"
            >
              {product.title}
            </Heading>
            <Text>Price: {product.price}</Text>
          </VStack>
        </Card.Body>
        <Card.Footer justifyContent={'end'}>
          {/* <Link to={`/edit/${product._id}`}> */}
          <Button
            onClick={() => setIsEditing(true)}
            colorPalette={'cyan'}
          >
            <MdEdit />
          </Button>
          {/* </Link> */}
          <Button
            colorPalette={'red'}
            onClick={handleDelete}
          >
            <MdDelete />
          </Button>
        </Card.Footer>
      </Card.Root>
      <Dialog.Root
        role="alertdialog"
        open={isEditing}
        placement={'center'}
        onClose={() => setIsEditing(false)}
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p={15}>
            <Edit
              productId={product._id}
              onSubmit={() => setIsEditing(false)}
            />
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}

export default ProductCard
