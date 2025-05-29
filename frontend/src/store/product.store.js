import { create } from 'zustand'

const API = '/api/products'

const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  getProducts: async () => {
    const res = await fetch(API)
    const data = await res.json()
    set(() => ({ products: [...data.data] }))
  },
  addProduct: async (product) => {
    if (!product.title || !product.price || !product.image) {
      return { success: false, message: 'Please fill in all fields.' }
    }
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
    const data = await res.json()
    console.log(
      '%cdata from POST request',
      'color: teal; font-weight: bold; font-size: 1.5rem',
      data
    )
    set((state) => ({ products: [...state.products, data.data] }))
    return { success: true, message: 'Product added successfully.' }
  },
  updateProduct: async (updatedProduct) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      ),
    }))
  },
  removeProduct: async (id) => {
    set((state) => state.products.filter((product) => product.id !== id))
  },
}))

export default useProductStore
