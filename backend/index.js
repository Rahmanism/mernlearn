import express from 'express'
import mongoose from 'mongoose'
// import cors from 'cors'
import dotenv from 'dotenv'
import { connectDb } from './config/db.js'
import Product from './models/product.model.js'

dotenv.config()

const app = express()
// app.use(cors())
// Allows us to accept JSON data in the body.
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Server is ready and connected to mongodb.')
})

app.get('/api/products', async (req, res) => {
  const products = await Product.find().lean()
  
  try {
    res.status(200).json({ success: true, data: products })
  } catch (error) {
    console.error('Error in retrieving products: ', error.message)
    res
      .status(500)
      .json({ success: false, message: 'Error in retrieving products.' })
  }
})

app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params

  try {
    const product = await Product.findById(id)
    res.status(200).json({ success: true, data: product })
  } catch (error) {
    console.error('Error in retrieving a product: ', error.message)
    res.status(400).json({ success: false, message: 'Product not found.' })
  }
})

app.post('/api/products', async (req, res) => {
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
})

app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params

  try {
    await Product.findByIdAndDelete(id)
    res
      .status(200)
      .json({ success: true, message: 'Product has been deleted.' })
  } catch (error) {
    console.error('Error in deleting a product:', error.message)
    res
      .status(500)
      .json({ success: false, message: 'Error deleting a product' })
  }
})

app.listen(5001, () => {
  // Connect MongoDB
  connectDb()
  console.log('Server running on port 5001')
})
console.log('heLLo5')
