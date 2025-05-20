import mongoose from 'mongoose'
import Product from '../models/product.model.js'

export const getAll = async (req, res) => {
  const products = await Product.find().lean()

  try {
    res.status(200).json({ success: true, data: products })
  } catch (error) {
    console.error('Error in retrieving products: ', error.message)
    res
      .status(500)
      .json({ success: false, message: 'Error in retrieving products.' })
  }
}

export const getById = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: 'Invalid id.' })
  }

  try {
    const product = await Product.findById(id)
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found.' })
    }
    res.status(200).json({ success: true, data: product })
  } catch (error) {
    console.error('Error in retrieving a product: ', error.message)
    res.status(404).json({ success: false, message: 'Product not found.' })
  }
}

export const create = async (req, res) => {
  const product = req.body // data sent by user

  // Data validation
  if (!product?.title || !product?.price || !product?.image) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide all fields.' })
  }

  const newProduct = new Product(product)

  try {
    await newProduct.save()
    // 201 means something is created
    res.status(201).json({ success: true, data: newProduct })
  } catch (error) {
    console.error('Error in creating a product:', error.message)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

export const update = async (req, res) => {
  const { id } = req.params
  const product = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: 'Invalid id .' })
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    })
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found.' })
    }
    res.status(200).json({ success: true, data: updatedProduct })
  } catch (error) {
    console.error('Something happend:', error.message)
    res.status(500).json({ success: false, message: 'Something happend.' })
  }
}

export const deleteItem = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: 'Invalid id.' })
  }

  try {
    const product = await Product.findByIdAndDelete(id)
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found.' })
    }
    res
      .status(200)
      .json({ success: true, message: 'Product has been deleted.' })
  } catch (error) {
    console.error('Error in deleting a product:', error.message)
    res
      .status(500)
      .json({ success: false, message: 'Error deleting a product' })
  }
}
