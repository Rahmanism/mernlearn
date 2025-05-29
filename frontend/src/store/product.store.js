import { create } from 'zustand'

const API = '/api/products'

const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  getProductById: async (id) => {
    const res = await fetch(`${API}/${id}`)
    const product = await res.json()
    if (!res.ok) return { success: false, message: product.message }
    return { success: true, product: product.data }
  },

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
    if (!res.ok) return { success: false, message: data.message }
    set((state) => ({ products: [...state.products, data.data] }))
    return { success: true, message: 'Product added successfully.' }
  },

  updateProduct: async (updatedProduct) => {
    if (!updatedProduct.title || !updatedProduct.price || !updatedProduct.image) {
      return { success: false, message: 'Please fill in all fields.' }
    }
    const res = await fetch(`${API}/${updatedProduct._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    })
    const data = await res.json()
    if (!res.ok) return { success: false, message: data.message }

    set((state) => ({
      products: [
        ...state.products.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        ),
      ],
    }))
    return { success: true, message: 'Product updated successfully.' }
  },

  removeProduct: async (id) => {
    const res = await fetch(`${API}/${id}`, {
      method: 'DELETE',
    })
    const data = await res.json()
    if (!res.ok) return { success: false, message: data.message }
    set((state) => ({ products: [...state.products.filter((product) => product._id !== id)] }))
    return { success: true, message: data.message }
  },
}))

export default useProductStore
