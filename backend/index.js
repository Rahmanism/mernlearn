import express from 'express'
// import mongoose from 'mongoose'
// import cors from 'cors'
import dotenv from 'dotenv'
import { connectDb } from './config/db.js'
// import Product from './models/product.model.js'
import productRoutes from './routes/product.route.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT

// app.use(cors())
// Allows us to accept JSON data in the body.
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Server is ready and connected to mongodb.')
})

app.use('/api/products', productRoutes)

app.listen(PORT, () => {
  // Connect MongoDB
  connectDb()
  console.log(`Server running on port ${PORT}`)
})
console.log('heLLo5')
