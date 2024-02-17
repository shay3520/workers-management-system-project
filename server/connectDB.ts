import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async (): Promise<void> => {
  const dbUri = process.env.MONGODB_URI
  if (dbUri === undefined || dbUri === '') {
    console.error('MongoDB URI is not defined in .env file.')
    process.exit(1)
  }
  try {
    const conn = await mongoose.connect(dbUri)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`)
    process.exit(1)
  }
}

export default connectDB
