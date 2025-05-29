import { Card } from '@chakra-ui/react'

function ProductCard({ product }) {
  console.log('PRODUCT CARD', product)
  return (
    <Card.Root>
      <Card.Header
        as="h2"
        size="2xl"
        mb={8}
        fontWeight={'bold'}
      >
        {product.title}
      </Card.Header>
      <Card.Body>
        Price: {product.price}
        <br />
        <img src={product.image} />
      </Card.Body>
    </Card.Root>
  )
}

export default ProductCard
