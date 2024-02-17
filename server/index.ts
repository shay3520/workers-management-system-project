import express from 'express'
import dotenv from 'dotenv'
import connectDB from './connectDB'

dotenv.config()
connectDB().then(() => {
  console.log('Database connection successful')
}).catch((error) => {
  console.error('Database connection error:', error)
  process.exit(1)
})

const app = express()
const port = process.env.PORT

app.get('/', (req, res) => res.send('Hello'))

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
