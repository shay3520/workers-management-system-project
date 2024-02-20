import express from 'express'
import type { Request, Response } from 'express'
import dotenv from 'dotenv'
import Employee from '../models/Employee'

dotenv.config()

const router = express.Router()

router.get('/totalEmployees', async (req: Request, res: Response) => {
  try {
    const count = await Employee.countDocuments()
    res.json({ total: count })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('An unknown error occurred')
    }
  }
})

router.get('/totalSalary', async (req: Request, res: Response) => {
  try {
    const result = await Employee.aggregate([
      {
        $group: {
          _id: null,
          totalSalary: { $sum: '$salary' }
        }
      }
    ])
    const totalSalary = result.length > 0 ? result[0].totalSalary : 0
    res.json({ totalSalary })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('An unknown error occurred')
    }
  }
})
router.get('/table1', async (req, res) => {
  try {
    const employees = await Employee.find({})
    res.json(employees)
  } catch (error) {
    console.error('Failed to fetch employees:', error)
    res.status(500).json({ message: 'Failed to fetch employees' })
  }
})

export default router
