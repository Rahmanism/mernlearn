import express from 'express'
// import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDb } from './config/db.js'
// import Product from './models/product.model.js'
import productRoutes from './routes/product.route.js'
import path from 'path'

dotenv.config()

const app = express()
const PORT = process.env.PORT
const __dirname = path.resolve()

app.use(
  cors({ oringin: '*' })
  // cors({ origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5001'] })
)
// Allows us to accept JSON data in the body.
app.use(express.json())

// Connect MongoDB
connectDb()

// app.get('/', (req, res) => {
//   res.send('Server is ready and connected to mongodb.')
// })

app.use('/api/products', productRoutes)

if (process.env.NODE_ENV === 'production') {
  console.log('PRODUCTION')
  app.use(express.static(path.join(__dirname, '/frontend/dist')))
  app.get('/', (req, res) => {
    console.log('req', req)
    // res.sendFile('/Users/mostafa/source/mern-learn/frontend/dist/index.html')
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
} else {
  console.log('DEVELOPMENT')
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
