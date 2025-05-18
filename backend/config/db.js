import mongoose from "mongoose"

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Conencted: ${conn.connection.host}`)
    } catch (error) {
        console.warn(`MongoDB connection faield: ${error.message}`)
        process.exit(1)
    }
}