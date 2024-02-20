import express from 'express'
import type { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import connectDB from './connectDB'
import userRoutes from './routes/userRoutes'
import employeeRoutes from './routes/employeeRoutes'
import cors from 'cors'

dotenv.config()

connectDB()
  .then(() => {
    console.log('Database connection successful')
  })
  .catch((error: Error) => {
    console.error('Database connection error:', error.message)
    process.exit(1)
  })

const app: Express = express()
const port = process.env.PORT
app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the server!')
})

app.use('/api/users', userRoutes)
app.use('/api/employees', employeeRoutes)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
