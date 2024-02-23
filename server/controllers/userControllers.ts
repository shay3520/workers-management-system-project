/* eslint-disable @typescript-eslint/explicit-function-return-type */
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import dotenv from 'dotenv'
import type { Request, Response } from 'express'

dotenv.config()

interface RegisterRequestBody {
  email: string
  password: string
  role: 'admin' | 'viewer'
}

interface LoginRequestBody {
  email: string
  password: string
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const registerUser = async (req: Request<unknown, unknown, RegisterRequestBody>, res: Response) => {
  try {
    const { email, password, role } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      email,
      password: hashedPassword,
      role
    })
    await user.save()
    res.status(201).send('User registered successfully')
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message)
    } else {
      res.status(400).send('An error occurred during registration.')
    }
  }
}

export const loginUser = async (req: Request<unknown, unknown, LoginRequestBody>, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user === null || user === undefined) {
      return res.status(401).send('Invalid email or password')
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) {
      return res.status(401).send('Invalid email or password')
    }
    const secret = process.env.JWT_SECRET ?? 'fallbackSecret'
    const token = jwt.sign({ userId: user._id, role: user.role }, secret, { expiresIn: '24h' })
    res.json({
      token,
      email: user.email,
      role: user.role
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('An unknown error occurred')
    }
  }
}

export const getTotalAdmins = async (req: Request, res: Response): Promise<void> => {
  try {
    const count = await User.countDocuments({ role: 'admin' })
    res.json({ total: count })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('An unknown error occurred')
    }
  }
}
