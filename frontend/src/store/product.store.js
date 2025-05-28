import { create } from 'zustand'

const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  addProduct: async (product) => {
    set((state) => ({ products: [...state.products, product] }))
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
