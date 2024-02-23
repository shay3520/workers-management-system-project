import Employee from '../models/Employee'
import type { Request, Response } from 'express'

export const getTotalEmployees = async (req: Request, res: Response): Promise<void> => {
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
}

export const getTotalSalary = async (req: Request, res: Response): Promise<void> => {
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
}

export const getEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const employees = await Employee.find({})
    res.json(employees)
  } catch (error) {
    console.error('Failed to fetch employees:', error)
    res.status(500).json({ message: 'Failed to fetch employees' })
  }
}

export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { employeeId } = req.params
    const result = await Employee.findByIdAndDelete(employeeId)
    if (result !== null) {
      res.status(200).send(`Employee with ID ${employeeId} deleted successfully.`)
    } else {
      res.status(404).send(`Employee with ID ${employeeId} not found.`)
    }
  } catch (error) {
    console.error('Error deleting employee:', error)
    res.status(500).send('Internal Server Error')
  }
}

export const addEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, address, salary, image } = req.body
    const newEmployee = new Employee({
      name,
      email,
      address,
      salary,
      image
    })
    await newEmployee.save()
    res.status(201).json({ message: 'Employee added successfully', data: newEmployee })
  } catch (error) {
    console.error('Error adding new employee:', error)
    const mongoError = error as any
    if (mongoError.code === 11000) {
      res.status(409).json({ message: 'Email already exists' })
    } else {
      res.status(500).json({ message: 'Failed to add new employee' })
    }
  }
}

export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { name, email, address, salary, category, image } = req.body
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, { name, email, address, salary, category, image }, { new: true })
    if (updatedEmployee === null) {
      res.status(404).json({ message: 'Employee not found' })
    } else {
      res.status(200).json({ message: 'Employee updated successfully', data: updatedEmployee })
    }
  } catch (error) {
    console.error('Failed to update employee:', error)
    res.status(500).json({ message: 'Failed to update employee' })
  }
}
