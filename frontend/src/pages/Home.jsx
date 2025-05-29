import { useEffect, useState } from 'react'
import { Container, Heading } from '@chakra-ui/react'
import ProductCard from '../components/ProductCard'
import useProductStore from '../store/product.store'

function Home() {
  const { products, getProducts } = useProductStore()
  useEffect(() => {
    getProducts()
  }, [])
  console.log('|PRODUCTS||', products)

  if (products.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <Container maxW={'container.sm'}>
      <Heading
        as="h2"
        size="2xl"
        mb={8}
      >
        Products
      </Heading>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </Container>
  )
}

export default Home
